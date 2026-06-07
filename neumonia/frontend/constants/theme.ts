/**
 * theme.ts — PneumoScan
 * Edita API_URL con la URL de tu servicio en Render.
 */

export const PROYECTO = {
  nombre:    "PneumoScan",
  subtitulo: "Detección de neumonía en radiografías",
};

export const API_URL = "https://tu-proyecto.onrender.com";

export const COLORS = {
  primary:         "#2C2C2A",
  primaryDark:     "#444441",
  accent:          "#185FA5",
  surface:         "#F1EFE8",
  danger:          "#A32D2D",
  dangerSurface:   "#FCEBEB",
  success:         "#27500A",
  successSurface:  "#EAF3DE",
  warning:         "#BA7517",
  warningSurface:  "#FAEEDA",
  background:      "#F5F4F0",
  card:            "#FFFFFF",
  border:          "rgba(0,0,0,0.08)",
  borderStrong:    "rgba(0,0,0,0.16)",
  textPrimary:     "#0D1117",
  textSecondary:   "#5A6472",
  textTertiary:    "#8D95A0",
  textOnPrimary:   "#F1EFE8",
} as const;

export const TYPOGRAPHY = {
  fontSizeXS: 11, fontSizeSM: 13, fontSizeMD: 15,
  fontSizeLG: 18, fontSizeXL: 22, fontSizeXXL: 28,
  weightRegular: "400" as const,
  weightMedium:  "500" as const,
} as const;

export const SPACING  = { xs:4, sm:8, md:16, lg:24, xl:32, xxl:48 } as const;
export const RADIUS   = { sm:6, md:10, lg:16, xl:24, full:9999 } as const;
