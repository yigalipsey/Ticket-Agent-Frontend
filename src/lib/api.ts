import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ApiResponse, PaginatedResponse } from "@/types";

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("auth_token")
            : null;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        // Handle common errors
        if (error.response?.status === 401) {
          // Unauthorized - redirect to login
          if (typeof window !== "undefined") {
            localStorage.removeItem("auth_token");
            window.location.href = "/login";
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    console.log("🌐 apiClient.get called with:", { url, params });

    const response = await this.client.get(url, { params });
    console.log("📡 apiClient.get response:", {
      status: response.status,
      data: response.data,
    });

    const responseData = response.data;

    // If response has success property (backend format), extract data from it
    if (responseData && responseData.success && responseData.data) {
      console.log("✅ apiClient.get returning:", responseData.data);
      return responseData.data;
    }

    // Otherwise, return the response directly
    console.log("✅ apiClient.get returning direct:", responseData);
    return responseData;
  }

  async post<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client.post<ApiResponse<T>>(url, data);
    return response.data.data;
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
    console.log("🌐 apiClient.getPaginated called with:", { url, params });

    try {
      const response = await this.client.get(url, {
        params,
      });

      console.log("📡 apiClient.getPaginated response:", {
        status: response.status,
        data: response.data,
      });

      // Handle different response formats
      const responseData = response.data;

      // If response has success property (backend format), extract data from it
      if (responseData && responseData.success && responseData.data) {
        console.log(
          "🔍 responseData.data type:",
          Array.isArray(responseData.data) ? "Array" : typeof responseData.data
        );
        console.log("🔍 responseData.data:", responseData.data);
        console.log("🔍 responseData.pagination:", responseData.pagination);

        const result = {
          data: Array.isArray(responseData.data)
            ? responseData.data
            : responseData.data.fixtures || responseData.data,
          pagination: responseData.pagination || responseData.data.pagination,
        };
        console.log("✅ apiClient.getPaginated processed result:", result);
        return result;
      }

      // Otherwise, return the response directly (expected format)
      console.log("✅ apiClient.getPaginated direct result:", responseData);
      return responseData;
    } catch (error) {
      console.error("❌ apiClient.getPaginated error:", error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient();
export default apiClient;
