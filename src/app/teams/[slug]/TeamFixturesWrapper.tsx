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
        <div className="flex flex-col gap-3">
          {filteredFixtures.map((fixture) => (
            <FixtureCard
              key={fixture.id}
              fixture={fixture}
              showOffers={true}
              showVenue={true}
              showLeague={true}
              variant="horizontal"
            />
          ))}
        </div>
      ) : initialFixtures.length === 0 && teamId ? (
        <div className="space-y-4">
          {/* Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-base font-medium text-blue-900">
              אין כרגע הצעות לכרטיסים לקבוצה זו
            </p>
          </div>

          {/* Skeleton Fixtures */}
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="bg-white border-b border-gray-200 last:border-b-0"
              >
                <div className="p-4 flex flex-row items-start gap-4">
                  {/* Date Box Skeleton */}
                  <div className="flex flex-col items-center justify-start bg-gray-50 px-3 py-2 rounded flex-shrink-0 w-20 h-20 mt-1">
                    <div className="h-3 w-12 bg-gray-200 rounded mb-1 animate-pulse"></div>
                    <div className="h-6 w-10 bg-gray-300 rounded mb-1 animate-pulse"></div>
                    <div className="h-3 w-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>

                  {/* Desktop containers wrapper */}
                  <div className="hidden md:flex items-center gap-4">
                    {/* League logo skeleton */}
                    <div className="flex flex-col items-center justify-center gap-2 flex-shrink-0 w-20 h-20">
                      <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Teams Skeleton */}
                  <div className="flex md:items-center flex-1 min-w-0 gap-2 md:gap-6">
                    {/* Desktop layout */}
                    <div className="hidden md:flex items-center gap-6 min-w-0">
                      <div className="flex items-start gap-6 min-h-[80px] flex-shrink-0">
                        {/* Home Team Skeleton */}
                        <div className="flex flex-col items-center gap-2 w-32">
                          <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                        </div>

                        {/* VS */}
                        <span className="text-base font-medium text-gray-300 px-2 flex-shrink-0 self-center">
                          נגד
                        </span>

                        {/* Away Team Skeleton */}
                        <div className="flex flex-col items-center gap-2 w-32">
                          <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                      {/* Venue skeleton on desktop */}
                      <div className="flex flex-col gap-1 flex-shrink-0 bg-gray-50 rounded-lg px-3 py-2 w-[220px]">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile layout */}
                    <div className="md:hidden flex flex-col flex-1 w-full min-w-0 gap-2">
                      <div className="flex items-center flex-wrap w-full">
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                        <span className="text-gray-300 mx-1">נגד</span>
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button Skeleton */}
                  <div className="flex-shrink-0 md:self-center">
                    <div className="w-10 h-10 md:w-32 md:h-10 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600 py-12 bg-white rounded-lg shadow-sm border">
          <p>אין משחקים זמינים בסינון הנוכחי.</p>
        </div>
      )}
    </div>
  );
}
