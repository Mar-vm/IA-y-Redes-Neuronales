# AgroScan — Deteccion de enfermedades en cultivos

**Dataset ID:** #3 | **Modelo:** `efficientnet_b4` | **Accuracy esperado:** ~95-98%

---

## Estructura de esta carpeta

```
enfermedades_plantas/
├── entrenamiento_colab.ipynb   ← ejecutar en Google Colab (recomendado)
├── entrenamiento_local.ipynb   ← ejecutar en tu PC con GPU
├── config.json                 ← descripcion de clases + paleta de colores
└── frontend/
    └── constants/
        └── theme.ts            ← colores y nombre de la app
```

---

## Pasos para completar el proyecto

### 1. Entrenar el modelo

**Opcion A — Google Colab (recomendado):**
1. Abre `entrenamiento_colab.ipynb` en [colab.research.google.com](https://colab.research.google.com)
2. Activa GPU: *Entorno de ejecucion → Cambiar tipo de entorno de ejecucion → T4 GPU*
3. Ejecuta todas las celdas en orden
4. Cuando la celda 2 lo pida, sube el ZIP del dataset
5. Al terminar, la celda 12 guarda todo en tu Drive automaticamente

**Opcion B — PC local:**
1. Abre `entrenamiento_local.ipynb` en Jupyter
2. En CELDA 0, cambia `ZIP_LOCAL_PATH` a la ruta de tu ZIP
3. Cambia `BASE_PATH_LOCAL` a donde quieres guardar los resultados
4. Ejecuta todas las celdas

### 2. Desplegar el backend

1. Copia desde `_shared/backend/`:
   - `main.py`
   - `inference.py`
   - `requirements.txt`
   - `Dockerfile`
2. Agrega tu `modelo_produccion.pth` y este `config.json`
3. Sube todo a un repositorio de GitHub
4. Crea un Web Service en [render.com](https://render.com) con esa repo
5. Consulta `_shared/backend/README_deploy.md` para el paso a paso completo

### 3. Configurar la app Expo

1. Copia la estructura de `_shared/frontend/` a tu maquina
2. Reemplaza `constants/theme.ts` con el de esta carpeta (`frontend/constants/theme.ts`)
3. Cambia `API_URL` en `theme.ts` a la URL de tu servicio en Render:
   ```typescript
   export const API_URL = "https://tu-proyecto.onrender.com";
   ```
4. Instala dependencias:
   ```bash
   cd frontend
   npm install
   ```
5. Ejecuta la app:
   ```bash
   npx expo start
   # Escanea el QR con Expo Go en tu celular
   # O presiona W para abrir en el navegador
   ```

---

## Archivos que genera el notebook al terminar

| Archivo | Descripcion |
|---|---|
| `modelo_produccion.pth` | Modelo listo para FastAPI |
| `modelo.onnx` | Inferencia optimizada |
| `idx2clase.json` | Mapeo indice → clase |
| `curvas.png` | Loss, accuracy y F1 por epoca |
| `confusion_norm.png` | Matriz de confusion normalizada |
| `metricas_clase.png` | Precision/Recall/F1 por clase |
| `predicciones_grid.png` | 16 predicciones del test set |
| `historial.csv` | Metricas por epoca |
| `reporte.csv` | Metricas por clase |

---

## Entrega

Genera un PDF del notebook ejecutado:
*Archivo → Imprimir → Guardar como PDF* (en Colab)

Nombra el archivo: `ActividadFinal_ApellidoNombre.pdf`
