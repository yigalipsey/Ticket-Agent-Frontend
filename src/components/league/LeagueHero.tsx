import React from "react";
import Image from "next/image";

interface League {
  name: string;
  nameHe?: string;
  country: string;
  logoUrl?: string;
  description?: string;
  backgroundImage?: string;
}

interface LeagueHeroProps {
  league: League;
}

export function LeagueHero({ league }: LeagueHeroProps) {
  // Use league background or fallback to default
  const backgroundImage =
    league.backgroundImage || "/images/people-soccer-stadium.avif";

  return (
    <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={league.nameHe || league.name}
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
      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-6 px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Hero Box */}
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex flex-col items-center gap-6">
            {/* League Logo with white background */}
            {league.logoUrl && (
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg bg-white">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="relative w-20 h-20 md:w-24 md:h-24">
                    <Image
                      src={league.logoUrl}
                      alt={`לוגו ${league.nameHe || league.name}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* League Title */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                {league.nameHe || league.name}
              </h1>

              {/* League Description */}
              {league.description && (
                <p className="text-sm md:text-base text-white/90 mt-2 drop-shadow-md">
                  {league.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
