import React from "react";
import Image from "next/image";

interface League {
  name: string;
  nameHe?: string;
  country: string;
  logoUrl?: string;
}

interface LeagueHeaderProps {
  league: League;
}

export function LeagueHeader({ league }: LeagueHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-4 space-x-reverse">
        {league.logoUrl && (
          <Image
            src={league.logoUrl}
            alt={`לוגו ${league.nameHe || league.name}`}
            width={48}
            height={48}
            className="object-contain"
          />
        )}
        <h1 className="text-3xl font-bold text-gray-900">
          {league.nameHe || league.name}
        </h1>
      </div>
    </div>
  );
}

// Loading ו-Error states
export function LeagueHeaderLoading() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-4 space-x-reverse">
        <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
      </div>
    </div>
  );
}

interface LeagueHeaderErrorProps {
  slug: string;
  error?: Error | null;
}

export function LeagueHeaderError({ slug, error }: LeagueHeaderErrorProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          ליגה לא נמצאנה
        </h1>
        <p className="text-gray-600">
          הליגה &quot;{slug}&quot; לא קיימת במערכת
        </p>
        {error && <p className="text-red-600 text-sm mt-2">{error.message}</p>}
      </div>
    </div>
  );
}
