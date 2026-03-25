import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../lib/api";

const AuthContext = createContext(null);

const getStoredUser = () => {
  const rawUser = localStorage.getItem("user");

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (payload) => {
    const response = await api.post("/auth/login", payload);
    const data = response.data;
    const resolvedToken = data.token ?? data.accessToken ?? data.jwt ?? "";
    const fallbackUser = payload.email
      ? { name: payload.email.split("@")[0], email: payload.email }
      : null;
    const resolvedUser =
      data.user ??
      (data.name || data.email
        ? { name: data.name ?? data.email?.split("@")[0], email: data.email }
        : fallbackUser);

    setToken(resolvedToken);
    setUser(resolvedUser);

    return data;
  };

  const register = async (payload) => {
    const response = await api.post("/auth/register", payload);
    return response.data;
  };

  const logout = () => {
    setToken("");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      login,
      logout,
      register,
      token,
      user,
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
