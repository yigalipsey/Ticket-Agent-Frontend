"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { LeagueService } from "@/services";
import { League, LeagueQuery, LoadingState } from "@/types";

export function useLeagues(query?: LeagueQuery) {
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["leagues", query],
    queryFn: () => LeagueService.getLeagues(query),
    staleTime: 60 * 60 * 1000, // 1 שעה

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
    leagues: data?.data || [],
    pagination: data?.pagination,
    total: data?.pagination?.total || 0,
    ...state,
    refresh,
  };
}

export function useLeague(id: string) {
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["league", id],
    queryFn: () => LeagueService.getLeague(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
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
    league: data,
    ...state,
    refresh,
  };
}

export function useActiveLeagues() {
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["active-leagues"],
    queryFn: () => LeagueService.getActiveLeagues(),
    staleTime: 10 * 60 * 1000,
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
    leagues: data || [],
    ...state,
    refresh,
  };
}

export function usePopularLeagues(limit: number = 10) {
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["popular-leagues", limit],
    queryFn: async () => {
      console.log(
        "usePopularLeagues - Calling LeagueService.getPopularLeagues with limit:",
        limit
      );
      const result = await LeagueService.getPopularLeagues(limit);
      console.log("usePopularLeagues - LeagueService returned:", result);
      return result;
    },
    staleTime: 10 * 60 * 1000,
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

  const result = {
    leagues: data || [],
    ...state,
    refresh,
  };

  console.log("usePopularLeagues - Returning:", {
    data,
    leagues: result.leagues,
    isLoading: result.isLoading,
    error: result.error,
  });

  return result;
}

export function useAllLeagues() {
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["all-leagues-with-teams"],
    queryFn: async () => {
      console.log(
        "useAllLeagues - Calling LeagueService.getAllLeaguesWithTeams"
      );
      const serviceResult = await LeagueService.getAllLeaguesWithTeams();
      console.log("useAllLeagues - LeagueService returned:", serviceResult);

      // Handle ServiceResult - if not successful, throw error for React Query
      if (!serviceResult.success) {
        throw new Error(serviceResult.error || "שגיאה בטעינת הליגות");
      }

      return serviceResult.data;
    },
    staleTime: 10 * 60 * 1000,
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

  const result = {
    leagues: Array.isArray(data) ? data : [],
    ...state,
    refresh,
  };

  console.log("useAllLeagues - Returning:", {
    data,
    leagues: result.leagues,
    isLoading: result.isLoading,
    error: result.error,
  });

  return result;
}

export function useLeaguesByCountry(country: string) {
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["leagues-by-country", country],
    queryFn: () => LeagueService.getLeaguesByCountry(country),
    enabled: !!country,
    staleTime: 10 * 60 * 1000,
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
    leagues: data || [],
    ...state,
    refresh,
  };
}

export function useSearchLeagues() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<League[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchLeagues = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const data = await LeagueService.searchLeagues(searchQuery);
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
  }, []);

  return {
    query,
    setQuery,
    results,
    isSearching,
    searchLeagues,
    clearSearch,
  };
}
