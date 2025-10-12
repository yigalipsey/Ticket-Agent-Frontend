"use client";

import React, { useState, useMemo } from "react";
import { FixtureCard } from "@/components";
import { TeamFixturesFilter, FilterType } from "./TeamFixturesFilter";
import { Fixture } from "@/types/fixture";

interface TeamFixturesWrapperProps {
  teamId: string | null;
  teamSlug?: string;
  initialFixtures: Fixture[];
  showFilters?: boolean;
}

export default function TeamFixturesWrapper({
  teamId,
  initialFixtures,
  showFilters = true,
}: TeamFixturesWrapperProps) {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);

  // Filter fixtures based on selected filters (client-side)
  const filteredFixtures = useMemo(() => {
    if (!initialFixtures || initialFixtures.length === 0) return [];

    let filtered = [...initialFixtures];

    // Filter by home/away
    if (teamId && selectedFilter !== "all") {
      filtered = filtered.filter((fixture) => {
        const homeTeamId = fixture.homeTeam?.id || fixture.homeTeam?._id;
        const awayTeamId = fixture.awayTeam?.id || fixture.awayTeam?._id;

        if (selectedFilter === "home") {
          return homeTeamId === teamId;
        } else if (selectedFilter === "away") {
          return awayTeamId === teamId;
        }
        return true;
      });
    }

    // Filter by league
    if (selectedLeague) {
      filtered = filtered.filter((fixture) => {
        const fixtureLeagueId = fixture.league?._id || fixture.league?.id;
        return fixtureLeagueId === selectedLeague;
      });
    }

    // Filter by month
    if (selectedMonth) {
      filtered = filtered.filter((fixture) => {
        if (!fixture.date) return false;
        const fixtureDate = new Date(fixture.date);
        const fixtureMonth = `${fixtureDate.getFullYear()}-${String(
          fixtureDate.getMonth() + 1
        ).padStart(2, "0")}`;
        return fixtureMonth === selectedMonth;
      });
    }

    return filtered;
  }, [initialFixtures, teamId, selectedFilter, selectedLeague, selectedMonth]);

  if (!teamId && initialFixtures.length === 0) {
    return (
      <div className="text-center text-gray-600 py-12">
        <p>לא נמצאו משחקים עבור קבוצה זו.</p>
      </div>
    );
  }

  // Convert initialFixtures to format expected by TeamFilters
  const fixturesForFilter = initialFixtures.map((fixture) => {
    return {
      _id: fixture.id || fixture._id || "",
      date: fixture.date,
      homeTeam: {
        _id: fixture.homeTeam?.id || fixture.homeTeam?._id || "",
        name: fixture.homeTeam?.name || "",
      },
      awayTeam: {
        _id: fixture.awayTeam?.id || fixture.awayTeam?._id || "",
        name: fixture.awayTeam?.name || "",
      },
      league: fixture.league
        ? {
            _id: fixture.league._id || fixture.league.id || "",
            name: fixture.league.name || "",
            nameHe: fixture.league.nameHe,
            slug: fixture.league.slug || "",
          }
        : undefined,
    };
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      {showFilters && teamId && initialFixtures.length > 0 && (
        <TeamFixturesFilter
          fixtures={fixturesForFilter}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedLeague={selectedLeague}
          setSelectedLeague={setSelectedLeague}
        />
      )}

      {/* Fixtures List */}
      {filteredFixtures.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFixtures.map((fixture) => (
            <FixtureCard
              key={fixture.id}
              fixture={fixture}
              showOffers={true}
              showVenue={true}
              showLeague={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 py-12 bg-white rounded-lg shadow-sm border">
          <p>אין משחקים זמינים בסינון הנוכחי.</p>
        </div>
      )}
    </div>
  );
}
