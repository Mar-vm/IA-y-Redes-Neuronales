"""
API de inferencia - Clasificador de lesiones de piel (HAM10000)
=================================================================

Pensada para desplegarse en Render como Web Service.

Endpoints:
  GET  /              -> info básica / healthcheck
  GET  /health        -> healthcheck
  POST /predict       -> recibe una imagen (multipart/form-data, campo "file")
                          y regresa la predicción + recomendaciones

⚠️ Proyecto académico (PFAD-PADCC-VIC04 - TecNM Virtual).
No es una herramienta de diagnóstico médico real.
"""

import io
import os

import torch
import torch.nn.functional as F
from torchvision import transforms
from PIL import Image

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from model_def import ClasificadorPiel
from recommendations import obtener_info_clase

# ---------------------------------------------------------------
# Configuración
# ---------------------------------------------------------------
MODEL_PATH = os.environ.get("MODEL_PATH", "modelo_produccion.pth")
DEVICE = "cpu"  # Render free tier no tiene GPU

# ---------------------------------------------------------------
# Carga del modelo (una sola vez, al iniciar el servicio)
# ---------------------------------------------------------------
print(f"Cargando checkpoint desde: {MODEL_PATH}")
checkpoint = torch.load(MODEL_PATH, map_location=DEVICE)

NUM_CLASSES = checkpoint["num_classes"]
MODEL_NAME = checkpoint["model_name"]
IMG_SIZE = checkpoint["img_size"]
MEAN = checkpoint["mean"]
STD = checkpoint["std"]
IDX2CLASE = checkpoint["idx2clase"]  # dict: {"0": "melanoma", "1": "melanocytic_nevi", ...}

model = ClasificadorPiel(num_classes=NUM_CLASSES, model_name=MODEL_NAME, pretrained=False)
model.load_state_dict(checkpoint["model_state_dict"])
model.to(DEVICE)
model.eval()

print(f"✅ Modelo cargado: {MODEL_NAME} | clases={NUM_CLASSES} | img_size={IMG_SIZE}")
print(f"   Clases: {IDX2CLASE}")

# ---------------------------------------------------------------
# Preprocesamiento (equivalente a val_aug del notebook:
# Resize -> Normalize -> ToTensor, SIN augmentación)
# ---------------------------------------------------------------
preprocess = transforms.Compose(
    [
        transforms.Resize((IMG_SIZE, IMG_SIZE)),
        transforms.ToTensor(),
        transforms.Normalize(mean=MEAN, std=STD),
    ]
)

# ---------------------------------------------------------------
# FastAPI app
# ---------------------------------------------------------------
app = FastAPI(
    title="API Clasificador de Lesiones de Piel (HAM10000)",
    description=(
        "Proyecto académico - PFAD-PADCC-VIC04 - TecNM Virtual. "
        "NO constituye diagnóstico médico."
    ),
    version="1.0.0",
)

# CORS abierto para que el frontend HTML pueda llamar a la API
# desde cualquier origen (cámbialo si quieres restringirlo a tu dominio).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "status": "ok",
        "modelo": MODEL_NAME,
        "clases": list(IDX2CLASE.values()),
        "aviso": "Proyecto académico - no es diagnóstico médico real.",
    }


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # ── Validar tipo de archivo ────────────────────────────────
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="El archivo debe ser una imagen.")

    # ── Leer y abrir la imagen ─────────────────────────────────
    try:
        contenido = await file.read()
        img = Image.open(io.BytesIO(contenido)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="No se pudo leer la imagen.")

    # ── Preprocesamiento + inferencia ──────────────────────────
    tensor = preprocess(img).unsqueeze(0).to(DEVICE)

    with torch.no_grad():
        logits = model(tensor)
        probs = F.softmax(logits, dim=1)[0]

    # ── Top-5 (o menos si hay menos clases) ────────────────────
    k = min(5, NUM_CLASSES)
    top_probs, top_idxs = torch.topk(probs, k)

    top5 = []
    for p, idx in zip(top_probs, top_idxs):
        nombre_clase = IDX2CLASE[str(idx.item())]
        top5.append(
            {
                "clase": nombre_clase,
                "nombre_display": obtener_info_clase(nombre_clase)["nombre_display"],
                "probabilidad": round(p.item() * 100, 2),
            }
        )

    # ── Clase predicha (top-1) + info educativa ────────────────
    clase_predicha = top5[0]["clase"]
    info = obtener_info_clase(clase_predicha)

    return {
        "prediccion": {
            "clase": clase_predicha,
            "nombre_display": info["nombre_display"],
            "categoria": info["categoria"],
            "nivel_riesgo": info["nivel_riesgo"],
            "color": info["color"],
            "confianza": top5[0]["probabilidad"],
        },
        "top5": top5,
        "info_educativa": {
            "descripcion": info["descripcion"],
            "que_observar": info["que_observar"],
            "recomendacion": info["recomendacion"],
        },
        "aviso_legal": (
            "Este resultado es generado por un modelo académico de IA y NO "
            "constituye un diagnóstico médico. Consulta siempre a un "
            "dermatólogo certificado."
        ),
    }


if __name__ == "__main__":
    import uvicorn

    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
