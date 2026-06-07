/**
 * usePrediction.ts — Hook para llamar a la API y manejar estado
 */
import { useState, useCallback } from "react";
import { API_URL } from "../constants/theme";
import { PredictionResult } from "../constants/types";

interface UsePredictionReturn {
  loading:   boolean;
  error:     string | null;
  predict:   (imageUri: string) => Promise<PredictionResult | null>;
  clearError:() => void;
}

export function usePrediction(): UsePredictionReturn {
  const [loading, setLoading]   = useState(false);
  const [error,   setError]     = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const predict = useCallback(async (imageUri: string): Promise<PredictionResult | null> => {
    setLoading(true);
    setError(null);

    try {
      // Construir FormData con la imagen
      const formData = new FormData();
      const filename = imageUri.split("/").pop() ?? "imagen.jpg";
      const ext      = filename.split(".").pop()?.toLowerCase() ?? "jpg";
      const mimeMap: Record<string, string> = {
        jpg: "image/jpeg", jpeg: "image/jpeg",
        png: "image/png",  webp: "image/webp",
      };
      formData.append("file", {
        uri:  imageUri,
        name: filename,
        type: mimeMap[ext] ?? "image/jpeg",
      } as unknown as Blob);

      const response = await fetch(`${API_URL}/predict`, {
        method:  "POST",
        body:    formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.detail ?? `Error ${response.status}`);
      }

      const data: PredictionResult = await response.json();
      return data;

    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error desconocido";
      // Detectar cold start de Render
      if (msg.includes("Network") || msg.includes("fetch")) {
        setError(
          "No se pudo conectar con el servidor.\n" +
          "Si es la primera petición, espera 30 segundos y vuelve a intentar."
        );
      } else {
        setError(msg);
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, predict, clearError };
}
