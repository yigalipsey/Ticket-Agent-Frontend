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

  const handleContactAgent = () => {
    if (agent?.whatsapp) {
      const message = encodeURIComponent(
        `שלום, אני מעוניין בהצעה שלך במחיר ${offer.price}${currencySymbol}`
      );
      window.open(`https://wa.me/${agent.whatsapp}?text=${message}`, "_blank");
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 last:border-b-0 p-2 md:p-4 hover:bg-gray-50 transition-colors">
      <div className="flex flex-row items-center gap-2 md:gap-4">
        {/* Right side - Agent name */}
        <div className="flex-shrink-0 w-32 md:w-48">
          <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">
            {agent?.name || "סוכן כרטיסים"}
          </h3>
        </div>

        {/* Star rating */}
        <div className="flex-shrink-0 hidden sm:flex">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < fullStars ? "text-yellow-400" : "text-gray-300"
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
        <div className="flex-1 text-right flex items-center gap-1 md:gap-2">
          <span className="text-xs md:text-sm text-gray-600 hidden md:inline">
            החל מ
          </span>
          <span className="text-lg md:text-2xl font-bold text-gray-900">
            {currencySymbol}
            {offer.price}
          </span>
        </div>

        {/* Left side - Contact button */}
        <div className="flex-shrink-0">
          <button
            onClick={handleContactAgent}
            disabled={!offer.isAvailable || !agent?.whatsapp}
            className="bg-primary hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-3 md:px-6 rounded-lg transition-colors text-sm md:text-base whitespace-nowrap"
          >
            יצירת קשר
          </button>
        </div>
      </div>
    </div>
  );
}
