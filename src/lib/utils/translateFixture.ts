/**
 * כלי עזר לתרגום משחקים מ-API עם שמות קבוצות מקומיים
 */

import { TeamService } from "@/services";
import type { Team } from "@/types";

export interface TranslatedFixture {
  // נתונים מקוריים מהאיפי
  _id: string;
  date: string;
  status: string;
  league: any;
  venue: any;
  round: string;
  slug: string;
  roundNumber: number;
  tags: string[];
  externalIds: any;
  createdAt: string;
  updatedAt: string;

  // קבוצות מתורגמות
  homeTeam: {
    _id: string;
    name: string;
    code: string;
    slug: string;
    logoUrl: string;
    // נתונים מקומיים מתורגמים
    localData?: Team;
  };
  awayTeam: {
    _id: string;
    name: string;
    code: string;
    slug: string;
    logoUrl: string;
    // נתונים מקומיים מתורגמים
    localData?: Team;
  };
}

/**
 * מתרגם משחק מ-API עם שמות קבוצות מקומיים
 */
export function translateFixture(apiFixture: any): TranslatedFixture {
  return TeamService.translateAPIFixtureToLocal(apiFixture);
}

/**
 * מתרגם מערך משחקים
 */
export function translateFixtures(apiFixtures: any[]): TranslatedFixture[] {
  return apiFixtures.map(translateFixture);
}

/**
 * מחזיר שם קבוצה מתורגם על בסיס השפה הנוכחית
 */
export function getTeamDisplayName(
  team: TranslatedFixture["homeTeam"] | TranslatedFixture["awayTeam"],
  locale: string = "en"
): string {
  if (!team.localData) {
    return team.name; // fallback לשם המקורי
  }

  switch (locale) {
    case "he":
      return team.localData.nameHe;
    case "en":
      return team.localData.nameEn;
    default:
      return team.localData.name;
  }
}

/**
 * מחזיר מידע קבוצה מתורגם
 */
export function getTeamDisplayInfo(
  team: TranslatedFixture["homeTeam"] | TranslatedFixture["awayTeam"],
  locale: string = "en"
) {
  const localData = team.localData;

  return {
    name: getTeamDisplayName(team, locale),
    city: localData?.city || team.name,
    venue: localData?.venue,
    founded: localData?.founded,
    league: localData?.league,
    country: localData?.country,
    logoUrl: team.logoUrl,
  };
}
