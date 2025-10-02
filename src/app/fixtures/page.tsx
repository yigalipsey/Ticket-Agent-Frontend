"use client";

import React from "react";
import { FixtureCard } from "@/components";
import { useUpcomingFixtures } from "@/hooks";
import { Spinner } from "@/components/ui";

export default function FixturesPage() {
  const { fixtures, isLoading, error } = useUpcomingFixtures(20);

  if (error) {
    return (
      <div className="min-h-screen bg-background-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              שגיאה בטעינת משחקים
            </h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <div className="bg-white shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-text-dark mb-4">
              משחקים קרובים
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              גלו את כל המשחקים הקרובים וההצעות הטובות ביותר לכרטיסים
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
          <div className="flex flex-col gap-4">
            {fixtures.map((fixture, index) => (
              <FixtureCard
                key={fixture.id || `fixture-${index}`}
                fixture={fixture}
                showOffers={true}
                showVenue={true}
                showLeague={true}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
