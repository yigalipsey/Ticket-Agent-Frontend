import React from "react";
import {
  HeroSection,
  PopularLeaguesSection,
  HotFixturesSection,
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
        {/* Popular Leagues - קורא מ-cache */}
        <PopularLeaguesSection />

        {/* Hot Fixtures - קורא מ-cache */}
        <HotFixturesSection />
      </main>
    </div>
  );
}
