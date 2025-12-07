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
      withCredentials: true, // Enable cookies
    });

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        // Handle common errors
        if (error.response?.status === 401) {
          // Unauthorized - cookies are handled automatically by the browser
          // No need to clear localStorage since we use cookies
          console.warn(
            "[API] 401 Unauthorized - Token may be missing or invalid"
          );
        }
        return Promise.reject(error);
      }
    );
  }

  // Helper to get auth headers (legacy - not needed with cookies)
  private getAuthHeaders(): Record<string, string> {
    // All authentication is now handled via cookies
    // No need for Authorization headers
    return {};
  }

  // Public methods (no auth)
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
    return response.data as T;
  }

  // Authenticated methods
  async getAuth<T>(
    url: string,
    params?: Record<string, unknown>,
    tokenType: "user" | "agent" | "auto" = "auto"
  ): Promise<T> {
    // All requests use cookies - no headers needed
    const headers = this.getAuthHeaders();
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
    // All requests use cookies - no headers needed
    const headers = this.getAuthHeaders();

    const response = await this.client.post<ApiResponse<T>>(url, data, {
      headers,
    });

    return response.data as T;
  }

  async put<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client.put<ApiResponse<T>>(url, data);
    return response.data.data;
  }

  async putAuth<T>(
    url: string,
    data?: unknown,
    tokenType: "user" | "agent" | "auto" = "auto"
  ): Promise<T> {
    // All requests use cookies - no headers needed
    const headers = this.getAuthHeaders();

    const response = await this.client.put<ApiResponse<T>>(url, data, {
      headers,
    });

    const responseData = response.data;

    if (responseData && responseData.success && responseData.data) {
      return responseData.data;
    }

    return responseData as T;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<ApiResponse<T>>(url);
    return response.data.data;
  }

  async deleteAuth<T>(
    url: string,
    tokenType: "user" | "agent" | "auto" = "auto"
  ): Promise<T> {
    // All requests use cookies - no headers needed
    const headers = this.getAuthHeaders();

    const response = await this.client.delete<ApiResponse<T>>(url, {
      headers,
    });

    const responseData = response.data;

    if (responseData && responseData.success && responseData.data) {
      return responseData.data;
    }

    return responseData as T;
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
