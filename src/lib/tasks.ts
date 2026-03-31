import { apiRequest } from "@/lib/api";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export interface ApiTask {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  userId: number;
}

export interface CreateTaskPayload {
  title: string;
  description: string;
  status: TaskStatus;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export function getTasks(token: string): Promise<ApiTask[]> {
  return apiRequest<ApiTask[]>("/tasks", { token });
}

export function getTaskById(id: number, token: string): Promise<ApiTask> {
  return apiRequest<ApiTask>(`/tasks/${id}`, { token });
}

export function createTask(payload: CreateTaskPayload, token: string): Promise<ApiTask> {
  return apiRequest<ApiTask>("/tasks", {
    method: "POST",
    body: payload,
    token,
  });
}

export function updateTask(id: number, payload: UpdateTaskPayload, token: string): Promise<ApiTask> {
  return apiRequest<ApiTask>(`/tasks/${id}`, {
    method: "PATCH",
    body: payload,
    token,
  });
}

export function deleteTask(id: number, token: string): Promise<ApiTask> {
  return apiRequest<ApiTask>(`/tasks/${id}`, {
    method: "DELETE",
    token,
  });
}
