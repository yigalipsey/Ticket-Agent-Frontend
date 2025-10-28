import React from "react";
import AgentTeamPageClient from "./AgentTeamPageClient";
import FixtureService from "@/services/fixtureService";
import { Fixture } from "@/types/fixture";

interface AgentTeamPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ id?: string }>;
}

/**
 * Server Component - דף קבוצה לסוכן (SSR)
 * זהה לדף הקבוצה הרגיל, אבל עם אימות סוכן וטופס הצעה
 */
export default async function AgentTeamPage({
  params,
  searchParams,
}: AgentTeamPageProps) {
  const { slug: teamSlug } = await params;
  const { id: idFromQuery } = await searchParams;

  // SSR: שימוש ב-ID מה-query (ניווט פנימי)
  const teamId: string | null = idFromQuery || null;

  // SSR: משיכת כל המשחקים של הקבוצה
  let fixtures: Fixture[] = [];
  let teamName: string | undefined = undefined;
  let teamLogo: string | undefined = undefined;

  if (teamId) {
    try {
      const fixturesResult = await FixtureService.getTeamFixtures(teamId, {
        limit: "1000", // כל המשחקים
        upcoming: "true",
      });
      fixtures = fixturesResult || [];

      // קבלת שם ולוגו של הקבוצה מהמשחק הראשון
      if (fixtures.length > 0) {
        const firstFixture = fixtures[0];
        const homeTeamId =
          firstFixture.homeTeam?.id || firstFixture.homeTeam?._id;
        const awayTeamId =
          firstFixture.awayTeam?.id || firstFixture.awayTeam?._id;

        if (homeTeamId === teamId) {
          teamName = firstFixture.homeTeam?.name;
          teamLogo =
            firstFixture.homeTeam?.logo || firstFixture.homeTeam?.logoUrl;
        } else if (awayTeamId === teamId) {
          teamName = firstFixture.awayTeam?.name;
          teamLogo =
            firstFixture.awayTeam?.logo || firstFixture.awayTeam?.logoUrl;
        }
      }
    } catch (error) {
      console.error(`[SSR] Error fetching team fixtures:`, error);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Client Component: כל הלוגיקה של הסוכן */}
      <AgentTeamPageClient
        slug={teamSlug}
        teamId={teamId}
        fallbackName={teamName}
        fallbackLogo={teamLogo}
        initialFixtures={fixtures}
      />
    </div>
  );
}
