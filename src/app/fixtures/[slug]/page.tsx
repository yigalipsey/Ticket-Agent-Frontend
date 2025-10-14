import React from "react";
import { notFound } from "next/navigation";
import OfferService from "@/services/offerService";
import { FixtureOfferHeader } from "@/components/offer/FixtureOfferHeader";
import { OffersList } from "@/components/offer/OffersList";

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

  try {
    // אם יש ID ב-query param, נשתמש בו ישירות (מהיר!)
    let fixtureId: string | null = idFromQuery || null;

    // אם אין ID, נבצע שליפה לפי slug (לנחיתה ישירה)
    if (!fixtureId) {
      const idResult = await OfferService.getFixtureIdBySlug(slug);

      if (!idResult) {
        notFound();
      }

      fixtureId = idResult._id;
    }

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
    if (!offersData.fixture) {
      notFound();
    }

    const fixture = offersData.fixture;

    // אם אין הצעות, נציג מסך ריק
    if (!offersData.offers || offersData.offers.length === 0) {
      return (
        <div className="min-h-screen bg-gray-50">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-yellow-800 mb-4">
                אין הצעות זמינות
              </h2>
              <p className="text-yellow-600">
                כרגע אין הצעות זמינות למשחק זה. נסה שוב מאוחר יותר.
              </p>
            </div>
          </main>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            totalOffers={offersData.pagination?.total || 0}
          />

          {/* Offers List */}
          <OffersList offers={offersData.offers || []} />

          {/* Pagination Info */}
          {offersData.pagination && offersData.pagination.total > 0 && (
            <div className="mt-8 text-center text-gray-600">
              מציג {offersData.offers.length} מתוך {offersData.pagination.total}{" "}
              הצעות
            </div>
          )}
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error loading fixture offers:", error);
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-red-800 mb-4">שגיאה</h2>
            <p className="text-red-600">
              לא ניתן לטעון את ההצעות למשחק זה. אנא נסה שוב מאוחר יותר.
            </p>
          </div>
        </main>
      </div>
    );
  }
}
