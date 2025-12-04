"use client";

import React from "react";
import { OfferCard } from "./OfferCard";
import { OfferResponse } from "@/services/offerService";

interface OffersListProps {
  offers: OfferResponse[];
  isLoading?: boolean;
  error?: string | null;
  homeTeam?: { name: string };
  awayTeam?: { name: string };
}

export function OffersList({
  offers,
  isLoading,
  error,
  homeTeam,
  awayTeam,
}: OffersListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-0">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (!offers || offers.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
        <p className="text-gray-600">אין הצעות זמינות למשחק זה</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0">
      {/* Price comparison text - above offers list */}
      {homeTeam && awayTeam && (
        <div className="mb-4 mt-0">
          <h1 className="text-lg md:text-xl font-semibold text-gray-900 text-right">
            השוואת מחירי כרטיסים ל{homeTeam.name} נגד {awayTeam.name}
          </h1>
        </div>
      )}

      {offers.map((offer, index) => (
        <OfferCard
          key={offer.id || offer._id || `${offer.ownerType}-${index}`}
          offer={offer}
          homeTeamName={homeTeam?.name}
          awayTeamName={awayTeam?.name}
        />
      ))}

      {/* Price Disclaimer */}
      <div className="mt-6 mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4 md:p-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1 text-right">
            <p className="text-sm md:text-base text-blue-900 leading-relaxed">
              <span className="font-semibold">שימו לב:</span> המחירים המוצגים
              עשויים להיות לא תואמים למחירים בפועל אצל הספקים/סוכנים, עקב פערי
              זמן בעדכון הנתונים או שינויים מצד הספקים/סוכנים עצמם. אנו עושים את
              מירב המאמצים לעדכן את המחירים בתדירות הגבוהה ביותר האפשרית, אולם
              איננו יכולים להבטיח שהמידע המוצג תמיד מעודכן במלואו.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
