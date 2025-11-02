"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LeagueHero } from "@/components/league/LeagueHero";
import { TeamCarousel } from "@/components/league/TeamCarousel";
import { useLeagueData } from "@/hooks/league";

interface LeaguePageClientProps {
  slug: string;
  leagueId: string | null;
  hrefPrefix?: string; // להוסיף prefix לאי-ר של routes לדף סוכן
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
  hrefPrefix = "",
}: LeaguePageClientProps) {
  // hrefPrefix שמור לעתיד
  void hrefPrefix;
  // שליפת פרטי ליגה: cache (לפי slug) → API (לפי ID)
  const { league, teams, isLoading, error } = useLeagueData(slug, leagueId);

  // מונע hydration mismatch - מוודא שהקומפוננטה מתחילה באותו מצב בשרת ובלקוח
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Loading state - תואם למבנה של התוכן האמיתי
  if (!isClient || isLoading) {
    return (
      <>
        {/* Hero Section Skeleton */}
        <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />
          
          <div className="relative z-10 h-full flex flex-col items-center justify-center gap-6 px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex flex-col items-center gap-6">
                {/* League Logo Skeleton */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg bg-white/80">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gray-300 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* League Title Skeleton */}
                <div className="space-y-2">
                  <div className="h-10 md:h-12 bg-white/60 rounded-lg w-64 md:w-80 mx-auto animate-pulse"></div>
                  <div className="h-5 bg-white/40 rounded-lg w-48 md:w-64 mx-auto animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teams Carousel Skeleton */}
        <div className="max-w-7xl mx-auto mt-3 md:mt-8 md:p-6 bg-white">
          <div className="mb-4">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex gap-4 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 text-center space-y-3 p-4 min-w-[100px]"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-200 rounded mx-auto animate-pulse"></div>
              </div>
            ))}
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
    <div className="">
      {/* Hero הליגה - מ-cache או CSR */}
      <LeagueHero league={league} />

      {/* קרוסלת קבוצות - מ-cache או CSR */}
      {teams && teams.length > 0 && (
        <div className="max-w-7xl mx-auto mt-3 md:mt-8 md:p-6 bg-white">
          <TeamCarousel teams={teams} hrefPrefix={hrefPrefix} />
        </div>
      )}
    </div>
  );
}
