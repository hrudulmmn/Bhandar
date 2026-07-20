import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { Colors } from "../../constants/theme";

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      icon: "home-outline",
      active: "home",
      route: "/home",
    },
    {
      icon: "list-outline",
      active: "list",
      route: "/transactions",
    },
    {
      icon: "stats-chart-outline",
      active: "stats-chart",
      route: "/analytics",
    },
    {
      icon: "person-outline",
      active: "person",
      route: "/profile",
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const selected = pathname.startsWith(tab.route);

        return (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(tab.route as any)}
          >
            <Ionicons
              name={(selected ? tab.active : tab.icon) as any}
              size={26}
              color={selected ? Colors.light.accent : "#777"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    height: 65,
    borderRadius: 20,
    backgroundColor: Colors.light.card,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});