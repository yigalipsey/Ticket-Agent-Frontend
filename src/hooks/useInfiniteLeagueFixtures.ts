"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { FixtureService } from "@/services";
import { Fixture } from "@/types";

interface UseInfiniteLeagueFixturesProps {
  leagueId: string;
  locale?: string;
  enabled?: boolean;
}

export function useInfiniteLeagueFixtures({
  leagueId,
  locale = "he",
  enabled = true,
}: UseInfiniteLeagueFixturesProps) {
  return useInfiniteQuery({
    queryKey: ["infinite-league-fixtures", leagueId, locale],
    queryFn: async ({ pageParam = 1 }) => {
      console.log(
        "useInfiniteLeagueFixtures - fetching page:",
        pageParam,
        "for league:",
        leagueId
      );

      const result = await FixtureService.getFixturesByLeague(leagueId, {
        page: pageParam,
        limit: 20,
        locale,
      });

      console.log("useInfiniteLeagueFixtures - result:", result);
      return result;
    },
    getNextPageParam: (lastPage, allPages) => {
      // If we have pagination info, use it
      if (lastPage.pagination) {
        const { page, pages } = lastPage.pagination;
        return page < pages ? page + 1 : undefined;
      }

      // If no pagination info but we have data, continue
      if (lastPage.data && lastPage.data.length > 0) {
        return allPages.length + 1;
      }

      return undefined;
    },
    enabled: enabled && !!leagueId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}
