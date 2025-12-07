import React from "react";
import { Fixture } from "@/types";
import HotFixtureCard from "@/components/fixture/HotFixtureCard";
import SectionHeader from "./SectionHeader";

interface HotFixturesSectionProps {
  fixtures: Fixture[];
}

export default function HotFixturesSection({
  fixtures,
}: HotFixturesSectionProps) {
  // הצגת רק 5 ראשונים בתצוגה מקדימה
  const displayFixtures = (fixtures || []).slice(0, 5);

  return (
    <section className="pb-4 md:pb-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={{
            mobile: "המשחקים החמים",
            desktop: "המשחקים הכי חמים של העונה",
          }}
          subtitle="כרטיסים למשחקים החמים ביותר"
          buttonText="עוד משחקים"
          href="/fixtures"
        />

        {displayFixtures && displayFixtures.length > 0 ? (
          <div className="pb-8">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {displayFixtures.map((fixture) => (
                <div
                  key={fixture._id || fixture.id}
                  className="flex-shrink-0 w-64 md:w-72 lg:w-80"
                >
                  <HotFixtureCard fixture={fixture} variant="compact" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-yellow-600 font-medium">
              אין משחקים חמים זמינים
            </p>
            <p className="text-yellow-500 text-sm mt-1">
              לא נמצאו משחקים חמים להצגה
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
