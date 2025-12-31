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
    <div className="flex flex-col gap-2">
      {/* Price comparison items */}

      {offers.map((offer, index) => (
        <OfferCard
          key={offer.id || offer._id || `${offer.ownerType}-${index}`}
          offer={offer}
          homeTeamName={homeTeam?.name}
          awayTeamName={awayTeam?.name}
        />
      ))}


    </div>
  );
}
