"use client";

import React from "react";
import Link from "next/link";
import { LeagueList } from "@/components";
import { useAllLeagues } from "@/hooks";
import { Spinner } from "@/components/ui";

export default function PopularLeaguesSection() {
  // Fetch all leagues and filter popular ones
  const {
    leagues: allLeagues,
    isLoading: leaguesLoading,
    error,
  } = useAllLeagues();

  // Filter popular leagues in frontend
  const popularLeagues = allLeagues?.filter((league) => league.isPopular) || [];

  console.log("PopularLeaguesSection - Debug:", {
    popularLeagues,
    leaguesLoading,
    error,
    count: popularLeagues?.length,
  });

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

      {leaguesLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
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
          <div className="mt-4 text-xs text-gray-500">
            Debug: leagues count = {popularLeagues?.length || 0}
          </div>
        </div>
      )}
    </section>
  );
}
