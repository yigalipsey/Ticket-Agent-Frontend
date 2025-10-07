// services/LeagueService.ts
import { apiClient } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import { League } from "@/types";

export interface ServiceResult<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export class LeagueService {
  /**
   * קבלת ליגה ספציפית לפי מזהה
   */
  static async getLeague(id: string): Promise<ServiceResult<League>> {
    try {
      const league = await apiClient.get<League>(
        `${API_ENDPOINTS.LEAGUES}/${id}`
      );
      return {
        data: league,
        error: null,
        success: true,
      };
    } catch (error: any) {
      console.error("❌ שגיאה בטעינת ליגה:", error);
      return {
        data: null,
        error: `שגיאה בטעינת הליגה: ${error.message || "שגיאה לא ידועה"}`,
        success: false,
      };
    }
  }

  /**
   * קבלת כל הליגות (עם או בלי קבוצות)
   */
  static async getAllLeagues(
    withTeams: boolean = false
  ): Promise<ServiceResult<League[]>> {
    try {
      const leagues = await apiClient.get<League[]>(
        `${API_ENDPOINTS.LEAGUES}`,
        { withTeams }
      );

      return {
        data: leagues,
        error: null,
        success: true,
      };
    } catch (error: any) {
      console.error("❌ שגיאה בטעינת ליגות:", error);
      return {
        data: null,
        error: `שגיאה בטעינת הליגות: ${error.message || "שגיאה לא ידועה"}`,
        success: false,
      };
    }
  }

  /**
   * קבלת כל הליגות עם הקבוצות שלהן (קיצור נוח)
   */
  static async getAllLeaguesWithTeams(): Promise<ServiceResult<League[]>> {
    return this.getAllLeagues(true);
  }
}

export default LeagueService;
