"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { TeamSearchBar } from "@/components";
import { TeamWithFixtures, SearchFixture } from "@/services/searchService";

export default function SearchSection() {
  const router = useRouter();

  const handleTeamSelect = (team: TeamWithFixtures) => {
    console.log("Selected team:", team);

    // Navigate to agent team page
    router.push(`/agent/teams/${team.team.slug}?id=${team.team._id}`);
  };

  const handleFixtureSelect = (fixture: SearchFixture) => {
    console.log("Selected fixture:", fixture);

    // Navigate to agent fixture page with ID
    router.push(`/agent/fixtures/${fixture.slug}?id=${fixture._id}`);
  };

  const handleFilterClick = () => {
    // TODO: Implement filter functionality
    console.log("Filter clicked");
  };

  return (
    <section className="w-[90%] md:max-w-[500px] mx-auto relative z-[10000]">
      <div className="bg-white/20 backdrop-blur-sm rounded-lg shadow-lg">
        <TeamSearchBar
          placeholder="חפש קבוצות..."
          onTeamSelect={handleTeamSelect}
          onFixtureSelect={handleFixtureSelect}
          onFilterClick={handleFilterClick}
          showFilters={true}
          size="lg"
          limit={5}
          fixturesLimit={4}
        />
      </div>
    </section>
  );
}
