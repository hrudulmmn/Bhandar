import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/theme";

interface BalanceCardProps {
  totalCredit: number;
  totalDebit: number;
}

export default function BalanceCard({
  totalCredit,
  totalDebit,
}: BalanceCardProps) {
  const balance = totalCredit - totalDebit;

  const totalActivity =
    totalCredit + totalDebit;

  return (
    <View style={styles.card}>
      <Text style={styles.month}>
        Total UPI Activity
      </Text>

      <Text style={styles.amount}>
        ₹{totalActivity.toLocaleString("en-IN")}
      </Text>

      <Text style={styles.subtitle}>
        Credit ₹{totalCredit.toLocaleString("en-IN")}
        {"  •  "}
        Debit ₹{totalDebit.toLocaleString("en-IN")}
      </Text>

      <View style={styles.divider} />

      <View style={styles.balanceRow}>
        <Text style={styles.balanceLabel}>
          Net Balance
        </Text>

        <Text
          style={[
            styles.balanceAmount,
            {
              color:
                balance >= 0
                  ? "#FFFFFF"
                  : "#FFD6D6",
            },
          ]}
        >
          ₹{balance.toLocaleString("en-IN")}
        </Text>
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
    fontWeight: "600",
  },

  amount: {
    color: "white",
    fontSize: 36,
    fontWeight: "800",
    marginVertical: 8,
  },

  subtitle: {
    color: "white",
    fontSize: 14,
    marginBottom: 18,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.25)",
    marginBottom: 15,
  },

  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  balanceLabel: {
    color: "#FFF6EA",
    fontSize: 14,
    fontWeight: "600",
  },

  balanceAmount: {
    fontSize: 20,
    fontWeight: "800",
  },
});