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
  static async getHotFixtures(limit: number = 5): Promise<ServiceResult<Fixture[]>> {
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
    } catch (error: any) {
      console.error("❌ שגיאה בטעינת משחקים חמים:", error);
      return {
        data: null,
        error: `שגיאה בטעינת המשחקים החמים: ${error.message || "שגיאה לא ידועה"}`,
        success: false,
      };
    }
  }
}

export default FixtureService;