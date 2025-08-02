import apiClient from "./apiClient";

export interface AnalysisTaskResponse {
  task_id: string;
  message: string;
}

export interface TaskStatusResponse {
  id: string;
  status: "PENDING" | "IN_PROGRESS" | "SUCCESS" | "FAILURE";
  progress: number;
  result: any; // Can be more specific if the result structure is known
  error_message: string | null;
  created_at: string;
}

export const startAnalysis = async (
  inputData: string,
): Promise<AnalysisTaskResponse> => {
  try {
    const response = await apiClient.post<AnalysisTaskResponse>("/analyze", {
      input_data: inputData,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to start analysis:", error);
    throw error;
  }
};

export const getAnalysisStatus = async (
  taskId: string,
): Promise<TaskStatusResponse> => {
  try {
    const response = await apiClient.get<TaskStatusResponse>(
      `/analyze/status/${taskId}`,
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch status for task ${taskId}:`, error);
    throw error;
  }
};
