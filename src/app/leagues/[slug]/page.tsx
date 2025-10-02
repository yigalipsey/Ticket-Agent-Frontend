"use client";

import { use } from "react";
import { useLeagueData, useLeagueFixtures } from "@/hooks";
import {
  LeagueTeamsSection,
  LeagueHeader,
  LeagueHeaderLoading,
  LeagueHeaderError,
  LeagueFixturesSection,
} from "@/components";

export default function LeaguePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: leagueSlug } = use(params);

  // Hook יחיד שמחזיר את כל נתוני הליגה
  const { league, leagueId, teams, isLoading, error } =
    useLeagueData(leagueSlug);

  // טעינת משחקי הליגה (רק אם יש leagueId)
  const { fixtures, isLoading: fixturesLoading } = useLeagueFixtures(
    leagueId || "",
    {
      autoFetch: !!leagueId,
      query: {
        limit: 50,
        upcoming: "true",
      },
    }
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LeagueHeaderLoading />
          <LeagueTeamsSection teams={[]} />
        </div>
      </div>
    );
  }

  // Error state
  if (error || !league) {
    return <LeagueHeaderError slug={leagueSlug} error={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* כותרת הליגה */}
        <LeagueHeader league={league} />

        {/* קרוסלת קבוצות */}
        <div className="mb-8">
          <LeagueTeamsSection teams={teams || []} />
        </div>

        {/* משחקי הליגה */}
        <LeagueFixturesSection
          fixtures={fixtures || []}
          isLoading={fixturesLoading}
        />
      </div>
    </div>
  );
}
