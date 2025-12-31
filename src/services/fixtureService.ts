// services/FixtureService.ts
import { apiClient } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import { Fixture } from "@/types/fixture";
import { Team } from "@/types/team";
import { Venue } from "@/types/venue";

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
      const rawFixtures = await apiClient.get<Fixture[]>(
        `${API_ENDPOINTS.FIXTURES}/hot`,
        { limit }
      );

      // Normalize the data to match FixtureCard expectations
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fixtures: Fixture[] = rawFixtures.map((fixture: any) => ({
        ...fixture,
        id: fixture._id || fixture.id,
        homeTeam: fixture.homeTeam
          ? ({
            ...fixture.homeTeam,
            id: fixture.homeTeam._id || fixture.homeTeam.id,
            name: fixture.homeTeam.name || fixture.homeTeam.name_en || "",
            slug: fixture.homeTeam.slug || "",
            country:
              fixture.homeTeam.country_he ||
              fixture.homeTeam.country_en ||
              fixture.homeTeam.country ||
              "",
            logo: fixture.homeTeam.logoUrl || fixture.homeTeam.logo,
            logoUrl: fixture.homeTeam.logoUrl || fixture.homeTeam.logo,
          } as Team)
          : ({
            name: fixture.homeTeamName || "",
            slug: "",
            country: "",
          } as Team),
        awayTeam: fixture.awayTeam
          ? ({
            ...fixture.awayTeam,
            id: fixture.awayTeam._id || fixture.awayTeam.id,
            name: fixture.awayTeam.name || fixture.awayTeam.name_en || "",
            slug: fixture.awayTeam.slug || "",
            country:
              fixture.awayTeam.country_he ||
              fixture.awayTeam.country_en ||
              fixture.awayTeam.country ||
              "",
            logo: fixture.awayTeam.logoUrl || fixture.awayTeam.logo,
            logoUrl: fixture.awayTeam.logoUrl || fixture.awayTeam.logo,
          } as Team)
          : ({
            name: fixture.awayTeamName || "",
            slug: "",
            country: "",
          } as Team),
        venue: fixture.venue
          ? ({
            ...fixture.venue,
            id: fixture.venue._id || fixture.venue.id,
            slug: fixture.venue.slug || "",
            name: fixture.venue.name || "",
            nameHe: fixture.venue.name,
            country:
              fixture.venue.country_he ||
              fixture.venue.country_en ||
              fixture.venue.country ||
              "",
            city:
              fixture.venue.city_he ||
              fixture.venue.city_en ||
              fixture.venue.city ||
              "",
            cityHe: fixture.venue.city_he,
            capacity: fixture.venue.capacity || 0,
            surface:
              (fixture.venue.surface as "grass" | "artificial" | "hybrid") ||
              "grass",
          } as Venue)
          : ({
            slug: "",
            country: "",
            capacity: 0,
            surface: "grass" as const,
          } as Venue),
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
      hasOffers?: boolean;
    } = {}
  ): Promise<
    ServiceResult<{ fixtures: Fixture[]; availableMonths: string[] }>
  > {
    try {
      const {
        limit,
        page = 1,
        month = null,
        venueId = null,
        hasOffers = false,
      } = options;

      const params: Record<string, string | number | boolean> = {
        leagueId,
        page,
      };
      // שולח limit רק אם הוא מוגדר במפורש - כך הבקאנד יחזיר את כל המשחקים מה-cache
      if (limit !== undefined) {
        params.limit = limit;
      }
      if (month) params.month = month;
      if (venueId) params.venueId = venueId;
      if (hasOffers) params.hasOffers = true;

      // הבקאנד מחזיר data ישירות דרך apiClient.get
      const response = await apiClient.get<
        Fixture[] | { fixtures: Fixture[]; availableMonths: string[] }
      >(`${API_ENDPOINTS.FIXTURES}/by-league`, params);

      // הבקאנד עשוי להחזיר מערך או אובייקט עם fixtures
      let rawFixtures: any[] = [];
      let availableMonths: string[] = [];

      if (Array.isArray(response)) {
        rawFixtures = response;
      } else if (response && typeof response === "object") {
        rawFixtures = (response as { fixtures?: any[] }).fixtures || [];
        availableMonths =
          (response as { availableMonths?: string[] }).availableMonths || [];
      }

      // נרמול הנתונים - המרת city_he/city_en ל-city/cityHe
      const fixtures: Fixture[] = rawFixtures.map((f) => {
        return {
          id: f._id || f.id,
          _id: f._id || f.id,
          slug: f.slug,
          homeTeam: f.homeTeam
            ? ({
              id: f.homeTeam._id || f.homeTeam.id,
              _id: f.homeTeam._id || f.homeTeam.id,
              name: f.homeTeam.name || f.homeTeam.name_en || "",
              slug: f.homeTeam.slug || "",
              country:
                f.homeTeam.country_he ||
                f.homeTeam.country_en ||
                f.homeTeam.country ||
                "",
              logo: f.homeTeam.logoUrl || f.homeTeam.logo,
              logoUrl: f.homeTeam.logoUrl || f.homeTeam.logo,
              city:
                f.venue?.city_he || f.venue?.city_en || f.venue?.city || "",
            } as Team)
            : ({
              name: f.homeTeamName || "",
              slug: "",
              country: "",
              city:
                f.venue?.city_he || f.venue?.city_en || f.venue?.city || "",
            } as Team),
          awayTeam: f.awayTeam
            ? ({
              id: f.awayTeam._id || f.awayTeam.id,
              _id: f.awayTeam._id || f.awayTeam.id,
              name: f.awayTeam.name || f.awayTeam.name_en || "",
              slug: f.awayTeam.slug || "",
              country:
                f.awayTeam.country_he ||
                f.awayTeam.country_en ||
                f.awayTeam.country ||
                "",
              logo: f.awayTeam.logoUrl || f.awayTeam.logo,
              logoUrl: f.awayTeam.logoUrl || f.awayTeam.logo,
              city:
                f.venue?.city_he || f.venue?.city_en || f.venue?.city || "",
            } as Team)
            : ({
              name: f.awayTeamName || "",
              slug: "",
              country: "",
              city:
                f.venue?.city_he || f.venue?.city_en || f.venue?.city || "",
            } as Team),
          venue: {
            id: f.venue?._id || f.venue?.id,
            _id: f.venue?._id || f.venue?.id,
            slug: f.venue?.slug || "",
            name: f.venue?.name || "",
            nameHe: f.venue?.name,
            country:
              f.venue?.country_he ||
              f.venue?.country_en ||
              f.venue?.country ||
              "",
            city: f.venue?.city_he || f.venue?.city_en || f.venue?.city || "",
            cityHe: f.venue?.city_he,
            capacity: f.venue?.capacity || 0,
            surface:
              (f.venue?.surface as "grass" | "artificial" | "hybrid") ||
              "grass",
          } as Venue,
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
            f.status === "Not Started" ? "scheduled" : f.status?.toLowerCase(),
          round: f.roundNumber || f.round,
          offers: f.offers || [],
          lowestPrice: f.minPrice?.amount || 0,
          totalOffers: f.totalOffers || 0,
          minPrice: f.minPrice,
        };
      }) as Fixture[];

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
      hasOffers?: string | boolean;
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
            homeTeam: f.homeTeam
              ? ({
                id: f.homeTeam._id || f.homeTeam.id,
                _id: f.homeTeam._id || f.homeTeam.id,
                name: f.homeTeam.name || f.homeTeam.name_en || "",
                slug: f.homeTeam.slug || "",
                country:
                  f.homeTeam.country_he ||
                  f.homeTeam.country_en ||
                  f.homeTeam.country ||
                  "",
                logo: f.homeTeam.logoUrl || f.homeTeam.logo,
                logoUrl: f.homeTeam.logoUrl || f.homeTeam.logo,
                city: f.venue?.city || "",
              } as Team)
              : ({
                name: f.homeTeamName || "",
                slug: "",
                country: "",
                city: f.venue?.city || "",
              } as Team),
            awayTeam: f.awayTeam
              ? ({
                id: f.awayTeam._id || f.awayTeam.id,
                _id: f.awayTeam._id || f.awayTeam.id,
                name: f.awayTeam.name || f.awayTeam.name_en || "",
                slug: f.awayTeam.slug || "",
                country:
                  f.awayTeam.country_he ||
                  f.awayTeam.country_en ||
                  f.awayTeam.country ||
                  "",
                logo: f.awayTeam.logoUrl || f.awayTeam.logo,
                logoUrl: f.awayTeam.logoUrl || f.awayTeam.logo,
                city: f.venue?.city || "",
              } as Team)
              : ({
                name: f.awayTeamName || "",
                slug: "",
                country: "",
                city: f.venue?.city || "",
              } as Team),
            venue: {
              id: f.venue?._id || f.venue?.id,
              _id: f.venue?._id || f.venue?.id,
              slug: f.venue?.slug || "",
              name: f.venue?.name || "",
              nameHe: f.venue?.name,
              country:
                f.venue?.country_he ||
                f.venue?.country_en ||
                f.venue?.country ||
                "",
              city: f.venue?.city_he || f.venue?.city_en || f.venue?.city || "",
              cityHe: f.venue?.city_he,
              capacity: f.venue?.capacity || 0,
              surface:
                (f.venue?.surface as "grass" | "artificial" | "hybrid") ||
                "grass",
            } as Venue,
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

  /**
   * קבלת פרטי משחק מלאים לפי Slug
   */
  static async getFixtureBySlug(slug: string): Promise<Fixture | null> {
    try {
      const response = await apiClient.get<Fixture>(
        `${API_ENDPOINTS.FIXTURES}/by-slug/${slug}`
      );
      return response;
    } catch (error) {
      console.error("❌ שגיאה בטעינת פרטי משחק לפי Slug:", error);
      return null;
    }
  }

  /**
   * קבלת פרטי משחק מלאים לפי ID
   */
  static async getFixtureById(id: string): Promise<Fixture | null> {
    try {
      const response = await apiClient.get<Fixture>(
        `${API_ENDPOINTS.FIXTURES}/${id}`
      );
      return response;
    } catch (error) {
      console.error("❌ שגיאה בטעינת פרטי משחק:", error);
      return null;
    }
  }
}

export default FixtureService;
