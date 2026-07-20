import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/theme";

interface Props {
  title: string;
  rightText?: string;
}

export default function Header({ title, rightText }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {rightText && <Text style={styles.right}>{rightText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: Colors.light.text,
    fontSize: 24,
    fontWeight: "700",
  },

  right: {
    color: Colors.light.accent,
    fontWeight: "600",
    fontSize: 14,
  },
});