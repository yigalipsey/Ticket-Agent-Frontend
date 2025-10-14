import React from "react";
import { OfferResponse } from "@/services/offerService";
import { CURRENCIES } from "@/lib/constants";

interface OfferCardProps {
  offer: OfferResponse;
}

export function OfferCard({ offer }: OfferCardProps) {
  const currencySymbol = CURRENCIES[offer.currency] || offer.currency;
  const agent = offer.agentId;

  // Generate random rating between 3.5-5.0 for demo purposes
  const rating = Math.round((Math.random() * 1.5 + 3.5) * 10) / 10;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const handleContactAgent = () => {
    if (agent?.whatsapp) {
      const message = encodeURIComponent(
        `שלום, אני מעוניין בהצעה שלך במחיר ${offer.price}${currencySymbol}`
      );
      window.open(`https://wa.me/${agent.whatsapp}?text=${message}`, "_blank");
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        {/* Left side - Buy button */}
        <div className="flex-shrink-0">
          <button
            onClick={handleContactAgent}
            disabled={!offer.isAvailable || !agent?.whatsapp}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            קנה כרטיסים
          </button>
        </div>

        {/* Middle - Agent info and price */}
        <div className="flex-1 mx-6">
          <div className="flex items-center justify-between">
            {/* Agent name and rating */}
            <div className="flex flex-col">
              <h3 className="font-semibold text-gray-900 text-lg mb-1">
                {agent?.name || "סוכן כרטיסים"}
              </h3>
              {offer.metadata?.notes && (
                <p className="text-sm text-gray-600 mb-1">
                  {offer.metadata.notes}
                </p>
              )}
              {/* Star rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < fullStars
                        ? "text-orange-500"
                        : i === fullStars && hasHalfStar
                        ? "text-orange-300"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-600 ml-1">{rating}</span>
              </div>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">החל מ</p>
              <div className="text-2xl font-bold text-gray-900">
                {currencySymbol}
                {offer.price}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
