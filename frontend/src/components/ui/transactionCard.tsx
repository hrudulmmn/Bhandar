import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Transaction } from "../../types/transactions";
import { Colors } from "../../constants/theme";

interface Props {
  transaction: Transaction;
  onPress?: () => void;
}

export default function TransactionCard({
  transaction,
  onPress,
}: Props) {
  const amountColor =
    transaction.type === "credit"
      ? Colors.light.income
      : Colors.light.expense;

  const prefix =
    transaction.type === "credit"
      ? "+"
      : "-";

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.icon}>
        <Text style={styles.iconText}>
          {transaction.merchant[0]}
        </Text>
      </View>

      <View style={styles.center}>
        <Text style={styles.name}>
          {transaction.merchant}
        </Text>

        <Text style={styles.date}>
          {transaction.date}
        </Text>

        <Text style={styles.app}>
          {transaction.app}
        </Text>
      </View>

      <Text
        style={[
          styles.amount,
          {
            color: amountColor,
          },
        ]}
      >
        {prefix}₹{transaction.amount}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.card,
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
  },

  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.light.accent,
    justifyContent: "center",
    alignItems: "center",
  },

  iconText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },

  center: {
    flex: 1,
    marginLeft: 15,
  },

  name: {
    color: Colors.light.text,
    fontWeight: "700",
    fontSize: 16,
  },

  date: {
    color: Colors.light.secText,
    marginTop: 3,
  },

  app: {
    color: Colors.light.accent,
    marginTop: 4,
    fontSize: 12,
  },

  amount: {
    fontWeight: "700",
    fontSize: 18,
  },
});