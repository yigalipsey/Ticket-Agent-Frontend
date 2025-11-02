import { MetadataRoute } from "next";
import LeagueService from "@/services/leagueService";
import FixtureService from "@/services/fixtureService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.ticketagent.co.il";

  // תאריך עדכון אחיד - תאריך נוכחי
  const now = new Date();

  // URLs סטטיים - כל הדפים הציבוריים באתר
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/leagues`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fixtures`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/teams`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/venues`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/agents`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.65,
    },
  ];

  // URLs דינמיים - ליגות, קבוצות ומשחקים
  const dynamicUrls: MetadataRoute.Sitemap = [];

  try {
    // שליפת כל הליגות עם הקבוצות
    const leaguesResult = await LeagueService.getAllLeaguesWithTeams();

    if (leaguesResult.success && leaguesResult.data) {
      for (const league of leaguesResult.data) {
        // הוספת URL של הליגה
        if (league.slug) {
          dynamicUrls.push({
            url: `${baseUrl}/leagues/${league.slug}`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 0.85,
          });
        }

        // הוספת URLs של הקבוצות
        if (league.teams && Array.isArray(league.teams)) {
          for (const team of league.teams) {
            if (team.slug) {
              dynamicUrls.push({
                url: `${baseUrl}/teams/${team.slug}`,
                lastModified: now,
                changeFrequency: "weekly",
                priority: 0.75,
              });
            }
          }
        }
      }
    }
  } catch (error) {
    // אם יש שגיאה בקבלת הליגות, נמשיך בלי URLs דינמיים
    // זה מונע שגיאת build אם ה-API לא זמין
    console.error("Error fetching leagues for sitemap:", error);
  }

  // הוספת משחקים חמים - עד 50 משחקים
  try {
    const hotFixturesResult = await FixtureService.getHotFixtures(50);
    if (hotFixturesResult.success && hotFixturesResult.data) {
      for (const fixture of hotFixturesResult.data) {
        if (fixture.slug) {
          dynamicUrls.push({
            url: `${baseUrl}/fixtures/${fixture.slug}`,
            lastModified: now,
            changeFrequency: "hourly",
            priority: 0.8,
          });
        }
      }
    }
  } catch (error) {
    // אם יש שגיאה, נמשיך בלי משחקים
    console.error("Error fetching fixtures for sitemap:", error);
  }

  // שילוב של URLs סטטיים ודינמיים
  return [...staticUrls, ...dynamicUrls];
}
