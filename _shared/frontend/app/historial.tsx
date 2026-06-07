/**
 * historial.tsx — Pantalla de historial de predicciones en sesión
 * Sin base de datos — solo en memoria mientras la app está abierta
 */
import React, { useState } from "react";
import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity, Image, Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from "../constants/theme";
import { historialGlobal } from "./index";
import { HistorialItem } from "../constants/types";
import UrgenciaBadge from "../components/UrgenciaBadge";

export default function HistorialScreen() {
  const router = useRouter();
  const [items, setItems] = useState<HistorialItem[]>(historialGlobal);

  function limpiarHistorial() {
    Alert.alert(
      "Limpiar historial",
      "Se eliminarán todas las predicciones de esta sesión.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpiar",
          style: "destructive",
          onPress: () => {
            historialGlobal.splice(0, historialGlobal.length);
            setItems([]);
          },
        },
      ]
    );
  }

  function formatearFecha(date: Date): string {
    return date.toLocaleTimeString("es-MX", {
      hour: "2-digit", minute: "2-digit",
    });
  }

  function renderItem({ item, index }: { item: HistorialItem; index: number }) {
    const p = item.result.principal;
    return (
      <TouchableOpacity
        style={s.item}
        onPress={() =>
          router.push({ pathname: "/resultado", params: { itemId: item.id } })
        }
        activeOpacity={0.7}
      >
        <Image source={{ uri: item.imageUri }} style={s.thumbnail} resizeMode="cover" />
        <View style={s.itemBody}>
          <UrgenciaBadge urgencia={p.urgencia} />
          <Text style={s.itemNombre} numberOfLines={1}>{p.nombre}</Text>
          <Text style={s.itemProb}>{p.probabilidad.toFixed(1)}% · {p.confianza}</Text>
          <Text style={s.itemFecha}>{formatearFecha(item.timestamp)}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={COLORS.textTertiary} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={s.container}>
      {/* ── Header ── */}
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={COLORS.accent} />
          <Text style={s.backText}>Volver</Text>
        </TouchableOpacity>
        <Text style={s.title}>Historial</Text>
        {items.length > 0 && (
          <TouchableOpacity onPress={limpiarHistorial}>
            <Ionicons name="trash-outline" size={20} color={COLORS.danger} />
          </TouchableOpacity>
        )}
      </View>

      {/* ── Nota de sesión ── */}
      <View style={s.nota}>
        <Ionicons name="information-circle-outline" size={14} color={COLORS.textTertiary} />
        <Text style={s.notaText}>
          El historial se borra al cerrar la app (sin base de datos).
        </Text>
      </View>

      {/* ── Lista o vacío ── */}
      {items.length === 0 ? (
        <View style={s.empty}>
          <Ionicons name="images-outline" size={48} color={COLORS.textTertiary} />
          <Text style={s.emptyTitle}>Sin predicciones aún</Text>
          <Text style={s.emptyText}>
            Analiza una imagen desde la pantalla principal para verla aquí.
          </Text>
          <TouchableOpacity style={s.btnNueva} onPress={() => router.back()}>
            <Ionicons name="add" size={18} color={COLORS.textOnPrimary} />
            <Text style={s.btnNuevaText}>Analizar imagen</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={s.list}
          ItemSeparatorComponent={() => <View style={s.separator} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection:  "row",
    alignItems:     "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingTop:     SPACING.lg,
    paddingBottom:  SPACING.md,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  backBtn:  { flexDirection:"row", alignItems:"center", gap: SPACING.xs },
  backText: { fontSize: TYPOGRAPHY.fontSizeMD, color: COLORS.accent },
  title: {
    fontSize:   TYPOGRAPHY.fontSizeLG,
    fontWeight: TYPOGRAPHY.weightMedium,
    color:      COLORS.textPrimary,
  },
  nota: {
    flexDirection: "row",
    alignItems:    "center",
    gap:           SPACING.xs,
    margin:        SPACING.md,
    padding:       SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius:    RADIUS.md,
  },
  notaText: {
    flex:     1,
    fontSize: TYPOGRAPHY.fontSizeXS,
    color:    COLORS.textTertiary,
    lineHeight: 16,
  },
  list: { paddingHorizontal: SPACING.md, paddingBottom: SPACING.xxl },
  item: {
    flexDirection:   "row",
    alignItems:      "center",
    gap:             SPACING.md,
    backgroundColor: COLORS.card,
    borderRadius:    RADIUS.lg,
    padding:         SPACING.sm,
    borderWidth:     0.5,
    borderColor:     COLORS.border,
  },
  thumbnail: {
    width:        64,
    height:       64,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
  },
  itemBody:   { flex: 1 },
  itemNombre: {
    fontSize:   TYPOGRAPHY.fontSizeMD,
    fontWeight: TYPOGRAPHY.weightMedium,
    color:      COLORS.textPrimary,
    marginTop:  SPACING.xs,
  },
  itemProb: {
    fontSize: TYPOGRAPHY.fontSizeSM,
    color:    COLORS.accent,
    marginTop: 1,
  },
  itemFecha: {
    fontSize: TYPOGRAPHY.fontSizeXS,
    color:    COLORS.textTertiary,
    marginTop: 2,
  },
  separator: { height: SPACING.sm },
  empty: {
    flex:           1,
    alignItems:     "center",
    justifyContent: "center",
    gap:            SPACING.md,
    padding:        SPACING.xl,
  },
  emptyTitle: {
    fontSize:   TYPOGRAPHY.fontSizeLG,
    fontWeight: TYPOGRAPHY.weightMedium,
    color:      COLORS.textPrimary,
  },
  emptyText: {
    fontSize:  TYPOGRAPHY.fontSizeSM,
    color:     COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
  btnNueva: {
    flexDirection:   "row",
    alignItems:      "center",
    gap:             SPACING.xs,
    backgroundColor: COLORS.primaryDark,
    borderRadius:    RADIUS.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginTop:       SPACING.sm,
  },
  btnNuevaText: {
    fontSize:   TYPOGRAPHY.fontSizeMD,
    fontWeight: TYPOGRAPHY.weightMedium,
    color:      COLORS.textOnPrimary,
  },
});
