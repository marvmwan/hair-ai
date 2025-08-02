import * as SecureStore from "expo-secure-store";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import apiClient from "../api/apiClient";

interface AuthContextType {
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (access: string, refresh: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTokens = async () => {
      const accessToken = await SecureStore.getItemAsync("accessToken");
      const refreshToken = await SecureStore.getItemAsync("refreshToken");

      if (accessToken) {
        try {
          const isValid = await verifyToken(accessToken);
          if (isValid) {
            setAccessToken(accessToken);
          } else if (refreshToken) {
            await refreshAuthToken(refreshToken);
          }
        } catch (error) {
          console.error("Token validation failed", error);
        }
      }
      setIsLoading(false);
    };

    loadTokens();
  }, []);

  const login = async (access: string, refresh: string) => {
    setAccessToken(access);
    await SecureStore.setItemAsync("accessToken", access);
    await SecureStore.setItemAsync("refreshToken", refresh);
  };

  const logout = async () => {
    setAccessToken(null);
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
  };

  const verifyToken = async (token: string): Promise<boolean> => {
    try {
      const response = await apiClient.post("/jwt/verify", { token });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  const refreshAuthToken = async (refreshToken: string) => {
    try {
      const response = await apiClient.post("/jwt/refresh", {
        token: refreshToken,
      });
      const { access } = response.data;
      setAccessToken(access);
      await SecureStore.setItemAsync("accessToken", access);
    } catch (error) {
      await logout();
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated: !!accessToken,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
