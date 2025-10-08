"use client";

import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import FixtureCard from "@/components/fixture/FixtureCard";
import FixtureService from "@/services/fixtureService";
import { Fixture } from "@/types/fixture";

interface LeagueFixturesProps {
  leagueId: string | null;
  initialFixtures: Fixture[];
}

interface FilterOptions {
  month?: string;
  city?: string;
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
}: LeagueFixturesProps) {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<FilterOptions>({
    limit: 20,
  });

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

  // פילטר משחקים לפי חודש (client-side)
  const filteredFixtures = filters.month
    ? fixtures.filter((f) => {
        const fixtureDate = new Date(f.date);
        const fixtureMonth = `${fixtureDate.getFullYear()}-${String(
          fixtureDate.getMonth() + 1
        ).padStart(2, "0")}`;
        return fixtureMonth === filters.month;
      })
    : fixtures;

  if (!leagueId || filteredFixtures.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">אין משחקים להצגה</p>
      </div>
    );
  }

  // יצירת רשימת חודשים זמינים
  const availableMonths = Array.from(
    new Set(
      fixtures.map((f) => {
        const date = new Date(f.date);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}`;
      })
    )
  ).sort();

  return (
    <div className="mb-8">
      {/* כותרת + פילטרים */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">
          משחקים קרובים ({filteredFixtures.length})
        </h2>

        {/* פילטר חודש */}
        {availableMonths.length > 1 && (
          <select
            value={filters.month || ""}
            onChange={(e) =>
              setFilters({ ...filters, month: e.target.value || undefined })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">כל החודשים</option>
            {availableMonths.map((month) => {
              const [year, monthNum] = month.split("-");
              const monthNames = [
                "ינואר",
                "פברואר",
                "מרץ",
                "אפריל",
                "מאי",
                "יוני",
                "יולי",
                "אוגוסט",
                "ספטמבר",
                "אוקטובר",
                "נובמבר",
                "דצמבר",
              ];
              return (
                <option key={month} value={month}>
                  {monthNames[parseInt(monthNum) - 1]} {year}
                </option>
              );
            })}
          </select>
        )}
      </div>

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
