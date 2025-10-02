"use client";

import { useLocale } from "next-intl";
import type { Team } from "@/types";

/**
 * Hook מותאם לתרגומים של קבוצות
 * משתמש ב-next-intl ומספק פונקציות תרגום מותאמות
 */
export function useTranslatedTeam() {
  const locale = useLocale();

  const getTranslatedTeamName = (team: Team): string => {
    return locale === "he" ? team.nameHe || team.name : team.name;
  };

  const getTranslatedTeamInfo = (team: Team) => {
    return {
      name: getTranslatedTeamName(team),
      city: team.city,
      venue: team.venue,
      founded: team.founded,
      league: team.league,
      country: team.country,
      logoUrl: team.logoUrl,
    };
  };

  const findTeamBySlug = (slug: string): Team | undefined => {
    // This function is no longer needed since we don't have static teams
    // Teams should be fetched from API
    return undefined;
  };

  const findTeamByCode = (code: string): Team | undefined => {
    // This function is no longer needed since we don't have static teams
    // Teams should be fetched from API
    return undefined;
  };

  const translateTeamFromAPI = (apiTeam: any): Team | undefined => {
    // Return the API team data directly since we don't have static teams anymore
    return apiTeam;
  };

  return {
    locale,
    getTranslatedTeamName,
    getTranslatedTeamInfo,
    findTeamBySlug,
    findTeamByCode,
    translateTeamFromAPI,
  };
}
