import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../lib/axios';
import { TOKEN_KEY } from '../utils/constants';
import { extractToken } from '../utils/token';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      return;
    }

    localStorage.removeItem(TOKEN_KEY);
  }, [token]);

  const login = async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    const nextToken = extractToken(data);

    if (!nextToken) {
      throw new Error('Token was not returned by the login API.');
    }

    setToken(nextToken);
    return data;
  };

  const logout = () => {
    setToken('');
  };

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      login,
      logout
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
