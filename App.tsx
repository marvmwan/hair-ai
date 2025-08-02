import { StatusBar } from "expo-status-bar";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./src/contexts/AuthContext";
import { FunnelProvider } from "./src/contexts/FunnelContext";
import { RevenueCatProvider } from "./src/contexts/RevenueCatContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <RevenueCatProvider>
          <FunnelProvider>
            <AppNavigator />
            <StatusBar style="auto" />
          </FunnelProvider>
        </RevenueCatProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
