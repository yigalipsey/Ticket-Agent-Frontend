"use client";

import React from "react";
import { LeaguesGrid } from "@/components/league";
import { useAllLeagues } from "@/hooks";
import HeroSection from "@/components/home/HeroSection";

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col space-y-8">
          <div className="text-right">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              ליגות מובילות
            </h1>
            <p className="text-gray-500 text-lg">
              בחר ליגה לצפייה במשחקים ורכישת כרטיסים
            </p>
          </div>

          {isLoading ? (
            <LeaguesGrid leagues={[]} isLoading={true} />
          ) : (
            <LeaguesGrid leagues={leagues} />
          )}
        </div>
      </main>
    </div>
  );
}
