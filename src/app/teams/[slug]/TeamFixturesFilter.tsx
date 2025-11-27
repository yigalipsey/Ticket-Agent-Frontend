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
    <div className="bg-white rounded-lg p-4 pb-3">
      {/* Desktop: All filters in one row */}
      <div className="hidden md:flex md:flex-wrap gap-4">
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

      {/* Mobile: First row - Home/Away, Second row - League and Month together */}
      <div className="flex md:hidden flex-col gap-4">
        <HomeAwayFilter
          selectedFilter={selectedFilter as HomeAwayFilterType}
          onFilterChange={setSelectedFilter}
          labels={{
            all: "כל המשחקים",
            home: "משחקי בית",
            away: "משחקי חוץ",
          }}
        />

        {/* Second row - League and Month together */}
        <div className="flex gap-4">
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
      </div>
    </div>
  );
}
