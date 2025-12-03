import React from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { OfferResponse } from "@/services/offerService";
import { CURRENCIES } from "@/lib/constants";
import {
  renderStarRow,
  roundUpToNextHalf,
} from "@/components/offer/TrustpilotStars";

interface OfferCardProps {
  offer: OfferResponse;
  homeTeamName?: string;
  awayTeamName?: string;
}

export function OfferCard({
  offer,
  homeTeamName,
  awayTeamName,
}: OfferCardProps) {
  const currencySymbol = CURRENCIES[offer.currency] || offer.currency;
  const owner =
    offer.owner ||
    offer.ownerId ||
    offer.agentId ||
    (offer.ownerType === "Agent" || offer.ownerType === "Supplier"
      ? offer.ownerId
      : null);

  const imageUrl = owner?.logoUrl || owner?.imageUrl || null;
  const whatsappNumber = offer.fallbackContact || owner?.whatsapp || null;

  const isSupplier = offer.ownerType === "Supplier";
  const ratingValue =
    isSupplier && owner?.trustpilotRating != null
      ? Number(owner.trustpilotRating)
      : null;
  const normalizedRating =
    typeof ratingValue === "number" && Number.isFinite(ratingValue)
      ? Math.round(Math.min(5, Math.max(0, ratingValue)) * 10) / 10
      : null;
  const roundedStarRating = roundUpToNextHalf(normalizedRating);
  const hasRating = roundedStarRating !== null;
  const ratingLabel =
    normalizedRating !== null ? normalizedRating.toFixed(1) : "—";
  const trustpilotHref =
    isSupplier && typeof owner?.trustpilotUrl === "string"
      ? owner.trustpilotUrl
      : null;
  const hasTrustpilotLink = Boolean(trustpilotHref);

  const handleContactAgent = () => {
    if (offer.url) {
      console.log("[OFFER_CONTACT_001] Opening purchase URL:", {
        url: offer.url,
        offerId: offer.id || offer._id,
      });
      window.open(offer.url, "_blank");
      return;
    }

    if (whatsappNumber) {
      const sanitizedWhatsapp = whatsappNumber.replace(/\D+/g, "");
      const matchTitle =
        homeTeamName && awayTeamName
          ? `${homeTeamName} נגד ${awayTeamName}`
          : undefined;
      const baseText = matchTitle
        ? `שלום, אני מעוניין בהצעה שלך למשחק ${matchTitle} במחיר ${offer.price}${currencySymbol}`
        : `שלום, אני מעוניין בהצעה שלך במחיר ${offer.price}${currencySymbol}`;
      const message = encodeURIComponent(baseText);
      const url = `https://wa.me/${sanitizedWhatsapp}?text=${message}`;
      console.log("[OFFER_CONTACT_002] Opening WhatsApp:", {
        whatsapp: whatsappNumber,
        sanitizedWhatsapp,
        matchTitle,
        url,
      });
      window.open(url, "_blank");
    }
  };

  const hasUrl = Boolean(offer.url);
  const hasWhatsapp = Boolean(whatsappNumber);
  const buttonText = hasUrl ? "לרכישה" : "יצירת קשר";
  const isButtonDisabled = !offer.isAvailable || (!hasUrl && !hasWhatsapp);

  return (
    <div className="bg-white border-t last:border-b border-gray-200 px-2 md:px-4 hover:bg-gray-50 transition-colors">
      {/* Desktop layout */}
      <div className="hidden md:flex flex-row items-center gap-4">
        {/* Agent logo */}
        <div className="flex-shrink-0">
          {imageUrl ? (
            <div className="w-32 h-20 flex items-center justify-center flex-shrink-0">
              <Image
                src={imageUrl}
                alt={owner?.name || "ספק כרטיסים"}
                width={128}
                height={80}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-32 h-20 flex items-center justify-center flex-shrink-0">
              <User className="w-10 h-10 text-gray-400" />
            </div>
          )}
        </div>

        {/* Star rating */}
        {hasRating && (
          <div className="flex-shrink-0 flex flex-col items-center text-center pr-4">
            {hasTrustpilotLink ? (
              <a
                href={trustpilotHref ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] uppercase tracking-wide text-primary font-semibold hover:text-primary-dark transition-colors"
              >
                trustpilot
              </a>
            ) : (
              <span className="text-[10px] uppercase tracking-wide text-gray-400">
                trustpilot
              </span>
            )}
            <div className="flex items-center gap-1">
              {renderStarRow(roundedStarRating!, "w-4 h-4 md:w-5 md:h-5")}
              <span className="hidden md:inline text-sm text-gray-600 ml-1">
                {ratingLabel}
              </span>
            </div>
          </div>
        )}

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

        {/* Contact/Purchase button */}
        <div className="flex-shrink-0">
          <button
            onClick={handleContactAgent}
            disabled={isButtonDisabled}
            className="bg-primary hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-6 rounded-lg transition-colors text-base whitespace-nowrap"
          >
            {buttonText}
          </button>
        </div>
      </div>

      {/* Mobile layout - 4 equal columns */}
      <div className="md:hidden flex flex-row items-center justify-between gap-1">
        {/* Column 1 - Agent logo */}
        <div className="flex-1 flex justify-center items-center">
          {imageUrl ? (
            <div className="w-20 h-14 flex items-center justify-center">
              <Image
                src={imageUrl}
                alt={owner?.name || "ספק כרטיסים"}
                width={80}
                height={56}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-20 h-14 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>

        {/* Column 2 - Star rating */}
        {hasRating && (
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            {hasTrustpilotLink ? (
              <a
                href={trustpilotHref ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] uppercase tracking-wide text-primary font-semibold hover:text-primary-dark transition-colors mb-1"
              >
                trustpilot
              </a>
            ) : (
              <span className="text-[10px] uppercase tracking-wide text-gray-400 mb-1">
                trustpilot
              </span>
            )}
            <div className="flex items-center gap-1">
              {renderStarRow(roundedStarRating!, "w-4 h-4")}
              <span className="text-xs text-gray-600">{ratingLabel}</span>
            </div>
          </div>
        )}

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

        {/* Column 4 - Contact/Purchase button */}
        <div className="flex-1 flex justify-center items-center">
          <button
            onClick={handleContactAgent}
            disabled={isButtonDisabled}
            className="bg-primary hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-1.5 px-2 rounded-lg transition-colors text-xs"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
