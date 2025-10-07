import React from "react";
import LeaguePageClient from "./LeaguePageClient";

interface LeaguePageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Server Component - Thin wrapper
 * ⚠️ לא עושה fetch כאן!
 * המידע כבר זמין מדף הבית (all-leagues-with-teams)
 * ונשמר ב-React Query cache + localStorage persistence
 */
export default async function LeaguePage({ params }: LeaguePageProps) {
  const { slug: leagueSlug } = await params;

  // רק מעביר את ה-slug ל-Client Component
  // ה-Client Component ישתמש ב-React Query cache (מדף הבית)
  return <LeaguePageClient slug={leagueSlug} />;
}
