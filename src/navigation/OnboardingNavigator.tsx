import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoadingScreen from '../screens/Onboarding/LoadingScreen';
import OnboardingFunnelScreen from '../screens/Onboarding/OnboardingFunnelScreen';
import PaywallScreen from '../screens/Onboarding/PaywallScreen';
import HairScanNavigator from './HairScanNavigator';

const Stack = createStackNavigator();

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen name="OnboardingFunnel" component={OnboardingFunnelScreen} />
      <Stack.Screen name="HairScan" component={HairScanNavigator} />
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="Paywall" component={PaywallScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;