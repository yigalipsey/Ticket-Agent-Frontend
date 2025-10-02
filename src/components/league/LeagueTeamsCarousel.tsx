"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Team } from "@/types";
import "keen-slider/keen-slider.min.css";

interface LeagueTeamsCarouselProps {
  teams: Team[];
  leagueSlug: string;
  isLoading?: boolean;
  className?: string;
  title?: string;
}

const LeagueTeamsCarousel: React.FC<LeagueTeamsCarouselProps> = ({
  teams,
  leagueSlug,
  isLoading = false,
  className = "",
  title = "קבוצות הליגה",
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <section
        aria-busy="true"
        className={`bg-white rounded-lg shadow-soft p-6 ${className}`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <div className="flex space-x-2 space-x-reverse">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="flex space-x-4 space-x-reverse overflow-hidden">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-full animate-pulse"
            ></div>
          ))}
        </div>
      </section>
    );
  }

  if (!teams || teams.length === 0) {
    return (
      <section className={`bg-white rounded-lg shadow-soft p-6 ${className}`}>
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-500 text-center py-8">אין קבוצות זמינות</p>
      </section>
    );
  }

  return (
    <section className={`bg-white rounded-lg shadow-soft p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <div className="flex space-x-2 space-x-reverse">
          <button
            onClick={scrollLeft}
            className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 flex items-center justify-center transition-colors"
            aria-label="הזז שמאלה"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={scrollRight}
            className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 flex items-center justify-center transition-colors"
            aria-label="הזז ימינה"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* קרוסלה עם 6 קבוצות בשורה */}
      <div
        ref={sliderRef}
        className="flex space-x-4 space-x-reverse overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {teams.map((team) => (
          <div key={team._id || team.slug} className="flex-shrink-0 snap-start">
            <Link
              href={`/teams/${team.slug}`}
              className="flex flex-col items-center space-y-2 group"
              aria-label={`צפה בקבוצה ${team.name}`}
              scroll={false}
            >
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 group-hover:shadow-md transition-shadow">
                {team.logoUrl ? (
                  <Image
                    src={team.logoUrl}
                    alt={team.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-500 text-xs font-bold">
                      {team.code || team.name?.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-700 text-center max-w-16 truncate group-hover:text-blue-600 transition-colors">
                {team.name}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LeagueTeamsCarousel;
