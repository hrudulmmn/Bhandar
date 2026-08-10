import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Image } from "expo-image";
import { Colors } from "../constants/theme";
import { useAuth } from "../contexts/AuthContext";


export default function LoginScreen() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing Fields", "Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      await login(email, password);

      router.replace("/home");
    } catch (err: any) {
      Alert.alert(
        "Login Failed",
        err?.response?.data?.detail ??
          "Invalid email or password."
      );
  console.log("========== LOGIN ERROR ==========");
  console.log("ERROR:", err);
  console.log("MESSAGE:", err?.message);
  console.log("STATUS:", err?.response?.status);
  console.log("DATA:", err?.response?.data);
  console.log("=================================");

  Alert.alert(
    "Login Failed",
    err?.response?.data?.detail ??
      err?.message ??
      "Login failed"
  );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Image source={require("../../assets/images/bhandar.png")}
          style={styles.img}/>

        <Text style={styles.logo}>BHANDAR</Text>

        <Text style={styles.subtitle}>
          Unified UPI Passbook
        </Text>

      </View>

      <View style={styles.form}>

        <Text style={styles.label}>Email</Text>

        <View style={styles.inputContainer}>

          <Ionicons
            name="mail-outline"
            size={20}
            color="#777"
          />

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#777"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

        </View>

        <Text style={styles.label}>Password</Text>

        <View style={styles.inputContainer}>

          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#777"
          />

          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#777"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            onPress={() =>
              setShowPassword(!showPassword)
            }
          >
            <Ionicons
              name={
                showPassword
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={20}
              color="#777"
            />
          </TouchableOpacity>

        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >

          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              Login
            </Text>
          )}

        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.push("./register")
          }
        >

          <Text style={styles.registerText}>
            Don't have an account?{" "}
            <Text style={styles.registerLink}>
              Register
            </Text>
          </Text>

        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  header: {
    marginBottom: 50,
    alignItems:"center"

  },
  img: {
  width: 200,
  height:200,
  borderRadius: 20,
  marginBottom: 5,
  },

  logo: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    color: "#999",
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },

  form: {},

  label: {
    color: "#FFFFFF",
    marginBottom: 8,
    marginLeft: 6,
    fontWeight: "600",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#181C27",

    borderRadius: 15,

    paddingHorizontal: 15,

    marginBottom: 20,

    height: 58,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: "#FFFFFF",
    fontSize: 16,
  },

  button: {
    backgroundColor: Colors.light.accent,

    height: 56,

    borderRadius: 16,

    justifyContent: "center",

    alignItems: "center",

    marginTop: 15,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
  },

  registerText: {
    textAlign: "center",
    marginTop: 30,
    color: "#AAA",
    fontSize: 15,
  },

  registerLink: {
    color: Colors.light.accent,
    fontWeight: "700",
  },
});