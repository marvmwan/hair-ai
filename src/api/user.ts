import apiClient from "./apiClient";

export interface User {
  id: string;
  name: string;
  username: string;
}

export const deleteUser = async (): Promise<void> => {
  try {
    await apiClient.delete("/user/me");
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw error;
  }
};

export const getUser = async (): Promise<User> => {
  try {
    const response = await apiClient.get("/user/me");
    return response.data;
  } catch (error) {
    console.error("Failed to get user:", error);
    throw error;
  }
};
