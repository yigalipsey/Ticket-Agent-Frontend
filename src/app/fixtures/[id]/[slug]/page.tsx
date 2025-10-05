"use client";

import { useParams } from "next/navigation";
import { Spinner } from "@/components/ui";
import { FixtureHeader, OffersSection } from "@/components";
import { useFixtureWithOffers } from "@/hooks";
import { Fixture } from "@/types";

export default function FixturePage() {
  const { id, slug } = useParams<{ id: string; slug: string }>();

  // שימוש ב-ID לשליפת הנתונים מהשרת
  const {
    fixture,
    fixtureLoading,
    fixtureError,
    offers,
    offersLoading,
    offersError,
    total,
  } = useFixtureWithOffers(id); // שימוש ב-ID במקום slug

  if (fixtureLoading)
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );

  if (fixtureError || !fixture) {
    return <ErrorScreen id={id} error={fixtureError || undefined} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <FixtureHeader fixture={fixture as Fixture} slug={slug} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            הצעות לכרטיסים
          </h2>
          <p className="text-gray-600">
            {total > 0 ? `${total} הצעות זמינות` : "אין הצעות זמינות כרגע"}
          </p>
        </div>
        <OffersSection
          offers={offers}
          offersLoading={offersLoading}
          offersError={offersError || null}
          total={total}
          fixture={fixture}
        />
      </div>
    </div>
  );
}

function ErrorScreen({ id, error }: { id: string; error?: string }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">משחק לא נמצא</h1>
        <p className="text-gray-600">
          המשחק עם המזהה &quot;{id}&quot; לא קיים במערכת
        </p>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
}
