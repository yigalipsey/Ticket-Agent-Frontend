"use client";

import React from "react";
import Image from "next/image";

interface Team {
  id?: string;
  _id?: string;
  name: string;
  nameHe?: string;
  logo?: string;
  logoUrl?: string;
  city?: string;
  country?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

interface TeamHeroProps {
  team: Team;
}

export function TeamHero({ team }: TeamHeroProps) {
  // Default colors fallback
  const primaryColor = team.primaryColor || "#DA020E";
  const secondaryColor = team.secondaryColor || "#000000";

  console.log("🎨 TeamHero Colors:", {
    teamName: team.name,
    primaryColor: team.primaryColor,
    secondaryColor: team.secondaryColor,
    finalPrimary: primaryColor,
    finalSecondary: secondaryColor,
    fullTeam: team,
  });

  return (
    <div className="relative overflow-hidden w-full -mt-16 pt-16 h-[350px] md:h-[400px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/people-soccer-stadium.avif"
          alt={team.nameHe || team.name}
          fill
          className="object-cover"
          priority
        />
        {/* Color Overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "#09227459" }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-center gap-4 md:gap-8">
          {/* Team Logo */}
          {(team.logoUrl || team.logo) && (
            <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-white rounded-full"></div>
              <div className="relative z-10 w-24 h-24 md:w-32 md:h-32">
                <Image
                  src={team.logoUrl || team.logo || ""}
                  alt={`לוגו ${team.nameHe || team.name}`}
                  width={128}
                  height={128}
                  className="object-contain"
                />
              </div>
            </div>
          )}

          {/* Team Info */}
          <div className="text-right">
            <p className="text-white/80 text-sm md:text-base mb-2 font-medium">
              השוואת מחירי כרטיסים
            </p>
            <h1 className="text-xl md:text-5xl font-bold text-white mb-2">
              {team.nameHe || team.name}
            </h1>
            {(team.city || team.country) && (
              <p className="text-white text-lg">
                {team.city && team.country
                  ? `${team.city}, ${team.country}`
                  : team.city || team.country}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
// Helper function to adjust brightness
function adjustBrightness(color: string, percent: number): string {
  // Convert hex to RGB
  const hex = color.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Adjust brightness
  const adjustedR = Math.max(0, Math.min(255, r + percent));
  const adjustedG = Math.max(0, Math.min(255, g + percent));
  const adjustedB = Math.max(0, Math.min(255, b + percent));

  // Convert back to hex
  const adjustedHex =
    "#" +
    adjustedR.toString(16).padStart(2, "0") +
    adjustedG.toString(16).padStart(2, "0") +
    adjustedB.toString(16).padStart(2, "0");

  return adjustedHex;
}
