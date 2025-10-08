"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import FixtureCard from "@/components/fixture/FixtureCard";
import FixtureService from "@/services/fixtureService";
import { Fixture } from "@/types/fixture";
import LeagueFilter from "@/components/league/LeagueFilter";

interface LeagueFixturesProps {
  leagueId: string | null;
  initialFixtures: Fixture[];
  showFilter?: boolean;
}

interface FilterOptions {
  month?: string;
  venueId?: string;
  limit: number;
}

/**
 * Client Component להצגת משחקי הליגה + פילטור דינמי
 *
 * זרימה:
 * 1. מתחיל עם נתוני SSR (initialFixtures)
 * 2. מזריק אותם ל-React Query cache
 * 3. מאפשר פילטור דינמי (חודש, עיר וכו')
 * 4. כל שינוי בפילטר → קריאה חדשה ל-API
 */
export default function LeagueFixtures({
  leagueId,
  initialFixtures,
  showFilter = true,
}: LeagueFixturesProps) {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<FilterOptions>({
    limit: 20,
  });

  // חישוב חודשים ואצטדיונים זמינים מהנתונים הראשוניים
  const { availableMonths, availableVenues } = useMemo(() => {
    const months = new Set<string>();
    const venues = new Map<
      string,
      { _id: string; name: string; nameHe?: string }
    >();

    initialFixtures.forEach((fixture) => {
      // הוספת חודש
      if (fixture.date) {
        const month = new Date(fixture.date).toISOString().slice(0, 7); // YYYY-MM
        months.add(month);
      }

      // הוספת אצטדיון
      if (fixture.venue?._id && fixture.venue?.name) {
        venues.set(fixture.venue._id, {
          _id: fixture.venue._id,
          name: fixture.venue.name,
          nameHe: fixture.venue.nameHe,
        });
      }
    });

    return {
      availableMonths: Array.from(months).sort(),
      availableVenues: Array.from(venues.values()),
    };
  }, [initialFixtures]);

  // הזרקת נתוני SSR ל-cache (פעם אחת בלבד)
  useEffect(() => {
    if (leagueId && initialFixtures.length > 0) {
      queryClient.setQueryData(
        ["league-fixtures", leagueId, { limit: 20 }],
        initialFixtures
      );
    }
  }, [leagueId, initialFixtures, queryClient]);

  // שליפת משחקים עם React Query (מ-cache או API)
  const { data: fixtures = [] } = useQuery({
    queryKey: ["league-fixtures", leagueId, filters],
    queryFn: async () => {
      if (!leagueId) return [];
      const result = await FixtureService.getLeagueFixtures(
        leagueId,
        filters.limit
      );
      return result.success && result.data ? result.data : [];
    },
    initialData: initialFixtures,
    enabled: !!leagueId,
    staleTime: 5 * 60 * 1000, // 5 דקות
  });

  // פילטר משחקים (client-side)
  const filteredFixtures = useMemo(() => {
    let filtered = fixtures;

    // פילטר לפי חודש
    if (filters.month) {
      filtered = filtered.filter((f) => {
        const fixtureDate = new Date(f.date);
        const fixtureMonth = `${fixtureDate.getFullYear()}-${String(
          fixtureDate.getMonth() + 1
        ).padStart(2, "0")}`;
        return fixtureMonth === filters.month;
      });
    }

    // פילטר לפי אצטדיון
    if (filters.venueId) {
      filtered = filtered.filter((f) => f.venue?._id === filters.venueId);
    }

    return filtered;
  }, [fixtures, filters.month, filters.venueId]);

  // פונקציות לטיפול בשינוי פילטרים
  const handleMonthChange = (month: string | null) => {
    setFilters({ ...filters, month: month || undefined });
  };

  const handleVenueChange = (venueId: string | null) => {
    setFilters({ ...filters, venueId: venueId || undefined });
  };

  if (!leagueId || filteredFixtures.length === 0) {
    return (
      <div className="mb-8">
        {showFilter && (
          <LeagueFilter
            selectedMonth={filters.month || null}
            selectedVenue={filters.venueId || null}
            availableMonths={availableMonths}
            availableVenues={availableVenues}
            onMonthChange={handleMonthChange}
            onVenueChange={handleVenueChange}
          />
        )}
        <div className="text-center py-12">
          <p className="text-gray-500">אין משחקים להצגה</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      {/* כותרת */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">משחקים</h2>

      {/* פילטרים */}
      {showFilter && (
        <LeagueFilter
          selectedMonth={filters.month || null}
          selectedVenue={filters.venueId || null}
          availableMonths={availableMonths}
          availableVenues={availableVenues}
          onMonthChange={handleMonthChange}
          onVenueChange={handleVenueChange}
        />
      )}

      {/* רשת משחקים */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredFixtures.map((fixture) => (
          <FixtureCard
            key={fixture.id || fixture._id}
            fixture={fixture}
            showOffers={true}
            showVenue={true}
            showLeague={false}
          />
        ))}
      </div>
    </div>
  );
}
