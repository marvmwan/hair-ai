import AsyncStorage from "@react-native-async-storage/async-storage";

export const StorageKeys = {
  AUTH_TOKEN: "auth_token",
  USER_ID: "user_id",
  IS_PAID: "is_paid",
  FUNNEL_ANSWERS: "funnel_answers",
  ONBOARDING_COMPLETED: "onboarding_completed",
};

export const saveItem = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    console.error("Failed to save item to storage", e);
  }
};

export const getItem = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.error("Failed to get item from storage", e);
    return null;
  }
};

export const setOnboardingCompleted = async () => {
    await saveItem('onboardingCompleted', true);
};

export const getOnboardingCompleted = async () => {
    return await getItem('onboardingCompleted');
};
