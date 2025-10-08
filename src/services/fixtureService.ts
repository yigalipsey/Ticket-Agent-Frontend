// services/FixtureService.ts
import { apiClient } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import { Fixture } from "@/types/fixture";

export interface ServiceResult<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export class FixtureService {
  /**
   * קבלת משחקים חמים
   */
  static async getHotFixtures(
    limit: number = 5
  ): Promise<ServiceResult<Fixture[]>> {
    try {
      const fixtures = await apiClient.get<Fixture[]>(
        `${API_ENDPOINTS.FIXTURES}/hot`,
        { limit }
      );

      return {
        data: fixtures,
        error: null,
        success: true,
      };
    } catch (error) {
      const err = error as Error;
      console.error("❌ שגיאה בטעינת משחקים חמים:", err);
      return {
        data: null,
        error: `שגיאה בטעינת המשחקים החמים: ${err.message || "שגיאה לא ידועה"}`,
        success: false,
      };
    }
  }

  /**
   * קבלת משחקי ליגה לפי leagueId עם פילטרים דינמיים
   */
  static async getLeagueFixtures(
    leagueId: string,
    options: {
      limit?: number;
      page?: number;
      month?: string | null;
      venueId?: string | null;
    } = {}
  ): Promise<ServiceResult<Fixture[]>> {
    try {
      const { limit = 20, page = 1, month = null, venueId = null } = options;

      const params: Record<string, string | number> = { leagueId, limit, page };
      if (month) params.month = month;
      if (venueId) params.venueId = venueId;

      console.log(
        "%c🎯 [FixtureService] getLeagueFixtures",
        "color: #8b5cf6; font-weight: bold",
        { leagueId, params }
      );

      const fixtures = await apiClient.get<Fixture[]>(
        `${API_ENDPOINTS.FIXTURES}/by-league`,
        params
      );

      return {
        data: fixtures,
        error: null,
        success: true,
      };
    } catch (error) {
      const err = error as Error;
      console.error("❌ שגיאה בטעינת משחקי ליגה:", err);
      return {
        data: null,
        error: `שגיאה בטעינת משחקי הליגה: ${err.message || "שגיאה לא ידועה"}`,
        success: false,
      };
    }
  }
}

export default FixtureService;
