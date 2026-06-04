# Tema 1 — Fundamentos de procesamiento digital de imágenes y visión

**Curso:** PFAD-PADCC-VIC04 — TecNM Virtual  
**Duración:** 9 horas | **Días:** Lunes–Martes

---

##  Contenido de esta carpeta

```
T1_recursos/
├── T1_A1_Adquisicion_Mejora_Imagen.ipynb   ← Notebook principal (entregar aquí)
├── imagen_prueba.jpg                        ← Imagen de ejemplo para arrancar
└── README.md                                ← Este archivo
```

---

## ¿Cómo empezar?

### Opción A — Google Colab (recomendado)
1. Ve a [colab.research.google.com](https://colab.research.google.com)
2. `Archivo → Abrir notebook → GitHub` → pega la URL de este repositorio
3. Abre `T1_A1_Adquisicion_Mejora_Imagen.ipynb`
4. Sube `imagen_prueba.jpg` con el panel de archivos (ícono de carpeta, izquierda)
5. Ejecuta celda por celda con `Shift + Enter`

### Opción B — Entorno local
```bash
pip install numpy matplotlib opencv-python
jupyter notebook T1_A1_Adquisicion_Mejora_Imagen.ipynb
```
Coloca `imagen_prueba.jpg` en la misma carpeta que el notebook.

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
| **Paso 6** | Extensión (variante A, B o C) | 2% | 2 horas |
| **Cuestionario** | Evaluación formativa en plataforma | 10% | 1 hora |
| | **TOTAL TEMA 1** | **25%** | **9 horas** |

---

## Entrega

- **Formato:** PDF (máx. 2 MB)
- **Nombre del archivo:** `T1_A1_ApellidoNombre.pdf`
- **Plataforma:** Aula Virtual TecNM → Tarea Tema 1
- **Complemento:** enlace al notebook de Colab (si el facilitador lo solicita)

Para exportar como PDF desde Colab: `Archivo → Imprimir → Guardar como PDF`

---

## Sobre la imagen de prueba

El archivo `imagen_prueba.jpg` es una imagen sintética (640×480 px, RGB) que contiene:
- Fondo con gradiente de iluminación (simula iluminación no uniforme)
- Formas geométricas en diferentes colores (rectángulos, círculos)
- Líneas diagonales (bordes nítidos, ideales para el operador Sobel)
- Ruido leve (para comparar filtros de suavizado)

Puedes reemplazarla por cualquier imagen propia — solo actualiza la variable `NOMBRE_IMAGEN` en el Paso 3 del notebook.

---

## Recursos de apoyo
- Presentación Tema 1 — Aula Virtual TecNM
- Manual del Participante Tema 1
- [Documentación OpenCV](https://docs.opencv.org/)
- [NumPy Documentation](https://numpy.org/doc/)
