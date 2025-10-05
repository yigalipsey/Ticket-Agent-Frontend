"use client";

import { useState } from "react";
import { useFixtures } from "@/hooks";
import { FixtureCard } from "@/components";
import { Spinner } from "@/components/ui";
import { FixtureQuery } from "@/types";

export default function FixturesPage() {
  const [query, setQuery] = useState<FixtureQuery>({
    limit: 20,
    sortBy: "date",
    sortOrder: "asc",
    upcoming: "true",
  });

  const { fixtures, isLoading, error, total } = useFixtures(query);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            שגיאה בטעינת המשחקים
          </h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* כותרת הדף */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            משחקי כדורגל
          </h1>
          <p className="text-gray-600">
            {total > 0 ? `${total} משחקים זמינים` : "אין משחקים זמינים כרגע"}
          </p>
        </div>

        {/* רשימת המשחקים */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fixtures.map((fixture) => (
            <FixtureCard
              key={fixture.id}
              fixture={fixture}
              showOffers={true}
              showVenue={true}
              showLeague={true}
            />
          ))}
        </div>

        {/* הודעת ריק */}
        {fixtures.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              אין משחקים זמינים
            </h2>
            <p className="text-gray-600">כרגע אין משחקים זמינים במערכת</p>
          </div>
        )}
      </div>
    </div>
  );
}
