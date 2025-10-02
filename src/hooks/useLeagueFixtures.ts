"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { FixtureService } from "@/services";
import { FixtureQuery, LoadingState } from "@/types";

/**
 * Hook לשליפת משחקים של ליגה ספציפית
 * שולף רק כשיוזר נכנס לליגה
 */
export function useLeagueFixtures(
  leagueIdOrSlug: string,
  options?: {
    enabled?: boolean;
    query?: FixtureQuery;
    autoFetch?: boolean; // האם לשלוף אוטומטית או רק כשמבקשים
    locale?: string;
  }
) {
  const [state, setState] = useState<LoadingState>({ isLoading: false });
  const [shouldFetch, setShouldFetch] = useState(options?.autoFetch ?? false);

  // אפשרות לשלוף משחקים באופן ידני
  const triggerFetch = useCallback(() => {
    setShouldFetch(true);
  }, []);

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: [
      "league-fixtures",
      leagueIdOrSlug,
      options?.query,
      options?.locale,
    ],
    queryFn: async () => {
      if (!leagueIdOrSlug) return { data: [], pagination: null };

      const query = {
        ...options?.query,
        filters: {
          ...options?.query?.filters,
          league: leagueIdOrSlug,
        },
      };

      return await FixtureService.getFixturesByLeague(
        leagueIdOrSlug,
        query,
        options?.locale || "he"
      );
    },
    enabled: !!leagueIdOrSlug && (shouldFetch || options?.enabled),
    staleTime: 5 * 60 * 1000, // 5 minutes - fixtures change more often
    retry: 2,
  });

  useEffect(() => {
    setState({
      isLoading: isLoading || isFetching,
      error: error?.message,
    });
  }, [isLoading, isFetching, error]);

  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    fixtures: data?.data || [],
    pagination: data?.pagination,
    total: data?.pagination?.total || 0,
    ...state,
    refresh,
    triggerFetch, // פונקציה להפעלת שליפה ידנית
    hasFetched: shouldFetch,
  };
}

/**
 * Hook לשליפת משחקים קרובים של ליגה ספציפית
 */
export function useUpcomingLeagueFixtures(
  leagueIdOrSlug: string,
  limit: number = 10,
  autoFetch: boolean = false,
  locale: string = "he"
) {
  const query: FixtureQuery = {
    limit,
    sortBy: "date",
    sortOrder: "asc",
    upcoming: "true", // Add upcoming parameter
    filters: {
      status: "scheduled",
      league: leagueIdOrSlug,
    },
  };

  return useLeagueFixtures(leagueIdOrSlug, {
    query,
    autoFetch,
    enabled: autoFetch,
    locale,
  });
}

/**
 * Hook לשליפת משחקים חיים של ליגה ספציפית
 */
export function useLiveLeagueFixtures(
  leagueIdOrSlug: string,
  autoFetch: boolean = true, // משחקים חיים נשלבים אוטומטית
  locale: string = "he"
) {
  const query: FixtureQuery = {
    sortBy: "date",
    sortOrder: "asc",
    filters: {
      status: "scheduled",
      league: leagueIdOrSlug,
    },
  };

  return useLeagueFixtures(leagueIdOrSlug, {
    query,
    autoFetch,
    locale,
  });
}

/**
 * Hook לשליפת תוצאות אחרונות של ליגה ספציפית
 */
export function useRecentLeagueResults(
  leagueIdOrSlug: string,
  limit: number = 10,
  autoFetch: boolean = false,
  locale: string = "he"
) {
  const query: FixtureQuery = {
    limit,
    sortBy: "date",
    sortOrder: "desc",
    filters: {
      status: "finished",
      league: leagueIdOrSlug,
    },
  };

  return useLeagueFixtures(leagueIdOrSlug, {
    query,
    autoFetch,
    enabled: autoFetch,
    locale,
  });
}
