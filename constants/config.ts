import Constants from "expo-constants";

const config = {
  isDevelopment: Constants.expoConfig?.extra?.isDevelopment,
  API_URL: Constants.expoConfig?.extra?.API_URL,
};

export default config;
