import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";

interface FixtureOfferHeaderProps {
  homeTeam: { name: string; logo?: string };
  awayTeam: { name: string; logo?: string };
  date: string;
  venue?: { name: string; city?: string };
  league?: { name: string };
  totalOffers?: number;
}

export function FixtureOfferHeader({
  homeTeam,
  awayTeam,
  date,
  venue,
  league,
  totalOffers,
}: FixtureOfferHeaderProps) {
  const formattedDate = new Date(date).toLocaleDateString("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = new Date(date).toLocaleTimeString("he-IL", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      {/* HERO */}
      <div className="relative overflow-hidden w-full -mt-16 pt-16 h-[400px] md:h-[450px] mb-8">
        {/* Background layers */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "#092274" }}
          />
          <div className="absolute inset-0 bg-[url('/images/spotlight.avif')] bg-cover bg-center opacity-40" />
          <div className="absolute inset-0 bg-[url('/images/small-pitch.avif')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
        </div>

        {/* Centered content */}
        <div className="relative z-10 w-full mt-5 h-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center px-4">
            {/* Teams block: increased horizontal gap, logos boxed, names below, VS centered absolute */}
            <div className="relative flex  items-center justify-center gap-12 w-full ">
              {/* HOME */}
              <div className="flex flex-col items-center gap-2 w-[140px] md:w-[200px]">
                <div className="w-20 h-20 md:w-32 md:h-32 flex items-center justify-center rounded-sm overflow-hidden bg-white/0">
                  {homeTeam.logo ? (
                    <Image
                      src={homeTeam.logo}
                      alt={homeTeam.name}
                      width={128}
                      height={128}
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
                      {homeTeam.name?.charAt(0) ?? "?"}
                    </div>
                  )}
                </div>
                <div className="text-sm md:text-xl font-semibold text-white truncate w-full">
                  {homeTeam.name}
                </div>
              </div>

              {/* VS centered text-only (no background) */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <div className="text-white font-bold text-2xl md:text-4xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                  VS
                </div>
              </div>

              {/* AWAY */}
              <div className="flex  flex-col items-center gap-2 w-[140px] md:w-[200px]">
                <div className="w-20 h-20 md:w-32 md:h-32 flex items-center justify-center rounded-sm overflow-hidden bg-white/0">
                  {awayTeam.logo ? (
                    <Image
                      src={awayTeam.logo}
                      alt={awayTeam.name}
                      width={128}
                      height={128}
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
                      {awayTeam.name?.charAt(0) ?? "?"}
                    </div>
                  )}
                </div>
                <div className="text-sm md:text-xl font-semibold text-white truncate w-full">
                  {awayTeam.name}
                </div>
              </div>
            </div>

            {/* Date under teams */}
            <div className="mt-6 text-lg md:text-xl text-white font-medium flex items-center gap-2 dir-rtl">
              <span>{formattedDate}</span>
              <span className="mx-1">•</span>
              <span>{formattedTime}</span>
            </div>

            {/* Venue small under teams */}
            {venue && (
              <div className="mt-4 text-sm text-white/80 px-3 py-1 bg-black/20 rounded flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>
                  {venue.name}
                  {venue.city ? `, ${venue.city}` : ""}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
