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
   * קבלת ליגה ספציפית לפי מזהה (עם או בלי קבוצות)
   */
  static async getLeague(
    id: string,
    withTeams: boolean = false
  ): Promise<ServiceResult<League>> {
    try {
      const league = await apiClient.get<League>(
        `${API_ENDPOINTS.LEAGUES}/${id}`,
        { withTeams }
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
      const fullUrl = `${API_ENDPOINTS.LEAGUES}`;

      console.log(
        "%c🏆 [LEAGUES API REQUEST] 🏆",
        "color: blue; font-size: 16px; font-weight: bold; background: black; padding: 10px;"
      );
      console.log(
        "%cFull URL:",
        "color: blue; font-size: 14px; font-weight: bold;"
      );
      console.log(fullUrl);
      console.log(
        "%cParams:",
        "color: blue; font-size: 14px; font-weight: bold;"
      );
      console.log({ withTeams });

      const leagues = await apiClient.get<League[]>(
        `${API_ENDPOINTS.LEAGUES}`,
        { withTeams }
      );

      console.log(
        "%c🏆 [LEAGUES API RESPONSE] 🏆",
        "color: green; font-size: 16px; font-weight: bold; background: black; padding: 10px;"
      );
      console.log(
        "%cRaw response:",
        "color: green; font-size: 14px; font-weight: bold;"
      );
      console.log(leagues);

      return {
        data: leagues,
        error: null,
        success: true,
      };
    } catch (error: any) {
      console.log(
        "%c🏆 [LEAGUES API ERROR] 🏆",
        "color: red; font-size: 16px; font-weight: bold; background: black; padding: 10px;"
      );
      console.error("❌ שגיאה בטעינת ליגות:", error);
      console.log(
        "%cError details:",
        "color: red; font-size: 14px; font-weight: bold;"
      );
      console.log(error);
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

  /**
   * קבלת רק ID של ליגה לפי slug (אולטרה מהיר!)
   * מחזיר רק את ה-ID וה-slug, ללא מידע נוסף
   */
  static async getLeagueIdBySlug(
    slug: string
  ): Promise<ServiceResult<{ _id: string; slug: string }>> {
    try {
      const data = await apiClient.get<{ _id: string; slug: string }>(
        `${API_ENDPOINTS.LEAGUES}/slug/${slug}/id`
      );

      return {
        data,
        error: null,
        success: true,
      };
    } catch (error: any) {
      console.error("❌ שגיאה בטעינת ID ליגה:", error);
      return {
        data: null,
        error: `שגיאה בטעינת ID הליגה: ${error.message || "שגיאה לא ידועה"}`,
        success: false,
      };
    }
  }
}

export default LeagueService;
