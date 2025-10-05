import { apiClient } from "@/lib/api";
import axios from "axios";
import type { Team } from "@/types";

export class TeamService {
  private static client = apiClient;

  static async getPopularTeams(limit: number = 20): Promise<Team[]> {
    try {
      const response = await apiClient.client.get("/teams", {
        params: {
          limit: limit.toString(),
          sortBy: "priority",
          sortOrder: "asc",
        },
      });

      const responseData = response.data;
      if (responseData && responseData.success && responseData.data) {
        return responseData.data.slice(0, limit);
      }
      return [];
    } catch (error) {
      throw error;
    }
  }

  static async getTeamsByLeague(leagueIdOrSlug: string): Promise<Team[]> {
    try {
      // בדיקה אם זה ObjectID או slug
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(leagueIdOrSlug);
      const endpoint = `/teams/league/${leagueIdOrSlug}`;

      const response = await apiClient.client.get(endpoint);

      const responseData = response.data;
      if (responseData && responseData.success && responseData.data) {
        return responseData.data;
      }
      return [];
    } catch (error) {
      throw error;
    }
  }

  static async getTeamsByCountry(countryCode: string): Promise<Team[]> {
    try {
      const response = await apiClient.client.get("/teams", {
        params: {
          country: countryCode,
        },
      });

      const responseData = response.data;
      if (responseData && responseData.success && responseData.data) {
        return responseData.data;
      }
      return [];
    } catch (error) {
      throw error;
    }
  }

  static async searchTeams(query: string): Promise<Team[]> {
    try {
      const response = await apiClient.client.get("/teams/search", {
        params: {
          q: query,
        },
      });

      const responseData = response.data;
      if (responseData && responseData.success && responseData.data) {
        return responseData.data;
      }
      return [];
    } catch (error) {
      throw error;
    }
  }

  // פונקציות שמשתמשות ב-API (איטיות יותר, למידע נוסף)
  static async getTeam(slug: string, locale: string = "he") {
    try {
      const response = await apiClient.client.get(`/teams/slug/${slug}`, {
        params: { locale },
      });

      // Handle different response formats
      const responseData = (response as any).data;

      // If response has success property, extract data from it
      if (responseData && responseData.success && responseData.data) {
        return responseData.data;
      }

      // Otherwise, return the response directly
      return responseData || null;
    } catch (error) {
      throw error;
    }
  }

  static async getTeamDetails(teamId: string) {
    try {
      const response = await this.client.get(`/teams/${teamId}`);

      // Handle different response formats
      const responseData = (response as any).data;

      // If response has success property, extract data from it
      if (responseData && responseData.success && responseData.data) {
        return responseData.data;
      }

      // Otherwise, return the response directly
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  static async getTeamFixtures(
    teamIdOrSlug: string,
    params?: any,
    locale: string = "he"
  ) {
    try {
      // שליחת הפרמטרים עם upcoming=true כברירת מחדל
      const defaultParams = {
        upcoming: "true",
        limit: "10",
        locale,
        ...params, // פרמטרים מההוק יכולים לדרוס את ברירת המחדל
      };

      // כל הקריאות חייבות להיות עם ObjectID בלבד
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(teamIdOrSlug);

      if (!isObjectId) {
        throw new Error(
          `Team ID must be a valid MongoDB ObjectID, got: ${teamIdOrSlug}`
        );
      }

      const endpoint = `/football-events/team/${teamIdOrSlug}`;

      console.log(
        "Making API request to:",
        endpoint,
        "with params:",
        defaultParams,
        "isObjectId:",
        isObjectId
      );

      // קריאה באמצעות apiClient
      const response = await apiClient.client.get(endpoint, {
        params: defaultParams,
      });

      console.log("Raw response:", response);
      console.log("Response data:", response.data);

      // החזרת הנתונים בפורמט הנכון
      const responseData = response.data;

      console.log("TeamService response:", responseData); // Debug log

      // הבקאנד מחזיר את הנתונים ישירות ב-data
      if (
        responseData &&
        responseData.success &&
        Array.isArray(responseData.data)
      ) {
        // מיפוי הנתונים מהבקאנד לפורמט הצפוי
        const mappedFixtures = responseData.data.map((fixture: any) => ({
          id: fixture._id,
          slug: fixture.slug,
          homeTeam: {
            id: fixture.homeTeam._id,
            name: fixture.homeTeam.name,
            slug: fixture.homeTeam.slug,
            logo: fixture.homeTeam.logoUrl,
            city: fixture.venue?.city || "",
          },
          awayTeam: {
            id: fixture.awayTeam._id,
            name: fixture.awayTeam.name,
            slug: fixture.awayTeam.slug,
            logo: fixture.awayTeam.logoUrl,
            city: fixture.venue?.city || "",
          },
          venue: {
            id: fixture.venue._id,
            name: fixture.venue.name,
            city: fixture.venue.city,
            capacity: fixture.venue.capacity,
          },
          league: {
            id: fixture.league._id,
            name: fixture.league.name,
            country: fixture.league.country,
            logoUrl: fixture.league.logoUrl,
          },
          date: fixture.date,
          time: new Date(fixture.date).toLocaleTimeString(),
          status:
            fixture.status === "Not Started"
              ? "scheduled"
              : fixture.status.toLowerCase(),
          round: fixture.roundNumber,
          offers: [], // אין הצעות מהבקאנד
          lowestPrice: 0,
          totalOffers: 0,
        }));

        return mappedFixtures;
      }

      console.log("No data found in response:", responseData); // Debug log
      return []; // החזרת מערך ריק אם אין נתונים
    } catch (error) {
      console.error("Error fetching team fixtures:", error);
      console.error("Team ID/Slug:", teamIdOrSlug);
      console.error("Params:", params);
      throw error;
    }
  }

  static async getTeamStats(teamId: string, season?: string) {
    try {
      const response = await this.client.get(`/teams/${teamId}/stats`, {
        params: { season },
      });
      return (response as any).data;
    } catch (error) {
      console.error("Error fetching team stats:", error);
      throw error;
    }
  }

  static async getTeamPlayers(teamId: string) {
    try {
      const response = await this.client.get(`/teams/${teamId}/players`);
      return (response as any).data;
    } catch (error) {
      console.error("Error fetching team players:", error);
      throw error;
    }
  }

  /**
   * מתרגם נתונים מ-API לקבוצה מקומית
   * מחפש את הקבוצה בקבועים ומחזיר את המידע המתורגם
   */
  static translateAPITeamToLocal(apiTeam: any): Team | undefined {
    if (!apiTeam) return undefined;

    // Return the API team data directly since we don't have static teams anymore
    return apiTeam;
  }

  /**
   * מתרגם משחק מ-API עם שמות קבוצות מקומיים
   */
  static translateAPIFixtureToLocal(apiFixture: any): any {
    if (!apiFixture) return null;

    const translatedFixture = { ...apiFixture };

    // תרגום קבוצה ביתית
    if (apiFixture.homeTeam) {
      const localHomeTeam = this.translateAPITeamToLocal(apiFixture.homeTeam);
      if (localHomeTeam) {
        translatedFixture.homeTeam = {
          ...apiFixture.homeTeam,
          localData: localHomeTeam,
        };
      }
    }

    // תרגום קבוצה אורחת
    if (apiFixture.awayTeam) {
      const localAwayTeam = this.translateAPITeamToLocal(apiFixture.awayTeam);
      if (localAwayTeam) {
        translatedFixture.awayTeam = {
          ...apiFixture.awayTeam,
          localData: localAwayTeam,
        };
      }
    }

    return translatedFixture;
  }
}

export default TeamService;
