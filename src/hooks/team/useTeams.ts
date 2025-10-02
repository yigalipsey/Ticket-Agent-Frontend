"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { TeamService } from "@/services";
import { Team, TeamQuery, LoadingState } from "@/types";

export function useTeams(query?: TeamQuery) {
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["teams", query],
    queryFn: () => TeamService.getTeams(query),
    staleTime: 10 * 60 * 1000, // 10 minutes - teams don't change often
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
    teams: data?.data || [],
    pagination: data?.pagination,
    total: data?.pagination?.total || 0,
    ...state,
    refresh,
  };
}

export function useTeam(slug: string) {
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["team", slug],
    queryFn: () => TeamService.getTeam(slug),
    enabled: !!slug,
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
    team: data,
    ...state,
    refresh,
  };
}

export function usePopularTeams(limit: number = 10) {
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["popular-teams", limit],
    queryFn: () => TeamService.getPopularTeams(limit),
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
    teams: data || [],
    ...state,
    refresh,
  };
}

export function useTeamsByLeague(leagueIdOrSlug: string) {
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["teams-by-league", leagueIdOrSlug],
    queryFn: async () => {
      console.log(
        "useTeamsByLeague - calling TeamService.getTeamsByLeague with:",
        { leagueIdOrSlug }
      );
      const result = await TeamService.getTeamsByLeague(leagueIdOrSlug);
      console.log("useTeamsByLeague - TeamService returned:", result);
      return result;
    },
    enabled: !!leagueIdOrSlug,
    staleTime: 7 * 24 * 60 * 60 * 1000, // 7 days - teams don't change often
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
    teams: data || [],
    ...state,
    refresh,
  };
}

export function useTeamsByCountry(country: string) {
  const [state, setState] = useState<LoadingState>({ isLoading: false });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["teams-by-country", country],
    queryFn: () => TeamService.getTeamsByCountry(country),
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
    teams: data || [],
    ...state,
    refresh,
  };
}

export function useSearchTeams() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Team[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchTeams = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const data = await TeamService.searchTeams(searchQuery);
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
    searchTeams,
    clearSearch,
  };
}
