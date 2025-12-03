import React, { Suspense } from "react";
import HeroSection from "@/components/home/HeroSection";
import { TeamCarousel } from "@/components/league/TeamCarousel";
import LeagueService from "@/services/leagueService";
import { League } from "@/types";
import TeamsPageLoading from "./loading";

async function TeamsContent() {
  const leaguesRes = await LeagueService.getAllLeaguesWithTeams();
  const leagues = leaguesRes.success ? leaguesRes.data || [] : [];

  if (leagues.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">אין קבוצות זמינות</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {leagues.map((league: League) => {
        // סינון קבוצות עם teams
        const teams = league.teams || [];
        if (teams.length === 0) return null;

        return (
          <div key={league._id || league.id} className="mb-12">
            {/* League Title */}
            <div className="text-right mb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                קבוצות {league.name}
              </h2>
            </div>

            {/* Teams Carousel */}
            <TeamCarousel teams={teams} />
          </div>
        );
      })}
    </div>
  );
}

export default function TeamsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<TeamsPageLoading />}>
          <TeamsContent />
        </Suspense>
      </main>
    </div>
  );
}
