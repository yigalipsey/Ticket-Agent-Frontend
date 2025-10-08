"use client";

import Link from "next/link";
import { LeagueHeader } from "@/components/league/LeagueHeader";
import { LeagueTeamsSection } from "@/components/league/LeagueTeamsSection";
import { useLeagueData } from "@/hooks/league";

interface LeaguePageClientProps {
  slug: string;
  leagueId: string | null;
}

/**
 * Client Component - כותרת וקבוצות בלבד
 *
 * זרימה:
 * 1. useLeagueData בודק cache של "all-leagues-with-teams" מהדף הראשי (לפי slug)
 * 2. אם יש - משתמש בו ללא API call ⚡
 * 3. אם אין - משתמש ב-leagueId לקריאת API (CSR)
 *
 * ⚠️ המשחקים מוצגים ב-LeagueFixtures (client component נפרד)
 */
export default function LeaguePageClient({
  slug,
  leagueId,
}: LeaguePageClientProps) {
  // שליפת פרטי ליגה: cache (לפי slug) → API (לפי ID)
  const { league, teams, isLoading, error } = useLeagueData(slug, leagueId);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">טוען נתוני ליגה...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">שגיאה</h1>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <Link
            href="/leagues"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block"
          >
            חזרה לכל הליגות
          </Link>
        </div>
      </div>
    );
  }

  // Not found
  if (!league) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            ליגה לא נמצאה
          </h1>
          <p className="text-gray-600 mb-4">
            הליגה &quot;{slug}&quot; לא קיימת במערכת
          </p>
          <Link
            href="/leagues"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block"
          >
            חזרה לכל הליגות
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* כותרת הליגה - מ-cache או CSR */}
      <LeagueHeader league={league} />

      {/* קרוסלת קבוצות - מ-cache או CSR */}
      {teams && teams.length > 0 && (
        <div className="mb-8">
          <LeagueTeamsSection teams={teams} />
        </div>
      )}
    </>
  );
}
