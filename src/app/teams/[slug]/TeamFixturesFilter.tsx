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

  const hasActiveFilters =
    selectedFilter !== "all" || selectedMonth || selectedLeague;

  const handleReset = () => {
    setSelectedFilter("all");
    setSelectedMonth(null);
    setSelectedLeague(null);
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-6 relative z-50">
      {/* Mobile: First row - Home/Away only, Second row - League and Month */}
      {/* Desktop: All in one row */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-3">
        {/* First row on mobile, first in row on desktop */}
        <div className="flex flex-row gap-3 items-center flex-wrap md:mb-0 mb-3">
          <HomeAwayFilter
            selectedFilter={selectedFilter as HomeAwayFilterType}
            onFilterChange={setSelectedFilter}
            labels={{
              all: "כל המשחקים",
              home: "משחקי בית",
              away: "משחקי חוץ",
            }}
          />

          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm whitespace-nowrap"
            >
              איפוס מסננים
            </button>
          )}
        </div>

        {/* Second row on mobile, continues on desktop */}
        <div className="flex flex-row gap-3 items-center">
          <div className="flex-1">
            <TeamFixturesLeagueFilter
              selectedLeague={selectedLeague}
              availableLeagues={availableLeagues}
              onLeagueChange={setSelectedLeague}
              label="ליגה"
            />
          </div>

          <div className="flex-1">
            <MonthFilter
              selectedMonth={selectedMonth}
              availableMonths={availableMonths}
              onMonthChange={setSelectedMonth}
              label="חודש"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
