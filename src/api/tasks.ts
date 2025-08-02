// import {
//   ArticleAnalysisResponse,
//   PaginatedTasksResponse,
//   Task,
// } from "../types/analysis";
// import apiClient from "./apiClient";

// export interface LatestTaskResponse extends Task {
//   progress: number;
// }

// export const getTasks = async (): Promise<PaginatedTasksResponse> => {
//   try {
//     const response = await apiClient.get<PaginatedTasksResponse>("/tasks");
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch tasks:", error);
//     throw error;
//   }
// };

// export const getLatestTask = async (): Promise<LatestTaskResponse> => {
//   try {
//     const response = await apiClient.get<LatestTaskResponse>("/tasks/latest");
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch latest task:", error);
//     throw error;
//   }
// };

// export const getTaskById = async (
//   id: string,
// ): Promise<ArticleAnalysisResponse> => {
//   try {
//     const response = await apiClient.get<{ result: ArticleAnalysisResponse }>(
//       `/tasks/${id}`,
//     );
//     return response.data.result;
//   } catch (error) {
//     console.error(`Failed to fetch task with id ${id}:`, error);
//     throw error;
//   }
// };
