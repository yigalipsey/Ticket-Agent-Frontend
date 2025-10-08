import React from "react";
import {
  HeroSection,
  PopularLeaguesSection,
  HotFixturesSection,
  HotTeamsSection,
} from "@/components/home";
import ClientHydration from "@/components/ClientHydration";
import LeagueService from "@/services/leagueService";
import FixtureService from "@/services/fixtureService";

export default async function HomePage() {
  const [leaguesRes, fixturesRes] = await Promise.all([
    LeagueService.getAllLeaguesWithTeams(),
    FixtureService.getHotFixtures(5),
  ]);

  const leagues = leaguesRes.success ? leaguesRes.data || [] : [];
  const hotFixtures = fixturesRes.success ? fixturesRes.data || [] : [];

  const popularLeagues = leagues.filter((league) => league.isPopular);

  // איסוף כל הקבוצות מהליגות (ללא כפילויות)
  const allTeams = leagues.flatMap((league) => league.teams || []);

  // שימוש ב-Map למניעת כפילויות לפי _id
  const teamsMap = new Map();
  allTeams.forEach((team) => {
    if (!teamsMap.has(team._id)) {
      teamsMap.set(team._id, team);
    }
  });

  const uniqueTeams = Array.from(teamsMap.values());
  const hotTeams = uniqueTeams.filter((team) => team.isPopular);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hydration של SSR data ל-React Query cache */}
      <ClientHydration
        initialLeagues={leagues}
        initialHotFixtures={hotFixtures}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Popular Leagues - מקבל רק את הפופולריות */}
        <PopularLeaguesSection leagues={popularLeagues} />

        {/* Hot Teams - מקבל את הקבוצות החמות מהליגות */}
        <HotTeamsSection teams={hotTeams} />

        {/* Hot Fixtures - מקבל ישירות את המשחקים החמים */}
        <HotFixturesSection fixtures={hotFixtures} />
      </main>
    </div>
  );
}
