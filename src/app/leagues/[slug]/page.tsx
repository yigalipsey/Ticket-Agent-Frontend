import React from "react";
import LeaguePageClient from "./LeaguePageClient";
import LeagueFixtures from "./LeagueFixtures";
import LeagueService from "@/services/leagueService";
import FixtureService from "@/services/fixtureService";
import { Fixture } from "@/types/fixture";

interface LeaguePageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ id?: string }>;
}

/**
 * Server Component - SSR למשחקים בלבד
 *
 * זרימה:
 * 1. ניווט פנימי: מקבל ID ב-query param (אפס קריאות!) ⚡
 * 2. נחיתה ישירה: קריאה ל-getLeagueIdBySlug
 * 3. משיכת 20 משחקים ב-SSR (חשוב ל-SEO)
 * 4. Client Component מביא פרטי ליגה מ-cache או CSR
 */
export default async function LeaguePage({
  params,
  searchParams,
}: LeaguePageProps) {
  const { slug: leagueSlug } = await params;
  const { id: idFromQuery } = await searchParams;

  // SSR: שימוש ב-ID מה-query (ניווט פנימי) או fetch (נחיתה ישירה)
  let leagueId: string | null = idFromQuery || null;

  // רק אם אין ID ב-query (נחיתה ישירה) - נעשה קריאה לשרת
  if (!leagueId) {
    const leagueIdRes = await LeagueService.getLeagueIdBySlug(leagueSlug);
    leagueId = leagueIdRes.success ? leagueIdRes.data?._id || null : null;
  }

  // SSR: משיכת 20 משחקים (זה מה שחשוב ל-SEO)
  let fixtures: Fixture[] = [];
  if (leagueId) {
    const fixturesResult = await FixtureService.getLeagueFixtures(leagueId, {
      limit: 30,
      page: 1,
    });
    fixtures =
      fixturesResult.success && fixturesResult.data ? fixturesResult.data : [];
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Client: כותרת + קבוצות (מ-cache או CSR עם leagueId) */}
        <LeaguePageClient slug={leagueSlug} leagueId={leagueId} />

        {/* Client: משחקים עם נתוני SSR + פילטור דינמי */}
        <LeagueFixtures leagueId={leagueId} initialFixtures={fixtures} />
      </div>
    </div>
  );
}
