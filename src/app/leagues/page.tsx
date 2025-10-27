"use client";

import React from "react";
import { LeagueList } from "@/components";
import { useAllLeagues } from "@/hooks";
import { Spinner } from "@/components/ui";

export default function LeaguesPage() {
  const { leagues, isLoading, error } = useAllLeagues();

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              שגיאה בטעינת ליגות
            </h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-text-dark mb-4">
              כל הליגות
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              גלו את כל הליגות הזמינות והמשחקים המרתקים ביותר מכל העולם
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <LeagueList
            leagues={leagues}
            showDescription={true}
            showStats={true}
          />
        )}
      </main>
    </div>
  );
}
