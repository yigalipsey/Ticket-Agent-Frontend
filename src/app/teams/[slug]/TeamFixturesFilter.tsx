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
    <div className="w-full">
      {/* Desktop & Tablet Layout */}
      <div className="hidden md:flex md:flex-wrap items-center gap-4 bg-white p-1 rounded-2xl border border-gray-100 shadow-sm md:w-fit">
        <HomeAwayFilter
          selectedFilter={selectedFilter as HomeAwayFilterType}
          onFilterChange={setSelectedFilter}
          labels={{
            all: "כל המשחקים",
            home: "בית",
            away: "חוץ",
          }}
        />

        <div className="h-8 w-px bg-gray-200 mx-1" />

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

      {/* Mobile Layout - Scrollable or Stacked */}
      <div className="flex md:hidden flex-col gap-3">
        <HomeAwayFilter
          selectedFilter={selectedFilter as HomeAwayFilterType}
          onFilterChange={setSelectedFilter}
          labels={{
            all: "הכל",
            home: "בית",
            away: "חוץ",
          }}
          fullWidth
        />

        <div className="grid grid-cols-2 gap-3">
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
