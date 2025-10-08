import React from "react";
import Link from "next/link";
import Image from "next/image";
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
          🔥 משחקים חמים
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
            <div
              key={fixture._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              {/* תאריך */}
              <div className="text-center mb-4">
                <div className="text-lg md:text-2xl font-bold text-gray-900">
                  {new Date(fixture.date).toLocaleDateString("he-IL", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>

              {/* ליגה */}
              <div className="text-center mb-6">
                <span className="text-sm text-gray-600">
                  {fixture.league?.nameHe || fixture.league?.name}
                </span>
              </div>

              {/* קבוצות עם לוגואים */}
              <div className="flex items-center justify-center space-x-4 mb-6">
                {/* קבוצה ביתית */}
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                    {fixture.homeTeam?.logoUrl ? (
                      <Image
                        src={fixture.homeTeam.logoUrl}
                        alt={
                          fixture.homeTeam?.nameHe ||
                          fixture.homeTeam?.name ||
                          "קבוצה ביתית"
                        }
                        width={48}
                        height={48}
                        className="w-12 h-12 object-contain"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-xs text-gray-600">🏟️</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs md:text-sm font-medium text-gray-900 block">
                    {fixture.homeTeam?.nameHe ||
                      fixture.homeTeam?.name ||
                      "TBD"}
                  </span>
                </div>

                {/* VS */}
                <div className="text-gray-500 font-medium">נגד</div>

                {/* קבוצה אורחת */}
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                    {fixture.awayTeam?.logoUrl ? (
                      <Image
                        src={fixture.awayTeam.logoUrl}
                        alt={
                          fixture.awayTeam?.nameHe ||
                          fixture.awayTeam?.name ||
                          "קבוצה אורחת"
                        }
                        width={48}
                        height={48}
                        className="w-12 h-12 object-contain"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-xs text-gray-600">🏟️</span>
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-900 block">
                    {fixture.awayTeam?.nameHe ||
                      fixture.awayTeam?.name ||
                      "TBD"}
                  </span>
                </div>
              </div>

              {/* כפתור השג כרטיסים */}
              <div className="mb-4">
                <Link
                  href={`/fixtures/${fixture._id}/${fixture.slug}`}
                  className="block w-full text-center bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
                >
                  השג כרטיסים
                </Link>
              </div>

              {/* אצטדיון */}
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-1">📍</span>
                <span>
                  {fixture.venue?.name_he || fixture.venue?.name_en},{" "}
                  {fixture.venue?.city_he || fixture.venue?.city_en}
                </span>
              </div>
            </div>
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
