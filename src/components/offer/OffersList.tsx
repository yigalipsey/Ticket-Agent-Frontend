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
}

export function OffersList({ offers, isLoading, error }: OffersListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white border-b border-gray-200 p-4 animate-pulse"
          >
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
        <div className="text-red-600 mb-2">
          <svg
            className="w-12 h-12 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-red-800 mb-2">שגיאה</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!offers || offers.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
        <div className="text-gray-400 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          אין הצעות זמינות
        </h3>
        <p className="text-gray-500">
          כרגע אין הצעות זמינות למשחק זה. נסה שוב מאוחר יותר.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
      {offers.map((offer) => (
        <OfferCard key={offer._id} offer={offer} />
      ))}
    </div>
  );
}
