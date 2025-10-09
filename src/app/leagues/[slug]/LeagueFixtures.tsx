"use client";

import { useState, useMemo } from "react";
import FixtureCard from "@/components/fixture/FixtureCard";
import { Fixture } from "@/types/fixture";
import LeagueFixturesFilter from "@/components/league/LeagueFixturesFilter";
import { useLeagueFixtures } from "@/hooks/fixture";
import { useLeagueData } from "@/hooks/league";

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

/**
 * Client Component להצגת משחקי הליגה + פילטור דינמי
 *
 * לוגיקת Cache חכמה:
 * 1. נחיתה בדף (ללא פילטרים):
 *    - משתמש ב-initialData מ-SSR
 *    - Cache: ["initial-league-fixtures", "league:{id}:all"]
 *
 * 2. אצטדיון בלבד:
 *    - בודק אם יש ב-cache: "league:{id}:venue:{venueId}"
 *    - אם אין - פונה לבקאנד עם venueId
 *    - Cache: ["initial-league-fixtures", "league:{id}:venue:{venueId}"]
 *
 * 3. חודש בלבד או חודש+אצטדיון:
 *    - בודק אם יש ב-cache: "league:{id}:month:{month}"
 *    - אם אין - פונה לבקאנד עם month
 *    - אם יש גם venue - פילטור venue ב-client
 *    - Cache: ["initial-league-fixtures", "league:{id}:month:{month}"]
 */
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

  // חישוב חודשים ואצטדיונים זמינים
  const { availableMonths, availableVenues } = useMemo(() => {
    const venues = new Map<
      string,
      { _id: string; name: string; nameHe?: string }
    >();

    // חודשים מגיעים מהליגה עצמה
    const months = league?.months || [];

    // אצטדיונים מחושבים מהמשחקים
    initialFixtures.forEach((fixture) => {
      if (fixture.venue?._id && fixture.venue?.name) {
        venues.set(fixture.venue._id, {
          _id: fixture.venue._id,
          name: fixture.venue.name,
          nameHe: fixture.venue.nameHe || fixture.venue.name_he,
        });
      }
    });

    return {
      availableMonths: months,
      availableVenues: Array.from(venues.values()),
    };
  }, [league, initialFixtures]);

  // שליפת משחקים עם Hook מותאם אישית
  const { fixtures, isLoading } = useLeagueFixtures(
    leagueId,
    {
      limit: 100,
      page: 1,
      month: filters.month,
      venueId: filters.venueId,
    },
    initialFixtures
  );

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
      console.log(
        "%c🔍 [LeagueFixtures] Client-side venue filter applied",
        "color: #f59e0b; font-weight: bold",
        {
          month: filters.month,
          venueId: filters.venueId,
          beforeFilter: fixtures.length,
          afterFilter: filtered.length,
        }
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
        <LeagueFixturesFilter
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
