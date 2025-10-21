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
    <section className="relative w-full ">
      {/* Base color layer */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "#092274" }}
      />

      {/* First image with 40% opacity */}
      <div className="absolute inset-0 bg-[url('/images/spotlight.avif')] bg-cover bg-center opacity-40" />

      {/* Second image with 20% opacity */}
      <div className="absolute inset-0 bg-[url('/images/small-pitch.avif')] bg-cover bg-center opacity-20" />

      {/* Content container - limited width like HotFixturesSection */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* כותרת ממורכזת */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            ליגות פופולריות
          </h2>
        </div>

        {popularLeagues && popularLeagues.length > 0 ? (
          <div className="relative">
            {/* Carousel container */}
            <div className="flex gap-[13px] overflow-x-auto pb-4 scrollbar-hide">
              {popularLeagues.map((league) => (
                <Link
                  key={league._id || league.id}
                  href={`/leagues/${league.slug}?id=${league._id || league.id}`}
                  className="flex-shrink-0 w-[281px] h-[296px] bg-white rounded-lg p-4 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                >
                  {/* League Logo */}
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                    {league.logoUrl ? (
                      <img
                        src={league.logoUrl}
                        alt={league.nameHe || league.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-400 text-xs font-medium">
                          {league.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* League Name */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {league.nameHe || league.name}
                  </h3>

                  {/* Next Match */}
                  <p className="text-sm text-gray-600">
                    המשחק הבא: 23 באוקטובר
                  </p>
                </Link>
              ))}
            </div>

            {/* Navigation arrows */}
            <button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 w-10 h-10 bg-primary rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="bg-white/10 border border-white/20 rounded-lg p-6 text-center">
            <p className="text-white font-medium">אין ליגות זמינות</p>
            <p className="text-white/80 text-sm mt-1">
              לא נמצאו ליגות פופולריות להצגה
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
