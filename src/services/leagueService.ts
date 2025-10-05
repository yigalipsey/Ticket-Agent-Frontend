import { apiClient } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import { League } from "@/types";

interface ServiceResult<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export class LeagueService {
  /**
   * מקבל ליגה ספציפית לפי מזהה
   */
  static async getLeague(id: string): ServiceResult<League> {
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
      console.error("שגיאה בטעינת ליגה:", error);
      return {
        data: null,
        error: `שגיאה בטעינת הליגה: ${error.message || "שגיאה לא ידועה"}`,
        success: false,
      };
    }
  }

  /**
   * מקבל את כל הליגות עם הקבוצות שלהן
   */
  static async getAllLeaguesWithTeams(): ServiceResult<League[]> {
    try {
      const response = await apiClient.get(
        `${API_ENDPOINTS.LEAGUES}?withTeams=true`
      );

      // וידוא שהתגובה היא מערך ליגות
      const leagues = Array.isArray(response) ? response : response?.data || [];

      return {
        data: leagues,
        error: null,
        success: true,
      };
    } catch (error: any) {
      console.error("שגיאה בטעינת ליגות עם קבוצות:", error);
      return {
        data: null,
        error: `שגיאה בטעינת הליגות: ${error.message || "שגיאה לא ידועה"}`,
        success: false,
      };
    }
  }
}

export default LeagueService;
