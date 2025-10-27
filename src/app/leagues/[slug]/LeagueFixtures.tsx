"use client";

import { useState, useMemo } from "react";
import FixtureCard from "@/components/fixture/FixtureCard";
import { Fixture } from "@/types/fixture";
import LeagueFixturesFilter from "@/app/leagues/LeagueFixturesFilter";
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

      {/* טוען */}
      {isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500">טוען משחקים...</p>
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
