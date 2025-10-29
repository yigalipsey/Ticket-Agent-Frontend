"use client";

import React from "react";
import { OfferCard } from "./OfferCard";

interface Offer {
  _id: string;
  price: number;
  currency: string;
  agentId?: {
    name?: string;
    whatsapp?: string;
  };
  isAvailable?: boolean;
  metadata?: {
    notes?: string;
  };
}

interface OffersListProps {
  offers: Offer[];
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
    <div className="flex flex-col gap-4">
      {/* Price comparison text - above offers list */}
      {homeTeam && awayTeam && (
        <div className="mb-4 mt-0">
          <h1 className="text-lg md:text-xl font-semibold text-gray-900 text-right">
            השוואת מחירי כרטיסים ל&apos;{homeTeam.name} נגד {awayTeam.name}
          </h1>
        </div>
      )}

      {offers.map((offer) => (
        <OfferCard key={offer._id} offer={offer} />
      ))}
    </div>
  );
}
