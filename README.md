# DermoScan — API + App de clasificación de lesiones de piel (HAM10000)

Proyecto académico — PFAD-PADCC-VIC04 · TecNM Virtual
⚠️ No es una herramienta de diagnóstico médico real.

## Estructura

```
proyecto_piel_api/
├── app.py                 ← API FastAPI (carga el modelo y expone /predict)
├── model_def.py            ← clase ClasificadorPiel (igual que en el notebook)
├── recommendations.py      ← info educativa + recomendaciones por clase
├── requirements.txt
├── render.yaml             ← config de despliegue para Render
├── modelo_produccion.pth   ← (TÚ debes copiarlo aquí, ver paso 1)
└── frontend/
    └── index.html          ← app standalone (subir foto -> ver resultado)
```

## Paso 1 — Copia tu modelo entrenado

Después de correr tu notebook (`ActividadFinal_HAM10000.ipynb`), copia el
archivo:

```
proyecto_piel/models/modelo_produccion.pth
```

y pégalo en la raíz de este proyecto (`proyecto_piel_api/modelo_produccion.pth`).

> No necesitas copiar `idx2clase.json` por separado: el checkpoint ya incluye
> `idx2clase`, `model_name`, `img_size`, `mean` y `std`, así que `app.py` lee
> todo directo del `.pth`.

### Sobre el tamaño del archivo

- **MobileNetV3-Large (PC_DEBIL=True)** → ~20-25 MB
- **EfficientNet-B2 (PC_DEBIL=False)** → ~35-45 MB

Ambos caben sin problema en un repositorio normal de GitHub (límite 100 MB
por archivo). Si por algún motivo tu `.pth` pesa más de 100 MB:

- Usa [Git LFS](https://git-lfs.github.com/) (`git lfs track "*.pth"`), o
- Sube el archivo a Google Drive / un bucket S3 público y descárgalo al
  iniciar el servicio (te ayudo a ajustar `app.py` si llegas a este caso).

## Paso 2 — Probar localmente (opcional)

```bash
cd proyecto_piel_api
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload
```

Abre http://127.0.0.1:8000/docs para probar `/predict` desde el navegador
(Swagger UI te deja subir una imagen directamente).

## Paso 3 — Subir a GitHub

```bash
git init
git add .
git commit -m "API DermoScan - HAM10000"
git branch -M main
git remote add origin <URL_DE_TU_REPO>
git push -u origin main
```

## Paso 4 — Desplegar en Render

1. Entra a [render.com](https://render.com) → **New** → **Web Service**.
2. Conecta tu repositorio de GitHub.
3. Render detectará `render.yaml` automáticamente (o configura manualmente):
   - **Build command:** `pip install -r requirements.txt`
   - **Start command:** `uvicorn app:app --host 0.0.0.0 --port $PORT`
   - **Plan:** Free
4. Espera a que termine el deploy (puede tardar varios minutos por el
   tamaño de `torch`).
5. Cuando termine, tu API estará en algo como:
   `https://piel-api.onrender.com`

   Pruébala visitando `https://piel-api.onrender.com/` (debería responder un
   JSON con `"status": "ok"`).

> ⚠️ **Importante (plan Free de Render):** el servicio "duerme" tras ~15 min
> sin uso, y la primera petición después de dormir tarda 30-60s en
> responder mientras "despierta". El frontend ya muestra un mensaje
> explicando esto si la primera petición falla o tarda mucho.

## Paso 5 — Configurar y abrir el frontend

1. Abre `frontend/index.html` directamente en tu navegador (doble clic, no
   necesita servidor).
2. Da clic en **"⚙ Configurar API"**.
3. Pega la URL de tu API + `/predict`, por ejemplo:
   ```
   https://piel-api.onrender.com/predict
   ```
4. Sube una foto de prueba y da clic en **"Analizar imagen"**.

La configuración se guarda en el navegador (localStorage), así que no
tienes que volver a escribirla cada vez.

## Endpoints de la API

| Método | Ruta       | Descripción                                      |
|--------|-----------|---------------------------------------------------|
| GET    | `/`       | Healthcheck + info del modelo cargado              |
| GET    | `/health` | Healthcheck simple                                  |
| POST   | `/predict`| Recibe `file` (imagen) → regresa predicción + info |

### Ejemplo de respuesta de `/predict`

```json
{
  "prediccion": {
    "clase": "melanocytic_nevi",
    "nombre_display": "Nevo melanocítico (lunar común)",
    "categoria": "Benigno",
    "nivel_riesgo": "bajo",
    "color": "#27ae60",
    "confianza": 87.32
  },
  "top5": [ { "clase": "...", "nombre_display": "...", "probabilidad": 87.32 }, ... ],
  "info_educativa": {
    "descripcion": "...",
    "que_observar": ["...", "..."],
    "recomendacion": "..."
  },
  "aviso_legal": "Este resultado es generado por un modelo académico..."
}
```

## Notas

- No hay base de datos: cada request se procesa de forma independiente, no
  se guarda ninguna imagen ni resultado.
- CORS está abierto (`allow_origins=["*"]`) para que `index.html` pueda
  llamar a la API desde cualquier origen (incluso abierto como archivo
  local). Si despliegas el HTML en un dominio fijo, puedes restringirlo.
- El preprocesamiento en `app.py` replica exactamente `val_aug` del
  notebook (Resize → Normalize con `mean`/`std` del checkpoint → Tensor),
  sin augmentación, igual que en evaluación/test.
