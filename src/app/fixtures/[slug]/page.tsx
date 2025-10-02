"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Spinner } from "@/components/ui";
import { apiClient } from "@/lib/api";

interface Fixture {
  _id: string;
  slug: string;
  homeTeam: {
    _id: string;
    name: string;
    logo?: string;
    logoUrl?: string;
  };
  awayTeam: {
    _id: string;
    name: string;
    logo?: string;
    logoUrl?: string;
  };
  league: {
    _id: string;
    name: string;
    logoUrl?: string;
  };
  venue: {
    _id: string;
    name: string;
    city: string;
  };
  date: string;
  time: string;
  status: string;
  round: number;
  offers: Offer[];
  lowestPrice: number;
  totalOffers: number;
}

interface Offer {
  _id: string;
  ticketId: string;
  price: number;
  currency: string;
  seller: {
    name: string;
    rating: number;
  };
  category: string;
  location: string;
  availableTickets: number;
  minPrice: number;
  maxPrice: number;
}

export default function FixtureOffersPage() {
  const { slug: fixtureSlug } = useParams();
  const [fixture, setFixture] = useState<Fixture | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFixtureOffers = async () => {
      try {
        setIsLoading(true);
        const data = await apiClient.get(
          `football-events/fixture/${fixtureSlug}`
        );

        if (!data || data.length === 0) {
          throw new Error("משחק לא נמצא");
        }

        setFixture(data[0]);
      } catch (err) {
        console.error("שגיאה בטעינת משחק:", err);
        setError(err instanceof Error ? err.message : "שגיאה לא ידועה");
      } finally {
        setIsLoading(false);
      }
    };

    if (fixtureSlug) {
      fetchFixtureOffers();
    }
  }, [fixtureSlug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-lg text-gray-600">טוען הצעות...</p>
        </div>
      </div>
    );
  }

  if (error || !fixture) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            משחק לא נמצא
          </h1>
          <p className="text-gray-600">
            {error || "לא נמצאו הצעות עבור המשחק הזה"}
          </p>
        </div>
      </div>
    );
  }

  // מיון הצעות לפי מחיר
  const sortedOffers = [...fixture.offers].sort((a, b) => a.price - b.price);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* כותרת המשחק */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            {/* קבוצות */}
            <div className="flex items-center space-x-6 space-x-reverse">
              {/* קבוצה ביתית */}
              <div className="flex items-center space-x-3 space-x-reverse">
                {(fixture.homeTeam.logoUrl || fixture.homeTeam.logo) && (
                  <Image
                    src={
                      fixture.homeTeam.logoUrl || fixture.homeTeam.logo || ""
                    }
                    alt={fixture.homeTeam.name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                )}
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    {fixture.homeTeam.name}
                  </div>
                </div>
              </div>

              {/* VS */}
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-900">VS</span>
                <div className="text-sm text-gray-500 mt-1">
                  {new Date(fixture.date).toLocaleDateString("he-IL")} •{" "}
                  {fixture.time}
                </div>
              </div>

              {/* קבוצה חיצונית */}
              <div className="flex items-center space-x-3">
                {(fixture.awayTeam.logoUrl || fixture.awayTeam.logo) && (
                  <Image
                    src={
                      fixture.awayTeam.logoUrl || fixture.awayTeam.logo || ""
                    }
                    alt={fixture.awayTeam.name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                )}
                <div>
                  <div className="text-lg font-semibold text-gray-900">
                    {fixture.awayTeam.name}
                  </div>
                </div>
              </div>
            </div>

            {/* פרטים נוספים */}
            <div className="text-right">
              <div className="text-sm text-gray-600">
                <div>{fixture.league.name}</div>
                <div>{fixture.venue.name}</div>
                {fixture.status && (
                  <div className="text-green-600">{fixture.status}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* תיקוף הצעות */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            הצעות זמינות
          </h2>
          <p className="text-gray-600">
            נמצאו {fixture.totalOffers} הצעות עבור המשחק
            {fixture.lowestPrice > 0 && (
              <span className="font-semibold text-green-600">
                {" "}
                החל מ-{fixture.lowestPrice} ₪
              </span>
            )}
          </p>
        </div>

        {/* רשימת הצעות */}
        <div className="space-y-4">
          {sortedOffers.length > 0 ? (
            sortedOffers.map((offer) => (
              <div
                key={offer._id}
                className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  {/* פרטי ההצעה */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {offer.category}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {offer.location}
                        </p>
                        <p className="text-sm text-gray-500">
                          {offer.availableTickets} כרטיסים זמינים
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* מוכר */}
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">מוכר</div>
                    <div className="font-medium text-gray-900">
                      {offer.seller.name}
                    </div>
                    <div className="text-sm text-yellow-600">
                      ⭐ {offer.seller.rating}
                    </div>
                  </div>

                  {/* מחיר */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {offer.price} ₪
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      בחר הצעה
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <p className="text-gray-600 text-lg">
                כרגע אין הצעות זמינות למשחק הזה
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
