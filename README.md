# Branch: proyectos

Casos practicos de clasificacion de imagenes con CNN.
Cada carpeta contiene un proyecto independiente basado en el notebook generico `ActividadFinal.ipynb`.

## Proyectos disponibles

| Carpeta | Nombre | Dataset | Clases | Modelo |
|---|---|---|---|---|
| `neumonia/` | PneumoScan | Chest X-Ray | 2 | MobileNetV3 |
| `brain_tumor/` | NeuroScan | Brain Tumor MRI | 4 | EfficientNetB2 |
| `enfermedades_plantas/` | AgroScan | PlantVillage | 38 | EfficientNetB4 |
| `frutas_verduras/` | FreshCheck | Fruits Fresh/Rotten | 6 | EfficientNetB2 |
| `mariposas/` | LepidoScan | Butterflies & Moths | 100 | EfficientNetB2 |
| `tipos_clima/` | AtmoScan | Weather Recognition | 11 | MobileNetV3 |
| `grietas_concreto/` | CrackDetect | Concrete Cracks | 2 | MobileNetV3 |
| `clasificacion_basura/` | EcoSort | Garbage Classification | 6 | EfficientNetB2 |
| `vitalia/` | VitalIA | HAM10000 (piel) | 7 | EfficientNetB2 |

## Estructura general

```
proyectos/
├── _shared/
│   ├── ActividadFinal_Colab.ipynb   ← notebook generico (Colab)
│   ├── ActividadFinal_Local.ipynb   ← notebook generico (Local)
│   └── backend/                     ← FastAPI generica para todos
│       ├── main.py
│       ├── inference.py
│       ├── requirements.txt
│       ├── Dockerfile
│       └── README_deploy.md
│
├── vitalia/                         ← ejemplo completo con VitalIA
├── brain_tumor/
├── ... (un folder por proyecto)
│
└── README.md                        ← este archivo
```

## Como usar un proyecto

1. Descarga el ZIP del dataset correspondiente
2. Abre `entrenamiento_colab.ipynb` o `entrenamiento_local.ipynb`
3. Ejecuta todas las celdas — solo editas los dos valores en CELDA 0
4. Al terminar, despliega con las instrucciones en el `README.md` de cada carpeta

## Requisitos

- Cuenta en Google (para Colab y Drive)
- Cuenta en Kaggle (para descargar los datasets)
- Cuenta en Render (gratuita, para el backend)
- Expo Go en tu celular (para la app movil)
