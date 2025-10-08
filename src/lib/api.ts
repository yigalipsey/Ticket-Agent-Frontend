import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ApiResponse, PaginatedResponse } from "@/types";

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    console.log(
      "%c🔧 [ApiClient] Initializing",
      "color: #10b981; font-weight: bold; font-size: 14px"
    );
    console.log(
      "%c📍 Base URL: " + baseURL,
      "color: #10b981; font-weight: bold; font-size: 12px"
    );

    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const fullURL = `${config.baseURL}${config.url}`;

        console.log(
          "%c📤 API Request",
          "color: #10b981; font-weight: bold; font-size: 12px"
        );
        console.log(
          "%c🌐 Full URL: " + fullURL,
          "color: #10b981; font-weight: bold; font-size: 12px; background: #d1fae5; padding: 4px 8px; border-radius: 4px"
        );
        console.log(
          "%c🔹 Method: " + (config.method?.toUpperCase() || "GET"),
          "color: #059669; font-size: 11px"
        );
        if (config.params && Object.keys(config.params).length > 0) {
          console.log(
            "%c🔹 Params:",
            "color: #059669; font-size: 11px",
            config.params
          );
        }

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
        console.log(
          "%c✅ API Response",
          "color: #10b981; font-weight: bold; font-size: 12px"
        );
        console.log(
          "%c🔹 Status: " + response.status,
          "color: #059669; font-size: 11px"
        );
        console.log(
          "%c🔹 URL: " + response.config.url,
          "color: #059669; font-size: 11px"
        );
        return response;
      },
      (error) => {
        console.log(
          "%c❌ API Error",
          "color: #ef4444; font-weight: bold; font-size: 12px"
        );
        if (error.response) {
          console.log(
            "%c🔹 Status: " + error.response.status,
            "color: #dc2626; font-size: 11px"
          );
          console.log(
            "%c🔹 URL: " + error.config?.url,
            "color: #dc2626; font-size: 11px"
          );
        } else if (error.request) {
          console.log(
            "%c🔹 No response received",
            "color: #dc2626; font-size: 11px"
          );
        } else {
          console.log(
            "%c🔹 Error: " + error.message,
            "color: #dc2626; font-size: 11px"
          );
        }

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
    const response = await this.client.get(url, { params });

    const responseData = response.data;

    // If response has success property (backend format), extract data from it
    if (responseData && responseData.success && responseData.data) {
      return responseData.data;
    }

    // Otherwise, return the response directly
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
    try {
      const response = await this.client.get(url, {
        params,
      });

      console.log("🔍 [ApiClient] Response:", {
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
      console.error("❌ apiClient.getPaginated error:", error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient();
export default apiClient;
