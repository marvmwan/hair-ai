import apiClient from "./apiClient";

export const googleAuth = async (
  name: string | null,
  email: string,
  password: string,
): Promise<any> => {
  try {
    const response = await apiClient.post("/auth/google-sign-in", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const appleAuth = async (data: any): Promise<any> => {
  try {
    const response = await apiClient.post("/auth/apple-sign-in", data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}; 