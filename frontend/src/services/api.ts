import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
  baseURL: "http://192.168.220.128:8001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync("access_token");
    }

    return Promise.reject(error);
  }
);

export default api;