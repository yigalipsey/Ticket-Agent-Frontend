"use client";

import { useState, useMemo } from "react";
import FixtureCard from "@/components/fixture/FixtureCard";
import { Fixture } from "@/types/fixture";
import LeagueFixturesFilter from "@/app/leagues/LeagueFixturesFilter";
import { useLeagueFixtures } from "@/hooks/fixture";
import { useLeagueData } from "@/hooks/league";
import { calculateAvailableFilters } from "@/utils/fixtureFilters";

interface LeagueFixturesProps {
  leagueId: string | null;
  leagueSlug: string;
  initialFixtures: Fixture[];
  showFilter?: boolean;
}

interface FilterState {
  month: string | null;
  venueId: string | null;
}

export default function LeagueFixtures({
  leagueId,
  leagueSlug,
  initialFixtures,
  showFilter = true,
}: LeagueFixturesProps) {
  const [filters, setFilters] = useState<FilterState>({
    month: null,
    venueId: null,
  });

  // שליפת פרטי הליגה (כולל החודשים)
  const { league } = useLeagueData(leagueSlug, leagueId);

  // שליפת משחקים עם Hook מותאם אישית
  const { fixtures, isLoading } = useLeagueFixtures(
    leagueId,
    {
      limit: 100,
      page: 1,
      month: filters.month,
      venueId: filters.venueId,
      hasOffers: true, // משיכת רק משחקים עם הצעות
    },
    initialFixtures
  );

  // חישוב חודשים ואצטדיונים זמינים
  const { availableMonths, availableVenues } = useMemo(() => {
    return calculateAvailableFilters(league, initialFixtures, fixtures);
  }, [league, initialFixtures, fixtures]);

  // פילטר משחקים (client-side)
  // רק כאשר יש חודש+אצטדיון - נסנן את האצטדיון ב-client
  // כי ה-hook מביא את כל משחקי החודש והפילטור של venue נעשה כאן
  const visibleFixtures = useMemo(() => {
    let filtered = fixtures;

    // פילטר לפי אצטדיון - רק אם יש גם חודש
    // (אם יש רק venue - ה-hook כבר הביא את המשחקים הנכונים)
    if (filters.month && filters.venueId) {
      filtered = filtered.filter(
        (f: Fixture) => f.venue?._id === filters.venueId
      );
    }

    return filtered;
  }, [fixtures, filters.month, filters.venueId]);

  // פונקציות לטיפול בשינוי פילטרים
  const handleMonthChange = (month: string | null) => {
    setFilters({ ...filters, month });
  };

  const handleVenueChange = (venueId: string | null) => {
    setFilters({ ...filters, venueId });
  };

  if (!leagueId || visibleFixtures.length === 0) {
    return (
      <div className="mb-8">
        {showFilter && (
          <LeagueFixturesFilter
            selectedMonth={filters.month || null}
            selectedVenue={filters.venueId || null}
            availableMonths={availableMonths}
            availableVenues={availableVenues}
            onMonthChange={handleMonthChange}
            onVenueChange={handleVenueChange}
            onReset={() => setFilters({ month: null, venueId: null })}
          />
        )}
        <div className="text-center py-12">
          <p className="text-gray-500">אין משחקים להצגה</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8  bg-white">
      {/* פילטרים */}
      {showFilter && (
        <LeagueFixturesFilter
          selectedMonth={filters.month || null}
          selectedVenue={filters.venueId || null}
          availableMonths={availableMonths}
          availableVenues={availableVenues}
          onMonthChange={handleMonthChange}
          onVenueChange={handleVenueChange}
          onReset={() => setFilters({ month: null, venueId: null })}
        />
      )}

      {/* טוען - Skeleton */}
      {isLoading && (
        <div className="flex flex-col gap-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm animate-pulse"
            >
              <div className="flex justify-between items-center gap-4">
                {/* Home Team */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>

                {/* Match Info */}
                <div className="flex flex-col items-center gap-2 min-w-[120px]">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>

                {/* Away Team */}
                <div className="flex items-center gap-3 flex-1 justify-end">
                  <div className="space-y-2 flex-1 text-right">
                    <div className="h-4 bg-gray-200 rounded w-24 ml-auto"></div>
                    <div className="h-3 bg-gray-200 rounded w-16 ml-auto"></div>
                  </div>
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                </div>
              </div>

              {/* Offers Info Skeleton */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-8 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* רשימת משחקים */}
      {!isLoading && (
        <div className="flex flex-col gap-3">
          {visibleFixtures.map((fixture: Fixture) => (
            <FixtureCard
              key={fixture.id || fixture._id}
              fixture={fixture}
              showOffers={true}
              showVenue={true}
              showLeague={false}
              variant="horizontal"
            />
          ))}
        </div>
      )}
    </div>
  );
}
