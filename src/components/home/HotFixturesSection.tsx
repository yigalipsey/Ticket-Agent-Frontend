import React from "react";
import Link from "next/link";
import { FixtureCard } from "@/components";
import { Fixture } from "@/types";

interface HotFixturesSectionProps {
  fixtures: Fixture[];
}

export default function HotFixturesSection({
  fixtures,
}: HotFixturesSectionProps) {
  return (
    <section className="mb-16">
      {/* כותרת וכפתור - באותה שורה בדסקטופ, אחד על השני במובייל */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-right mb-4 md:mb-0">
          משחקים חמים
        </h2>
        <Link
          href="/fixtures"
          className="text-blue-600 hover:text-blue-700 transition-colors font-medium text-sm md:text-base text-right"
        >
          צפה בכל המשחקים →
        </Link>
      </div>

      {fixtures && fixtures.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fixtures.map((fixture) => (
            <FixtureCard
              key={fixture._id || fixture.id}
              fixture={fixture}
              showOffers={true}
              showVenue={true}
            />
          ))}
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-600 font-medium">אין משחקים חמים זמינים</p>
          <p className="text-yellow-500 text-sm mt-1">
            לא נמצאו משחקים חמים להצגה
          </p>
        </div>
      )}
    </section>
  );
}
