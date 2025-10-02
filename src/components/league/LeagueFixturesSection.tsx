"use client";

import React from "react";
import { FixtureCard } from "@/components";

interface Fixture {
  _id?: string;
  id?: string;
  slug?: string;
  homeTeam: {
    _id?: string;
    id?: string;
    name: string;
    logo?: string;
    logoUrl?: string;
  };
  awayTeam: {
    _id?: string;
    id?: string;
    name: string;
    logo?: string;
    logoUrl?: string;
  };
  league?: {
    name: string;
    logoUrl?: string;
  };
  venue?: {
    name: string;
  };
  date?: string;
  time?: string;
  status?: string;
  totalOffers?: number;
  lowestPrice?: number;
  round?: number;
}

interface LeagueFixturesSectionProps {
  fixtures: Fixture[];
  isLoading: boolean;
  error?: Error | null;
}

export function LeagueFixturesSection({
  fixtures,
  isLoading,
  error,
}: LeagueFixturesSectionProps) {
  if (isLoading) {
    return <LeagueFixturesSkeleton count={5} />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-600 font-medium">שגיאה בטעינת המשחקים</p>
          <p className="text-red-500 text-sm mt-1">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!fixtures || fixtures.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-yellow-600 font-medium">אין משחקים זמינים</p>
          <p className="text-yellow-500 text-sm mt-1">
            לא נמצאו משחקים עבור הליגה הזו
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">משחקים</h2>
      <div className="space-y-4">
        {fixtures.map((fixture) => (
          <FixtureCard
            key={
              fixture._id ||
              fixture.id ||
              fixture.slug ||
              `fixture-${Math.random()}`
            }
            fixture={fixture}
          />
        ))}
      </div>
    </div>
  );
}

// Skeleton component for loading state
function LeagueFixturesSkeleton({ count }: { count: number }) {
  return (
    <div className="space-y-4">
      <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              {/* Home Team Skeleton */}
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                <div>
                  <div className="h-5 bg-gray-200 rounded w-24 animate-pulse mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              </div>

              {/* Center Skeleton */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
              </div>

              {/* Away Team Skeleton */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                <div>
                  <div className="h-5 bg-gray-200 rounded w-24 animate-pulse mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
