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
}

export function TeamHeader({ team }: TeamHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-4 space-x-reverse">
        {(team.logoUrl || team.logo) && (
          <Image
            src={team.logoUrl || team.logo || ""}
            alt={`לוגו ${team.nameHe || team.name}`}
            width={64}
            height={64}
            className="object-contain"
          />
        )}
        <h1 className="text-3xl font-bold text-gray-900">
          {team.nameHe || team.name}
        </h1>
      </div>
    </div>
  );
}

// Loading ו-Error states
export function TeamHeaderLoading() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center space-x-4 space-x-reverse">
        <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
      </div>
    </div>
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
