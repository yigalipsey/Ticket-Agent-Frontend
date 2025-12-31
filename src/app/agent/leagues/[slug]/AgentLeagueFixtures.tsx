"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Fixture } from "@/types/fixture";
import LeagueFixturesFilter from "@/app/leagues/LeagueFixturesFilter";
import { useLeagueFixtures } from "@/hooks/fixture";
import { useLeagueData } from "@/hooks/league";
import FixtureCard from "@/components/fixture/FixtureCard";

interface AgentLeagueFixturesProps {
  leagueId: string | null;
  leagueSlug: string;
  initialFixtures: Fixture[];
}

interface FilterState {
  month: string | null;
  venueId: string | null;
}

export default function AgentLeagueFixtures({
  leagueId,
  leagueSlug,
  initialFixtures,
}: AgentLeagueFixturesProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>({
    month: null,
    venueId: null,
  });

  // שליפת פרטי הליגה (כולל החודשים)
  const { league } = useLeagueData(leagueSlug, leagueId);

  // שליפת משחקים עם Hook מותאם אישית
  // הסוכן רואה את כל המשחקים (ללא hasOffers) כדי להוסיף הצעות חדשות
  // משיכת כל המשחקים מה-cache (ללא limit) - אם יש cache עם כל המשחקים, נמשך את כולם
  const { fixtures, isLoading } = useLeagueFixtures(
    leagueId,
    {
      // לא נשלח limit - כך נמשך את כל המשחקים מה-cache
      page: 1,
      month: filters.month,
      venueId: filters.venueId,
    },
    initialFixtures
  );

  // חישוב חודשים ואצטדיונים זמינים
  const { availableMonths, availableVenues } = useMemo(() => {
    const venues = new Map<
      string,
      { _id: string; name: string; nameHe?: string }
    >();
    const monthsSet = new Set<string>();
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}`;

    // חודשים מגיעים מהליגה עצמה (אם יש) - רק מעכשיו והלאה
    const leagueMonths = league?.months || [];
    leagueMonths.forEach((month) => {
      if (month >= currentMonth) {
        monthsSet.add(month);
      }
    });

    // חודשים מחושבים מהמשחקים (fallback אם אין בליגה) - רק מעכשיו והלאה
    initialFixtures.forEach((fixture) => {
      if (fixture.venue?._id && fixture.venue?.name) {
        venues.set(fixture.venue._id, {
          _id: fixture.venue._id,
          name: fixture.venue.name,
          nameHe: fixture.venue.nameHe || fixture.venue.name_he,
        });
      }

      // חישוב חודש מהמשחק - רק אם המשחק בעתיד
      if (fixture.date) {
        const fixtureDate = new Date(fixture.date);
        if (fixtureDate >= now) {
          const monthKey = `${fixtureDate.getFullYear()}-${String(
            fixtureDate.getMonth() + 1
          ).padStart(2, "0")}`;
          if (monthKey >= currentMonth) {
            monthsSet.add(monthKey);
          }
        }
      }
    });

    // גם מהמשחקים הנוכחיים (אם יש) - רק מעכשיו והלאה
    fixtures.forEach((fixture) => {
      if (fixture.date) {
        const fixtureDate = new Date(fixture.date);
        if (fixtureDate >= now) {
          const monthKey = `${fixtureDate.getFullYear()}-${String(
            fixtureDate.getMonth() + 1
          ).padStart(2, "0")}`;
          if (monthKey >= currentMonth) {
            monthsSet.add(monthKey);
          }
        }
      }
    });

    return {
      availableMonths: Array.from(monthsSet).sort(),
      availableVenues: Array.from(venues.values()),
    };
  }, [league, initialFixtures, fixtures]);

  // פילטר משחקים (client-side)
  const visibleFixtures = useMemo(() => {
    let filtered = fixtures;

    // פילטר לפי אצטדיון - רק אם יש גם חודש
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
        <div className="mb-4">
          <LeagueFixturesFilter
            selectedMonth={filters.month || null}
            selectedVenue={filters.venueId || null}
            availableMonths={availableMonths}
            availableVenues={availableVenues}
            onMonthChange={handleMonthChange}
            onVenueChange={handleVenueChange}
          />
        </div>
        <div className="text-center py-12">
          <p className="text-gray-500">אין משחקים להצגה</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      {/* כותרת */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        משחקים - העלאת הצעות
      </h2>

      {/* פילטרים */}
      <div className="mb-4">
        <LeagueFixturesFilter
          selectedMonth={filters.month || null}
          selectedVenue={filters.venueId || null}
          availableMonths={availableMonths}
          availableVenues={availableVenues}
          onMonthChange={handleMonthChange}
          onVenueChange={handleVenueChange}
        />
      </div>

      {/* טוען */}
      {isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500">טוען משחקים...</p>
        </div>
      )}

      {/* רשימת משחקים - תצוגה אופקית ברוחב מלא */}
      {!isLoading && (
        <div className="flex flex-col gap-4 md:gap-0 md:bg-white md:border md:border-gray-200 md:rounded-lg md:overflow-hidden">
          {visibleFixtures.map((fixture: Fixture) => (
            <FixtureCard
              key={fixture.id || fixture._id}
              fixture={fixture}
              mode="agent"
              onAddOffer={() =>
                router.push(
                  `/agent/fixtures/${fixture._id || fixture.id}/offer`
                )
              }
              showOffers={true}
              showVenue={true}
              showLeague={false}
              variant="horizontal"
              className="w-full"
            />
          ))}
        </div>
      )}
    </div>
  );
}
