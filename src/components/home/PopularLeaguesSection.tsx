import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Ticket } from "lucide-react";
import { League } from "@/types";
import SectionHeader from "./SectionHeader";

interface PopularLeaguesSectionProps {
  leagues: League[];
}

export default function PopularLeaguesSection({
  leagues,
}: PopularLeaguesSectionProps) {
  const popularLeagues = leagues?.filter((l) => l.isPopular) || [];
  const len = popularLeagues.length;

  return (
    <section className="w-full bg-white pb-4 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={{ mobile: "ליגות פופולריות", desktop: "ליגות פופולריות" }}
          subtitle="גלו משחקים מהליגות הגדולות בעולם"
          buttonText="צפה עוד"
          href="/leagues"
        />

        {len > 0 ? (
          // grid: 1 column mobile, 2 columns md+, gap-x בפיקסלים בדיוק
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-[24px]">
            {popularLeagues.map((league, index) => {
              const hasAbove = index - 2 >= 0;
              const borderTop = !hasAbove ? "border-t border-gray-200" : "";
              const borderBottom = "border-b border-gray-200";

              return (
                <div
                  key={league._id || league.id}
                  // width fills the grid cell; no borders in the gap because gap is separate
                  className={`${borderTop} ${borderBottom} bg-white hover:bg-gray-50 transition-colors`}
                >
                  <Link
                    href={`/leagues/${league.slug}?id=${
                      league._id || league.id
                    }`}
                    className="block px-4 py-3 md:py-6"
                  >
                    <div className="flex   items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12    flex items-center justify-center flex-shrink-0">
                          {league.logoUrl ? (
                            <Image
                              src={league.logoUrl}
                              alt={league.nameHe || league.name}
                              width={48}
                              height={48}
                              className="object-contain"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-gray-400 text-sm font-medium">
                                {league.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>

                        <h3 className="text-base font-medium text-gray-900">
                          כרטיסים ל{league.nameHe || league.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Mobile: text only */}
                        <button className="md:hidden bg-primary text-white px-3 py-2 rounded text-xs font-medium">
                          השווה מחירים
                        </button>

                        {/* Desktop: icon + text */}
                        <button className="hidden md:flex items-center gap-2 bg-primary text-white px-4 py-2 rounded">
                          <span className="text-sm font-medium">
                            השווה מחירים
                          </span>
                          <Ticket className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
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
