"use client";

import Link from "next/link";
import { Team } from "@/types/team";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.css";

interface LeagueTeamsSectionProps {
  teams: Team[];
  hrefPrefix?: string; // להוסיף prefix לאי-ר של routes לדף סוכן
}

/**
 * Team Carousel - קרוסלת קבוצות באמצעות keen-slider
 */
export function TeamCarousel({
  teams,
  hrefPrefix = "",
}: LeagueTeamsSectionProps) {
  const [sliderRef, instanceRef] = useKeenSlider({
    rtl: true, // תמיכה בעברית - כיוון מימין לשמאל
    slides: {
      perView: 6,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 640px)": {
        slides: { perView: 3, spacing: 12 },
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
    <div className="relative bg-white">
      <div className="flex items-center gap-2 md:gap-4">
        {/* כפתור שמאלי - גלילה שמאלה (קדימה) */}
        {teams.length > 2 && (
          <button
            onClick={slideRight}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border border-primary flex items-center justify-center text-primary hover:bg-gray-50 transition-colors flex-shrink-0"
            aria-label="גלול ימינה"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
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
        )}

        {/* קרוסלה */}
        <div ref={sliderRef} className="keen-slider bg-white flex-1">
          {teams.map((team) => (
            <div key={team._id || team.slug} className="keen-slider__slide">
              <Link
                href={`${hrefPrefix}/teams/${team.slug}?id=${
                  team._id || team.id
                }`}
                className="group flex flex-col items-center text-center space-y-2 p-2"
              >
                {team.logoUrl ? (
                  <div className="rounded-full p-[1px] transition-transform group-hover:scale-105 w-[80px] h-[80px] md:w-[120px] md:h-[120px] bg-primary">
                    <div
                      className="relative w-full h-full rounded-full flex items-center justify-center"
                      style={{
                        background: "white",
                        backgroundImage:
                          "repeating-linear-gradient(45deg, transparent, transparent 10px, #e0e0e0 10px, #e0e0e0 11px)",
                      }}
                    >
                      <Image
                        src={team.logoUrl}
                        alt={`לוגו ${team.name}`}
                        width={60}
                        height={60}
                        className="object-contain w-12 h-12 md:w-20 md:h-20 relative z-10"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="rounded-full p-[1px] w-[80px] h-[80px] md:w-[120px] md:h-[120px] bg-primary">
                    <div
                      className="relative w-full h-full rounded-full flex items-center justify-center"
                      style={{
                        background: "white",
                        backgroundImage:
                          "repeating-linear-gradient(45deg, transparent, transparent 10px, #e0e0e0 10px, #e0e0e0 11px)",
                      }}
                    >
                      <span className="text-gray-900 text-xl md:text-2xl font-medium relative z-10">
                        {team.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                )}
                <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors text-base md:text-lg leading-tight">
                  {team.name}
                </h3>
              </Link>
            </div>
          ))}
        </div>

        {/* כפתור ימני - גלילה ימינה (אחורה) */}
        {teams.length > 2 && (
          <button
            onClick={slideLeft}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-dark transition-colors flex-shrink-0"
            aria-label="גלול שמאלה"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
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
        )}
      </div>
    </div>
  );
}
