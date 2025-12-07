import React from "react";
import FixtureService from "@/services/fixtureService";
import FixtureCard from "@/components/fixture/FixtureCard";
import FireLoader from "@/components/ui/FireLoader";

export default async function FixturesPage() {
  // שליפת כל המשחקים החמים (limit גדול מאוד)
  const res = await FixtureService.getHotFixtures(30);
  const fixtures = res.success ? res.data || [] : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero-like header with image layers (matches offers hero style) */}
      <section className="relative overflow-hidden w-full -mt-16 pt-16 h-[360px] md:h-[420px] mb-4">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "#092274" }}
          />
          <div className="absolute inset-0 bg-[url('/images/spotlight.avif')] bg-cover bg-center opacity-40" />
          <div className="absolute inset-0 bg-[url('/images/small-pitch.avif')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <div className="mb-4">
            <FireLoader />
          </div>
          <div className="px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white">
              המשחקים החמים
            </h1>
            <p className="mt-3 text-white/80 text-sm md:text-base">
              השוואת מחירים למשחקים החמים של העונה{" "}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {fixtures.length > 0 ? (
          <div className="flex flex-col gap-3 bg-white">
            {fixtures.map((fixture) => (
              <FixtureCard
                key={(fixture as any)._id || (fixture as any).id}
                fixture={fixture as any}
                showOffers={true}
                showVenue={true}
                showLeague={false}
                variant="horizontal"
              />
            ))}
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-yellow-700 font-medium">
              אין משחקים חמים זמינים להצגה
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
