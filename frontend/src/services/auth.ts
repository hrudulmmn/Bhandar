import * as SecureStore from "expo-secure-store";
import api from "./api";

export async function register(data: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await api.post("/auth/register", data);

  await SecureStore.setItemAsync(
    "access_token",
    response.data.access_token
  );

  return response.data;
}

export async function login(data: {
  email: string;
  password: string;
}) {
  const response = await api.post("/auth/login", data);

  await SecureStore.setItemAsync(
    "access_token",
    response.data.access_token
  );

  return response.data;
}

export async function getCurrentUser() {
  const response = await api.get("/auth/me");
  return response.data;
}

export async function logout() {
  await SecureStore.deleteItemAsync("access_token");
}