# Tema 1 — Fundamentos de procesamiento digital de imágenes y visión

**Curso:** PFAD-PADCC-VIC04 — TecNM Virtual  
**Duración:** 9 horas | **Días:** Lunes–Martes

---

## Contenido de esta carpeta

```
T1_recursos/
├── T1_A1_Adquisicion_Mejora_Imagen.ipynb   ← Notebook original
├── T1_A1_v2.ipynb                          ← Notebook extendido (Variantes A–G)
├── gato.jpg                                ← Imagen de prueba: fotografía natural
├── imagen_prueba.jpg                       ← Imagen de prueba: escena sintética (recomendada para arrancar)
├── radiografia.jpg                         ← Imagen de prueba: imagen médica en escala de grises
└── README.md                               ← Este archivo
```

---

## ¿Cómo empezar?

### Opción A — Google Colab (recomendado)
1. Ve a [colab.research.google.com](https://colab.research.google.com)
2. `Archivo → Abrir notebook → GitHub` → pega la URL de este repositorio
3. Abre `T1_A1_v2.ipynb`
4. Sube la imagen que vayas a usar con el panel de archivos (ícono de carpeta, izquierda)
5. Actualiza la variable `NOMBRE_IMAGEN` en el Paso 3 con el nombre de tu archivo
6. Ejecuta celda por celda con `Shift + Enter`

### Opción B — Entorno local
```bash
pip install numpy matplotlib opencv-python
jupyter notebook T1_A1_v2.ipynb
```
Coloca la imagen que vayas a usar en la misma carpeta que el notebook.

---

## Imágenes de prueba disponibles

| Archivo | Tipo de escena | Ideal para |
|---|---|---|
| `imagen_prueba.jpg` | Sintética: gradiente + formas geométricas + líneas + ruido leve | Arrancar la actividad, comparar todas las técnicas |
| `gato.jpg` | Fotografía natural con textura y variación de color | Variante A (segunda imagen), canales RGB, Canny |
| `radiografia.jpg` | Imagen médica en escala de grises | Ecualización de histograma, Otsu, Variante D |

> Puedes reemplazar cualquier imagen por una propia. Solo actualiza `NOMBRE_IMAGEN` en el Paso 3 del notebook.

---

## Notebooks disponibles

| Archivo | Descripción | Variantes incluidas |
|---|---|---|
| `T1_A1_Adquisicion_Mejora_Imagen.ipynb` | Versión original del curso | B, C |
| `T1_A1_v2.ipynb` | Versión extendida con variantes adicionales | A, B, C, D, E, F, G |

Se recomienda usar **`T1_A1_v2.ipynb`** para mayor cobertura de técnicas y evidencias.

---

## Estructura de la actividad

| Paso | Actividad | Valor | Tiempo |
|---|---|:---:|---|
| Evaluación diagnóstica | Cuestionario previo en plataforma | — | 20 min |
| **Paso 1** | Preparación del entorno | 3% | 1 hora |
| **Paso 2** | Introducción y conceptos | 3% | 1 hora |
| **Paso 3** | Carga y visualización de imagen | 3% | 1:40 hora |
| **Paso 4** | Aplicación de mejoras básicas | 2% | 1 hora |
| **Paso 5** | Interpretación de resultados | 2% | 1 hora |
| **Paso 6** | Extensión (elegir al menos una variante) | 2% | 2 horas |
| **Cuestionario** | Evaluación formativa en plataforma | 10% | 1 hora |
| | **TOTAL TEMA 1** | **25%** | **9 horas** |

---

## Variantes del Paso 6

| Variante | Técnica | Concepto clave |
|---|---|---|
| **A** | Segunda imagen | Comparación entre escenas |
| **B** | Mediana vs Gaussiano | Preservación de bordes bajo ruido |
| **C** | Parámetros agresivos | Efectos negativos de mal ajuste |
| **D** | Umbralización (global, Otsu, adaptativa) | Segmentación binaria |
| **E** | Detector Canny | Bordes robustos multi-etapa |
| **F** | Espacio de color HSV | Separación tono–saturación–valor |
| **G** | Morfología (erosión, dilatación, apertura, cierre) | Forma de regiones |

> El mínimo requerido es **una variante**. Cada variante adicional suma evidencias al portafolio.

---

## Entrega

- **Formato:** PDF (máx. 2 MB)
- **Nombre del archivo:** `T1_A1_ApellidoNombre.pdf`
- **Plataforma:** Aula Virtual TecNM → Tarea Tema 1
- **Complemento:** enlace al notebook de Colab (si el facilitador lo solicita)

Para exportar como PDF desde Colab: `Archivo → Imprimir → Guardar como PDF`

---

## Recursos de apoyo
- Presentación Tema 1 — Aula Virtual TecNM
- Manual del Participante Tema 1
- [Documentación OpenCV](https://docs.opencv.org/)
- [NumPy Documentation](https://numpy.org/doc/)