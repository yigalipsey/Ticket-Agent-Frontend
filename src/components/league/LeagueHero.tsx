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
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="px-4">
          {/* Logo and League Name Container - side by side */}
          <div className="flex items-center gap-4">
            {/* League Logo */}
            {league.logoUrl && (
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg bg-white/10 backdrop-blur-md border border-white/20 flex-shrink-0">
                <div className="w-full h-full flex items-center justify-center p-4">
                  <Image
                    src={league.logoUrl}
                    alt={`לוגו ${league.nameHe || league.name}`}
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>
              </div>
            )}

            {/* League Name */}
            <div className="flex flex-col gap-2">
              <p className="text-white/90 text-lg md:text-xl text-right">
                השוואת מחירי כרטיסים
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-white text-right">
                {league.nameHe || league.name}
              </h1>
              
              {/* League Description */}
              {league.description && (
                <p className="text-white/90 text-lg md:text-xl text-right hidden md:block max-w-xl">
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
