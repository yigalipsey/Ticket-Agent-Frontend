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

interface FilterState {
  month: string | null;
  venueId: string | null;
}

/**
 * Client Component להצגת משחקי הליגה + פילטור דינמי
 *
 * לוגיקת פילטור:
 * 1. חודש נבחר: שולף נתוני חודש פעם אחת, פילטור venue ב-client
 * 2. venue נבחר (ללא חודש): שולף מהשרת עם venueId (cache של league+venue)
 * 3. ללא פילטרים: שולף את כל המשחקים של הליגה
 */
export default function LeagueFixtures({
  leagueId,
  initialFixtures,
  showFilter = true,
}: LeagueFixturesProps) {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<FilterState>({
    month: null,
    venueId: null,
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
          nameHe: fixture.venue.nameHe || fixture.venue.name_he,
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
  const { data: fixtures = [], isLoading } = useQuery({
    queryKey: ["league-fixtures", leagueId, filters],
    queryFn: async () => {
      if (!leagueId) return [];

      // לוגיקת פילטור חכמה:
      // - אם יש חודש: שולף חודש, venue יסונן ב-client
      // - אם יש venue בלי חודש: שולף venue מהשרת
      // - אחרת: שולף הכל
      const result = await FixtureService.getLeagueFixtures(leagueId, {
        limit: 100,
        page: 1,
        month: filters.month,
        venueId: filters.month ? null : filters.venueId, // venue רק אם אין חודש
      });

      return result.success && result.data ? result.data : [];
    },
    initialData: initialFixtures,
    enabled: !!leagueId,
    staleTime: 5 * 60 * 1000, // 5 דקות
    placeholderData: (previousData) => previousData, // שומר נתונים קודמים בזמן טעינה
  });

  // פילטר משחקים (client-side)
  const visibleFixtures = useMemo(() => {
    let filtered = fixtures;

    // פילטר לפי חודש
    if (filters.month) {
      filtered = filtered.filter((f: Fixture) => {
        const fixtureDate = new Date(f.date);
        const fixtureMonth = `${fixtureDate.getFullYear()}-${String(
          fixtureDate.getMonth() + 1
        ).padStart(2, "0")}`;
        return fixtureMonth === filters.month;
      });
    }

    // פילטר לפי אצטדיון
    if (filters.venueId) {
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

      {/* טוען */}
      {isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500">טוען משחקים...</p>
        </div>
      )}

      {/* רשת משחקים */}
      {!isLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleFixtures.map((fixture: Fixture) => (
            <FixtureCard
              key={fixture.id || fixture._id}
              fixture={fixture}
              showOffers={true}
              showVenue={true}
              showLeague={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
