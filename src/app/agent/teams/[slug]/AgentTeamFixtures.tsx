"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Fixture } from "@/types/fixture";
import {
  TeamFixturesFilter,
  FilterType,
} from "@/app/teams/[slug]/TeamFixturesFilter";
import FixtureCard from "@/components/fixture/FixtureCard";

interface AgentTeamFixturesProps {
  teamId: string | null;
  teamSlug: string;
  initialFixtures: Fixture[];
}

export default function AgentTeamFixtures({
  teamId,
  teamSlug: _teamSlug,
  initialFixtures,
}: AgentTeamFixturesProps) {
  // teamSlug שמור לעתיד
  void _teamSlug;
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);

  // פילטר משחקים (client-side) - הסוכן רואה את כל המשחקים
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
      filtered = filtered.filter((fixture: Fixture) => {
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

  // אם אין משחקים
  if (!teamId && initialFixtures.length === 0) {
    return (
      <div className="text-center text-gray-600 py-12">
        <p>לא נמצאו משחקים עבור קבוצה זו.</p>
      </div>
    );
  }

  // המרה לפריט לטיפול בפילטרים
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
    <div className="mb-8">
      {/* כותרת */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        משחקים - העלאת הצעות
      </h2>

      {/* פילטרים */}
      {teamId && initialFixtures.length > 0 && (
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

      {/* רשימת משחקים - תצוגה אופקית */}
      {filteredFixtures.length > 0 ? (
        <div className="flex flex-col gap-3 mt-6">
          {filteredFixtures.map((fixture) => (
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
              showLeague={true}
              variant="horizontal"
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 py-12 bg-white rounded-lg shadow-sm border mt-6">
          <p>אין משחקים זמינים בסינון הנוכחי.</p>
        </div>
      )}
    </div>
  );
}
