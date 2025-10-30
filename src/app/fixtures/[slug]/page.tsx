import React from "react";
import { notFound } from "next/navigation";
import OfferService from "@/services/offerService";
import { FixtureOfferHeader } from "@/components/offer/FixtureOfferHeader";
import { OffersList } from "@/components/offer/OffersList";
import { OffersSkeleton } from "@/components/offer/OffersSkeleton";

interface FixtureOffersPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ id?: string }>;
}

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
      const idResult = await OfferService.getFixtureIdBySlug(slug);

      if (!idResult) {
        notFound();
      }

      fixtureId = idResult._id;
    } catch (error) {
      console.error("Error fetching fixture ID:", error);
      notFound();
    }
  }

  // קבלת פרטי המשחק (במידת הצורך נבצע שליפה נוספת)
  let fixture = null;
  let offers = null;

  try {
    // שלב 2: קבלת ההצעות (כולל פרטי משחק מההצעה הראשונה)
    const offersData = await OfferService.getOffersByFixtureId(fixtureId, {
      limit: 100,
      sortBy: "price",
      sortOrder: "asc",
    });

    console.log("🎯 [FIXTURE OFFERS PAGE] Offers data received:", {
      fixtureId,
      offersCount: offersData?.offers?.length || 0,
      hasOffers: !!offersData?.offers,
      hasFixture: !!offersData?.fixture,
      fixture: offersData?.fixture,
    });

    // אם אין משחק, נחזיר notFound
    if (!offersData || !offersData.fixture) {
      notFound();
    }

    fixture = offersData.fixture;
    offers = offersData.offers;

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
            date={fixture.date}
            venue={{
              name: fixture.venue?.name || "אצטדיון",
              city: fixture.venue?.city,
            }}
            league={{
              name: fixture.league?.name || "ליגה",
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
          date={fixture.date}
          venue={{
            name: fixture.venue?.name || "אצטדיון",
            city: fixture.venue?.city,
          }}
          league={{
            name: fixture.league?.name || "ליגה",
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
            date={fixture.date}
            venue={{
              name: fixture.venue?.name || "אצטדיון",
              city: fixture.venue?.city,
            }}
            league={{
              name: fixture.league?.name || "ליגה",
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
