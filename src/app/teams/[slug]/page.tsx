import React from "react";
import TeamPageClient from "./TeamPageClient";
import TeamFixturesWrapper from "./TeamFixturesWrapper";
import FixtureService from "@/services/fixtureService";
import { Fixture } from "@/types/fixture";

interface TeamPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ id?: string }>;
}

export default async function TeamPage({
  params,
  searchParams,
}: TeamPageProps) {
  const { slug: teamSlug } = await params;
  const { id: idFromQuery } = await searchParams;

  // SSR: שימוש ב-ID מה-query (ניווט פנימי)
  let teamId: string | null = idFromQuery || null;

  // אם אין ID ב-query - נסיון למצוא מ-NavigationService (לא עובד ב-SSR)
  // במקרה זה נסתמך על ה-Client Component לטעון את הנתונים
  if (!teamId) {
    // ⚠️ SSR לא יכול לגשת ל-NavigationService (client-side)
    // לכן נשאיר teamId = null והClient יטפל בזה
  }

  // SSR: משיכת כל המשחקים של הקבוצה בבת אחת
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
        const homeTeamId = firstFixture.homeTeam?.id || firstFixture.homeTeam?._id;
        const awayTeamId = firstFixture.awayTeam?.id || firstFixture.awayTeam?._id;
        
        if (homeTeamId === teamId) {
          teamName = firstFixture.homeTeam?.name;
          teamLogo = firstFixture.homeTeam?.logo || firstFixture.homeTeam?.logoUrl;
        } else if (awayTeamId === teamId) {
          teamName = firstFixture.awayTeam?.name;
          teamLogo = firstFixture.awayTeam?.logo || firstFixture.awayTeam?.logoUrl;
        }
      }
    } catch (error) {
      console.error(`[SSR] Error fetching team fixtures:`, error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Client: כותרת הקבוצה (מ-cache או CSR או מהמשחקים) */}
        <TeamPageClient
          slug={teamSlug}
          teamId={teamId}
          fallbackName={teamName}
          fallbackLogo={teamLogo}
        />

        {/* Client: משחקים עם נתוני SSR + פילטור דינמי */}
        <TeamFixturesWrapper
          teamId={teamId}
          teamSlug={teamSlug}
          initialFixtures={fixtures}
          showFilters={true}
        />
      </div>
    </div>
  );
}
