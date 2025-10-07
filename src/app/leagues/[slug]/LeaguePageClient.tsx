"use client";

import React from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { League } from "@/types/league";
import { LeagueHeader, LeagueTeamsSection } from "@/components";
import { loadFromLocalStorage, LEAGUES_STORAGE_KEY } from "@/lib/utils";

interface LeaguePageClientProps {
  slug: string;
}

/**
 * Client Component - מציג דף ליגה
 * ⚠️ משתמש ב-React Query cache שכבר מלא מדף הבית!
 * אין קריאות API נוספות - הכל מגיע מ-cache (memory + localStorage persistence)
 */
export default function LeaguePageClient({ slug }: LeaguePageClientProps) {
  const queryClient = useQueryClient();

  // שליפה מ-React Query cache או localStorage
  const allLeagues = React.useMemo(() => {
    // ניסיון ראשון: React Query cache
    const cacheData = queryClient.getQueryData<League[]>([
      "all-leagues-with-teams",
    ]);
    if (cacheData) {
      console.log("✅ [LeaguePageClient] Using React Query cache");
      return cacheData;
    }

    // ניסיון שני: localStorage
    const localStorageData = loadFromLocalStorage<League>(LEAGUES_STORAGE_KEY);
    if (localStorageData) {
      console.log("✅ [LeaguePageClient] Using localStorage data");
      return localStorageData;
    }

    console.log("❌ [LeaguePageClient] No data found in cache or localStorage");
    return null;
  }, [queryClient]);

  // חיפוש הליגה המבוקשת
  const displayLeague = React.useMemo(() => {
    if (!allLeagues) return null;
    return allLeagues.find((league) => league.slug === slug);
  }, [allLeagues, slug]);

  // Loading state - מוצג רק אם ה-cache עדיין לא נטען
  if (!allLeagues) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">טוען נתוני ליגה...</p>
        </div>
      </div>
    );
  }

  // Not found - הליגה לא קיימת ב-cache
  if (!displayLeague) {
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* כותרת הליגה - מ-SSR */}
        <LeagueHeader league={displayLeague} />

        {/* קרוסלת קבוצות - מ-localStorage */}
        <div className="mb-8">
          <LeagueTeamsSection teams={displayLeague.teams || []} />
        </div>
      </div>
    </div>
  );
}
