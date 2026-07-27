import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";
import { AuthProvider } from "../contexts/AuthContext";

export default function RootLayout() {
  useEffect(() => {
    async function setupNavigationBar() {
      await NavigationBar.NavigationBar.setHidden(true);
    }

    setupNavigationBar();
  }, []);

  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: {
            backgroundColor: "#0E1018",
          },
        }}
      />
    </AuthProvider>
  );
}