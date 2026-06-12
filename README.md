# 🌿 PlantVillage — App de diagnóstico local

## Archivos
```
tu-carpeta/
├── app.py                  ← servidor Flask
├── index.html              ← interfaz web
└── modelo_produccion.pth   ← tu modelo entrenado
```

## Instalación (una sola vez)
```bash
pip install flask torch torchvision timm pillow
```

## Uso
1. Pon `app.py`, `index.html` y `modelo_produccion.pth` en la misma carpeta.
2. Ejecuta:
   ```bash
   python app.py
   ```
3. Abre tu navegador en: **http://localhost:5000**

## En celular (misma red Wi-Fi)
1. En la terminal, anota la IP local de tu PC (p.ej. `192.168.1.5`).
2. En tu celular abre: `http://192.168.1.5:5000`

## Si el modelo tiene otro nombre
Edita la línea en `app.py`:
```python
MODEL_PATH = Path("modelo_produccion.pth")   # ← cambia aquí
```

## Modelos soportados
- `mobilenetv3_large_100` (PC_DEBIL=True)
- `efficientnet_b2` (PC_DEBIL=False)

El modelo se autodetecta desde el checkpoint — no necesitas cambiar nada más.
