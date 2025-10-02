"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { FixtureService } from "@/services";
import { Fixture, FixtureQuery, LoadingState } from "@/types";

export function useFixtures(query?: FixtureQuery) {
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["fixtures", query],
    queryFn: () => FixtureService.getFixtures(query),
    staleTime: 5 * 60 * 1000, // 5 minutes
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
  };
}

export function useFixture(slug: string) {
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["fixture", slug],
    queryFn: () => FixtureService.getFixture(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  useEffect(() => {
    setState({
      isLoading,
      error: error?.message,
    });
  }, [isLoading, error]);

  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    fixture: data,
    ...state,
    refresh,
  };
}

export function useUpcomingFixtures(limit: number = 10, locale: string = "he") {
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["upcoming-fixtures", limit, locale],
    queryFn: () => FixtureService.getUpcomingFixtures(limit, locale),
    staleTime: 2 * 60 * 1000, // 2 minutes for upcoming fixtures
    retry: 2,
  });

  useEffect(() => {
    setState({
      isLoading,
      error: error?.message,
    });
  }, [isLoading, error]);

  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    fixtures: data || [],
    ...state,
    refresh,
  };
}

export function useFixturesByLeague(
  leagueSlug: string,
  query?: FixtureQuery,
  locale: string = "he"
) {
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["fixtures-by-league", leagueSlug, query, locale],
    queryFn: () =>
      FixtureService.getFixturesByLeague(leagueSlug, query, locale),
    enabled: !!leagueSlug,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  useEffect(() => {
    setState({
      isLoading,
      error: error?.message,
    });
  }, [isLoading, error]);

  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    fixtures: data?.data || [],
    pagination: data?.pagination,
    total: data?.pagination?.total || 0,
    ...state,
    refresh,
  };
}

export function useSearchFixtures() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Fixture[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchFixtures = useCallback(
    async (searchQuery: string, filters?: FixtureQuery["filters"]) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const data = await FixtureService.searchFixtures(searchQuery, filters);
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    },
    []
  );

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
  }, []);

  return {
    query,
    setQuery,
    results,
    isSearching,
    searchFixtures,
    clearSearch,
  };
}
