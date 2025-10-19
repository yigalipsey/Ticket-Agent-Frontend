"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { League } from "@/types/league";

interface LeagueCardProps {
  league: League;
}

export default function LeagueCard({ league }: LeagueCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/agent/leagues/${league.slug}`)}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-center">
        {league.logoUrl && (
          <Image
            src={league.logoUrl}
            alt={league.nameHe || league.name}
            width={64}
            height={64}
            className="w-16 h-16 object-contain mr-4"
          />
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {league.nameHe || league.name}
          </h3>
          <p className="text-sm text-gray-500">
            {league.countryHe || league.country}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-600">
          {league.teamsCount || 0} קבוצות
        </span>
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
}
