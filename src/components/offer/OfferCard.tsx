import React from "react";
import Image from "next/image";
import { User, Crown } from "lucide-react";
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

  const isVip = offer.ticketType === "vip";
  const isHospitality = offer.isHospitality;

  return (
    <div className="bg-white border-t last:border-b border-gray-200 px-0 md:px-4 hover:bg-gray-50 transition-colors">
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

        {/* Badges - Separate container */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center gap-1.5 min-w-[100px]">
          {isVip || isHospitality ? (
            <div className="flex items-center gap-1.5 bg-slate-900 text-amber-200 text-xs px-3 py-1 rounded-full font-medium border border-amber-500/30 shadow-sm">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>כרטיס אירוח</span>
            </div>
          ) : null}
        </div>

        {/* Price */}
        <div className="flex-1 text-right pr-6 flex flex-col justify-center items-end">
          <div className="flex flex-col md:flex-row md:items-center gap-0 md:gap-3">
            <span className="text-xs md:text-sm text-gray-600">החל מ</span>
            <div className="text-lg md:text-2xl font-bold text-gray-900 flex flex-row items-center gap-1">
              <span>{currencySymbol}</span>
              <span>{offer.price}</span>
            </div>
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
      <div className="md:hidden grid grid-cols-[1fr_1fr_1fr_0.8fr_1.2fr] items-center w-full gap-1 py-2 px-1">
        {/* Agent logo */}
        <div className="flex justify-center items-center min-w-0">
          {imageUrl ? (
            <div className="w-full h-9 flex items-center justify-center px-1">
              <Image
                src={imageUrl}
                alt={owner?.name || "ספק כרטיסים"}
                width={50}
                height={36}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-full h-9 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-400" />
            </div>
          )}
        </div>

        {/* Star rating */}
        <div className="flex flex-col justify-center items-center min-w-0">
          {hasRating && (
            <>
              {hasRatingLink ? (
                <a
                  href={ratingUrl ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] uppercase tracking-wide text-primary font-semibold hover:text-primary-dark transition-colors leading-tight text-center w-full truncate px-0.5"
                >
                  {providerLabel}
                </a>
              ) : (
                <span className="text-[9px] uppercase tracking-wide text-gray-400 leading-tight text-center w-full truncate px-0.5">
                  {providerLabel}
                </span>
              )}
              <div className="flex items-center justify-center gap-0.5 mt-0.5">
                {renderStarRow(roundedStarRating ?? 0, "w-2.5 h-2.5")}
                <span className="text-[9px] text-gray-600">{ratingLabel}</span>
              </div>
            </>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-col justify-center items-center min-w-0">
          {(isVip || isHospitality) && (
            <div className="flex flex-col items-center justify-center bg-slate-900 text-amber-200 text-[8px] px-1 py-0.5 rounded border border-amber-500/30 shadow-sm w-full max-w-[56px]">
              <Crown className="w-2.5 h-2.5 text-amber-400 mb-0" />
              <span className="leading-[1.1] font-medium text-center mt-0.5">
                כרטיס אירוח
              </span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="flex flex-col justify-center items-center w-full min-w-0 px-0.5">
          <span className="text-[9px] text-gray-600 leading-tight whitespace-nowrap">
            החל מ
          </span>
          <div className="text-xs font-bold text-gray-900 leading-tight whitespace-nowrap flex flex-row items-center gap-0.5">
            <span>{currencySymbol}</span>
            <span>{offer.price}</span>
          </div>
        </div>

        {/* Contact/Purchase button */}
        <div className="flex justify-center items-center min-w-0 px-0.5">
          <button
            onClick={handleContactAgent}
            disabled={isButtonDisabled}
            className="bg-primary hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-1.5 px-1 rounded-lg transition-colors text-[10px] whitespace-nowrap w-full shadow-sm"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
