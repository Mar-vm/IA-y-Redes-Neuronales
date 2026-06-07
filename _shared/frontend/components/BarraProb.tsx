/**
 * BarraProb — Barra de probabilidad para el top-k
 */
import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from "../constants/theme";
import { ClaseInfo } from "../constants/types";

interface Props {
  item:    ClaseInfo;
  index:   number;
  isPrincipal?: boolean;
}

export default function BarraProb({ item, index, isPrincipal = false }: Props) {
  const barColor = item.color || (isPrincipal ? COLORS.accent : COLORS.primaryDark);
  const pct      = Math.min(100, Math.max(0, item.probabilidad));

  return (
    <View style={[s.row, isPrincipal && s.rowPrincipal]}>
      <View style={s.labelWrap}>
        <Text style={s.nombre} numberOfLines={1}>
          {item.nombre}
        </Text>
        <Text style={s.tipo}>{item.tipo}</Text>
      </View>
      <View style={s.barWrap}>
        <View style={[s.barTrack]}>
          <View style={[s.barFill, { width: `${pct}%` as any, backgroundColor: barColor }]} />
        </View>
        <Text style={[s.pct, { color: barColor }]}>
          {pct.toFixed(1)}%
        </Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  row: {
    flexDirection:  "row",
    alignItems:     "center",
    gap:            SPACING.sm,
    paddingVertical: SPACING.xs,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  rowPrincipal: {
    backgroundColor: COLORS.surface,
    borderRadius:    RADIUS.md,
    paddingHorizontal: SPACING.sm,
    borderBottomWidth: 0,
    marginBottom:    SPACING.xs,
  },
  labelWrap: { flex: 1 },
  nombre: {
    fontSize:   TYPOGRAPHY.fontSizeSM,
    fontWeight: TYPOGRAPHY.weightMedium,
    color:      COLORS.textPrimary,
  },
  tipo: {
    fontSize: TYPOGRAPHY.fontSizeXS,
    color:    COLORS.textTertiary,
    marginTop: 1,
  },
  barWrap: {
    flex:          1,
    flexDirection: "row",
    alignItems:    "center",
    gap:           SPACING.sm,
  },
  barTrack: {
    flex:            1,
    height:          8,
    backgroundColor: COLORS.border,
    borderRadius:    RADIUS.full,
    overflow:        "hidden",
  },
  barFill: {
    height:       8,
    borderRadius: RADIUS.full,
  },
  pct: {
    fontSize:   TYPOGRAPHY.fontSizeSM,
    fontWeight: TYPOGRAPHY.weightMedium,
    minWidth:   42,
    textAlign:  "right",
  },
});
