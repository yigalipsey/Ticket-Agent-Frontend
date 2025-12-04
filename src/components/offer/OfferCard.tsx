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
  const isAgent = offer.ownerType === "Agent";
  const hasOwner = isSupplier || isAgent;

  // Get external rating (new format) or fallback to old trustpilot fields
  const externalRating = owner?.externalRating;
  const ratingValue =
    hasOwner && externalRating?.rating != null
      ? Number(externalRating.rating)
      : isSupplier && owner?.trustpilotRating != null
      ? Number(owner.trustpilotRating)
      : null;
  const normalizedRating =
    typeof ratingValue === "number" && Number.isFinite(ratingValue)
      ? Math.round(Math.min(5, Math.max(0, ratingValue)) * 10) / 10
      : null;
  const roundedStarRating = roundUpToNextHalf(normalizedRating);
  const hasRating = hasOwner && normalizedRating !== null;
  const ratingLabel =
    normalizedRating !== null ? normalizedRating.toFixed(1) : "—";

  // Get rating URL and provider
  const ratingUrl =
    hasOwner && externalRating?.url
      ? externalRating.url
      : isSupplier && typeof owner?.trustpilotUrl === "string"
      ? owner.trustpilotUrl
      : null;
  const ratingProvider =
    externalRating?.provider || (owner?.trustpilotUrl ? "trustpilot" : null);
  const hasRatingLink = Boolean(ratingUrl);

  // Provider label - display the actual rating provider name (Google or Trustpilot)
  const providerLabel =
    ratingProvider === "google"
      ? "Google"
      : ratingProvider === "trustpilot"
      ? "Trustpilot"
      : ratingProvider || "Trustpilot"; // Default fallback

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
    <div className="bg-white border-t last:border-b border-gray-200 px-1 md:px-4 hover:bg-gray-50 transition-colors">
      {/* Desktop layout */}
      <div className="hidden md:flex flex-row items-center gap-8">
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
          <div className="flex-shrink-0 flex flex-col items-center text-center pr-6">
            {hasRatingLink ? (
              <a
                href={ratingUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] uppercase tracking-wide text-primary font-semibold hover:text-primary-dark transition-colors"
              >
                {providerLabel}
              </a>
            ) : (
              <span className="text-[10px] uppercase tracking-wide text-gray-400">
                {providerLabel}
              </span>
            )}
            <div className="flex items-center gap-1">
              {renderStarRow(roundedStarRating ?? 0, "w-4 h-4 md:w-5 md:h-5")}
              <span className="hidden md:inline text-sm text-gray-600 ml-1">
                {ratingLabel}
              </span>
            </div>
          </div>
        )}

        {/* Price */}
        <div className="flex-1 text-right pr-6">
          <div className="flex flex-col md:flex-row md:items-center gap-0 md:gap-3">
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
            className="bg-primary hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-6 rounded-lg transition-colors text-base whitespace-nowrap min-w-[140px] flex justify-center items-center"
          >
            {buttonText}
          </button>
        </div>
      </div>

      {/* Mobile layout - Proportional width distribution */}
      <div className="md:hidden flex flex-row items-center w-full gap-2 py-2">
        {/* Agent logo - proportional width */}
        <div className="flex-[0_0_18%] flex justify-center items-center min-w-0">
          {imageUrl ? (
            <div className="w-full max-w-[56px] h-10 flex items-center justify-center">
              <Image
                src={imageUrl}
                alt={owner?.name || "ספק כרטיסים"}
                width={56}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-full max-w-[56px] h-10 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-400" />
            </div>
          )}
        </div>

        {/* Star rating - proportional width */}
        {hasRating && (
          <div className="flex-[0_0_20%] flex flex-col justify-center items-center min-w-0">
            {hasRatingLink ? (
              <a
                href={ratingUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] uppercase tracking-wide text-primary font-semibold hover:text-primary-dark transition-colors leading-tight text-center"
              >
                {providerLabel}
              </a>
            ) : (
              <span className="text-[9px] uppercase tracking-wide text-gray-400 leading-tight text-center">
                {providerLabel}
              </span>
            )}
            <div className="flex items-center justify-center gap-0.5 mt-0.5">
              {renderStarRow(roundedStarRating ?? 0, "w-3 h-3")}
              <span className="text-[10px] text-gray-600">{ratingLabel}</span>
            </div>
          </div>
        )}

        {/* Price - takes remaining space, aligned to right (RTL) - same as desktop */}
        <div className="flex-1 min-w-0 flex justify-end items-center px-2">
          <div className="flex flex-row items-center gap-1">
            <span className="text-[10px] text-gray-600 leading-tight">
              החל מ
            </span>
            <span className="text-sm font-bold text-gray-900 leading-tight whitespace-nowrap">
              {currencySymbol}
              {offer.price}
            </span>
          </div>
        </div>

        {/* Contact/Purchase button - proportional width */}
        <div className="flex-[0_0_22%] flex justify-center items-center min-w-0 px-1">
          <button
            onClick={handleContactAgent}
            disabled={isButtonDisabled}
            className="bg-primary hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-1.5 px-2 rounded-lg transition-colors text-[10px] whitespace-nowrap w-full max-w-[70px]"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
