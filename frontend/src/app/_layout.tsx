import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";

export default function Layout() {
  useEffect(() => {
    async function hideBar() {
      await NavigationBar.NavigationBar.setHidden(true);
    }

    hideBar();
  }, []);

  return (
    <>
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
    </>
  );
}