# T3.A3.1 – Clasificación y Rastreo de Objetos con RNC

> **Curso:** Redes Neuronales Convolucionales Aplicadas a la Visión Computacional  
> **Tema 3:** Aplicaciones de RNC en Visión  
> **Actividad:** T3.A3.1 – Implementación de Clasificación y Rastreo de Objetos con RNC

---

## Contenido de esta carpeta

```
T3_recursos/
├── T3_A3_Clasificacion_Rastreo_RNC.ipynb   ← Notebook principal (entregar aquí)
└── README.md                                ← Este archivo
```

> 💡 No se incluye imagen de prueba fija: el notebook descarga CIFAR-10 automáticamente.  
> Si usas imágenes propias, organízalas en carpetas `train/clase_X/` y `val/clase_X/`.

---

## ¿Cómo empezar?

### Opción A — Google Colab (recomendado)
1. Ve a [colab.research.google.com](https://colab.research.google.com)
2. `Archivo → Abrir notebook → GitHub` → pega la URL de este repositorio
3. Abre `T3_A3_Clasificacion_Rastreo_RNC.ipynb`
4. **Activa GPU:** `Entorno de ejecución → Cambiar tipo de entorno de ejecución → GPU`
5. Ejecuta celda por celda con `Shift + Enter`

### Opción B — Entorno local
```bash
pip install numpy matplotlib opencv-python tensorflow scikit-learn imageio
jupyter notebook T3_A3_Clasificacion_Rastreo_RNC.ipynb
```

---

## Estructura de la actividad

| Paso | Actividad | Tiempo |
|---|---|---|
| Evaluación diagnóstica | Cuestionario previo en plataforma | 20 min |
| **Paso 1** | Selección del problema y contexto | 40 min |
| **Paso 2** | Preparación del entorno | 1 hora |
| **Paso 3** | Selección / construcción del dataset | 1 hora |
| **Paso 4** | Implementación del modelo de clasificación con RNC | 2 horas |
| **Paso 5** | Integración de un esquema básico de rastreo | 2 horas |
| **Paso 6** | Análisis de resultados y reflexión | 2 horas |
| **Paso 7** | Integración del reporte final | 1 hora |
| **Cuestionario** | Evaluación formativa en plataforma | 1 hora |
| | **TOTAL TEMA 3** | **11 horas** |

---

## Evaluación

| Instrumento | Peso |
|---|---|
| Actividad didáctica: Reporte final (Pasos 1–6) | 15 % |
| Evaluación formativa: Cuestionario en plataforma | 15 % |
| **TOTAL TEMA 3** | **30 %** |
| Evaluación sumativa (cierre del curso) | 20 % |

---

## Entrega

- **Formato:** PDF (máx. 2 MB)
- **Nombre del archivo:** `T3_A3_ApellidoNombre.pdf`
- **Plataforma:** Aula Virtual TecNM → Tarea Tema 3
- **Complemento:** enlace al notebook de Colab (si el facilitador lo solicita)

Para exportar como PDF desde Colab: `Archivo → Imprimir → Guardar como PDF`

---

## Archivos que genera el notebook

| Archivo | Descripción |
|---|---|
| `paso3_dataset.png` | Muestras del dataset por clase |
| `paso4_historial.png` | Gráfica de loss y accuracy por época |
| `paso4_confusion.png` | Matriz de confusión |
| `paso4_predicciones.png` | Predicciones individuales del modelo |
| `paso5_tracking.png` | Cuadros del rastreo con cajas, etiquetas e IDs |
| `paso5_tracking.gif` | Animación del tracking *(opcional)* |

---

## Conexión con los temas previos

```
Tema 1: Adquisición y representación  →  Tema 2: Filtros y convolución  →  Tema 3: RNC completas
(imagen como matriz, histograma)          (Sobel, Gaussiano, TDF)            (clasificar + rastrear)
```

Los filtros aprendidos en las primeras capas de una CNN son matemáticamente equivalentes a los operadores de Sobel y Gaussiano que aplicaste en los Temas 1 y 2 — con la diferencia de que la CNN **aprende esos filtros automáticamente** a partir de los datos.

---

## Recursos de apoyo
- Presentación Tema 3 — Aula Virtual TecNM
- Manual del Participante Tema 3
- [Documentación TensorFlow / Keras](https://www.tensorflow.org/api_docs)
- [Documentación OpenCV](https://docs.opencv.org/)
- [CIFAR-10 dataset](https://www.cs.toronto.edu/~kriz/cifar.html)
