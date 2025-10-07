import React from "react";
import { HeroSection } from "@/components/home";
import AllLeaguesPrefetch from "@/components/AllLeaguesPrefetch";
import HotFixturesPrefetch from "@/components/HotFixturesPrefetch";
import LeagueService from "@/services/leagueService";
import FixtureService from "@/services/fixtureService";

export default async function HomePage() {
  const [leaguesRes, fixturesRes] = await Promise.all([
    LeagueService.getAllLeaguesWithTeams(),
    FixtureService.getHotFixtures(5),
  ]);

  const leagues = leaguesRes.success ? leaguesRes.data || [] : [];
  const fixtures = fixturesRes.success ? fixturesRes.data || [] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Popular Leagues */}
        <AllLeaguesPrefetch initialLeagues={leagues} />

        {/* Hot Fixtures */}
        <HotFixturesPrefetch initialFixtures={fixtures} />
      </main>
    </div>
  );
}
