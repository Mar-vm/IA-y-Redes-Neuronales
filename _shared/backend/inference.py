"""
inference.py — Motor de inferencia genérico
Carga cualquier .pth generado por ActividadFinal.ipynb
"""
import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np
from PIL import Image
from io import BytesIO
from pathlib import Path
import albumentations as A
from albumentations.pytorch import ToTensorV2
import timm


class _ClasificadorCNN(nn.Module):
    def __init__(self, num_classes: int, model_name: str):
        super().__init__()
        self.backbone = timm.create_model(
            model_name, pretrained=False,
            num_classes=0, global_pool="avg"
        )
        in_f = self.backbone.num_features
        self.classifier = nn.Sequential(
            nn.Dropout(0.5),
            nn.Linear(in_f, min(512, in_f)),
            nn.GELU(),
            nn.Dropout(0.4),
            nn.Linear(min(512, in_f), num_classes),
        )

    def forward(self, x):
        return self.classifier(self.backbone(x))


class Detector:
    """
    Carga un .pth exportado por ActividadFinal y expone predict().
    El config.json por proyecto es opcional — si no existe, devuelve
    solo el nombre de la clase sin descripción ni urgencia.
    """

    def __init__(self, model_path: str, config: dict | None = None):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        ckpt = torch.load(model_path, map_location=self.device)

        self.idx2clase   = ckpt["idx2clase"]
        self.num_classes = ckpt["num_classes"]
        self.model_name  = ckpt.get("model_name", "efficientnet_b2")
        img_size         = ckpt.get("img_size", 224)
        mean             = ckpt.get("mean", [0.485, 0.456, 0.406])
        std              = ckpt.get("std",  [0.229, 0.224, 0.225])

        # Metadatos del proyecto (del config.json, opcionales)
        self.config      = config or {}
        self.clases_info = self.config.get("clases", {})

        # Construir y cargar el modelo
        self.model = _ClasificadorCNN(self.num_classes, self.model_name)
        self.model.load_state_dict(ckpt["model_state_dict"])
        self.model.to(self.device).eval()

        # Pipeline de transformación (mismo que en el notebook)
        self.transform = A.Compose([
            A.Resize(img_size, img_size),
            A.Normalize(mean=mean, std=std),
            ToTensorV2(),
        ])

        print(f"[Detector] Modelo cargado: {self.model_name}")
        print(f"[Detector] Clases: {self.num_classes} | Device: {self.device}")

    @torch.no_grad()
    def predict(self, image_bytes: bytes, top_k: int = 5) -> dict:
        img    = np.array(Image.open(BytesIO(image_bytes)).convert("RGB"))
        tensor = self.transform(image=img)["image"].unsqueeze(0).to(self.device)
        probs  = F.softmax(self.model(tensor), dim=1)[0]
        top_p, top_i = torch.topk(probs, min(top_k, self.num_classes))

        resultados = []
        for p, i in zip(top_p, top_i):
            key   = self.idx2clase[str(i.item())]
            prob  = round(p.item() * 100, 2)
            info  = self.clases_info.get(key, {})
            resultados.append({
                "clase":       key,
                "nombre":      info.get("nombre", key.replace("_", " ").title()),
                "probabilidad": prob,
                "confianza":   "Alta" if prob >= 75 else "Media" if prob >= 45 else "Baja",
                "descripcion": info.get("descripcion", ""),
                "urgencia":    info.get("urgencia", ""),
                "tipo":        info.get("tipo", ""),
                "color":       info.get("color", ""),
            })

        principal = resultados[0]
        return {
            "ok":        True,
            "principal": principal,
            "top_k":     resultados,
            "modelo":    self.model_name,
            "n_clases":  self.num_classes,
        }
