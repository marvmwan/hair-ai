import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { storage, StorageKeys } from '../utils/storage';

interface RevenueCatContextType {
  isSubscribed: boolean;
  isLoading: boolean;
  purchase: () => Promise<boolean>;
  restorePurchases: () => Promise<void>;
  checkSubscriptionStatus: () => Promise<void>;
}

const RevenueCatContext = createContext<RevenueCatContextType | undefined>(undefined);

export const useRevenueCat = () => {
  const context = useContext(RevenueCatContext);
  if (!context) {
    throw new Error('useRevenueCat must be used within a RevenueCatProvider');
  }
  return context;
};

interface RevenueCatProviderProps {
  children: ReactNode;
}

export const RevenueCatProvider: React.FC<RevenueCatProviderProps> = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkSubscriptionStatus = async () => {
    try {
      setIsLoading(true);
      // Mock: Check subscription status from storage
      const subscriptionStatus = await storage.getItem(StorageKeys.IS_PAID);
      setIsSubscribed(subscriptionStatus === 'true');
    } catch (error) {
      console.error('Error checking subscription status:', error);
      setIsSubscribed(false);
    } finally {
      setIsLoading(false);
    }
  };

  const purchase = async (): Promise<boolean> => {
    try {
      // Mock purchase flow - in real app, this would use RevenueCat SDK
      console.log('Processing purchase...');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful purchase
      const success = true; // In real app, this would come from RevenueCat
      
      if (success) {
        await storage.setItem(StorageKeys.IS_PAID, 'true');
        setIsSubscribed(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error processing purchase:', error);
      return false;
    }
  };

  const restorePurchases = async () => {
    try {
      // Mock restore purchases - in real app, this would use RevenueCat SDK
      console.log('Restoring purchases...');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock: Check if user had previous purchases
      const hasActivePurchase = await storage.getItem(StorageKeys.IS_PAID);
      
      if (hasActivePurchase === 'true') {
        setIsSubscribed(true);
      }
    } catch (error) {
      console.error('Error restoring purchases:', error);
    }
  };

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  const value: RevenueCatContextType = {
    isSubscribed,
    isLoading,
    purchase,
    restorePurchases,
    checkSubscriptionStatus,
  };

  return (
    <RevenueCatContext.Provider value={value}>
      {children}
    </RevenueCatContext.Provider>
  );
};