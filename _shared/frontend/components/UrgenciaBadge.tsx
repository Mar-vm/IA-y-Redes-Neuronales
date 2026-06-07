/**
 * UrgenciaBadge — Chip de urgencia con color semántico
 */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from "../constants/theme";

interface Props { urgencia: string }

const URGENCIA_ESTILOS: Record<string, { bg: string; text: string }> = {
  URGENTE:   { bg: COLORS.dangerSurface,  text: COLORS.danger   },
  CONSULTAR: { bg: COLORS.warningSurface, text: COLORS.warning  },
  PRECAUCION:{ bg: COLORS.warningSurface, text: COLORS.warning  },
  PELIGRO:   { bg: COLORS.dangerSurface,  text: COLORS.danger   },
  VIGILAR:   { bg: COLORS.warningSurface, text: COLORS.warning  },
  BENIGNO:   { bg: COLORS.successSurface, text: COLORS.success  },
  NORMAL:    { bg: COLORS.successSurface, text: COLORS.success  },
  OK:        { bg: COLORS.successSurface, text: COLORS.success  },
  RECICLAR:  { bg: COLORS.successSurface, text: COLORS.success  },
  RECHAZAR:  { bg: COLORS.dangerSurface,  text: COLORS.danger   },
  REPARAR:   { bg: COLORS.dangerSurface,  text: COLORS.danger   },
  RESIDUO:   { bg: "#F1EFE8",             text: "#444441"       },
};

export default function UrgenciaBadge({ urgencia }: Props) {
  if (!urgencia) return null;
  const estilo = URGENCIA_ESTILOS[urgencia.toUpperCase()] ?? {
    bg: COLORS.surface, text: COLORS.primaryDark,
  };
  return (
    <View style={[s.badge, { backgroundColor: estilo.bg }]}>
      <Text style={[s.label, { color: estilo.text }]}>{urgencia}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  badge: {
    alignSelf:     "flex-start",
    paddingHorizontal: SPACING.sm,
    paddingVertical:   3,
    borderRadius:  RADIUS.full,
    marginBottom:  SPACING.xs,
  },
  label: {
    fontSize:   TYPOGRAPHY.fontSizeXS,
    fontWeight: TYPOGRAPHY.weightMedium,
    letterSpacing: 0.5,
  },
});
