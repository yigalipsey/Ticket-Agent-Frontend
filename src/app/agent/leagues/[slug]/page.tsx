import React from "react";
import AgentLeaguePageClient from "./AgentLeaguePageClient";
import LeagueService from "@/services/leagueService";
import FixtureService from "@/services/fixtureService";
import { Fixture } from "@/types/fixture";

interface AgentLeaguePageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ id?: string }>;
}

/**
 * Server Component - דף ליגה לסוכן (SSR)
 * זהה לדף הליגה הרגיל, אבל עם אימות סוכן וטופס הצעה
 */
export default async function AgentLeaguePage({
  params,
  searchParams,
}: AgentLeaguePageProps) {
  const { slug: leagueSlug } = await params;
  const { id: idFromQuery } = await searchParams;

  // SSR: שימוש ב-ID מה-query (ניווט פנימי) או fetch (נחיתה ישירה)
  let leagueId: string | null = idFromQuery || null;

  // רק אם אין ID ב-query (נחיתה ישירה) - נעשה קריאה לשרת
  if (!leagueId) {
    const leagueIdRes = await LeagueService.getLeagueIdBySlug(leagueSlug);
    leagueId = leagueIdRes.success ? leagueIdRes.data?._id || null : null;
  }

  let fixtures: Fixture[] = [];
  if (leagueId) {
    const fixturesResult = await FixtureService.getLeagueFixtures(leagueId, {
      limit: 100,
      page: 1,
    });
    if (fixturesResult.success && fixturesResult.data) {
      fixtures = fixturesResult.data.fixtures || [];
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Client Component: כל הלוגיקה של הסוכן */}
        <AgentLeaguePageClient
          slug={leagueSlug}
          leagueId={leagueId}
          initialFixtures={fixtures}
        />
      </div>
    </div>
  );
}
