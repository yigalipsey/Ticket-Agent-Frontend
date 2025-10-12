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
    console.log(
      "%c🌐 [API CLIENT REQUEST] 🌐",
      "color: orange; font-size: 16px; font-weight: bold; background: black; padding: 10px;"
    );
    console.log(
      "%cBase URL:",
      "color: orange; font-size: 14px; font-weight: bold;"
    );
    console.log(this.client.defaults.baseURL);
    console.log(
      "%cRequest URL:",
      "color: orange; font-size: 14px; font-weight: bold;"
    );
    console.log(url);
    console.log(
      "%cFull URL:",
      "color: orange; font-size: 14px; font-weight: bold;"
    );
    console.log(`${this.client.defaults.baseURL}${url}`);
    console.log(
      "%cParams:",
      "color: orange; font-size: 14px; font-weight: bold;"
    );
    console.log(params);

    const response = await this.client.get(url, { params });

    console.log(
      "%c🌐 [API CLIENT RESPONSE] 🌐",
      "color: purple; font-size: 16px; font-weight: bold; background: black; padding: 10px;"
    );
    console.log(
      "%cStatus:",
      "color: purple; font-size: 14px; font-weight: bold;"
    );
    console.log(response.status);
    console.log(
      "%cRaw response data:",
      "color: purple; font-size: 14px; font-weight: bold;"
    );
    console.log(response.data);

    const responseData = response.data;

    // If response has success property (backend format), extract data from it
    if (responseData && responseData.success && responseData.data) {
      console.log(
        "%cExtracted data:",
        "color: purple; font-size: 14px; font-weight: bold;"
      );
      console.log(responseData.data);
      return responseData.data;
    }

    // Otherwise, return the response directly
    console.log(
      "%cReturning raw response:",
      "color: purple; font-size: 14px; font-weight: bold;"
    );
    console.log(responseData);
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
      console.error("❌ apiClient.getPaginated error:", error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient();
export default apiClient;
