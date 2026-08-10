import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../components/ui/Header";
import BottomNavigation from "../components/ui/bottomnavigation";
import { Colors } from "../constants/theme";
import { useAuth } from "../contexts/AuthContext";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  async function handleLogout() {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            try {
              await logout();

              router.replace("/login");
            } catch (error) {
              console.error(
                "LOGOUT FAILED:",
                error
              );

              Alert.alert(
                "Sign Out Failed",
                "Unable to sign out. Please try again."
              );
            }
          },
        },
      ]
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Please log in to view your profile.
          </Text>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() =>
              router.replace("/login")
            }
          >
            <Text style={styles.loginButtonText}>
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <BottomNavigation />
      </SafeAreaView>
    );
  }

  const initial =
    user.name?.charAt(0).toUpperCase() || "U";

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "bottom"]}
    >
      <View style={styles.content}>
        <Header title="Profile" />

        {/* Profile Header */}

        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {initial}
            </Text>
          </View>

          <Text style={styles.name}>
            {user.name}
          </Text>

          <Text style={styles.email}>
            {user.email}
          </Text>
        </View>

        {/* Account Information */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Account
          </Text>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="person-outline"
                size={21}
                color={Colors.light.accent}
              />

              <View>
                <Text style={styles.label}>
                  Name
                </Text>

                <Text style={styles.value}>
                  {user.name}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons
                name="mail-outline"
                size={21}
                color={Colors.light.accent}
              />

              <View>
                <Text style={styles.label}>
                  Email
                </Text>

                <Text style={styles.value}>
                  {user.email}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Sign Out */}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons
            name="log-out-outline"
            size={22}
            color="#FF6B6B"
          />

          <Text style={styles.logoutText}>
            Sign Out
          </Text>
        </TouchableOpacity>

        <Text style={styles.version}>
          Bhandar
        </Text>
      </View>

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
    flex: 1,
    paddingHorizontal: 20,
  },

  profileHeader: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: 30,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor:
      Colors.light.accent,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  avatarText: {
    color: "#fff",
    fontSize: 38,
    fontWeight: "800",
  },

  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
  },

  email: {
    color: "#888",
    fontSize: 14,
    marginTop: 6,
  },

  section: {
    backgroundColor: Colors.light.card,
    borderRadius: 18,
    padding: 20,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },

  row: {
    paddingVertical: 5,
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  label: {
    color: "#888",
    fontSize: 12,
    marginBottom: 3,
  },

  value: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#2D3245",
    marginVertical: 16,
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#5A3030",
    borderRadius: 16,
    height: 55,
    marginTop: 25,
  },

  logoutText: {
    color: "#FF6B6B",
    fontSize: 16,
    fontWeight: "700",
  },

  version: {
    color: "#555",
    textAlign: "center",
    marginTop: 25,
    fontSize: 12,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  emptyText: {
    color: "#aaa",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },

  loginButton: {
    backgroundColor:
      Colors.light.accent,
    paddingHorizontal: 30,
    paddingVertical: 13,
    borderRadius: 14,
  },

  loginButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});