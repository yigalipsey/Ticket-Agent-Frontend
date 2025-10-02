"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FixtureService } from "@/services";
import { Fixture } from "@/types";
import { FixtureCard } from "@/components";
import { Spinner } from "@/components/ui";

interface InfiniteFixturesListProps {
  leagueId: string;
  locale?: string;
  className?: string;
}

export function InfiniteFixturesList({
  leagueId,
  locale = "he",
  className = "",
}: InfiniteFixturesListProps) {
  const observerRef = useRef<IntersectionObserver>();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["infinite-league-fixtures", leagueId, locale],
    queryFn: async ({ pageParam = 1 }) => {
      console.log(
        "InfiniteFixturesList - fetching page:",
        pageParam,
        "for league:",
        leagueId
      );

      const result = await FixtureService.getFixturesByLeague(leagueId, {
        page: pageParam,
        limit: 20,
        locale,
        upcoming: "true", // Get upcoming matches for infinite scroll
      });

      console.log("InfiniteFixturesList - result:", result);
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
    enabled: !!leagueId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  // Flatten all fixtures from all pages
  const allFixtures: Fixture[] =
    data?.pages?.flatMap((page) => page.data || []) || [];

  // Intersection Observer callback
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          console.log("InfiniteFixturesList - loading more fixtures");
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className={`flex justify-center py-12 ${className}`}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-red-500">שגיאה בטעינת המשחקים</p>
        <p className="text-sm text-gray-500 mt-2">{error.message}</p>
      </div>
    );
  }

  if (allFixtures.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-gray-500">אין משחקים זמינים</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Fixtures List */}
      <div className="flex flex-col gap-4">
        {allFixtures.map((fixture, index) => (
          <div
            key={
              fixture.id ||
              `${fixture.homeTeam.slug}-${fixture.awayTeam.slug}-${fixture.date}`
            }
            ref={index === allFixtures.length - 1 ? lastElementRef : undefined}
          >
            <FixtureCard fixture={fixture} />
          </div>
        ))}
      </div>

      {/* Loading indicator */}
      {isFetchingNextPage && (
        <div className="flex justify-center py-8">
          <Spinner size="md" />
          <span className="mr-2 text-gray-500">טוען משחקים נוספים...</span>
        </div>
      )}

      {/* End of results indicator */}
      {!hasNextPage && allFixtures.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">סיימנו להציג את כל המשחקים</p>
        </div>
      )}
    </div>
  );
}
