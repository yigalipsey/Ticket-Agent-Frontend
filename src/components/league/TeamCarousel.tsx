"use client";

import Link from "next/link";
import { Team } from "@/types/team";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.css";

interface LeagueTeamsSectionProps {
  teams: Team[];
}

/**
 * Team Carousel - קרוסלת קבוצות באמצעות keen-slider
 */
export function TeamCarousel({ teams }: LeagueTeamsSectionProps) {
  const [sliderRef, instanceRef] = useKeenSlider({
    rtl: true, // תמיכה בעברית - כיוון מימין לשמאל
    slides: {
      perView: 6,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 640px)": {
        slides: { perView: 2, spacing: 12 },
      },
      "(min-width: 641px) and (max-width: 1024px)": {
        slides: { perView: 3, spacing: 16 },
      },
      "(min-width: 1025px)": {
        slides: { perView: 6, spacing: 16 },
      },
    },
    loop: false,
  });

  // בעברית RTL: כפתור ראשון (ימין) = prev, כפתור שני (שמאל) = next
  const slideRight = () => instanceRef.current?.prev(); // גלילה ימינה
  const slideLeft = () => instanceRef.current?.next(); // גלילה שמאלה

  if (!teams || teams.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">אין קבוצות זמינות עבור ליגה זו</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* כותרת וקונטרולים */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">קבוצות</h2>

        {/* כפתורי דפדף - RTL: כפתור ימני ← גלילה ימינה, כפתור שמאלי ← גלילה שמאלה */}
        {teams.length > 6 && (
          <div className="flex gap-2">
            {/* כפתור ימני - גלילה ימינה (אחורה) */}
            <button
              onClick={slideRight}
              className="p-2 rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
              aria-label="גלול ימינה"
            >
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            {/* כפתור שמאלי - גלילה שמאלה (קדימה) */}
            <button
              onClick={slideLeft}
              className="p-2 rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
              aria-label="גלול שמאלה"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* קרוסלה */}
      <div ref={sliderRef} className="keen-slider">
        {teams.map((team) => (
          <div key={team._id || team.slug} className="keen-slider__slide">
            <Link
              href={`/teams/${team.slug}?id=${team._id || team.id}`}
              className="group p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex items-center justify-center h-20"
            >
              <div className="flex flex-col items-center text-center space-y-1 w-full">
                {team.logoUrl ? (
                  <Image
                    src={team.logoUrl}
                    alt={`לוגו ${team.name}`}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                ) : (
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-400 text-xs">
                      {team.name.charAt(0)}
                    </span>
                  </div>
                )}
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors text-xs leading-tight truncate w-full">
                  {team.name}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
