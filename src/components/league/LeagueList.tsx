"use client";

import React from "react";
import { Trophy } from "lucide-react";
import { League } from "@/types";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.css";
import { useRouter } from "next/navigation";
import LeagueCardItem from "./LeagueCardItem";

export interface LeagueListProps {
  leagues: League[];
  showDescription?: boolean;
  showStats?: boolean;
  className?: string;
  onLeagueClick?: (league: League) => void;
  hrefPrefix?: string; // להוסיף prefix לאי-ר שונות של routes
  showButton?: boolean; // האם להציג כפתור "צפה בהצעות"
  layout?: "carousel" | "grid";
}

const LeagueList: React.FC<LeagueListProps> = ({
  leagues,
  showDescription = true,
  showStats = true,
  className,
  onLeagueClick,
  hrefPrefix = "", // ברירת מחדל empty להוספת /agent אם צריך
  showButton = true, // ברירת מחדל - להציג כפתור
  layout = "carousel",
}) => {
  const router = useRouter();

  const handleLeagueClick = (league: League) => {
    if (onLeagueClick) {
      onLeagueClick(league);
      return;
    }
    // ניווט רגיל לליגה
    router.push(`${hrefPrefix}/leagues/${league.slug}?id=${league._id}`);
  };

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
        slides: { perView: 4, spacing: 16 },
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

  if (leagues.length === 0) {
    return (
      <div className={className}>
        <div className="text-center py-12">
          <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2 text-gray-900">
            אין ליגות זמינות
          </h3>
          <p className="text-sm text-gray-500">
            לא נמצאו ליגות עבור החיפוש הנוכחי
          </p>
        </div>
      </div>
    );
  }

  if (layout === "grid") {
    return (
      <div className={className}>
        <div className="text-right mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            בחר ליגה
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
          {leagues.map((league) => (
            <LeagueCardItem
              key={league._id}
              league={league}
              onClick={() => handleLeagueClick(league)}
              variant="card"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="relative bg-white">
        {/* Title */}
        <div className="text-right mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            בחר ליגה
          </h2>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* כפתור שמאלי - גלילה שמאלה (קדימה) */}
          {leagues.length > 3 && (
            <button
              onClick={slideRight}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border border-primary flex items-center justify-center text-primary hover:bg-gray swim-50 transition-colors flex-shrink-0"
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
            {leagues.map((league) => (
              <div key={league._id} className="keen-slider__slide">
                <LeagueCardItem
                  league={league}
                  onClick={() => handleLeagueClick(league)}
                />
              </div>
            ))}
          </div>

          {/* כפתור ימני - גלילה ימינה (אחורה) */}
          {leagues.length > 3 && (
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
    </div>
  );
};

export default LeagueList;
