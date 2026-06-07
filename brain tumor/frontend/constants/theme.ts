/**
 * theme.ts — NeuroScan
 * Edita API_URL con la URL de tu servicio en Render.
 */

export const PROYECTO = {
  nombre:    "NeuroScan",
  subtitulo: "Clasificación de tumores cerebrales",
};

export const API_URL = "https://tu-proyecto.onrender.com";

export const COLORS = {
  primary:         "#26215C",
  primaryDark:     "#3C3489",
  accent:          "#7F77DD",
  surface:         "#EEEDFE",
  danger:          "#D85A30",
  dangerSurface:   "#FAECE7",
  success:         "#0F6E56",
  successSurface:  "#E1F5EE",
  warning:         "#F0997B",
  warningSurface:  "#FAECE7",
  background:      "#F7F6FE",
  card:            "#FFFFFF",
  border:          "rgba(0,0,0,0.08)",
  borderStrong:    "rgba(0,0,0,0.16)",
  textPrimary:     "#0D1117",
  textSecondary:   "#5A6472",
  textTertiary:    "#8D95A0",
  textOnPrimary:   "#EEEDFE",
} as const;

export const TYPOGRAPHY = {
  fontSizeXS: 11, fontSizeSM: 13, fontSizeMD: 15,
  fontSizeLG: 18, fontSizeXL: 22, fontSizeXXL: 28,
  weightRegular: "400" as const,
  weightMedium:  "500" as const,
} as const;

export const SPACING  = { xs:4, sm:8, md:16, lg:24, xl:32, xxl:48 } as const;
export const RADIUS   = { sm:6, md:10, lg:16, xl:24, full:9999 } as const;
