import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLocalSearchParams } from "expo-router";

import { transactions } from "../../constants/mockData";
import { Colors } from "../../constants/theme";

import AppButton from "../../components/ui/appButton";

export default function TransactionDetails() {

  const { id } = useLocalSearchParams();

  const transaction = transactions.find(
    (t) => t.id === id
  );

  if (!transaction)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>
          Transaction not found
        </Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.amount}>
          ₹{transaction.amount}
        </Text>

        <Text style={styles.type}>
          {transaction.type.toUpperCase()}
        </Text>

      </View>

      <View style={styles.section}>

        <Row
          label="Merchant"
          value={transaction.merchant}
        />

        <Row
          label="Application"
          value={transaction.app}
        />

        <Row
          label="Category"
          value={transaction.category}
        />

        <Row
          label="Bank"
          value={transaction.bank}
        />

        <Row
          label="UPI ID"
          value={transaction.upiId}
        />

        <Row
          label="Reference"
          value={transaction.reference}
        />

        <Row
          label="Date"
          value={transaction.date}
        />

      </View>

      <AppButton
        title="Download Receipt"
        onPress={() => {}}
      />

    </SafeAreaView>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.row}>

      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
  },

  error: {
    color: "white",
    fontSize: 20,
  },

  card: {
    backgroundColor: Colors.light.accent,
    borderRadius: 22,
    padding: 30,
    alignItems: "center",
    marginBottom: 25,
  },

  amount: {
    fontSize: 40,
    fontWeight: "800",
    color: "white",
  },

  type: {
    color: "white",
    marginTop: 8,
    fontWeight: "600",
  },

  section: {
    backgroundColor: Colors.light.card,
    borderRadius: 18,
    padding: 20,
    marginBottom: 25,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2d3245",
  },

  label: {
    color: "#9CA3AF",
    fontSize: 15,
  },

  value: {
    color: "white",
    fontWeight: "600",
    maxWidth: "60%",
    textAlign: "right",
  },

});