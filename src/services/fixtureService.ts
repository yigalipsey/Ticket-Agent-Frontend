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
      const rawFixtures = await apiClient.get<any[]>(
        `${API_ENDPOINTS.FIXTURES}/hot`,
        { limit }
      );

      // Normalize the data to match FixtureCard expectations
      const fixtures: Fixture[] = rawFixtures.map((fixture: any) => ({
        ...fixture,
        id: fixture._id || fixture.id,
        homeTeam: fixture.homeTeam
          ? {
              ...fixture.homeTeam,
              id: fixture.homeTeam._id || fixture.homeTeam.id,
              name:
                fixture.homeTeam.name_he ||
                fixture.homeTeam.name_en ||
                fixture.homeTeam.name,
              nameHe: fixture.homeTeam.name_he,
              logo: fixture.homeTeam.logoUrl || fixture.homeTeam.logo,
              logoUrl: fixture.homeTeam.logoUrl || fixture.homeTeam.logo,
            }
          : null,
        awayTeam: fixture.awayTeam
          ? {
              ...fixture.awayTeam,
              id: fixture.awayTeam._id || fixture.awayTeam.id,
              name:
                fixture.awayTeam.name_he ||
                fixture.awayTeam.name_en ||
                fixture.awayTeam.name,
              nameHe: fixture.awayTeam.name_he,
              logo: fixture.awayTeam.logoUrl || fixture.awayTeam.logo,
              logoUrl: fixture.awayTeam.logoUrl || fixture.awayTeam.logo,
            }
          : null,
        venue: fixture.venue
          ? {
              ...fixture.venue,
              id: fixture.venue._id || fixture.venue.id,
              name:
                fixture.venue.name_he ||
                fixture.venue.name_en ||
                fixture.venue.name,
              nameHe: fixture.venue.name_he,
              city:
                fixture.venue.city_he ||
                fixture.venue.city_en ||
                fixture.venue.city,
              cityHe: fixture.venue.city_he,
            }
          : null,
      }));

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
  ): Promise<
    ServiceResult<{ fixtures: Fixture[]; availableMonths: string[] }>
  > {
    try {
      const { limit = 20, page = 1, month = null, venueId = null } = options;

      const params: Record<string, string | number> = { leagueId, limit, page };
      if (month) params.month = month;
      if (venueId) params.venueId = venueId;

      // הבקאנד מחזיר data ישירות דרך apiClient.get
      const response = await apiClient.get<
        Fixture[] | { fixtures: Fixture[]; availableMonths: string[] }
      >(`${API_ENDPOINTS.FIXTURES}/by-league`, params);

      // הבקאנד עשוי להחזיר מערך או אובייקט עם fixtures
      let fixtures: Fixture[] = [];
      let availableMonths: string[] = [];

      if (Array.isArray(response)) {
        fixtures = response;
      } else if (response && typeof response === "object") {
        fixtures = (response as { fixtures?: Fixture[] }).fixtures || [];
        availableMonths =
          (response as { availableMonths?: string[] }).availableMonths || [];
      }

      return {
        data: {
          fixtures,
          availableMonths,
        },
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

  /**
   * קבלת משחקי קבוצה לפי teamId
   */
  static async getTeamFixtures(
    teamId: string,
    options: {
      limit?: string;
      upcoming?: string;
      locale?: string;
    } = {}
  ): Promise<Fixture[]> {
    try {
      // שליחת הפרמטרים עם upcoming=true כברירת מחדל
      const defaultParams = {
        upcoming: "true",
        limit: "10",
        locale: "he",
        ...options,
      };

      // כל הקריאות חייבות להיות עם ObjectID בלבד
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(teamId);

      if (!isObjectId) {
        throw new Error(
          `Team ID must be a valid MongoDB ObjectID, got: ${teamId}`
        );
      }

      // Endpoint תקין - תואם לבקאנד
      const endpoint = `${API_ENDPOINTS.FIXTURES}/by-team`;
      const queryParams = {
        teamId,
        ...defaultParams,
      };

      // קריאה באמצעות apiClient (מחזיר את data.data אוטומטית)
      const fixturesData = await apiClient.get<Fixture[]>(
        endpoint,
        queryParams
      );

      // הבקאנד מחזיר נתונים גולמיים - צריך לנרמל
      if (Array.isArray(fixturesData)) {
        const mappedFixtures = fixturesData.map((fixture) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const f = fixture as Record<string, any>; // Type assertion for mapping
          return {
            id: f._id || f.id,
            _id: f._id || f.id,
            slug: f.slug,
            homeTeam: {
              id: f.homeTeam?._id || f.homeTeam?.id,
              _id: f.homeTeam?._id || f.homeTeam?.id,
              name: f.homeTeam?.name,
              slug: f.homeTeam?.slug,
              logo: f.homeTeam?.logoUrl,
              logoUrl: f.homeTeam?.logoUrl,
              city: f.venue?.city || "",
            },
            awayTeam: {
              id: f.awayTeam?._id || f.awayTeam?.id,
              _id: f.awayTeam?._id || f.awayTeam?.id,
              name: f.awayTeam?.name,
              slug: f.awayTeam?.slug,
              logo: f.awayTeam?.logoUrl,
              logoUrl: f.awayTeam?.logoUrl,
              city: f.venue?.city || "",
            },
            venue: {
              id: f.venue?._id || f.venue?.id,
              _id: f.venue?._id || f.venue?.id,
              name: f.venue?.name,
              city: f.venue?.city,
              capacity: f.venue?.capacity,
            },
            league: {
              id: f.league?._id || f.league?.id,
              _id: f.league?._id || f.league?.id,
              name: f.league?.name,
              nameHe: f.league?.nameHe,
              slug: f.league?.slug,
              country: f.league?.country,
              logoUrl: f.league?.logoUrl,
            },
            date: f.date,
            time: new Date(f.date).toLocaleTimeString(),
            status:
              f.status === "Not Started"
                ? "scheduled"
                : f.status?.toLowerCase(),
            round: f.roundNumber || f.round,
            offers: f.offers || [],
            lowestPrice: f.minPrice?.amount || 0,
            totalOffers: f.totalOffers || 0,
            minPrice: f.minPrice,
          };
        }) as Fixture[];

        return mappedFixtures;
      }

      return [];
    } catch (error) {
      const err = error as Error;
      console.error("❌ שגיאה בטעינת משחקי קבוצה:", err);
      console.error("Team ID:", teamId);
      console.error("Options:", options);
      throw error;
    }
  }
}

export default FixtureService;
