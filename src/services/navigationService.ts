import { League, Team } from "@/types";

export interface NavigationData {
  leagues: Array<{
    id: string;
    slug: string;
    name: string;
    nameHe: string;
    teams: Array<{
      id: string;
      slug: string;
      name: string;
    }>;
  }>;
}

/**
 * שירות לניווט על פי slug ועל פי מזהה מונגו
 */
class NavigationService {
  private data: NavigationData | null = null;

  constructor() {
    // נסה לטעון את הנתונים מהלוקאל סטורג במקרה שזה קיים
    this.tryLoadFromCache();
  }

  /**
   * מנסה לטעון נתונים מהלוקאל סטורג
   */
  private tryLoadFromCache() {
    if (typeof window === "undefined") return; // רק בצד הלקוח

    try {
      // נסה לטעון מה-tanstack query cache
      const cachedData = this.loadFromTanstackCache();
      if (cachedData) {
        this.data = cachedData;
        console.log(
          "🚀 NavigationService טעון מהלוקאל סטורג:",
          this.data.leagues.length,
          "ליגות"
        );
      }
    } catch (error) {
      console.warn("שגיאה בטעינת NavigationService מהלוקאל סטורג:", error);
    }
  }

  /**
   * טוען נתונים מהלוקאל סטורג של TanStack Query
   */
  private loadFromTanstackCache(): NavigationData | null {
    try {
      const rawData = localStorage.getItem("tanstack-query-client");
      if (!rawData) return null;

      const parsed = JSON.parse(rawData);
      const leaguesData = parsed?.clientState?.queries?.find((q: any) =>
        q.queryKey.includes("all-leagues-with-teams")
      );

      if (leaguesData?.state?.data) {
        return {
          leagues: leaguesData.state.data.map((league: any) => ({
            id: league._id || league.id,
            slug: league.slug,
            name: league.name,
            nameHe: league.nameHe,
            teams: (league.teams || []).map((team: any) => ({
              id: team._id || team.id,
              slug: team.slug,
              name: team.name,
              logo: team.logoUrl,
            })),
          })),
        };
      }
    } catch (error) {
      console.warn("שגיאה בפרסור נתוני TanStack Query:", error);
    }
    return null;
  }

  /**
   * מבצע אתחול של המידע מהנתונים שנטענו
   */
  init(leaguesWithTeams: League[]) {
    this.data = {
      leagues: leaguesWithTeams.map((league) => ({
        id: league._id || league.id,
        slug: league.slug,
        name: league.name,
        nameHe: league.nameHe,
        teams: (league.teams || []).map((team) => ({
          id: team._id || team.id,
          slug: team.slug,
          name: team.name,
          logo: team.logoUrl,
        })),
      })),
    };
  }

  /**
   * מחזיר מזהה מונגו של ליגה על פי slug
   */
  getLeagueIdBySlug(slug: string): string | null {
    if (!this.data) return null;

    const league = this.data.leagues.find((l) => l.slug === slug);
    return league?.id || null;
  }

  /**
   * מחזיר מזהה מונגו של קבוצה על פי slug
   */
  getTeamIdBySlug(slug: string): string | null {
    if (!this.data) return null;

    for (const league of this.data.leagues) {
      const team = league.teams.find((t) => t.slug === slug);
      if (team) return team.id;
    }

    return null;
  }

  /**
   * מחזיר מידע ליגה על פי slug
   */
  getLeagueBySlug(slug: string) {
    if (!this.data) return null;

    return this.data.leagues.find((l) => l.slug === slug) || null;
  }

  /**
   * מחזיר מידע קבוצה על פי slug
   */
  getTeamBySlug(slug: string) {
    if (!this.data) return null;

    for (const league of this.data.leagues) {
      const team = league.teams.find((t) => t.slug === slug);
      if (team) return team;
    }

    return null;
  }

  /**
   * מחזיר את כל הקבוצות של ליגה מסוימת
   */
  getTeamsByLeagueSlug(slug: string) {
    if (!this.data) return [];

    const league = this.data.leagues.find((l) => l.slug === slug);
    return league?.teams || [];
  }

  /**
   * בדיקה אם המידע זמין
   */
  isInitialized(): boolean {
    return this.data !== null;
  }

  /**
   * מקבל את כל המידע שבושל
   */
  getAllData(): NavigationData | null {
    return this.data;
  }
}

// יצירת instance יחיד
export const navigationService = new NavigationService();
export default navigationService;
