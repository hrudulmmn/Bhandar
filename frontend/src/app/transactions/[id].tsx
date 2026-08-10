import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  getTransaction,
  Transaction,
} from "../../services/transactions";

import AppButton from "../../components/ui/appButton";
import { Colors } from "../../constants/theme";

export default function TransactionDetails() {
  const { id } = useLocalSearchParams();

  const [transaction, setTransaction] =
    useState<Transaction | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTransaction() {
      try {
        setLoading(true);

        const data = await getTransaction(String(id));

        setTransaction(data);
      } catch (error) {
        console.error(
          "FAILED TO LOAD TRANSACTION:",
          error
        );

        setTransaction(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadTransaction();
    }
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color={Colors.light.accent}
          />

          <Text style={styles.loadingText}>
            Loading transaction...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!transaction) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.error}>
            Transaction not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={[styles.amount,{color:transaction.type==="debit"?Colors.light.expense:Colors.light.income}]}>
            ₹{transaction.amount.toFixed(2)}
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
            value={
              transaction.upiId || "Not available"
            }
          />

          <Row
            label="Reference"
            value={
              transaction.reference || "Not available"
            }
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
      </ScrollView>
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

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#888",
    marginTop: 12,
  },

  error: {
    color: "white",
    fontSize: 20,
  },

  card: {
    backgroundColor: Colors.light.background,
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