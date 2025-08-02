import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HaircutDetailScreen from "../screens/HaircutDetailScreen";
import HaircutTryOnScreen from "../screens/HaircutTryOnScreen";
import HairTryOnLoadingScreen from '../screens/HairTryOnLoadingScreen';
import { ScanType } from "../screens/Onboarding/HairScanInfoScreen";
import LoadingScreen from "../screens/Onboarding/LoadingScreen";
import OnboardingFunnelScreen from "../screens/Onboarding/OnboardingFunnelScreen";
import PaywallScreen from "../screens/Onboarding/PaywallScreen";
import SignInScreen from '../screens/SignInScreen';
import UnlockHairTryOnScreen from '../screens/UnlockHairTryOnScreen';
import HairScanNavigator, { HairScanStackParamList } from "./HairScanNavigator";

export type OnboardingStackParamList = {
  OnboardingFunnel: undefined;
  HairScan: {
    screen: keyof HairScanStackParamList;
    params: { scanType: ScanType };
  };
  Loading: { scanType: ScanType };
  Paywall: undefined;
  HaircutTryOn: undefined;
  HaircutDetail: { haircut: any }; // TODO: Use a proper type for haircut
  HairTryOnLoading: { haircut: any };
  UnlockHairTryOn: { haircut: any };
  SignIn: { haircut?: any };
};

const Stack = createStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen
        name="OnboardingFunnel"
        component={OnboardingFunnelScreen}
      />
      <Stack.Screen name="HairScan" component={HairScanNavigator} />
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="Paywall" component={PaywallScreen} />
      <Stack.Screen name="HaircutTryOn" component={HaircutTryOnScreen} />
      <Stack.Screen name="HaircutDetail" component={HaircutDetailScreen} />
      <Stack.Screen name="HairTryOnLoading" component={HairTryOnLoadingScreen} />
      <Stack.Screen name="UnlockHairTryOn" component={UnlockHairTryOnScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
