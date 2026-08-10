import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentUser,
  login as loginService,
  logout as logoutService,
} from "../services/auth";

import * as SecureStore from "expo-secure-store";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext(
  {} as AuthContextType
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    try {
      const token =
        await SecureStore.getItemAsync(
          "access_token"
        );

      if (!token) {
        setUser(null);
        return;
      }

      const me = await getCurrentUser();

      setUser(me);
    } catch (error) {
      console.log(
        "AUTH INITIALIZATION FAILED:",
        error
      );

      await SecureStore.deleteItemAsync(
        "access_token"
      );

      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(
    email: string,
    password: string
  ) {
    await loginService({
      email,
      password
    }
    );

    const me = await getCurrentUser();

    setUser(me);
  }

  async function logout() {
    await logoutService();

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}