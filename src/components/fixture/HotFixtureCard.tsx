import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Ticket } from "lucide-react";
import { Fixture } from "@/types";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui";

export interface HotFixtureCardProps {
  fixture: Fixture;
  className?: string;
  variant?: "default" | "compact";
}

const HotFixtureCard: React.FC<HotFixtureCardProps> = ({
  fixture,
  className = "",
  variant = "default",
}) => {
  // פורמט תאריך בעברית עם יום בשבוע
  const formatHebrewDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const days = [
        "יום א'",
        "יום ב'",
        "יום ג'",
        "יום ד'",
        "יום ה'",
        "יום ו'",
        "שבת",
      ];
      const months = [
        "ינואר",
        "פברואר",
        "מרץ",
        "אפריל",
        "מאי",
        "יוני",
        "יולי",
        "אוגוסט",
        "ספטמבר",
        "אוקטובר",
        "נובמבר",
        "דצמבר",
      ];

      const dayOfWeek = days[date.getDay()];
      const day = date.getDate();
      const month = months[date.getMonth()];

      return `${dayOfWeek}, ${day} ב${month}`;
    } catch {
      return formatDate(dateString, "dd/MM/yyyy");
    }
  };

  const isCompact = variant === "compact";

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 ${
        isCompact ? "max-w-[360px] max-h-[405px]" : "w-full"
      } p-6 ${className}`}
    >
      {/* Top Section - Date and Event Type */}
      <div
        className={`text-center ${isCompact ? "pt-0 pb-2 px-4" : "py-4 px-6"}`}
      >
        <div
          className={`text-gray-700 font-medium ${
            isCompact ? "text-xs mb-1" : "text-sm mb-2"
          }`}
        >
          {formatHebrewDate(fixture.date)}
        </div>

        <div className="w-full h-px bg-gray-200 mb-3"></div>

        <div className={`text-gray-600 ${isCompact ? "text-xs" : "text-xs"}`}>
          {fixture.league?.nameHe || fixture.league?.name || "ליגה"}
        </div>
      </div>

      {/* Middle Section - Teams */}
      <div className={`${isCompact ? "px-4 pb-3" : "px-6 pb-4"}`}>
        <div className="flex items-center justify-center relative gap-12">
          {/* Home Team */}
          <div className="flex flex-col items-center flex-1">
            {/* Fixed height container for icon */}
            <div
              className={`${
                isCompact ? "w-8 h-8 mb-2" : "w-[72px] h-[81px] mb-2"
              } flex items-center justify-center`}
            >
              {fixture.homeTeam.logo || fixture.homeTeam.logoUrl ? (
                <Image
                  src={
                    (fixture.homeTeam.logo ||
                      fixture.homeTeam.logoUrl) as string
                  }
                  alt={fixture.homeTeam.name || "Home Team"}
                  width={72}
                  height={81}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-300"></div>
              )}
            </div>
            {/* Fixed height container for text */}
            <div
              className={`text-center ${
                isCompact ? "h-12" : "h-10"
              } flex items-start justify-center pt-1`}
            >
              <div className="text-gray-700 text-sm font-medium leading-tight">
                {fixture.homeTeam.nameHe || fixture.homeTeam.name}
              </div>
            </div>
          </div>

          {/* VS - Always centered */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="text-gray-600 text-sm font-medium">נגד</span>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center flex-1">
            {/* Fixed height container for icon */}
            <div
              className={`${
                isCompact ? "w-8 h-8 mb-2" : "w-[72px] h-[81px] mb-2"
              } flex items-center justify-center`}
            >
              {fixture.awayTeam.logo || fixture.awayTeam.logoUrl ? (
                <Image
                  src={
                    (fixture.awayTeam.logo ||
                      fixture.awayTeam.logoUrl) as string
                  }
                  alt={fixture.awayTeam.name || "Away Team"}
                  width={72}
                  height={81}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-300"></div>
              )}
            </div>
            {/* Fixed height container for text */}
            <div
              className={`text-center ${
                isCompact ? "h-12" : "h-10"
              } flex items-start justify-center pt-1`}
            >
              <div className="text-gray-700 text-sm font-medium leading-tight">
                {fixture.awayTeam.nameHe || fixture.awayTeam.name}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Call to Action and Location */}
      <div className={`${isCompact ? "px-4 pb-0" : "px-6 pb-6"}`}>
        {/* Get Tickets Button */}
        <Link
          href={`/fixtures/${fixture.slug}?id=${fixture._id || fixture.id}`}
          className="w-full mb-3"
        >
          <button
            className={`w-full bg-primary text-white font-medium rounded-lg ${
              isCompact ? "px-3 py-2 text-sm" : "px-4 py-2 text-base"
            } flex items-center justify-center gap-2`}
          >
            השווה מחירים
            <Ticket className={isCompact ? "w-3 h-3" : "w-4 h-4"} />
          </button>
        </Link>

        {/* Location */}
        <div className="flex items-center justify-center space-x-1 space-x-reverse text-gray-600 mt-2">
          <MapPin className="w-3 h-3 text-primary" />
          <span className="text-xs">
            {fixture.venue?.nameHe || fixture.venue?.name || "מיקום לא זמין"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HotFixtureCard;
