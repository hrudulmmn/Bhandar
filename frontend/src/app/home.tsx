import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import Header from "../components/ui/Header";
import BalanceCard from "../components/ui/balanceCard";
import TransactionCard from "../components/ui/transactionCard";
import BottomNavigation from "../components/ui/bottomnavigation";

import { transactions } from "../constants/mockData";
import { Colors } from "../constants/theme";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Header title="BHANDAR" rightText="AN" />

        <BalanceCard />

        <Text style={styles.heading}>Recent Transactions</Text>

        <View style={styles.transactionWrapper}>
          {transactions.map((item, index) => (
            <View
              key={item.id}
              style={{
                marginBottom: index === transactions.length - 1 ? 0 : 12,
              }}
            >
              <TransactionCard
                transaction={item}
                onPress={() =>
                  router.push(`/transactions/${item.id}`)
                }
              />
            </View>
          ))}

          <LinearGradient
            colors={[
              "rgba(14,16,24,0)",
              "rgba(14,16,24,0.3)",
              "rgba(14,16,24,0.7)",
              Colors.light.background,
            ]}
            style={styles.fade}
          />

          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={() => router.push("/transactions")}
          >
            <Text style={styles.seeAllText}>View All →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  heading: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 15,
  },

  transactionWrapper: {
    position: "relative",
    height: 360, // Adjust according to your TransactionCard height
    overflow: "hidden",
  },

  fade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
  },

  seeAllButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",

    backgroundColor: Colors.light.accent,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 30,

    elevation: 5,
  },

  seeAllText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});