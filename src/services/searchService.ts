// services/SearchService.ts
import { apiClient } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";

export interface ServiceResult<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface SearchTeam {
  _id: string;
  name: string;
  code: string;
  slug: string;
}

export interface SearchFixture {
  _id: string;
  date: string;
  slug: string;
  homeTeam: {
    name: string;
  };
  awayTeam: {
    name: string;
  };
  venue: {
    name: string;
  };
}

export interface TeamWithFixtures {
  team: SearchTeam;
  fixtures: SearchFixture[];
  fixturesCount: number;
}

export interface SearchResult {
  query: string;
  teams: TeamWithFixtures[];
  totalTeams: number;
  totalFixtures: number;
  searchOptions: {
    limit: number;
    fixturesLimit: number;
    includePastFixtures: boolean;
    leagueId: string | null;
  };
}

export interface SearchSuggestion {
  name: string;
  code: string;
  slug: string;
}

export class SearchService {
  /**
   * חיפוש קבוצות עם המשחקים הקרובים שלהן
   */
  static async searchTeams(
    query: string,
    options: {
      limit?: number;
      fixturesLimit?: number;
      includePastFixtures?: boolean;
      leagueId?: string | null;
      onlyWithOffers?: boolean;
    } = {}
  ): Promise<ServiceResult<SearchResult>> {
    try {
      const {
        limit = 10,
        fixturesLimit = 5,
        includePastFixtures = false,
        leagueId = null,
        onlyWithOffers = true,
      } = options;

      // Validate query
      if (!query || query.trim().length < 2) {
        return {
          data: null,
          error: "חיפוש חייב להכיל לפחות 2 תווים",
          success: false,
        };
      }

      const params: Record<string, string | number> = {
        q: query.trim(),
        limit: limit.toString(),
        fixturesLimit: fixturesLimit.toString(),
        includePastFixtures: includePastFixtures.toString(),
        onlyWithOffers: onlyWithOffers.toString(),
      };

      if (leagueId) {
        params.leagueId = leagueId;
      }

      console.log("🔍 [SEARCH TEAMS API REQUEST] 🔍");
      console.log("URL:", `${API_ENDPOINTS.SEARCH}/teams`);
      console.log("Params:", params);

      const response = await apiClient.get<SearchResult>(
        `${API_ENDPOINTS.SEARCH}/teams`,
        params
      );

      console.log("🔍 [SEARCH TEAMS API RESPONSE] 🔍");
      console.log("Response:", response);

      return {
        data: response,
        error: null,
        success: true,
      };
    } catch (error) {
      const err = error as Error;
      console.error("❌ שגיאה בחיפוש קבוצות:", err);
      return {
        data: null,
        error: `שגיאה בחיפוש: ${err.message || "שגיאה לא ידועה"}`,
        success: false,
      };
    }
  }

  /**
   * קבלת הצעות חיפוש
   */
  static async getSuggestions(
    query: string,
    limit: number = 5
  ): Promise<ServiceResult<SearchSuggestion[]>> {
    try {
      if (!query || query.trim().length < 1) {
        return {
          data: [],
          error: null,
          success: true,
        };
      }

      const params = {
        q: query.trim(),
        limit: Math.min(limit, 10),
      };

      console.log("💡 [SEARCH SUGGESTIONS API REQUEST] 💡");
      console.log("URL:", `${API_ENDPOINTS.SEARCH}/suggestions`);
      console.log("Params:", params);

      const response = await apiClient.get<{ suggestions: SearchSuggestion[] }>(
        `${API_ENDPOINTS.SEARCH}/suggestions`,
        params
      );

      console.log("💡 [SEARCH SUGGESTIONS API RESPONSE] 💡");
      console.log("Response:", response);

      return {
        data: response.suggestions || [],
        error: null,
        success: true,
      };
    } catch (error) {
      const err = error as Error;
      console.error("❌ שגיאה בקבלת הצעות חיפוש:", err);
      return {
        data: [],
        error: `שגיאה בקבלת הצעות: ${err.message || "שגיאה לא ידועה"}`,
        success: false,
      };
    }
  }

  /**
   * בדיקת בריאות שירות החיפוש
   */
  static async checkHealth(): Promise<ServiceResult<boolean>> {
    try {
      const response = await apiClient.get<{ success: boolean }>(
        `${API_ENDPOINTS.SEARCH}/health`
      );

      return {
        data: response.success,
        error: null,
        success: true,
      };
    } catch (error) {
      const err = error as Error;
      console.error("❌ שגיאה בבדיקת בריאות שירות החיפוש:", err);
      return {
        data: false,
        error: `שגיאה בבדיקת בריאות: ${err.message || "שגיאה לא ידועה"}`,
        success: false,
      };
    }
  }
}

export default SearchService;
