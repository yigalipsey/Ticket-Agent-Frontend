import React from "react";
import Link from "next/link";
import Image from "next/image";
import { League } from "@/types";
import { Button } from "@/components/ui";

interface PopularLeaguesSectionProps {
  leagues: League[];
}

export default function PopularLeaguesSection({
  leagues,
}: PopularLeaguesSectionProps) {
  // Filter popular leagues in frontend
  const popularLeagues = leagues?.filter((league) => league.isPopular) || [];

  return (
    <section className="relative w-full bg-white">
      {/* Content container - limited width like HotFixturesSection */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6 md:mb-8 py-4 md:py-8">
          <div className="text-right">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
              <span className="md:hidden">ליגות פופולריות</span>
              <span className="hidden md:inline">ליגות פופולריות</span>
            </h2>
            <p className="text-gray-600 text-xs md:text-base">
              גלו משחקים מהליגות הגדולות בעולם
            </p>
          </div>
          <Link href="/leagues">
            <Button
              variant="outline-primary"
              size="sm"
              className="text-right md:hidden"
            >
              צפה עוד
            </Button>
            <Button
              variant="outline-primary"
              size="design-spec"
              className="text-right hidden md:block"
            >
              צפה עוד
            </Button>
          </Link>
        </div>

        {popularLeagues && popularLeagues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularLeagues.map((league) => (
              <Link
                key={league._id || league.id}
                href={`/leagues/${league.slug}?id=${league._id || league.id}`}
                className="bg-white flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors group"
              >
                {/* Right side - Logo */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    {league.logoUrl ? (
                      <Image
                        src={league.logoUrl}
                        alt={league.nameHe || league.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-400 text-sm font-medium">
                          {league.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* League Name */}
                  <h3 className="text-base font-medium text-gray-900 group-hover:text-primary transition-colors">
                    כרטיס ל{league.nameHe || league.name}
                  </h3>
                </div>

                {/* Left side - Compare Prices Button */}
                <div className="flex items-center gap-2">
                  {/* Mobile: Icon only */}
                  <button className="md:hidden flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      />
                    </svg>
                  </button>

                  {/* Desktop: Button with text */}
                  <button className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      />
                    </svg>
                    <span className="text-sm font-medium">השווה מחירים</span>
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-yellow-600 font-medium">אין ליגות זמינות</p>
            <p className="text-yellow-500 text-sm mt-1">
              לא נמצאו ליגות פופולריות להצגה
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
