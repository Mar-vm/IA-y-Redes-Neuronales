# Deploy en Render — Guía paso a paso

## Qué necesitas antes de empezar
- Cuenta en [render.com](https://render.com) (gratuita)
- Cuenta en [github.com](https://github.com)
- El archivo `modelo_produccion.pth` generado por tu notebook

---

## Paso 1 — Preparar el repositorio

```
mi-proyecto/
├── main.py                  ← de _shared/backend/
├── inference.py             ← de _shared/backend/
├── requirements.txt         ← de _shared/backend/
├── Dockerfile               ← de _shared/backend/
├── modelo_produccion.pth    ← el que generaste con el notebook
└── config.json              ← de tu carpeta de proyecto (opcional)
```

Crea un repositorio en GitHub con esa estructura y sube todos los archivos.

> ⚠️ El archivo .pth puede pesar 20-100 MB. GitHub permite hasta 100 MB por archivo.
> Si pesa más, usa [Git LFS](https://git-lfs.com) o sube el modelo a Google Drive
> y descárgalo en el startup del servidor.

---

## Paso 2 — Crear el servicio en Render

1. Ve a [dashboard.render.com](https://dashboard.render.com)
2. Haz clic en **New → Web Service**
3. Conecta tu repositorio de GitHub
4. Configura:

| Campo | Valor |
|---|---|
| Name | `mi-proyecto-api` (cualquier nombre) |
| Runtime | **Docker** |
| Instance Type | **Free** |
| Branch | `main` |

5. En **Environment Variables** agrega:

| Variable | Valor |
|---|---|
| `MODEL_PATH` | `modelo_produccion.pth` |
| `CONFIG_PATH` | `config.json` *(si tienes uno)* |

6. Haz clic en **Create Web Service**

---

## Paso 3 — Esperar el primer deploy

El primer build tarda ~5-10 minutos (instala PyTorch).
Cuando aparezca **"Your service is live"**, tu API está lista.

La URL será algo como:
```
https://mi-proyecto-api.onrender.com
```

---

## Paso 4 — Verificar que funciona

Abre en el navegador:
```
https://mi-proyecto-api.onrender.com/health
```

Debes ver:
```json
{ "status": "ok", "model_loaded": true }
```

También puedes probar la predicción desde la terminal:
```bash
curl -X POST https://mi-proyecto-api.onrender.com/predict \
  -F "file=@tu_imagen.jpg"
```

---

## Paso 5 — Configurar la URL en la app Expo

En el archivo `constants/theme.ts` de tu proyecto Expo, cambia:
```typescript
export const API_URL = "https://mi-proyecto-api.onrender.com";
```

---

## Notas importantes sobre Render Free

- **Cold start:** el servidor se duerme después de 15 min de inactividad.
  La primera petición tarda ~30-60 segundos en despertar.
- **Sin GPU:** la inferencia corre en CPU (~1-3 segundos por imagen).
- **512 MB RAM:** suficiente para EfficientNetB2 y MobileNetV3.
  EfficientNetB4 puede no caber — usa B2 si tienes problemas.
- **750 horas/mes gratuitas:** más que suficiente para demostraciones.

---

## Endpoints disponibles

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Metadata del modelo y proyecto |
| GET | `/health` | Health check para Render |
| POST | `/predict` | Clasificar una imagen |
| GET | `/clases` | Listar todas las clases con info |
