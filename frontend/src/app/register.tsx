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
import { register } from "../services/auth";

export default function RegisterScreen() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  async function handleRegister() {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert("Missing Fields", "Please fill all fields.");
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        "Weak Password",
        "Password should be at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Password Mismatch",
        "Passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);

      await register({
        name,
        email,
        password,
      });

      Alert.alert(
        "Success",
        "Account created successfully.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/login"),
          },
        ]
      );
    } catch (err: any) {
      Alert.alert(
        "Registration Failed",
        err?.response?.data?.detail ??
          "Something went wrong."
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
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="person-outline"
            size={20}
            color="#777"
          />

          <TextInput
            style={styles.input}
            placeholder="John Doe"
            placeholderTextColor="#777"
            value={name}
            onChangeText={setName}
          />
        </View>

        <Text style={styles.label}>Email</Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#777"
          />

          <TextInput
            style={styles.input}
            placeholder="example@email.com"
            placeholderTextColor="#777"
            autoCapitalize="none"
            keyboardType="email-address"
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
            placeholder="Password"
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

        <Text style={styles.label}>
          Confirm Password
        </Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="shield-checkmark-outline"
            size={20}
            color="#777"
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#777"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity
            onPress={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >
            <Ionicons
              name={
                showConfirmPassword
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
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              Create Account
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text style={styles.loginLink}>
              Login
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
    marginBottom: 40,
    alignItems:"center"
  },

  logo: {
    color: "#fff",
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
    color: "#fff",
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
    height: 58,
    marginBottom: 18,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: "#fff",
    fontSize: 16,
  },

  button: {
    backgroundColor: Colors.light.accent,
    borderRadius: 16,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  img: {
  width: 200,
  height:200,
  borderRadius: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },

  loginText: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 28,
    fontSize: 15,
  },

  loginLink: {
    color: Colors.light.accent,
    fontWeight: "700",
  },
});