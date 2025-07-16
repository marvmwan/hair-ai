import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/contexts/AuthContext';
import { RevenueCatProvider } from './src/contexts/RevenueCatContext';
import { FunnelProvider } from './src/contexts/FunnelContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <RevenueCatProvider>
        <FunnelProvider>
          <AppNavigator />
          <StatusBar style="auto" />
        </FunnelProvider>
      </RevenueCatProvider>
    </AuthProvider>
  );
}