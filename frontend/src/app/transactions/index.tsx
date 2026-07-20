import React, { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../components/ui/Header";
import SearchBar from "../../components/ui/searchBar";
import TransactionCard from "../../components/ui/transactionCard";
import BottomNavigation from "../../components/ui/bottomnavigation";

import { transactions } from "../../constants/mockData";
import { Colors } from "../../constants/theme";

export default function TransactionsScreen() {

  const [search, setSearch] = useState("");

  const router = useRouter();

  const filtered = useMemo(() => {

    return transactions.filter((item) =>
      item.merchant
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [search]);

  return (
    <SafeAreaView style={styles.container}>

      <Header title="Transactions" />

      <SearchBar
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TransactionCard
            transaction={item}
            onPress={() =>
              router.push(`/transactions/${item.id}`)
            }
          />
        )}
      />

      <BottomNavigation />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingHorizontal: 20,
  },
});