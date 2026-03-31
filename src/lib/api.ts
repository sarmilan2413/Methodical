export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  token?: string | null;
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", body, token } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const raw = await response.text();
    let parsed: unknown;

    try {
      parsed = raw ? JSON.parse(raw) : null;
    } catch (parseError) {
      throw new ApiError(`Invalid response format`, response.status);
    }

    if (!response.ok) {
      const message =
        parsed && typeof parsed === 'object' && 'message' in parsed && typeof (parsed as any).message === "string"
          ? (parsed as any).message
          : `Request failed with status ${response.status}`;
      throw new ApiError(message, response.status);
    }

    return parsed as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : "Network request failed",
      0
    );
  }
}
