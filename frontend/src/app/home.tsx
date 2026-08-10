import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppChip from "@/components/ui/appChip";

import Header from "../components/ui/Header";
import BalanceCard from "../components/ui/balanceCard";
import BottomNavigation from "../components/ui/bottomnavigation";
import TransactionCard from "../components/ui/transactionCard";

import { Colors } from "../constants/theme";
import { useAuth } from "../contexts/AuthContext";

import {
  DashboardData,
  getDashboard,
} from "../services/dashboard";

import {
  requestSMSPermission,
} from "../services/sms/permissions";

import {
  syncTransactions,
} from "../services/sms/syncService";

import {
  getTransactions,
  Transaction,
} from "../services/transactions";

export default function HomeScreen() {
  const router = useRouter();

  const { user } = useAuth();

  const [transactions, setTransactions] =
    useState<Transaction[]>([]);

  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [syncing, setSyncing] =
    useState(false);

  // Load data whenever the logged-in user is available
  useEffect(() => {
    if (!user) {
      return;
    }

    loadHomeData();
  }, [user]);

  // ==========================================
  // LOAD ALL HOME DATA
  // ==========================================

  async function loadHomeData() {
    await Promise.all([
      loadTransactions(),
      loadDashboard(),
    ]);
  }

  // ==========================================
  // LOAD TRANSACTIONS
  // ==========================================

  async function loadTransactions() {
    try {
      setLoading(true);

      const data = await getTransactions();

      setTransactions(data);

      console.log(
        "========== TRANSACTIONS DEBUG =========="
      );

      data.forEach((transaction) => {
        console.log(
          "----------------------------------------"
        );

        console.log(
          "ID:",
          transaction.id
        );

        console.log(
          "MERCHANT:",
          transaction.merchant
        );

        console.log(
          "BANK:",
          transaction.bank
        );

        console.log(
          "AMOUNT:",
          transaction.amount
        );

        console.log(
          "TYPE:",
          transaction.type
        );

        console.log(
          "DATE:",
          transaction.date
        );

        console.log(
          "UPI ID:",
          transaction.upiId
        );

        console.log(
          "REFERENCE:",
          transaction.reference
        );

        console.log(
          "APP:",
          transaction.app
        );
      });

      console.log(
        "========================================"
      );

      console.log(
        "TOTAL TRANSACTIONS:",
        data.length
      );

    } catch (error: any) {
      console.error(
        "FAILED TO LOAD TRANSACTIONS:",
        error
      );

      if (error.response) {
        console.log(
          "STATUS:",
          error.response.status
        );

        console.log(
          "DATA:",
          error.response.data
        );
      }

    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // LOAD DASHBOARD
  // ==========================================

  async function loadDashboard() {
    try {
      const data =
        await getDashboard();

      console.log(
        "========== DASHBOARD =========="
      );

      console.log(
        "TOTAL CREDIT:",
        data.total_credit
      );

      console.log(
        "TOTAL DEBIT:",
        data.total_debit
      );

      console.log(
        "TRANSACTION COUNT:",
        data.transaction_count
      );

      console.log(
        "RECENT TRANSACTIONS:",
        data.recent_trans?.length
      );

      console.log(
        "================================"
      );

      setDashboard(data);

    } catch (error: any) {
      console.error(
        "FAILED TO LOAD DASHBOARD:",
        error
      );

      if (error.response) {
        console.log(
          "DASHBOARD STATUS:",
          error.response.status
        );

        console.log(
          "DASHBOARD DATA:",
          error.response.data
        );
      }
    }
  }

  // ==========================================
  // SYNC SMS → PARSER → BACKEND
  // ==========================================

  async function handleSync() {
    try {
      if (!user) {
        Alert.alert(
          "Not Logged In",
          "Please log in before syncing transactions."
        );

        return;
      }

      const granted =
        await requestSMSPermission();

      if (!granted) {
        Alert.alert(
          "Permission Required",
          "Please allow SMS permission to import UPI transactions."
        );

        return;
      }

      setSyncing(true);

      console.log(
        "========== STARTING SYNC =========="
      );

      const imported =
        await syncTransactions(user.id);

      console.log(
        "IMPORTED:",
        imported
      );

      // Reload transactions
      await loadTransactions();

      // Reload dashboard
      await loadDashboard();

      console.log(
        "========== SYNC COMPLETE =========="
      );

      Alert.alert(
        "Sync Complete",
        `${imported} transactions imported`
      );

    } catch (error: any) {
      console.error(
        "SYNC FAILED:",
        error
      );

      Alert.alert(
        "Sync Failed",
        error?.response?.data?.detail ??
          "Something went wrong while syncing transactions."
      );

    } finally {
      setSyncing(false);
    }
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "bottom"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Header title="Bhandar" />

        {/* ======================================
            BALANCE CARD
        ====================================== */}

        <BalanceCard
          totalCredit={
            dashboard?.total_credit ?? 0
          }
          totalDebit={
            dashboard?.total_debit ?? 0
          }
        />

        {/* ======================================
            PAYMENT APPS
        ====================================== */}

        <View style={styles.apps}>
          <AppChip
            title="GPay"
            color="#34A853"
          />

          <AppChip
            title="PhonePe"
            color="#7C3AED"
          />

          <AppChip
            title="Paytm"
            color="#00B9F1"
          />

          <AppChip
            title="BHIM"
            color="#2563EB"
          />
        </View>

        {/* ======================================
            SYNC BUTTON
        ====================================== */}

        <TouchableOpacity
          style={[
            styles.syncButton,
            syncing &&
              styles.syncButtonDisabled,
          ]}
          onPress={handleSync}
          disabled={syncing}
        >
          <Text style={styles.syncText}>
            {syncing
              ? "Syncing..."
              : "Sync"}
          </Text>
        </TouchableOpacity>

        {/* ======================================
            RECENT TRANSACTIONS
        ====================================== */}

        <Text style={styles.heading}>
          Recent Transactions
        </Text>

        <View
          style={styles.transactionWrapper}
        >
          {loading ? (
            <View
              style={styles.emptyContainer}
            >
              <Text
                style={styles.emptyText}
              >
                Loading transactions...
              </Text>
            </View>

          ) : transactions.length === 0 ? (
            <View
              style={styles.emptyContainer}
            >
              <Text
                style={styles.emptyText}
              >
                No transactions yet
              </Text>

              <Text
                style={styles.emptySubText}
              >
                Sync your SMS messages to
                import transactions.
              </Text>
            </View>

          ) : (
            transactions
              .slice(0, 5)
              .map((item, index) => (
                <View
                  key={item.id}
                  style={{
                    marginBottom:
                      index ===
                      Math.min(
                        transactions.length,
                        5
                      ) - 1
                        ? 0
                        : 12,
                  }}
                >
                  <TransactionCard
                    transaction={item}
                    onPress={() =>
                      router.push(
                        `/transactions/${item.id}`
                      )
                    }
                  />
                </View>
              ))
          )}

          {/* Fade + View All */}

          {transactions.length > 0 && (
            <>
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
                style={
                  styles.seeAllButton
                }
                onPress={() =>
                  router.push(
                    "/transactions"
                  )
                }
              >
                <Text
                  style={
                    styles.seeAllText
                  }
                >
                  View All →
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      Colors.light.background,
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
    minHeight: 180,
    height: 360,
    overflow: "hidden",
  },

  emptyContainer: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  emptyText: {
    color: "#aaa",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  emptySubText: {
    color: "#666",
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
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
    backgroundColor:
      Colors.light.accent,
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

  apps: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  syncButton: {
    backgroundColor:
      Colors.light.accent,
    marginTop: 15,
    marginBottom: 10,
    alignSelf: "center",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 30,
  },

  syncButtonDisabled: {
    opacity: 0.6,
  },

  syncText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});