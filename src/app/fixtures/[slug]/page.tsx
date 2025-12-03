import React from "react";
import { notFound } from "next/navigation";
import OfferService, { type OfferResponse } from "@/services/offerService";
import { FixtureOfferHeader } from "@/components/offer/FixtureOfferHeader";
import { OffersList } from "@/components/offer/OffersList";
import { OffersSkeleton } from "@/components/offer/OffersSkeleton";

interface FixtureOffersPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ id?: string }>;
}

type FixtureLike = {
  _id?: string | null;
  date?: string | null;
  homeTeam?: {
    name?: string | null;
    logo?: string | null;
    logoUrl?: string | null;
  } | null;
  awayTeam?: {
    name?: string | null;
    logo?: string | null;
    logoUrl?: string | null;
  } | null;
  venue?: { name?: string | null; city?: string | null } | null;
  league?: { name?: string | null } | null;
};

type OffersQueryResult = {
  offers?: OfferResponse[];
  fixture?: FixtureLike | null;
};

const formatSlugSegment = (segment: string) =>
  segment
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const buildFixtureFromSlug = (slug: string): FixtureLike | null => {
  const match = slug.match(/(.+)-vs-(.+)-(\d{4}-\d{2}-\d{2})$/);

  if (!match) {
    return null;
  }

  const [, homeSegment, awaySegment, dateSegment] = match;
  const parsedDate = dateSegment ? new Date(dateSegment) : null;

  return {
    _id: `slug-${slug}`,
    date: parsedDate ? parsedDate.toISOString() : null,
    homeTeam: {
      name: formatSlugSegment(homeSegment),
      logo: null,
      logoUrl: null,
    },
    awayTeam: {
      name: formatSlugSegment(awaySegment),
      logo: null,
      logoUrl: null,
    },
    venue: null,
    league: null,
  };
};

export default async function FixtureOffersPage({
  params,
  searchParams,
}: FixtureOffersPageProps) {
  const { slug } = await params;
  const { id: idFromQuery } = await searchParams;

  // אם יש ID ב-query param, נשתמש בו ישירות (מהיר!)
  let fixtureId: string | null = idFromQuery || null;

  // אם אין ID, נבצע שליפה לפי slug (לנחיתה ישירה)
  if (!fixtureId) {
    try {
      const idResult = (await OfferService.getFixtureIdBySlug(slug)) as {
        _id?: string;
      } | null;

      if (!idResult?._id) {
        notFound();
      }

      fixtureId = idResult._id;
    } catch (error) {
      console.error("Error fetching fixture ID:", error);
      notFound();
    }
  }

  if (!fixtureId) {
    notFound();
  }

  const fallbackFixture = buildFixtureFromSlug(slug);
  let fixture: FixtureLike | null = fallbackFixture;
  let offers: OfferResponse[] = [];

  try {
    // שלב 2: קבלת ההצעות (כולל פרטי משחק מההצעה הראשונה)
    const offersData = (await OfferService.getOffersByFixtureId(fixtureId, {
      limit: 100,
      sortBy: "price",
      sortOrder: "asc",
    })) as OffersQueryResult | null;

    console.log("🎯 [FIXTURE OFFERS PAGE] Offers data received:", {
      fixtureId,
      offersCount: offersData?.offers?.length || 0,
      hasOffers: !!offersData?.offers,
      hasFixture: !!offersData?.fixture,
      fixture: offersData?.fixture,
    });

    fixture = offersData?.fixture || fallbackFixture;
    offers = offersData?.offers || [];

    if (!fixture) {
      return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
          <div className="max-w-2xl text-center space-y-4">
            <h1 className="text-2xl font-bold text-gray-900">
              לא הצלחנו לטעון את פרטי המשחק
            </h1>
            <p className="text-gray-600">
              ייתכן שהקישור אינו מעודכן או שהמשחק הוסר. אנא נסה לעדכן את הדף או
              חזור לעמוד הראשי כדי לבחור משחק אחר.
            </p>
          </div>
        </div>
      );
    }

    // אם אין הצעות, נציג מסך ריק
    if (!offers || offers.length === 0) {
      return (
        <div className="min-h-screen bg-white">
          <FixtureOfferHeader
            homeTeam={{
              name: fixture.homeTeam?.name || "קבוצה",
              logo: fixture.homeTeam?.logoUrl || fixture.homeTeam?.logo || "",
            }}
            awayTeam={{
              name: fixture.awayTeam?.name || "קבוצה",
              logo: fixture.awayTeam?.logoUrl || fixture.awayTeam?.logo || "",
            }}
            date={fixture.date || new Date().toISOString()}
            venue={{
              name: fixture.venue?.name || "אצטדיון",
              city: fixture.venue?.city ?? undefined,
            }}
            league={{
              name: fixture.league?.name ?? "ליגה",
            }}
            totalOffers={0}
          />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            {/* Message */}
            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-base font-medium text-yellow-900">
                אין הצעות זמינות למשחק זה
              </p>
            </div>

            {/* Skeleton Offers */}
            <OffersSkeleton />
          </main>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-white">
        {/* Fixture Info */}
        <FixtureOfferHeader
          homeTeam={{
            name: fixture.homeTeam?.name || "קבוצה",
            logo: fixture.homeTeam?.logoUrl || fixture.homeTeam?.logo || "",
          }}
          awayTeam={{
            name: fixture.awayTeam?.name || "קבוצה",
            logo: fixture.awayTeam?.logoUrl || fixture.awayTeam?.logo || "",
          }}
          date={fixture.date || new Date().toISOString()}
          venue={{
            name: fixture.venue?.name || "אצטדיון",
            city: fixture.venue?.city ?? undefined,
          }}
          league={{
            name: fixture.league?.name ?? "ליגה",
          }}
          totalOffers={offers?.length || 0}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {/* Offers List */}
          <OffersList
            offers={offers || []}
            homeTeam={{
              name: fixture.homeTeam?.name || "קבוצה",
            }}
            awayTeam={{
              name: fixture.awayTeam?.name || "קבוצה",
            }}
          />
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error loading fixture offers:", error);

    // אם יש לנו פרטי משחק, נציג את ההירו ואז את השגיאה
    if (fixture) {
      return (
        <div className="min-h-screen bg-white">
          <FixtureOfferHeader
            homeTeam={{
              name: fixture.homeTeam?.name || "קבוצה",
              logo: fixture.homeTeam?.logoUrl || fixture.homeTeam?.logo || "",
            }}
            awayTeam={{
              name: fixture.awayTeam?.name || "קבוצה",
              logo: fixture.awayTeam?.logoUrl || fixture.awayTeam?.logo || "",
            }}
            date={fixture.date || new Date().toISOString()}
            venue={{
              name: fixture.venue?.name || "אצטדיון",
              city: fixture.venue?.city ?? undefined,
            }}
            league={{
              name: fixture.league?.name ?? "ליגה",
            }}
            totalOffers={0}
          />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-red-800 mb-4">שגיאה</h2>
              <p className="text-red-600">
                לא ניתן לטעון את ההצעות למשחק זה. אנא נסה שוב מאוחר יותר.
              </p>
            </div>
          </main>
        </div>
      );
    }

    // אם אין לנו פרטי משחק בכלל, נחזיר notFound
    notFound();
  }
}
