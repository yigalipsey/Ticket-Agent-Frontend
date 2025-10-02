import { apiClient } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import { Fixture, FixtureQuery, PaginatedResponse } from "@/types";

export class FixtureService {
  static async getFixtures(
    query?: FixtureQuery
  ): Promise<PaginatedResponse<Fixture>> {
    return apiClient.getPaginated<Fixture>(API_ENDPOINTS.FIXTURES, query);
  }

  static async getFixture(slug: string): Promise<Fixture> {
    return apiClient.get<Fixture>(`${API_ENDPOINTS.FIXTURES}/${slug}`);
  }

  static async getFixturesByLeague(
    leagueIdOrSlug: string,
    query?: FixtureQuery,
    locale: string = "he"
  ): Promise<PaginatedResponse<Fixture>> {
    // בדיקה אם זה ObjectID או slug
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(leagueIdOrSlug);
    const endpoint = isObjectId
      ? `${API_ENDPOINTS.FOOTBALL_EVENTS}/league/${leagueIdOrSlug}`
      : `${API_ENDPOINTS.LEAGUES}/${leagueIdOrSlug}/fixtures`;

    console.log("🔍 FixtureService.getFixturesByLeague called with:", {
      leagueIdOrSlug,
      query,
      locale,
      endpoint,
      isObjectId,
    });

    try {
      const result = await apiClient.getPaginated<Fixture>(endpoint, {
        ...query,
        locale,
      } as Record<string, unknown>);

      console.log("✅ FixtureService.getFixturesByLeague result:", result);
      return result;
    } catch (error) {
      console.error("❌ FixtureService.getFixturesByLeague error:", error);
      throw error;
    }
  }

  static async getFixturesByTeam(
    teamIdOrSlug: string,
    query?: FixtureQuery
  ): Promise<PaginatedResponse<Fixture>> {
    // בדיקה אם זה ObjectID או slug
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(teamIdOrSlug);
    const endpoint = isObjectId
      ? `${API_ENDPOINTS.TEAMS}/id/${teamIdOrSlug}/fixtures`
      : `${API_ENDPOINTS.TEAMS}/${teamIdOrSlug}/fixtures`;

    console.log("🔍 FixtureService.getFixturesByTeam called with:", {
      teamIdOrSlug,
      query,
      endpoint,
      isObjectId,
    });

    return apiClient.getPaginated<Fixture>(
      endpoint,
      query as Record<string, unknown>
    );
  }

  static async getFixturesByVenue(
    venueIdOrSlug: string,
    query?: FixtureQuery
  ): Promise<PaginatedResponse<Fixture>> {
    // בדיקה אם זה ObjectID או slug
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(venueIdOrSlug);
    const endpoint = isObjectId
      ? `${API_ENDPOINTS.VENUES}/id/${venueIdOrSlug}/fixtures`
      : `${API_ENDPOINTS.VENUES}/${venueIdOrSlug}/fixtures`;

    return apiClient.getPaginated<Fixture>(
      endpoint,
      query as Record<string, unknown>
    );
  }

  static async getUpcomingFixtures(
    limit: number = 10,
    locale: string = "he"
  ): Promise<Fixture[]> {
    const response = await apiClient.getPaginated<Fixture>(
      API_ENDPOINTS.FIXTURES,
      {
        limit,
        sortBy: "date",
        sortOrder: "asc",
        filters: {
          status: "scheduled",
        },
        locale,
      }
    );
    return response.data;
  }

  static async searchFixtures(
    query: string,
    filters?: FixtureQuery["filters"]
  ): Promise<Fixture[]> {
    const response = await apiClient.getPaginated<Fixture>(
      API_ENDPOINTS.SEARCH,
      {
        q: query,
        type: "fixtures",
        ...filters,
      }
    );
    return response.data;
  }
}

export default FixtureService;
