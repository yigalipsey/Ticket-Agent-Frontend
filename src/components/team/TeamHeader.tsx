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
}

interface TeamHeaderProps {
  team: Team;
  showComparisonText?: boolean; // האם להציג "השוואת מחירים למשחקי..."
}

export function TeamHeader({
  team,
  showComparisonText = false,
}: TeamHeaderProps) {
  return (
    <section className="relative w-full h-[300px] md:h-[400px]">
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
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="px-4">
          {/* Logo and Team Name Container - side by side */}
          <div className="flex items-center gap-4">
            {/* Team Logo */}
            {(team.logoUrl || team.logo) && (
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg bg-white/10 backdrop-blur-md border border-white/20 flex-shrink-0">
                <div className="w-full h-full flex items-center justify-center p-4">
                  <Image
                    src={team.logoUrl || team.logo || ""}
                    alt={`לוגו ${team.nameHe || team.name}`}
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>
              </div>
            )}

            {/* Team Name and Comparison Text Container */}
            <div className="flex flex-col gap-2">
              {/* Comparison Text - מעל השם */}
              {showComparisonText && (
                <p className="text-white/90 text-lg md:text-xl text-right">
                  השוואת מחירים למשחקי
                </p>
              )}

              {/* Team Name */}
              <h1 className="text-3xl md:text-4xl font-bold text-white text-right">
                {team.nameHe || team.name}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Loading ו-Error states
export function TeamHeaderLoading() {
  return (
    <section className="relative w-full h-[300px] md:h-[400px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/people-soccer-stadium.avif"
          alt="Loading"
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
          <div className="flex items-center gap-4">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white/10 backdrop-blur-md border border-white/20 rounded-full animate-pulse"></div>
            <div className="flex flex-col gap-2">
              <div className="h-6 bg-white/80 rounded w-48 animate-pulse"></div>
              <div className="h-12 bg-white/80 rounded w-64 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface TeamHeaderErrorProps {
  slug: string;
  error?: Error | null;
}

export function TeamHeaderError({ slug, error }: TeamHeaderErrorProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          קבוצה לא נמצאה
        </h1>
        <p className="text-gray-600">
          הקבוצה &quot;{slug}&quot; לא קיימת במערכת
        </p>
        {error && <p className="text-red-600 text-sm mt-2">{error.message}</p>}
      </div>
    </div>
  );
}
