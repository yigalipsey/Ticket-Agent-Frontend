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
 * קרוסלה מקצועית של קבוצות הליגה באמצעות keen-slider
 */
export function LeagueTeamsSection({ teams }: LeagueTeamsSectionProps) {
  const [sliderRef, instanceRef] = useKeenSlider({
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

  const prevSlide = () => instanceRef.current?.prev();
  const nextSlide = () => instanceRef.current?.next();

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
        <h2 className="text-xl font-bold text-gray-900">קבוצות הליגה</h2>

        {/* כפתורי דפדף */}
        {teams.length > 6 && (
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
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
                  d="M9 5l7 7-7 7"
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
              href={`/teams/${team.slug}`}
              className="group p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 block h-full"
            >
              <div className="flex flex-col items-center text-center h-full">
                {team.logoUrl ? (
                  <Image
                    src={team.logoUrl}
                    alt={`לוגו ${team.name}`}
                    width={48}
                    height={48}
                    className="mb-3 object-contain"
                    style={{ width: "auto", height: "auto" }}
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-100 rounded-full mb-3 flex items-center justify-center">
                    <span className="text-gray-400 text-xs">
                      {team.name.charAt(0)}
                    </span>
                  </div>
                )}
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors text-sm leading-tight">
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
