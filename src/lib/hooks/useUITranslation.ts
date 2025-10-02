"use client";

import { useTranslations } from "next-intl";

/**
 * Hook לתרגום UI strings
 * משתמש ב-next-intl הסטנדרטי
 */
export function useUITranslation() {
  const t = useTranslations();

  return {
    t,
    // פונקציות עזר נפוצות
    getCommonText: (key: string) => t(`common.${key}`),
    getNavigationText: (key: string) => t(`navigation.${key}`),
    getHomeText: (key: string) => t(`home.${key}`),
    getFixturesText: (key: string) => t(`fixtures.${key}`),
    getLeaguesText: (key: string) => t(`leagues.${key}`),
    getTeamsText: (key: string) => t(`teams.${key}`),
    getVenuesText: (key: string) => t(`venues.${key}`),
    getOffersText: (key: string) => t(`offers.${key}`),
    getSearchText: (key: string) => t(`search.${key}`),
    getFiltersText: (key: string) => t(`filters.${key}`),
    getPaginationText: (key: string) => t(`pagination.${key}`),
  };
}
