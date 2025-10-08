import React from "react";
import Link from "next/link";
import { LeagueList } from "@/components";
import { League } from "@/types";

interface PopularLeaguesSectionProps {
  leagues: League[];
}

export default function PopularLeaguesSection({
  leagues,
}: PopularLeaguesSectionProps) {
  // Filter popular leagues in frontend
  const popularLeagues = leagues?.filter((league) => league.isPopular) || [];

  return (
    <section className="mb-16">
      {/* כותרת וכפתור - באותה שורה בדסקטופ, אחד על השני במובייל */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-right mb-4 md:mb-0">
          ליגות פופולריות
        </h2>
        <Link
          href="/leagues"
          className="text-blue-600 hover:text-blue-700 transition-colors font-medium text-sm md:text-base text-right"
        >
          צפה בכל הליגות →
        </Link>
      </div>

      {popularLeagues && popularLeagues.length > 0 ? (
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
