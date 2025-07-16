import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CaptureScreen from '../screens/Onboarding/HairScan/CaptureScreen';
import ReviewScreen from '../screens/Onboarding/HairScan/ReviewScreen';

export type HairScanStackParamList = {
  Capture: { scanType: 'top' | 'side' | 'back' | 'front' | 'face' };
  Review: undefined;
};

const Stack = createStackNavigator<HairScanStackParamList>();

const HairScanNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Capture" component={CaptureScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
    </Stack.Navigator>
  );
};

export default HairScanNavigator;
