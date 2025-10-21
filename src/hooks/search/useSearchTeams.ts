import { useState, useCallback, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  SearchService,
  SearchResult,
  SearchSuggestion,
} from "@/services/searchService";

interface UseSearchTeamsOptions {
  limit?: number;
  fixturesLimit?: number;
  includePastFixtures?: boolean;
  leagueId?: string | null;
  initialQuery?: string;
  onlyWithOffers?: boolean;
}

interface UseSearchTeamsResult {
  // Search state
  query: string;
  setQuery: (query: string) => void;

  // Search results
  searchResult: SearchResult | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  search: (query: string) => void;
  clearSearch: () => void;

  // Computed values
  hasResults: boolean;
  totalTeams: number;
  totalFixtures: number;
}

/**
 * Hook לחיפוש קבוצות עם המשחקים הקרובים שלהן
 */
export function useSearchTeams(
  options: UseSearchTeamsOptions = {}
): UseSearchTeamsResult {
  const {
    limit = 10,
    fixturesLimit = 5,
    includePastFixtures = false,
    leagueId = null,
    initialQuery = "",
    onlyWithOffers = true,
  } = options;

  // Search query state
  const [query, setQuery] = useState<string>(initialQuery);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

  // Search teams query
  const {
    data: searchResult,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "search-teams",
      searchQuery,
      limit,
      fixturesLimit,
      includePastFixtures,
      leagueId,
      onlyWithOffers,
    ],
    queryFn: async () => {
      if (!searchQuery || searchQuery.trim().length < 2) {
        return null;
      }

      const result = await SearchService.searchTeams(searchQuery, {
        limit,
        fixturesLimit,
        includePastFixtures,
        leagueId,
      });

      if (!result.success) {
        throw new Error(result.error || "שגיאה בחיפוש");
      }

      return result.data;
    },
    enabled: !!searchQuery && searchQuery.trim().length >= 2,
    staleTime: 30 * 1000, // 30 seconds
    refetchOnWindowFocus: false,
  });

  // We don't need suggestions for team search

  // Actions
  const search = useCallback((newQuery: string) => {
    setQuery(newQuery);
    setSearchQuery(newQuery);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery("");
    setSearchQuery("");
  }, []);

  // Computed values
  const hasResults = useMemo(() => {
    return !!(searchResult && searchResult.totalTeams > 0);
  }, [searchResult]);

  const totalTeams = useMemo(() => {
    return searchResult?.totalTeams || 0;
  }, [searchResult]);

  const totalFixtures = useMemo(() => {
    return searchResult?.totalFixtures || 0;
  }, [searchResult]);

  return {
    // Search state
    query,
    setQuery,

    // Search results
    searchResult: searchResult || null,
    isLoading,
    error: error?.message || null,

    // Actions
    search,
    clearSearch,

    // Computed values
    hasResults,
    totalTeams,
    totalFixtures,
  };
}

/**
 * Hook פשוט יותר לחיפוש עם debounce
 */
export function useSearchTeamsDebounced(options: UseSearchTeamsOptions = {}) {
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  // Debounce the query
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedSetQuery = useCallback((query: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
  }, []);

  const searchResult = useSearchTeams({
    ...options,
    initialQuery: debouncedQuery,
  });

  return {
    ...searchResult,
    setQuery: debouncedSetQuery,
  };
}
