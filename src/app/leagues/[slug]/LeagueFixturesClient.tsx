"use client";

import { useState, useCallback } from "react";
import { useLeagueFixtures } from "@/hooks";
import { LeagueFixturesSection, LeagueFilters } from "@/components";

interface LeagueFixturesClientProps {
  leagueId: string;
}

export function LeagueFixturesClient({ leagueId }: LeagueFixturesClientProps) {
  // State for filters - default to no month filter (show upcoming fixtures)
  const [filters, setFilters] = useState<{
    month?: string;
    months?: string[];
    city?: string;
    hasOffers?: boolean;
  }>({
    // No default month - will fetch all upcoming fixtures
  });

  // טעינת משחקי הליגה
  const { fixtures, isLoading: fixturesLoading } = useLeagueFixtures(leagueId, {
    autoFetch: true,
    query: {
      limit: 20, // Show 20 upcoming fixtures by default
      upcoming: "true",
      // Only send month(s) if user has selected a specific month
      ...(filters.month && filters.month !== "all" && { month: filters.month }),
      ...(filters.months &&
        filters.months.length > 0 && { months: filters.months }),
      ...(filters.city && { city: filters.city }),
      ...(filters.hasOffers && { hasOffers: "true" }),
    },
  });

  // Handle filter changes
  const handleFiltersChange = useCallback(
    (newFilters: {
      month?: string;
      months?: string[];
      city?: string;
      hasOffers?: boolean;
    }) => {
      // If user selects a specific month, clear months and use month
      if (newFilters.month && newFilters.month !== "all") {
        setFilters({
          ...newFilters,
          months: undefined, // Clear months when specific month is selected
        });
      } else if (newFilters.month === "all") {
        // If user selects "all", clear month filter to show all upcoming fixtures
        setFilters({
          ...newFilters,
          months: undefined,
          month: undefined, // Clear month to show all upcoming fixtures
        });
      } else {
        // For other filters (city, hasOffers), keep current month/months
        setFilters(newFilters);
      }
    },
    []
  );

  return (
    <>
      {/* פילטרים למשחקים */}
      <LeagueFilters
        onFiltersChange={handleFiltersChange}
        initialFilters={filters}
        isLoading={fixturesLoading}
      />

      {/* משחקי הליגה */}
      <LeagueFixturesSection
        fixtures={fixtures || []}
        isLoading={fixturesLoading}
        error={null}
      />
    </>
  );
}
