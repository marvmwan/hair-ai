import axios from "axios";
import * as SecureStore from "expo-secure-store";
import config from "../../constants/config";

const instance = axios.create({
  baseURL: config.API_URL,
});

instance.interceptors.request.use(
  async (config) => {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance; 