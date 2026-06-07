/**
 * index.tsx — Pantalla principal (Home)
 * Seleccionar imagen desde galería o cámara → enviar a la API
 */
import React, { useState } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity,
  Image, ScrollView, Alert, Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { PROYECTO, COLORS, TYPOGRAPHY, SPACING, RADIUS } from "../constants/theme";
import { usePrediction } from "../hooks/usePrediction";
import { HistorialItem, PredictionResult } from "../constants/types";

// Historial en memoria (persiste mientras la app está abierta)
export let historialGlobal: HistorialItem[] = [];

export default function HomeScreen() {
  const router               = useRouter();
  const { loading, error, predict, clearError } = usePrediction();
  const [imageUri, setImageUri] = useState<string | null>(null);

  // ── Seleccionar imagen ────────────────────────────────────────
  async function seleccionarDeGaleria() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso requerido", "Se necesita acceso a la galería de fotos.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality:    0.9,
      allowsEditing: true,
      aspect:     [1, 1],
    });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  }

  async function tomarFoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso requerido", "Se necesita acceso a la cámara.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality:    0.9,
      allowsEditing: true,
      aspect:     [1, 1],
    });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  }

  // ── Analizar ─────────────────────────────────────────────────
  async function analizar() {
    if (!imageUri) return;
    clearError();
    const result: PredictionResult | null = await predict(imageUri);
    if (result) {
      const item: HistorialItem = {
        id:        Date.now().toString(),
        imageUri,
        result,
        timestamp: new Date(),
      };
      historialGlobal = [item, ...historialGlobal].slice(0, 20); // máx 20
      router.push({ pathname: "/resultado", params: { itemId: item.id } });
    }
  }

  return (
    <ScrollView
      style={s.scroll}
      contentContainerStyle={s.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* ── Header ── */}
      <View style={s.header}>
        <Text style={s.appName}>{PROYECTO.nombre}</Text>
        <Text style={s.appSub}>{PROYECTO.subtitulo}</Text>
      </View>

      {/* ── Zona de imagen ── */}
      <View style={s.imageZone}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={s.preview} resizeMode="cover" />
        ) : (
          <View style={s.placeholder}>
            <Ionicons name="image-outline" size={48} color={COLORS.textTertiary} />
            <Text style={s.placeholderText}>Selecciona o captura una imagen</Text>
          </View>
        )}
      </View>

      {/* ── Botones de selección ── */}
      <View style={s.row}>
        <TouchableOpacity style={s.btnSecondary} onPress={seleccionarDeGaleria}>
          <Ionicons name="images-outline" size={20} color={COLORS.primaryDark} />
          <Text style={s.btnSecondaryText}>Galería</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.btnSecondary} onPress={tomarFoto}>
          <Ionicons name="camera-outline" size={20} color={COLORS.primaryDark} />
          <Text style={s.btnSecondaryText}>Cámara</Text>
        </TouchableOpacity>
      </View>

      {/* ── Error ── */}
      {error && (
        <View style={s.errorBox}>
          <Ionicons name="alert-circle-outline" size={18} color={COLORS.danger} />
          <Text style={s.errorText}>{error}</Text>
        </View>
      )}

      {/* ── Botón analizar ── */}
      <TouchableOpacity
        style={[s.btnPrimary, (!imageUri || loading) && s.btnDisabled]}
        onPress={analizar}
        disabled={!imageUri || loading}
      >
        {loading ? (
          <>
            <Ionicons name="hourglass-outline" size={20} color={COLORS.textOnPrimary} />
            <Text style={s.btnPrimaryText}>Analizando...</Text>
          </>
        ) : (
          <>
            <Ionicons name="scan-outline" size={20} color={COLORS.textOnPrimary} />
            <Text style={s.btnPrimaryText}>Analizar imagen</Text>
          </>
        )}
      </TouchableOpacity>

      {/* ── Link al historial ── */}
      {historialGlobal.length > 0 && (
        <TouchableOpacity style={s.historialLink} onPress={() => router.push("/historial")}>
          <Ionicons name="time-outline" size={16} color={COLORS.accent} />
          <Text style={s.historialLinkText}>
            Ver historial ({historialGlobal.length})
          </Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.accent} />
        </TouchableOpacity>
      )}

      {/* ── Nota cold start ── */}
      <View style={s.nota}>
        <Ionicons name="information-circle-outline" size={14} color={COLORS.textTertiary} />
        <Text style={s.notaText}>
          Si es la primera consulta del día, el servidor puede tardar ~30 segundos en responder.
        </Text>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll:     { flex:1, backgroundColor: COLORS.background },
  container:  { padding: SPACING.md, paddingBottom: SPACING.xxl },
  header:     { marginBottom: SPACING.lg, marginTop: SPACING.md },
  appName: {
    fontSize:   TYPOGRAPHY.fontSizeXXL,
    fontWeight: TYPOGRAPHY.weightMedium,
    color:      COLORS.primaryDark,
  },
  appSub: {
    fontSize: TYPOGRAPHY.fontSizeMD,
    color:    COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  imageZone: {
    height:          260,
    borderRadius:    RADIUS.lg,
    overflow:        "hidden",
    borderWidth:     0.5,
    borderColor:     COLORS.borderStrong,
    marginBottom:    SPACING.md,
    backgroundColor: COLORS.card,
  },
  preview:   { width:"100%", height:"100%" },
  placeholder: {
    flex:           1,
    alignItems:     "center",
    justifyContent: "center",
    gap:            SPACING.sm,
  },
  placeholderText: {
    fontSize: TYPOGRAPHY.fontSizeSM,
    color:    COLORS.textTertiary,
  },
  row: {
    flexDirection: "row",
    gap:           SPACING.sm,
    marginBottom:  SPACING.md,
  },
  btnSecondary: {
    flex:            1,
    flexDirection:   "row",
    alignItems:      "center",
    justifyContent:  "center",
    gap:             SPACING.xs,
    paddingVertical: SPACING.sm + 2,
    borderRadius:    RADIUS.md,
    borderWidth:     0.5,
    borderColor:     COLORS.borderStrong,
    backgroundColor: COLORS.card,
  },
  btnSecondaryText: {
    fontSize:   TYPOGRAPHY.fontSizeMD,
    fontWeight: TYPOGRAPHY.weightMedium,
    color:      COLORS.primaryDark,
  },
  errorBox: {
    flexDirection:   "row",
    alignItems:      "flex-start",
    gap:             SPACING.xs,
    backgroundColor: COLORS.dangerSurface,
    borderRadius:    RADIUS.md,
    padding:         SPACING.sm,
    marginBottom:    SPACING.md,
  },
  errorText: {
    flex:     1,
    fontSize: TYPOGRAPHY.fontSizeSM,
    color:    COLORS.danger,
    lineHeight: 18,
  },
  btnPrimary: {
    flexDirection:   "row",
    alignItems:      "center",
    justifyContent:  "center",
    gap:             SPACING.sm,
    backgroundColor: COLORS.primaryDark,
    borderRadius:    RADIUS.md,
    paddingVertical: SPACING.md,
    marginBottom:    SPACING.md,
  },
  btnDisabled:    { opacity: 0.45 },
  btnPrimaryText: {
    fontSize:   TYPOGRAPHY.fontSizeMD,
    fontWeight: TYPOGRAPHY.weightMedium,
    color:      COLORS.textOnPrimary,
  },
  historialLink: {
    flexDirection:  "row",
    alignItems:     "center",
    justifyContent: "center",
    gap:            SPACING.xs,
    paddingVertical: SPACING.sm,
    marginBottom:   SPACING.sm,
  },
  historialLinkText: {
    fontSize: TYPOGRAPHY.fontSizeSM,
    color:    COLORS.accent,
    fontWeight: TYPOGRAPHY.weightMedium,
  },
  nota: {
    flexDirection: "row",
    alignItems:    "flex-start",
    gap:           SPACING.xs,
    marginTop:     SPACING.sm,
  },
  notaText: {
    flex:       1,
    fontSize:   TYPOGRAPHY.fontSizeXS,
    color:      COLORS.textTertiary,
    lineHeight: 16,
  },
});
