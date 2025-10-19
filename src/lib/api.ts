import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ApiResponse, PaginatedResponse } from "@/types";

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // No request interceptor - tokens will be added manually only when needed

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        // Handle common errors
        if (error.response?.status === 401) {
          // Unauthorized - clear tokens but don't redirect
          if (typeof window !== "undefined") {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("agent_auth_token");
            localStorage.removeItem("auth_user");
            localStorage.removeItem("agent_auth_user");
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Helper to get auth headers
  private getAuthHeaders(
    tokenType: "user" | "agent" | "auto" = "auto"
  ): Record<string, string> {
    if (typeof window === "undefined") return {};

    console.log("🔑 Getting auth headers for token type:", tokenType);

    let token: string | null = null;

    if (tokenType === "user") {
      token = localStorage.getItem("auth_token");
      console.log("🔑 User token exists:", !!token);
    } else if (tokenType === "agent") {
      token = localStorage.getItem("agent_auth_token");
      console.log("🔑 Agent token exists:", !!token);
    } else {
      // Auto-detect: try agent first, then user
      token =
        localStorage.getItem("agent_auth_token") ||
        localStorage.getItem("auth_token");
      console.log("🔑 Auto-detected token exists:", !!token);
    }

    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    console.log("🔑 Final headers:", headers);
    return headers;
  }

  // Public methods (no auth)
  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const fullUrl = `${this.client.defaults.baseURL}${url}`;
    console.log("🌐 [API GET REQUEST] 🌐");
    console.log("Full URL:", fullUrl);
    console.log("Params:", params);

    const response = await this.client.get(url, { params });
    const responseData = response.data;

    console.log("🌐 [API GET RESPONSE] 🌐");
    console.log("Response data:", responseData);

    // If response has success property (backend format), extract data from it
    if (responseData && responseData.success && responseData.data) {
      return responseData.data;
    }

    // Otherwise, return the response directly
    return responseData;
  }

  async post<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client.post<ApiResponse<T>>(url, data);
    return response.data as T;
  }

  // Authenticated methods
  async getAuth<T>(
    url: string,
    params?: Record<string, unknown>,
    tokenType: "user" | "agent" | "auto" = "auto"
  ): Promise<T> {
    const headers = this.getAuthHeaders(tokenType);
    const response = await this.client.get(url, { params, headers });
    const responseData = response.data;

    if (responseData && responseData.success && responseData.data) {
      return responseData.data;
    }

    return responseData;
  }

  async postAuth<T>(
    url: string,
    data?: unknown,
    tokenType: "user" | "agent" | "auto" = "auto"
  ): Promise<T> {
    const headers = this.getAuthHeaders(tokenType);

    console.log("🔐 API Client: Making authenticated POST request");
    console.log("🔐 URL:", url);
    console.log("🔐 Data:", data);
    console.log("🔐 Token type:", tokenType);
    console.log("🔐 Headers:", headers);

    const response = await this.client.post<ApiResponse<T>>(url, data, {
      headers,
    });

    console.log("📡 API Client: Response received:", response.data);
    return response.data as T;
  }

  async put<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client.put<ApiResponse<T>>(url, data);
    return response.data.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<ApiResponse<T>>(url);
    return response.data.data;
  }

  async getPaginated<T>(
    url: string,
    params?: Record<string, unknown>
  ): Promise<PaginatedResponse<T>> {
    try {
      const response = await this.client.get(url, {
        params,
      });

      // Handle different response formats
      const responseData = response.data;

      // If response has success property (backend format), extract data from it
      if (responseData && responseData.success && responseData.data) {
        const result = {
          data: Array.isArray(responseData.data)
            ? responseData.data
            : responseData.data.fixtures || responseData.data,
          pagination: responseData.pagination || responseData.data.pagination,
        };
        return result;
      }

      // Otherwise, return the response directly (expected format)
      return responseData;
    } catch (error) {
      throw error;
    }
  }
}

export const apiClient = new ApiClient();
export default apiClient;
