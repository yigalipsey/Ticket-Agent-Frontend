"use client";

import { useLocale } from "next-intl";
import type { League } from "@/types";

/**
 * Hook מותאם לתרגומים של ליגות
 * משתמש ב-next-intl ומספק פונקציות תרגום מותאמות
 */
export function useTranslatedLeague() {
  const locale = useLocale();

  const getTranslatedLeagueName = (league: League): string => {
    return locale === "he" ? league.nameHe || league.name : league.name;
  };

  const getTranslatedCountryName = (country: string): string => {
    return country; // Use the country field directly from the API
  };

  const getTranslatedLeagueInfo = (league: League) => {
    return {
      name: getTranslatedLeagueName(league),
      country: getTranslatedCountryName(league.country),
      logo: league.logo,
    };
  };

  return {
    locale,
    getTranslatedLeagueName,
    getTranslatedCountryName,
    getTranslatedLeagueInfo,
  };
}
