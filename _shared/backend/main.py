"""
main.py — FastAPI genérico para cualquier proyecto de ActividadFinal
Render free tier: 512 MB RAM, sin GPU → usa ONNX o PyTorch en CPU

Variables de entorno (configura en Render):
  MODEL_PATH   → ruta al .pth  (default: modelo_produccion.pth)
  CONFIG_PATH  → ruta al config.json del proyecto (opcional)
  MAX_SIZE_MB  → tamaño máximo de imagen en MB (default: 10)
"""

import os
import json
import time
import logging
from pathlib import Path
from contextlib import asynccontextmanager

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from inference import Detector

# ── Logging ──────────────────────────────────────────────────────
logging.basicConfig(level=logging.INFO, format="%(levelname)s | %(message)s")
log = logging.getLogger(__name__)

# ── Configuración desde variables de entorno ──────────────────────
MODEL_PATH  = os.getenv("MODEL_PATH",  "modelo_produccion.pth")
CONFIG_PATH = os.getenv("CONFIG_PATH", "config.json")
MAX_SIZE_MB = int(os.getenv("MAX_SIZE_MB", "10"))
MAX_SIZE_B  = MAX_SIZE_MB * 1024 * 1024

FORMATOS_PERMITIDOS = {"image/jpeg", "image/png", "image/webp", "image/bmp"}

# ── Detector global (se inicializa una vez al arrancar) ───────────
detector: Detector | None = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global detector
    log.info(f"Cargando modelo desde: {MODEL_PATH}")

    if not Path(MODEL_PATH).exists():
        log.error(f"Modelo no encontrado: {MODEL_PATH}")
        log.error("Sube el archivo .pth al repositorio o configura MODEL_PATH")
        raise RuntimeError(f"Modelo no encontrado: {MODEL_PATH}")

    config = None
    if Path(CONFIG_PATH).exists():
        with open(CONFIG_PATH, encoding="utf-8") as f:
            config = json.load(f)
        log.info(f"Config cargado: {CONFIG_PATH}")
    else:
        log.info("Sin config.json — modo genérico (sin descripciones de clase)")

    detector = Detector(MODEL_PATH, config)
    log.info("Modelo listo para inferencia")
    yield
    log.info("Apagando servidor")


# ── App ───────────────────────────────────────────────────────────
app = FastAPI(
    title="Clasificador CNN — ActividadFinal",
    description="API genérica de inferencia para proyectos de visión artificial",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # En producción real, limita a tu dominio de Expo
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


# ── Endpoints ─────────────────────────────────────────────────────

@app.get("/")
async def root():
    """Health check y metadata del modelo cargado."""
    if detector is None:
        raise HTTPException(503, "Modelo no inicializado")
    return {
        "status":   "ok",
        "modelo":   detector.model_name,
        "n_clases": detector.num_classes,
        "clases":   list(detector.idx2clase.values()),
        "proyecto": detector.config.get("nombre", "Sin nombre"),
    }


@app.get("/health")
async def health():
    """Endpoint para Render health checks."""
    return {"status": "ok", "model_loaded": detector is not None}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Recibe una imagen y devuelve la clasificación.

    Respuesta:
    {
      "ok": true,
      "tiempo_ms": 123,
      "principal": {
        "clase": "melanoma",
        "nombre": "Melanoma",
        "probabilidad": 87.34,
        "confianza": "Alta",
        "descripcion": "...",
        "urgencia": "URGENTE",
        "tipo": "Maligno",
        "color": "#E24B4A"
      },
      "top_k": [ {...}, {...}, ... ],
      "modelo": "efficientnet_b2",
      "n_clases": 7
    }
    """
    if detector is None:
        raise HTTPException(503, "Modelo no inicializado")

    # Validar tipo de archivo
    if file.content_type not in FORMATOS_PERMITIDOS:
        raise HTTPException(
            415,
            f"Formato no soportado: {file.content_type}. "
            f"Usa: {', '.join(FORMATOS_PERMITIDOS)}"
        )

    # Leer y validar tamaño
    img_bytes = await file.read()
    if len(img_bytes) > MAX_SIZE_B:
        raise HTTPException(
            413,
            f"Imagen demasiado grande ({len(img_bytes)/1e6:.1f} MB). "
            f"Máximo: {MAX_SIZE_MB} MB"
        )

    # Inferencia
    try:
        t0     = time.perf_counter()
        result = detector.predict(img_bytes, top_k=5)
        ms     = round((time.perf_counter() - t0) * 1000, 1)
        result["tiempo_ms"] = ms
        log.info(
            f"Predicción: {result['principal']['clase']} "
            f"({result['principal']['probabilidad']}%) en {ms}ms"
        )
        return JSONResponse(result)
    except Exception as e:
        log.error(f"Error en inferencia: {e}")
        raise HTTPException(500, f"Error al procesar la imagen: {str(e)}")


@app.get("/clases")
async def listar_clases():
    """Devuelve todas las clases con su información completa del config.json."""
    if detector is None:
        raise HTTPException(503, "Modelo no inicializado")
    clases = []
    for idx, key in detector.idx2clase.items():
        info = detector.clases_info.get(key, {})
        clases.append({
            "idx":         int(idx),
            "clase":       key,
            "nombre":      info.get("nombre", key.replace("_", " ").title()),
            "descripcion": info.get("descripcion", ""),
            "urgencia":    info.get("urgencia", ""),
            "tipo":        info.get("tipo", ""),
            "color":       info.get("color", ""),
        })
    return {"clases": clases, "total": len(clases)}
