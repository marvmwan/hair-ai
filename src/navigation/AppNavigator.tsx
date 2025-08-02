import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useRevenueCat } from "../contexts/RevenueCatContext";
import PaywallScreen from "../screens/Onboarding/PaywallScreen";
import SignInScreen from "../screens/SignInScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { colors } from "../theme/colors";
import { StorageKeys, getItem } from "../utils/storage";
import HairScanNavigator from "./HairScanNavigator";
import OnboardingNavigator from "./OnboardingNavigator";
import TabNavigator from "./TabNavigator";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { isSubscribed, isLoading: subscriptionLoading } = useRevenueCat();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const completed = await getItem(
          StorageKeys.ONBOARDING_COMPLETED,
        );
        setHasCompletedOnboarding(completed === "true");
      } catch (error) {
        console.error("Error checking onboarding status:", error);
        setHasCompletedOnboarding(false);
      } finally {
        setIsCheckingOnboarding(false);
      }
    };

    console.log("isAuthenticated", isAuthenticated);
    console.log("hasCompletedOnboarding", hasCompletedOnboarding);

    if (isAuthenticated) {
      checkOnboardingStatus();
    } else {
      setIsCheckingOnboarding(false);
      setHasCompletedOnboarding(false);
    }
  }, [isAuthenticated]);

  if (authLoading || subscriptionLoading || isCheckingOnboarding) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated && hasCompletedOnboarding ? (
          // User is authenticated and completed onboarding
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            {!isSubscribed && (
              // Show paywall as modal if not subscribed
              <Stack.Screen
                name="Paywall"
                component={PaywallScreen}
                options={{
                  presentation: "modal",
                  gestureEnabled: false,
                }}
              />
            )}
          </>
        ) : isAuthenticated && !hasCompletedOnboarding ? (
          // User is authenticated but hasn't completed onboarding
          <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        ) : (
          // User is not authenticated
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
            <Stack.Screen name="HairScan" component={HairScanNavigator} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
