/**
 * _layout.tsx — Configuración de navegación Expo Router
 */
import { Stack } from "expo-router";
import { COLORS, PROYECTO } from "../constants/theme";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle:        { backgroundColor: COLORS.primaryDark },
        headerTintColor:    COLORS.textOnPrimary,
        headerTitleStyle:   { fontWeight: "500", fontSize: 17 },
        contentStyle:       { backgroundColor: COLORS.background },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: PROYECTO.nombre }}
      />
      <Stack.Screen
        name="resultado"
        options={{ title: "Resultado" }}
      />
      <Stack.Screen
        name="historial"
        options={{ title: "Historial" }}
      />
    </Stack>
  );
}
