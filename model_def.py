"""
Definición del modelo - debe ser IDÉNTICA a la usada en el notebook de
entrenamiento (ActividadFinal_HAM10000.ipynb), de lo contrario
load_state_dict() fallará al cargar los pesos.
"""

import torch.nn as nn
import timm


class ClasificadorPiel(nn.Module):
    """
    CNN para clasificación de lesiones cutáneas (HAM10000).

    Backbone: EfficientNet-B2 o MobileNetV3 preentrenado en ImageNet.
    Cabeza  : Dropout -> Linear -> GELU -> Dropout -> Linear(num_classes)
    """

    def __init__(self, num_classes: int, model_name: str, pretrained: bool = False):
        super().__init__()
        self.backbone = timm.create_model(
            model_name,
            pretrained=pretrained,
            num_classes=0,
            global_pool="avg",
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
        feats = self.backbone(x)
        return self.classifier(feats)
