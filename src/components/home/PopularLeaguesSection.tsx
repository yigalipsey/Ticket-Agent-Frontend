"use client";

import React from "react";
import Link from "next/link";
import { LeagueList } from "@/components";
import { useAllLeagues } from "@/hooks";

export default function PopularLeaguesSection() {
  const { leagues: allLeagues, isLoading, error } = useAllLeagues();

  // Filter popular leagues in frontend
  const popularLeagues = allLeagues?.filter((league) => league.isPopular) || [];

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">ליגות פופולריות</h2>
        <Link
          href="/leagues"
          className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
        >
          צפה בכל הליגות →
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">שגיאה בטעינת הליגות</p>
          <p className="text-red-500 text-sm mt-1">{error}</p>
        </div>
      ) : popularLeagues && popularLeagues.length > 0 ? (
        <LeagueList
          leagues={popularLeagues}
          showDescription={true}
          showStats={true}
        />
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-600 font-medium">אין ליגות זמינות</p>
          <p className="text-yellow-500 text-sm mt-1">
            לא נמצאו ליגות פופולריות להצגה
          </p>
        </div>
      )}
    </section>
  );
}
