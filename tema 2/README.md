# T2.A2.1 – Filtros Espaciales y en el Dominio de la Frecuencia

> **Curso:** Visión por Computadora · **Tema 2** · Actividad T2.A2.1

---

## Contenido del repositorio

```
T2_A2_1_Filtros/
├── T2.A2.1_Filtros_Espaciales_Frecuencia.ipynb   ← notebook principal
├── imagen_tema2.jpg                               ← tu imagen de trabajo (agregar)
└── README.md
```

---

## ¿Por qué `.ipynb` y no `.py`?

| Criterio | `.ipynb` ✅ | `.py` |
|---|---|---|
| Visualizaciones inline | Sí | Requiere ventanas externas |
| Celdas de reflexión / Markdown | Sí, integradas | No |
| Ejecución paso a paso | Sí | No |
| Portafolio / reporte en un solo archivo | Sí | No |
| Compatibilidad con Google Colab | Nativa | Requiere conversión |

El notebook es el formato ideal para actividades exploratorias que combinan código, gráficas y análisis escrito.

---

## Requisitos

### Python
- Python **3.9 o superior** (3.10 / 3.11 recomendado)

### Dependencias

```
numpy>=1.23
matplotlib>=3.6
opencv-python>=4.7
scipy>=1.10          # opcional, Variante A avanzada
```

Instálalas con:

```bash
pip install numpy matplotlib opencv-python scipy
```

---

## Opción A – Google Colab (recomendado, sin instalación local)

1. Abre [colab.research.google.com](https://colab.research.google.com)
2. Menú **Archivo → Subir notebook** y selecciona el `.ipynb`
3. En el panel izquierdo (ícono de carpeta) sube tu archivo `imagen_tema2.jpg`
4. Ejecuta las celdas en orden con **Shift + Enter**

> Las dependencias (`numpy`, `matplotlib`, `opencv-python`) ya están preinstaladas en Colab.  
> Si falta alguna, descomenta la línea `!pip install ...` en la primera celda.

---

## Opción B – Entorno local (Jupyter)

```bash
# 1. Clona o descarga este repositorio
git clone <url-del-repo>
cd T2_A2_1_Filtros

# 2. (Opcional) crea un entorno virtual
python -m venv .venv
source .venv/bin/activate        # Linux/macOS
.venv\Scripts\activate           # Windows

# 3. Instala dependencias
pip install numpy matplotlib opencv-python scipy jupyter

# 4. Coloca tu imagen en esta carpeta con el nombre:
#    imagen_tema2.jpg

# 5. Lanza Jupyter
jupyter notebook T2.A2.1_Filtros_Espaciales_Frecuencia.ipynb
```

---

## Estructura del notebook

| Celda / Sección | Contenido |
|---|---|
| **Paso 1** | Importación de librerías y verificación de versiones |
| **Paso 2** | Carga de imagen, conversión a grises, dimensiones |
| **Paso 3** | Filtros espaciales: promedio, gaussiano, Sobel, Laplaciano |
| **Paso 4** | Análisis comparativo con histogramas |
| **Paso 5** | TDF 2D y espectro de magnitud |
| **Paso 6** | Filtros pasa-bajas y pasa-altas en frecuencia |
| **Paso 7** | Comparativa visual completa |
| **Extensión** | Variante A (kernels propios) o Variante B (mediana + S&P) |
| **Paso 8** | Reflexión final |

---

## Personalización del notebook

Antes de ejecutar, edita estas líneas según corresponda:

```python
# Paso 2 – Celda de carga
IMAGE_PATH = 'imagen_tema2.jpg'   # cambia al nombre de tu archivo

# Paso 6 – Radio de la máscara frecuencial
radio = min(rows, cols) // 8      # reduce para filtrar más frecuencias bajas
```

---

## Entrega

El reporte final en PDF debe incluir:

- [ ] Portada con nombre, curso, tema y actividad
- [ ] Descripción de la imagen (origen, dimensiones, tipo de dato)
- [ ] Capturas de resultados de filtros espaciales + comentarios
- [ ] Capturas del espectro y filtros en frecuencia + comentarios
- [ ] Evidencia de la extensión elegida (Variante A o B)
- [ ] Reflexión final (mínimo ½ cuartilla)

---

## Notas

- La imagen debe estar en formato `.jpg`, `.png` o `.bmp` y ser legible por OpenCV.
- Si usas una imagen con canal alfa (`.png` con transparencia), conviértela antes.
- El notebook **no guarda imágenes automáticamente**; usa `plt.savefig('nombre.png')` si necesitas exportarlas para el reporte.
