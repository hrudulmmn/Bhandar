import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/theme";
import AppChip from "./appChip";

export default function BalanceCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.month}>Total UPI Activity • June 2026</Text>

      <Text style={styles.amount}>₹31,150</Text>

      <Text style={styles.subtitle}>27 Transactions</Text>

      <View style={styles.apps}>
        <AppChip title="GPay" color="#34A853" />
        <AppChip title="PhonePe" color="#7C3AED" />
        <AppChip title="Paytm" color="#00B9F1" />
        <AppChip title="BHIM" color="#2563EB" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.accent,
    borderRadius: 22,
    padding: 22,
    marginBottom: 24,
  },

  month: {
    color: "#FFF6EA",
    fontSize: 13,
  },

  amount: {
    color: "white",
    fontSize: 36,
    fontWeight: "800",
    marginVertical: 8,
  },

  subtitle: {
    color: "white",
    marginBottom: 18,
  },

  apps: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});