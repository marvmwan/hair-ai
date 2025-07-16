import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { storage, StorageKeys } from '../utils/storage';

interface AuthContextType {
  isAuthenticated: boolean;
  userId: string | null;
  isLoading: boolean;
  login: (token: string, userId: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const token = await storage.getItem(StorageKeys.AUTH_TOKEN);
      const userIdFromStorage = await storage.getItem(StorageKeys.USER_ID);

      if (token && userIdFromStorage) {
        setIsAuthenticated(true);
        setUserId(userIdFromStorage);
      } else {
        setIsAuthenticated(false);
        setUserId(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      setUserId(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (token: string, userId: string) => {
    try {
      await storage.setItem(StorageKeys.AUTH_TOKEN, token);
      await storage.setItem(StorageKeys.USER_ID, userId);
      
      setIsAuthenticated(true);
      setUserId(userId);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await storage.removeItem(StorageKeys.AUTH_TOKEN);
      await storage.removeItem(StorageKeys.USER_ID);
      await storage.removeItem(StorageKeys.IS_PAID);
      await storage.removeItem(StorageKeys.FUNNEL_ANSWERS);
      await storage.removeItem(StorageKeys.ONBOARDING_COMPLETED);
      
      setIsAuthenticated(false);
      setUserId(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    userId,
    isLoading,
    login,
    logout,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};