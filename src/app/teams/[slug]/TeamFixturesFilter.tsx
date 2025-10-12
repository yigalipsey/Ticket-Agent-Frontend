"use client";

import React from "react";
import {
  HomeAwayFilter,
  MonthFilter,
  TeamFixturesLeagueFilter,
  type HomeAwayFilterType,
} from "@/components/filters";

export type FilterType = "all" | "home" | "away";

interface League {
  _id: string;
  id?: string;
  name?: string;
  nameHe?: string;
  slug?: string;
}

interface Fixture {
  _id: string;
  date: string;
  homeTeam: { _id?: string; id?: string; name: string };
  awayTeam: { _id?: string; id?: string; name: string };
  league?: League;
}

interface TeamFixturesFilterProps {
  fixtures: Fixture[];
  selectedFilter: FilterType;
  setSelectedFilter: (filter: FilterType) => void;
  selectedMonth: string | null;
  setSelectedMonth: (month: string | null) => void;
  selectedLeague: string | null;
  setSelectedLeague: (leagueId: string | null) => void;
}

export function TeamFixturesFilter({
  fixtures,
  selectedFilter,
  setSelectedFilter,
  selectedMonth,
  setSelectedMonth,
  selectedLeague,
  setSelectedLeague,
}: TeamFixturesFilterProps) {
  // חישוב חודשים זמינים מהמשחקים
  const availableMonths = React.useMemo(() => {
    if (!fixtures || fixtures.length === 0) return [];
    const months = new Set<string>();
    fixtures.forEach((fixture) => {
      if (fixture.date) {
        const date = new Date(fixture.date);
        const monthKey = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;
        months.add(monthKey);
      }
    });
    return Array.from(months).sort();
  }, [fixtures]);

  // חישוב ליגות זמינות מהמשחקים
  const availableLeagues = React.useMemo(() => {
    if (!fixtures || fixtures.length === 0) return [];
    const leagues = new Map<string, League>();
    fixtures.forEach((fixture) => {
      if (fixture.league) {
        const leagueId = fixture.league._id || fixture.league.id;
        if (leagueId && !leagues.has(leagueId)) {
          leagues.set(leagueId, fixture.league);
        }
      }
    });
    return Array.from(leagues.values());
  }, [fixtures]);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">סינון משחקים</h3>

      <div className="flex flex-wrap gap-4">
        <HomeAwayFilter
          selectedFilter={selectedFilter as HomeAwayFilterType}
          onFilterChange={setSelectedFilter}
          labels={{
            all: "כל המשחקים",
            home: "משחקי בית",
            away: "משחקי חוץ",
          }}
        />

        <TeamFixturesLeagueFilter
          selectedLeague={selectedLeague}
          availableLeagues={availableLeagues}
          onLeagueChange={setSelectedLeague}
          label="כל הליגות"
        />

        <MonthFilter
          selectedMonth={selectedMonth}
          availableMonths={availableMonths}
          onMonthChange={setSelectedMonth}
          label="כל החודשים"
        />
      </div>

      {/* Current active filters */}
      {(selectedFilter !== "all" || selectedMonth || selectedLeague) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {selectedFilter !== "all" && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {selectedFilter === "home"
                  ? "משחקי בית"
                  : selectedFilter === "away"
                  ? "משחקי חוץ"
                  : ""}
              </span>
            )}
            {selectedLeague &&
              (() => {
                const league = availableLeagues.find(
                  (l) => (l._id || l.id) === selectedLeague
                );
                const leagueName =
                  league?.nameHe || league?.name || league?.slug || "ליגה";
                return (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {leagueName}
                  </span>
                );
              })()}
            {selectedMonth && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {new Date(selectedMonth).toLocaleDateString("he-IL", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
