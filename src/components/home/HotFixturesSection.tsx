import React from "react";
import Link from "next/link";
import { Fixture } from "@/types";
import HotFixtureCard from "@/components/fixture/HotFixtureCard";
import { Button } from "@/components/ui";

interface HotFixturesSectionProps {
  fixtures: Fixture[];
}

export default function HotFixturesSection({
  fixtures,
}: HotFixturesSectionProps) {
  return (
    <section className="mb-16" style={{ backgroundColor: "#F8F8F9" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* כותרת וכפתור - באותה שורה גם במובייל */}
        <div className="flex items-center justify-between mb-6 md:mb-8 py-8">
          <div className="text-right">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
              <span className="md:hidden">המשחקים החמים</span>
              <span className="hidden md:inline">
                המשחקים הכי חמים של העונה
              </span>
            </h2>
            <p className="text-gray-600 text-xs md:text-base">
              כרטיסים למשחקים החמים ביותר
            </p>
          </div>
          <Link href="/fixtures">
            <Button
              variant="outline-primary"
              size="sm"
              className="text-right md:hidden"
            >
              עוד משחקים
            </Button>
            <Button
              variant="outline-primary"
              size="design-spec"
              className="text-right hidden md:block"
            >
              עוד משחקים
            </Button>
          </Link>
        </div>

        {fixtures && fixtures.length > 0 ? (
          <>
            {/* Mobile: Horizontal scroll */}
            <div className="pb-8 md:hidden">
              <div className="flex gap-4 overflow-x-auto pb-4">
                {fixtures.map((fixture) => (
                  <div
                    key={fixture._id || fixture.id}
                    className="flex-shrink-0 w-64"
                  >
                    <HotFixtureCard fixture={fixture} variant="compact" />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: Grid layout - aligned with header */}
            <div className="hidden md:block pb-8">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {fixtures.map((fixture) => (
                  <HotFixtureCard
                    key={fixture._id || fixture.id}
                    fixture={fixture}
                    className="w-full"
                  />
                ))}
              </div>
            </div>
          </>
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
