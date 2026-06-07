/** Tipos compartidos en toda la app */

export interface ClaseInfo {
  clase:        string;
  nombre:       string;
  probabilidad: number;
  confianza:    "Alta" | "Media" | "Baja";
  descripcion:  string;
  urgencia:     string;
  tipo:         string;
  color:        string;
}

export interface PredictionResult {
  ok:         boolean;
  principal:  ClaseInfo;
  top_k:      ClaseInfo[];
  modelo:     string;
  n_clases:   number;
  tiempo_ms:  number;
}

export interface HistorialItem {
  id:         string;
  imageUri:   string;
  result:     PredictionResult;
  timestamp:  Date;
}
