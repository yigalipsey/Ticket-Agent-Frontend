"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LeagueHero } from "@/components/league/LeagueHero";
import { TeamCarousel } from "@/components/league/TeamCarousel";
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

  // מונע hydration mismatch - מוודא שהקומפוננטה מתחילה באותו מצב בשרת ובלקוח
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Loading state - זהה למבנה של התוכן האמיתי
  if (!isClient || isLoading) {
    return (
      <>
        {/* כותרת הליגה - loading state */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 space-x-reverse">
            <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>
        </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
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
      <div className="min-h-screen bg-white flex items-center justify-center">
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
    <div className="bg-white">
      {/* Hero הליגה - מ-cache או CSR */}
      <LeagueHero league={league} />

      {/* קרוסלת קבוצות - מ-cache או CSR */}
      {teams && teams.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 mt-8 bg-white">
          <TeamCarousel teams={teams} />
        </div>
      )}
    </div>
  );
}
