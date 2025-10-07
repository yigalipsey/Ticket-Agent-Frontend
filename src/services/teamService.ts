import { apiClient } from "@/lib/api";
import type { Team } from "@/types";

export class TeamService {
  private static client = apiClient;

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

      // החזרת הנתונים בפורמט הנכון
      const responseData = response.data;

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

      return []; // החזרת מערך ריק אם אין נתונים
    } catch (error) {
      console.error("Error fetching team fixtures:", error);
      console.error("Team ID/Slug:", teamIdOrSlug);
      console.error("Params:", params);
      throw error;
    }
  }
}

export default TeamService;
