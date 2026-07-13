import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/theme";

type CardProps = {
    children:React.ReactNode;
    bg?:string;
};

export default function Card({
  children,
  bg = Colors.light.background
}: CardProps) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 18,
    padding: 14,
  },
});