/**
 * resultado.tsx — Pantalla de resultado de la predicción
 */
import React from "react";
import {
  View, Text, StyleSheet, Image,
  ScrollView, TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from "../constants/theme";
import { historialGlobal } from "./index";
import UrgenciaBadge from "../components/UrgenciaBadge";
import BarraProb     from "../components/BarraProb";

export default function ResultadoScreen() {
  const router  = useRouter();
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const item    = historialGlobal.find((h) => h.id === itemId);

  if (!item) {
    return (
      <View style={s.center}>
        <Ionicons name="alert-circle-outline" size={40} color={COLORS.textTertiary} />
        <Text style={s.centerText}>Resultado no encontrado</Text>
        <TouchableOpacity style={s.btnBack} onPress={() => router.back()}>
          <Text style={s.btnBackText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { result, imageUri } = item;
  const p = result.principal;

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.container}>

      {/* ── Header ── */}
      <TouchableOpacity style={s.backRow} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color={COLORS.accent} />
        <Text style={s.backText}>Nueva imagen</Text>
      </TouchableOpacity>

      {/* ── Imagen analizada ── */}
      <Image source={{ uri: imageUri }} style={s.image} resizeMode="cover" />

      {/* ── Tarjeta principal ── */}
      <View style={s.card}>
        <UrgenciaBadge urgencia={p.urgencia} />
        <Text style={s.nombre}>{p.nombre}</Text>
        {p.tipo ? <Text style={s.tipo}>{p.tipo}</Text> : null}
        <View style={s.probRow}>
          <Ionicons name="analytics-outline" size={16} color={COLORS.accent} />
          <Text style={s.probText}>
            {p.probabilidad.toFixed(1)}% — Confianza {p.confianza}
          </Text>
        </View>
        {p.descripcion ? (
          <Text style={s.descripcion}>{p.descripcion}</Text>
        ) : null}
      </View>

      {/* ── Top-k ── */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>Diagnósticos alternativos</Text>
        {result.top_k.map((item, i) => (
          <BarraProb
            key={item.clase}
            item={item}
            index={i}
            isPrincipal={i === 0}
          />
        ))}
      </View>

      {/* ── Metadata ── */}
      <View style={s.meta}>
        <View style={s.metaRow}>
          <Ionicons name="server-outline" size={13} color={COLORS.textTertiary} />
          <Text style={s.metaText}>Modelo: {result.modelo}</Text>
        </View>
        <View style={s.metaRow}>
          <Ionicons name="timer-outline" size={13} color={COLORS.textTertiary} />
          <Text style={s.metaText}>Tiempo: {result.tiempo_ms} ms</Text>
        </View>
        <View style={s.metaRow}>
          <Ionicons name="layers-outline" size={13} color={COLORS.textTertiary} />
          <Text style={s.metaText}>{result.n_clases} clases</Text>
        </View>
      </View>

      {/* ── Disclaimer ── */}
      <View style={s.disclaimer}>
        <Ionicons name="information-circle-outline" size={14} color={COLORS.textTertiary} />
        <Text style={s.disclaimerText}>
          Este resultado es generado por un modelo de aprendizaje automático con fines
          académicos y no sustituye el diagnóstico de un profesional.
        </Text>
      </View>

      {/* ── Botón historial ── */}
      <TouchableOpacity
        style={s.btnHistorial}
        onPress={() => router.push("/historial")}
      >
        <Ionicons name="time-outline" size={18} color={COLORS.primaryDark} />
        <Text style={s.btnHistorialText}>Ver historial</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll:    { flex:1, backgroundColor: COLORS.background },
  container: { padding: SPACING.md, paddingBottom: SPACING.xxl },
  center:    { flex:1, alignItems:"center", justifyContent:"center", gap: SPACING.md },
  centerText:{ fontSize: TYPOGRAPHY.fontSizeMD, color: COLORS.textSecondary },
  backRow: {
    flexDirection: "row", alignItems: "center",
    gap: SPACING.xs, marginBottom: SPACING.md,
  },
  backText: { fontSize: TYPOGRAPHY.fontSizeMD, color: COLORS.accent },
  image: {
    width:"100%", height: 220,
    borderRadius: RADIUS.lg, marginBottom: SPACING.md,
    borderWidth: 0.5, borderColor: COLORS.border,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius:    RADIUS.lg,
    borderWidth:     0.5,
    borderColor:     COLORS.borderStrong,
    padding:         SPACING.md,
    marginBottom:    SPACING.md,
  },
  nombre: {
    fontSize:   TYPOGRAPHY.fontSizeXL,
    fontWeight: TYPOGRAPHY.weightMedium,
    color:      COLORS.textPrimary,
    marginTop:  SPACING.xs,
  },
  tipo: {
    fontSize: TYPOGRAPHY.fontSizeSM,
    color:    COLORS.textSecondary,
    marginTop: 2, marginBottom: SPACING.sm,
  },
  probRow: {
    flexDirection: "row", alignItems: "center",
    gap: SPACING.xs, marginBottom: SPACING.sm,
  },
  probText: {
    fontSize:   TYPOGRAPHY.fontSizeSM,
    fontWeight: TYPOGRAPHY.weightMedium,
    color:      COLORS.accent,
  },
  descripcion: {
    fontSize:   TYPOGRAPHY.fontSizeSM,
    color:      COLORS.textSecondary,
    lineHeight: 20,
    marginTop:  SPACING.xs,
  },
  section:      { marginBottom: SPACING.md },
  sectionTitle: {
    fontSize:   TYPOGRAPHY.fontSizeMD,
    fontWeight: TYPOGRAPHY.weightMedium,
    color:      COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  meta: {
    flexDirection: "row", flexWrap: "wrap", gap: SPACING.md,
    marginBottom:  SPACING.sm,
  },
  metaRow: { flexDirection:"row", alignItems:"center", gap: SPACING.xs },
  metaText: { fontSize: TYPOGRAPHY.fontSizeXS, color: COLORS.textTertiary },
  disclaimer: {
    flexDirection: "row", alignItems:"flex-start",
    gap: SPACING.xs, marginBottom: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md, padding: SPACING.sm,
  },
  disclaimerText: {
    flex:1, fontSize: TYPOGRAPHY.fontSizeXS,
    color: COLORS.textSecondary, lineHeight:16,
  },
  btnHistorial: {
    flexDirection:"row", alignItems:"center", justifyContent:"center",
    gap: SPACING.xs, paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md, borderWidth:0.5,
    borderColor: COLORS.borderStrong, backgroundColor: COLORS.card,
  },
  btnHistorialText: {
    fontSize: TYPOGRAPHY.fontSizeMD,
    fontWeight: TYPOGRAPHY.weightMedium,
    color: COLORS.primaryDark,
  },
  btnBack: {
    marginTop: SPACING.md, paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md, borderWidth:0.5,
    borderColor: COLORS.border,
  },
  btnBackText: { fontSize: TYPOGRAPHY.fontSizeMD, color: COLORS.accent },
});
