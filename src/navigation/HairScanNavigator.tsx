import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CaptureScreen from "../screens/Onboarding/HairScan/CaptureScreen";
import ReviewScreen from "../screens/Onboarding/HairScan/ReviewScreen";
import { ScanType } from "../screens/Onboarding/HairScanInfoScreen";

export type HairScanStackParamList = {
  Capture: { scanType: ScanType };
  Review: { scanType: ScanType };
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
