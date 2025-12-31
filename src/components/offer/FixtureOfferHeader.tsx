import React from "react";
import Image from "next/image";
import { MapPin, Calendar, Clock } from "lucide-react";

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
    <section className="relative w-full h-[320px] md:h-[420px] overflow-hidden -mt-16">
      {/* Background Section - Matching LeagueHero */}
      <div className="absolute inset-0">
        <Image
          src="/images/people-soccer-stadium.avif"
          alt="Stadium Background"
          fill
          className="object-cover"
          priority
        />
        {/* Color Overlay - Same as LeagueHero */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "#09227459" }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      </div>

      {/* Content Section - Accounting for Transparent Nav (Bottom aligned) */}
      <div className="relative z-10 h-full pb-8 flex flex-col items-center justify-end">
        <div className="w-full max-w-5xl mx-auto px-4">


          {/* Teams Matchup Row */}
          <div className="flex items-center justify-center gap-6 md:gap-16 w-full mb-4">

            {/* Home Team */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative w-20 h-20 md:w-32 md:h-32 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-3 flex items-center justify-center shadow-xl">
                {homeTeam.logo ? (
                  <Image
                    src={homeTeam.logo}
                    alt={homeTeam.name}
                    width={100}
                    height={100}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10" />
                )}
              </div>
              <h2 className="text-white text-base md:text-2xl font-black text-center drop-shadow-md">
                {homeTeam.name}
              </h2>
            </div>

            {/* VS Divider */}
            <div className="flex flex-col items-center px-2">
              <span className="text-2xl md:text-5xl font-black text-white/20 italic tracking-tighter">VS</span>
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative w-20 h-20 md:w-32 md:h-32 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-3 flex items-center justify-center shadow-xl">
                {awayTeam.logo ? (
                  <Image
                    src={awayTeam.logo}
                    alt={awayTeam.name}
                    width={100}
                    height={100}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10" />
                )}
              </div>
              <h2 className="text-white text-base md:text-2xl font-black text-center drop-shadow-md">
                {awayTeam.name}
              </h2>
            </div>
          </div>

          {/* Info Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-8 text-white/90">
            <div className="flex items-center gap-2 text-xs md:text-sm font-bold bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5">
              <Calendar className="w-3.5 h-3.5 text-white/70" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-2 text-xs md:text-sm font-bold bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5">
              <Clock className="w-3.5 h-3.5 text-white/70" />
              <span>{formattedTime}</span>
            </div>

            {venue && (
              <div className="flex items-center gap-2 text-xs md:text-sm font-bold bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5">
                <MapPin className="w-3.5 h-3.5 text-white/70" />
                <span>{venue.name}</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
