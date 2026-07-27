import axios from "axios";
import * as SecureStore from "expo-secure-store";

// Replace with your backend URL
// Android Emulator:
// http://10.0.2.2:8000
//
// Physical Phone:
// http://YOUR_PC_IP:8000

const api = axios.create({
  baseURL: "http://YOUR_PC_IP:8000",
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