import * as SecureStore from "expo-secure-store";
import api from "./api";

const ACCESS_TOKEN = "access_token";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export async function register(data: RegisterData) {
  const response = await api.post("/auth/register", data);
  return response.data;
}

export async function login(data: LoginData) {
  const response = await api.post("/auth/login", data);

  await SecureStore.setItemAsync(
    ACCESS_TOKEN,
    response.data.access_token
  );

  return response.data;
}

export async function getCurrentUser() {
  const response = await api.get("/auth/me");
  return response.data;
}

export async function logout() {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN);
}