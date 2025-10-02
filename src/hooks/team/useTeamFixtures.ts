"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { TeamService } from "@/services";
import { Fixture, FixtureQuery, LoadingState } from "@/types";

interface UseTeamFixturesOptions {
  query?: FixtureQuery;
  autoFetch?: boolean;
  locale?: string;
}

export function useTeamFixtures(
  teamIdOrSlug: string,
  options: UseTeamFixturesOptions = {}
) {
  const { query, autoFetch = false, locale = "he" } = options;
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["team-fixtures", teamIdOrSlug, query, locale],
    queryFn: async () => {
      try {
        const result = await TeamService.getTeamFixtures(
          teamIdOrSlug,
          query,
          locale
        );
        return result || [];
      } catch (err) {
        throw err;
      }
    },
    enabled: autoFetch,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
  });

  useEffect(() => {
    setState({
      isLoading: isLoading || isFetching,
      error: error?.message,
    });
  }, [isLoading, isFetching, error]);

  const triggerFetch = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    fixtures: data || [],
    isLoading: state.isLoading,
    error: state.error,
    triggerFetch,
  };
}

export function useUpcomingTeamFixtures(
  teamIdOrSlug: string,
  limit: number = 10,
  autoFetch: boolean = false,
  locale: string = "he"
) {
  // שליחת פרמטרים פשוטים במקום אובייקט מורכב
  // הבקאנד מצפה ל-string ולא boolean
  const params = {
    limit,
    upcoming: "true",
  } as any;

  return useTeamFixtures(teamIdOrSlug, {
    query: params,
    autoFetch,
    locale,
  });
}

export function useRecentTeamResults(
  teamIdOrSlug: string,
  limit: number = 10,
  autoFetch: boolean = false
) {
  // שליחת פרמטרים פשוטים במקום אובייקט מורכב
  // הבקאנד מצפה ל-string ולא boolean
  const params = {
    limit,
    upcoming: "false",
  } as any;

  return useTeamFixtures(teamIdOrSlug, {
    query: params,
    autoFetch,
  });
}
