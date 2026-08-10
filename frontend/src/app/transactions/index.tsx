import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BottomNavigation from "../../components/ui/bottomnavigation";
import Header from "../../components/ui/Header";
import SearchBar from "../../components/ui/searchBar";
import TransactionCard from "../../components/ui/transactionCard";

import { Colors } from "../../constants/theme";
import {
  getTransactions,
  Transaction,
} from "../../services/transactions";

export default function TransactionsScreen() {
  const router = useRouter();

  const [transactions, setTransactions] =
    useState<Transaction[]>([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  async function loadTransactions() {
    try {
      setLoading(true);

      const data = await getTransactions();

      setTransactions(data);

      console.log(
        "TRANSACTIONS PAGE:",
        data
      );
    } catch (error: any) {
      console.error(
        "FAILED TO LOAD TRANSACTIONS:",
        error
      );

      console.log(
        "STATUS:",
        error.response?.status
      );

      console.log(
        "DATA:",
        error.response?.data
      );
    } finally {
      setLoading(false);
    }
  }

  // Load transactions when page opens
  useEffect(() => {
    loadTransactions();
  }, []);

  // Filter transactions based on search
  const filtered = useMemo(() => {
    return transactions.filter((item) =>
      item.merchant
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [transactions, search]);

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "bottom"]}
    >
      <Header title="Transactions" />

      <SearchBar
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={Colors.light.accent}
          />

          <Text style={styles.loadingText}>
            Loading transactions...
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) =>
            item.id
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            filtered.length === 0
              ? styles.emptyList
              : styles.list
          }
          renderItem={({ item }) => (
            <TransactionCard
              transaction={item}
              onPress={() =>
                router.push(
                  `/transactions/${item.id}`
                )
              }
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {search
                  ? "No transactions found"
                  : "No transactions yet"}
              </Text>

              {!search && (
                <Text style={styles.emptySubText}>
                  Sync your SMS messages to import
                  transactions.
                </Text>
              )}
            </View>
          }
        />
      )}

      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      Colors.light.background,
    paddingHorizontal: 20,
  },

  list: {
    paddingBottom: 100,
  },

  emptyList: {
    flexGrow: 1,
    paddingBottom: 100,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#888",
    marginTop: 12,
    fontSize: 14,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  emptyText: {
    color: "#aaa",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },

  emptySubText: {
    color: "#666",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
});