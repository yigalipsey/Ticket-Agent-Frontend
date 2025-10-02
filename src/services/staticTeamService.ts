import { StaticTeamData, TeamCardData } from "@/types/staticTeam";
import realMadridData from "@/data/teams/real-madrid.json";
import barcelonaData from "@/data/teams/barcelona.json";
import dortmundData from "@/data/teams/dortmund.json";

export class StaticTeamService {
  private static teamsCache: Map<string, StaticTeamData> = new Map();

  // Static data mapping
  private static teamsData: Record<string, StaticTeamData> = {
    "real-madrid": realMadridData as StaticTeamData,
    barcelona: barcelonaData as StaticTeamData,
    dortmund: dortmundData as StaticTeamData,
  };

  /**
   * Load static team data from JSON file
   */
  static async getStaticTeamData(slug: string): Promise<StaticTeamData | null> {
    // Check cache first
    if (this.teamsCache.has(slug)) {
      return this.teamsCache.get(slug)!;
    }

    try {
      // Get data from static mapping
      const staticData = this.teamsData[slug];

      if (staticData) {
        // Cache the data
        this.teamsCache.set(slug, staticData);
        console.log(`Static data loaded for team: ${slug}`, staticData);
        return staticData;
      } else {
        console.warn(`No static data found for team: ${slug}`);
        return null;
      }
    } catch (error) {
      console.warn(`Error loading static data for team: ${slug}`, error);
      return null;
    }
  }

  /**
   * Get team card data for display
   */
  static getTeamCardData(teamData: StaticTeamData): TeamCardData[] {
    return [
      {
        label: "בעלים",
        value: teamData.owner.name,
        icon: "person",
      },
      {
        label: "כמות צופים",
        value: teamData.stadium.capacity,
        icon: "eye",
      },
      {
        label: "מאמן",
        value: teamData.manager.name,
        icon: "person",
      },
      {
        label: "ליגות",
        value: teamData.leagues.join(", "),
        icon: "globe",
      },
      {
        label: "מיקום",
        value: `${teamData.location.city}, ${teamData.location.country}`,
        icon: "map-pin",
      },
      {
        label: "אצטדיון",
        value: teamData.stadium.name,
        icon: "building",
      },
    ];
  }

  /**
   * Get all available team slugs
   */
  static getAvailableTeamSlugs(): string[] {
    return ["real-madrid", "barcelona", "dortmund"];
  }

  /**
   * Check if static data exists for a team
   */
  static hasStaticData(slug: string): boolean {
    return this.getAvailableTeamSlugs().includes(slug);
  }

  /**
   * Clear cache (useful for development)
   */
  static clearCache(): void {
    this.teamsCache.clear();
  }
}

export default StaticTeamService;
