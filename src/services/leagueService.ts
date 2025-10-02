import { apiClient } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import { League, LeagueQuery, PaginatedResponse } from "@/types";

export class LeagueService {
  static async getLeagues(
    query?: LeagueQuery
  ): Promise<PaginatedResponse<League>> {
    return apiClient.getPaginated<League>(API_ENDPOINTS.LEAGUES, query);
  }

  static async getLeague(id: string): Promise<League> {
    return apiClient.get<League>(`${API_ENDPOINTS.LEAGUES}/${id}`);
  }

  // פונקציות שמשתמשות ב-API
  static async getActiveLeagues(): Promise<League[]> {
    // קריאה ל-API לליגות פעילות
    const response = await apiClient.get(
      `${API_ENDPOINTS.LEAGUES}?isActive=true`
    );
    return response.data || [];
  }

  static async getPopularLeagues(limit: number = 10): Promise<League[]> {
    // קריאה ל-API החדש לליגות פופולריות
    const response = await apiClient.get<League[]>(
      `${API_ENDPOINTS.LEAGUES}/popular?limit=${limit}`
    );
    console.log("LeagueService.getPopularLeagues - Response:", response);
    return response || [];
  }

  static async searchLeagues(query: string): Promise<League[]> {
    // קריאה ל-API לחיפוש ליגות
    const response = await apiClient.get(
      `${API_ENDPOINTS.LEAGUES}?search=${encodeURIComponent(query)}`
    );
    return response.data || [];
  }

  static async getLeaguesByCountry(countryCode: string): Promise<League[]> {
    // קריאה ל-API לליגות לפי מדינה
    const response = await apiClient.get(
      `${API_ENDPOINTS.LEAGUES}?country=${encodeURIComponent(countryCode)}`
    );
    return response.data || [];
  }

  static async getAllAvailableLeagues(): Promise<League[]> {
    // קריאה ל-API לכל הליגות
    const response = await apiClient.get(`${API_ENDPOINTS.LEAGUES}`);
    console.log("LeagueService.getAllAvailableLeagues - Response:", response);
    return response || [];
  }
}

export default LeagueService;
