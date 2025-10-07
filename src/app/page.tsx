import React from "react";
import SearchSection from "@/components/home/SearchSection";
import AllLeaguesPrefetch from "@/components/AllLeaguesPrefetch";
import LeagueService from "@/services/leagueService";

export default async function HomePage() {
  const res = await LeagueService.getAllLeaguesWithTeams();
  const leagues = res.success ? res.data || [] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/images/people-soccer-stadium.jpg')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-6xl font-bold mb-6 animate-fade-in">
              TicketAgent
            </h1>
            <p className="text-2xl md:text-5xl mb-8 text-gray-200 animate-slide-up">
              השוואת כרטיסים למשחקי כדורגל
            </p>

            {/* Search Bar */}
            <SearchSection />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Popular Leagues */}
        <AllLeaguesPrefetch initialLeagues={leagues} />
      </main>
    </div>
  );
}
