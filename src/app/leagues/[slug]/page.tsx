"use client";

import { use, useState, useCallback } from "react";
import { useLeagueData, useLeagueFixtures } from "@/hooks";
import {
  LeagueTeamsSection,
  LeagueHeader,
  LeagueHeaderLoading,
  LeagueHeaderError,
  LeagueFixturesSection,
  LeagueFilters,
} from "@/components";

export default function LeaguePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: leagueSlug } = use(params);

  // State for filters - default to no month filter (show upcoming fixtures)
  const [filters, setFilters] = useState<{
    month?: string;
    months?: string[];
    city?: string;
    hasOffers?: boolean;
  }>({
    // No default month - will fetch all upcoming fixtures
  });

  // Hook יחיד שמחזיר את כל נתוני הליגה
  const { league, leagueId, teams, isLoading, error } =
    useLeagueData(leagueSlug);

  // טעינת משחקי הליגה (רק אם יש leagueId)
  const { fixtures, isLoading: fixturesLoading } = useLeagueFixtures(
    leagueId || "",
    {
      autoFetch: !!leagueId,
      query: {
        limit: 20, // Show 20 upcoming fixtures by default
        upcoming: "true",
        // Only send month(s) if user has selected a specific month
        ...(filters.month &&
          filters.month !== "all" && { month: filters.month }),
        ...(filters.months &&
          filters.months.length > 0 && { months: filters.months }),
        ...(filters.city && { city: filters.city }),
        ...(filters.hasOffers && { hasOffers: "true" }),
      },
    }
  );

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

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LeagueHeaderLoading />
          <LeagueTeamsSection teams={[]} />
        </div>
      </div>
    );
  }

  // Error state
  if (error || !league) {
    return <LeagueHeaderError slug={leagueSlug} error={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* כותרת הליגה */}
        <LeagueHeader league={league} />

        {/* קרוסלת קבוצות */}
        <div className="mb-8">
          <LeagueTeamsSection teams={teams || []} />
        </div>

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
      </div>
    </div>
  );
}
