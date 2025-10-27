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
    <section className="relative w-full h-[400px] md:h-[400px] overflow-hidden">
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
        <div
          className="relative rounded-2xl p-8 md:p-12"
          style={{
            maxWidth: "702px",
            maxHeight: "274px",
            backdropFilter: "blur(46px)",
            boxShadow: `
              0px 0px 11px 0px #F2F2F2 inset,
              0px 0px 3px 0px #FFFFFF80 inset,
              -1px -1px 0.5px -1px #FFFFFF inset,
              1px 1px 0.5px -1px #FFFFFF inset,
              -1px -1px 0px -0.5px #262626 inset,
              1px 1px 0px -0.5px #333333 inset
            `,
          }}
        >
          <div className="flex items-center text-center gap-6">
            {/* League Logo with Glass Effect */}
            {league.logoUrl && (
              <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-full bg-white/20 backdrop-blur-sm shadow-lg p-4">
                <div className="relative w-full h-full">
                  <Image
                    src={league.logoUrl}
                    alt={`לוגו ${league.nameHe || league.name}`}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            )}

            {/* League Title */}
            <div className="flex-1">
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
