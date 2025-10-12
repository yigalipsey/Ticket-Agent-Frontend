"use client";

import { Spinner } from "@/components/ui";
import { OfferCard } from "@/components";

interface OffersSectionProps {
  offers: any[];
  offersLoading: boolean;
  offersError: string | null;
  total: number;
  fixture: any;
}

export default function OffersSection({
  offers,
  offersLoading,
  offersError,
  total,
  fixture,
}: OffersSectionProps) {
  if (offersLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (offersError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 font-medium">שגיאה בטעינת הצעות</p>
        <p className="text-red-500 text-sm mt-1">{offersError}</p>
      </div>
    );
  }

  if (offers && offers.length > 0) {
    return (
      <div className="space-y-4">
        {offers.map((offer: any, index: number) => (
          <OfferCard
            key={offer.id || `offer-${index}`}
            offer={offer}
            fixture={fixture}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
      <p className="text-yellow-600 font-medium">אין הצעות זמינות</p>
      <p className="text-yellow-500 text-sm mt-1">
        נסה שוב מאוחר יותר או בדוק משחקים אחרים
      </p>
    </div>
  );
}
