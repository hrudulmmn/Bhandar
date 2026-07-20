import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/theme";

interface Props {
  title: string;
  color?: string;
}

export default function AppChip({
  title,
  color = Colors.light.card,
}: Props) {
  return (
    <View style={[styles.container, { borderColor: color }]}>
      <View
        style={[
          styles.dot,
          {
            backgroundColor: color,
          },
        ]}
      />
      <Text style={[styles.text, { color }]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
    alignItems: "center",
    marginRight: 8,
    backgroundColor: Colors.light.card
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },

  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});