"""
PlantVillage — Servidor de predicción local
Uso:
  1. pip install flask torch torchvision timm pillow
  2. python app.py
  3. Abre http://localhost:5000
"""

import os, io, json
from pathlib import Path
from flask import Flask, request, jsonify, send_from_directory
from PIL import Image
import torch
import torch.nn.functional as F
import torchvision.transforms as T
import timm

app = Flask(__name__, static_folder=".")

# ── Configuración ──────────────────────────────────────────────────────
MODEL_PATH = Path("modelo_produccion.pth")   # ← cambia si es otro nombre
DEVICE     = "cuda" if torch.cuda.is_available() else "cpu"

model      = None
idx2clase  = None
transform  = None

# Traducciones de clases al español
TRADUCCIONES = {
    "Apple___Apple_scab":                   "Manzano — Sarna del manzano",
    "Apple___Black_rot":                    "Manzano — Podredumbre negra",
    "Apple___Cedar_apple_rust":             "Manzano — Roya del cedro",
    "Apple___healthy":                      "Manzano — Sano ✅",
    "Blueberry___healthy":                  "Arándano — Sano ✅",
    "Cherry_(including_sour)___Powdery_mildew": "Cerezo — Oídio (cenicilla)",
    "Cherry_(including_sour)___healthy":    "Cerezo — Sano ✅",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": "Maíz — Mancha gris",
    "Corn_(maize)___Common_rust_":          "Maíz — Roya común",
    "Corn_(maize)___Northern_Leaf_Blight":  "Maíz — Tizón norteño",
    "Corn_(maize)___healthy":               "Maíz — Sano ✅",
    "Grape___Black_rot":                    "Vid — Podredumbre negra",
    "Grape___Esca_(Black_Measles)":         "Vid — Esca (sarampión negro)",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": "Vid — Tizón foliar",
    "Grape___healthy":                      "Vid — Sana ✅",
    "Orange___Haunglongbing_(Citrus_greening)": "Naranja — Dragón amarillo (HLB)",
    "Peach___Bacterial_spot":               "Durazno — Mancha bacteriana",
    "Peach___healthy":                      "Durazno — Sano ✅",
    "Pepper,_bell___Bacterial_spot":        "Chile pimiento — Mancha bacteriana",
    "Pepper,_bell___healthy":               "Chile pimiento — Sano ✅",
    "Potato___Early_blight":                "Papa — Tizón temprano",
    "Potato___Late_blight":                 "Papa — Tizón tardío",
    "Potato___healthy":                     "Papa — Sana ✅",
    "Raspberry___healthy":                  "Frambuesa — Sana ✅",
    "Soybean___healthy":                    "Soya — Sana ✅",
    "Squash___Powdery_mildew":              "Calabaza — Oídio (cenicilla)",
    "Strawberry___Leaf_scorch":             "Fresa — Quemadura foliar",
    "Strawberry___healthy":                 "Fresa — Sana ✅",
    "Tomato___Bacterial_spot":              "Tomate — Mancha bacteriana",
    "Tomato___Early_blight":                "Tomate — Tizón temprano",
    "Tomato___Late_blight":                 "Tomate — Tizón tardío",
    "Tomato___Leaf_Mold":                   "Tomate — Moho foliar",
    "Tomato___Septoria_leaf_spot":          "Tomate — Mancha de Septoria",
    "Tomato___Spider_mites Two-spotted_spider_mite": "Tomate — Araña roja",
    "Tomato___Target_Spot":                 "Tomate — Mancha diana",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "Tomate — Virus del enrollamiento amarillo",
    "Tomato___Tomato_mosaic_virus":         "Tomate — Virus del mosaico",
    "Tomato___healthy":                     "Tomate — Sano ✅",
}


def load_model():
    global model, idx2clase, transform
    if not MODEL_PATH.exists():
        print(f"⚠️  Modelo no encontrado en {MODEL_PATH}")
        return False
    print(f"📦 Cargando modelo desde {MODEL_PATH}…")
    ckpt = torch.load(MODEL_PATH, map_location=DEVICE)

    idx2clase  = ckpt["idx2clase"]          # {"0": "Apple___Apple_scab", ...}
    num_clases = ckpt["num_classes"]
    model_name = ckpt["model_name"]
    img_size   = ckpt["img_size"]
    mean       = ckpt.get("mean", [0.485, 0.456, 0.406])
    std        = ckpt.get("std",  [0.229, 0.224, 0.225])

    model = timm.create_model(model_name, pretrained=False, num_classes=num_clases)
    model.load_state_dict(ckpt["model_state_dict"])
    model.to(DEVICE).eval()

    transform = T.Compose([
        T.Resize((img_size, img_size)),
        T.ToTensor(),
        T.Normalize(mean, std),
    ])
    print(f"✅ Modelo listo — {model_name} | {num_clases} clases | img={img_size}px | device={DEVICE}")
    return True


@app.route("/")
def index():
    return send_from_directory(".", "index.html")


@app.route("/status")
def status():
    return jsonify({"loaded": model is not None})


@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"error": "Modelo no cargado. Verifica que modelo_produccion.pth esté en la misma carpeta que app.py"}), 503

    if "image" not in request.files:
        return jsonify({"error": "No se recibió ninguna imagen"}), 400

    file = request.files["image"]
    try:
        img = Image.open(io.BytesIO(file.read())).convert("RGB")
    except Exception as e:
        return jsonify({"error": f"No se pudo abrir la imagen: {e}"}), 400

    tensor = transform(img).unsqueeze(0).to(DEVICE)

    with torch.no_grad():
        logits = model(tensor)
        probs  = F.softmax(logits, dim=1)[0]

    top5_vals, top5_idx = probs.topk(5)
    resultados = []
    for prob, idx in zip(top5_vals.tolist(), top5_idx.tolist()):
        clase_raw = idx2clase[str(idx)]
        nombre_es = TRADUCCIONES.get(clase_raw, clase_raw.replace("___", " — ").replace("_", " "))
        es_sano   = "healthy" in clase_raw.lower()
        resultados.append({
            "clase_raw": clase_raw,
            "nombre":    nombre_es,
            "confianza": round(prob * 100, 2),
            "sano":      es_sano,
        })

    return jsonify({"predicciones": resultados})


if __name__ == "__main__":
    load_model()
    app.run(host="0.0.0.0", port=5000, debug=False)
