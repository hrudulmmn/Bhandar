import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

import { Colors } from "../constants/theme";
import { getCurrentUser } from "../services/auth";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    async function initializeApp() {
      // Keep splash visible for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      try {
        const token = await SecureStore.getItemAsync("access_token");

        // User not logged in
        if (!token) {
          router.replace("/login");
          return;
        }

        // Verify token with backend
        await getCurrentUser();

        // Token is valid
        router.replace("/home");
      } catch (error) {
        // Token invalid or expired
        await SecureStore.deleteItemAsync("access_token");
        router.replace("/login");
      }
    }

    initializeApp();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>B</Text>
      </View>

      <Text style={styles.title}>BHANDAR</Text>

      <Text style={styles.subtitle}>
        YOUR UNIFIED UPI PASSBOOK
      </Text>

      <View style={styles.chips}>
        <View style={styles.chip}>
          <Text style={styles.chipText}>GPay</Text>
        </View>

        <View style={styles.chip}>
          <Text style={styles.chipText}>PhonePe</Text>
        </View>

        <View style={styles.chip}>
          <Text style={styles.chipText}>Paytm</Text>
        </View>

        <View style={styles.chip}>
          <Text style={styles.chipText}>BHIM</Text>
        </View>
      </View>

      <Text style={styles.loading}>
        Checking your account...
      </Text>

      <Text style={styles.footer}>
        All your UPI history. One place.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    padding: 25,
  },

  logo: {
    height: 90,
    width: 90,
    alignSelf: "center",
    borderRadius: 24,
    backgroundColor: Colors.light.accent,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  logoText: {
    fontSize: 46,
    fontWeight: "700",
    color: "white",
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "white",
    alignSelf: "center",
  },

  subtitle: {
    color: "#999",
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 40,
  },

  chips: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 40,
  },

  chip: {
    borderWidth: 1,
    borderColor: "#555",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    margin: 5,
  },

  chipText: {
    color: "#ccc",
  },

  loading: {
    color: Colors.light.accent,
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    fontWeight: "600",
  },

  footer: {
    marginTop: 30,
    color: "#666",
    alignSelf: "center",
  },
});