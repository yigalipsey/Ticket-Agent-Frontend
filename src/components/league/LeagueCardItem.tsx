"use client";

import React from "react";
import Image from "next/image";
import { Trophy } from "lucide-react";
import { League } from "@/types";

interface LeagueCardItemProps {
  league: League;
  onClick?: () => void;
  variant?: "default" | "card";
}

const LeagueCardItem: React.FC<LeagueCardItemProps> = ({
  league,
  onClick,
  variant = "default",
}) => {
  const baseClasses =
    "group flex flex-col items-center text-center cursor-pointer h-full transition-all duration-300";
  
  const variantClasses =
    variant === "card"
      ? "bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-primary/20 p-6 space-y-4"
      : "space-y-3 p-4"; // default minimal style

  return (
    <div onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
      <div className="relative">
        {league.logoUrl ? (
          <div
            className={`rounded-full p-[1px] transition-transform group-hover:scale-105 bg-primary ${
              variant === "card"
                ? "w-[90px] h-[90px] md:w-[110px] md:h-[110px]"
                : "w-[80px] h-[80px] md:w-[100px] md:h-[100px]"
            }`}
          >
            <div className="relative w-full h-full rounded-full flex items-center justify-center bg-white overflow-hidden">
              <Image
                src={league.logoUrl}
                alt={league.nameHe || league.name}
                width={60}
                height={60}
                className={`object-contain ${
                  variant === "card"
                    ? "w-18 h-18 md:w-22 md:h-22"
                    : "w-16 h-16 md:w-20 md:h-20"
                }`}
              />
            </div>
          </div>
        ) : (
          <div
            className={`rounded-full bg-gray-100 flex items-center justify-center ${
              variant === "card"
                ? "w-[90px] h-[90px] md:w-[110px] md:h-[110px]"
                : "w-[80px] h-[80px] md:w-[100px] md:h-[100px]"
            }`}
          >
            <Trophy className="w-10 h-10 md:w-12 md:h-12 text-gray-400" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h3
          className={`font-semibold text-gray-900 group-hover:text-primary transition-colors leading-tight ${
            variant === "card" ? "text-lg" : "text-sm md:text-base"
          }`}
        >
          {league.nameHe || league.name}
        </h3>
        
        {/* Optional: Show country if available in card mode */}
        {variant === "card" && (league.country || league.countryHe) && (
           <span className="text-xs text-gray-500">
             {league.countryHe || league.country}
           </span>
        )}
      </div>
    </div>
  );
};

export default LeagueCardItem;
