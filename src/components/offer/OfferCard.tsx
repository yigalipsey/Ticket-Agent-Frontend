import React from "react";
import Image from "next/image";
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
    <div className="bg-white border-t border-b border-gray-200 px-2 md:px-4 hover:bg-gray-50 transition-colors">
      {/* Desktop layout */}
      <div className="hidden md:flex flex-row items-center gap-4">
        {/* Agent logo */}
        <div className="flex-shrink-0">
          {agent?.imageUrl ? (
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center flex-shrink-0">
              <Image
                src={agent.imageUrl}
                alt={agent?.name || "סוכן כרטיסים"}
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 flex-shrink-0 text-xl md:text-2xl font-bold">
              {(agent?.name || "?")?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Star rating */}
        <div className="flex-shrink-0 flex">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 md:w-5 md:h-5 ${
                  i < fullStars ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="hidden md:inline text-sm text-gray-600 ml-1">
              {rating}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex-1 text-right">
          <div className="flex flex-col md:flex-row md:items-center gap-0 md:gap-2">
            <span className="text-xs md:text-sm text-gray-600">החל מ</span>
            <span className="text-lg md:text-2xl font-bold text-gray-900">
              {currencySymbol}
              {offer.price}
            </span>
          </div>
        </div>

        {/* Contact button */}
        <div className="flex-shrink-0">
          <button
            onClick={handleContactAgent}
            disabled={!offer.isAvailable || !agent?.whatsapp}
            className="bg-primary hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-6 rounded-lg transition-colors text-base whitespace-nowrap"
          >
            יצירת קשר
          </button>
        </div>
      </div>

      {/* Mobile layout - 4 equal columns */}
      <div className="md:hidden flex flex-row items-center justify-between gap-1">
        {/* Column 1 - Agent logo */}
        <div className="flex-1 flex justify-center items-center">
          {agent?.imageUrl ? (
            <div className="w-12 h-12 flex items-center justify-center">
              <Image
                src={agent.imageUrl}
                alt={agent?.name || "סוכן כרטיסים"}
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 text-xl font-bold">
              {(agent?.name || "?")?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Column 2 - Star rating */}
        <div className="flex-1 flex justify-center items-center">
          <div className="flex items-center gap-0.5">
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
          </div>
        </div>

        {/* Column 3 - Price */}
        <div className="flex-1 flex justify-center items-center text-center">
          <div className="flex flex-col">
            <span className="text-xs text-gray-600">החל מ</span>
            <span className="text-base font-bold text-gray-900">
              {currencySymbol}
              {offer.price}
            </span>
          </div>
        </div>

        {/* Column 4 - Contact button */}
        <div className="flex-1 flex justify-center items-center">
          <button
            onClick={handleContactAgent}
            disabled={!offer.isAvailable || !agent?.whatsapp}
            className="bg-primary hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-1.5 px-2 rounded-lg transition-colors text-xs"
          >
            יצירת קשר
          </button>
        </div>
      </div>
    </div>
  );
}
