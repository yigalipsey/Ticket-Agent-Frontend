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
  const roundedStarRating = roundUpToNextHalf(normalizedRating) ?? 0;
  // Always show rating for agents/suppliers, default to 0.0 if no rating exists
  const hasRating = hasOwner;
  const ratingLabel =
    normalizedRating !== null ? normalizedRating.toFixed(1) : "0.0";

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
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-500 mb-2 overflow-hidden group relative">
      {/* Desktop layout: Premium Single Row */}
      <div className="hidden md:flex flex-row items-center justify-between p-2 pl-6 pr-2 min-h-[84px] relative z-10">
        {/* Right: Brand Identity */}
        <div className="flex items-center gap-6 h-16">
          <div className="w-32 h-16 bg-white rounded-xl border border-slate-100 flex items-center justify-center p-1 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] group-hover:border-primary/20 transition-colors">
            {imageUrl ? (
              <Image src={imageUrl} alt={owner?.name || "ספק"} width={110} height={55} className="max-h-full w-auto object-contain brightness-[1.02]" />
            ) : (
              <User className="w-8 h-8 text-slate-300" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1.5">{owner?.name || "ספק רשמי"}</span>
            {hasRating && (
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1 bg-amber-50/50 px-2 py-0.5 rounded-lg border border-amber-100/50">
                  <span className="text-[11px] font-black text-amber-700">{ratingLabel}</span>
                  <svg className="w-3 h-3 text-amber-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                </div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{providerLabel}</span>
              </div>
            )}
          </div>
        </div>

        {/* Left: Price & Action */}
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-0.5">מחיר סופי</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-[1000] text-slate-900 leading-none">{offer.price}</span>
              <span className="text-xl font-bold text-primary">{currencySymbol}</span>
            </div>
          </div>
          <button
            onClick={handleContactAgent}
            disabled={isButtonDisabled}
            className="group/btn relative bg-primary hover:bg-primary-dark disabled:bg-slate-200 text-white font-black py-4 px-10 rounded-2xl transition-all shadow-md active:scale-95 overflow-hidden"
          >
            <div className="relative z-10 flex items-center gap-2">
              <span className="text-sm tracking-tight">{buttonText}</span>
              <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile layout: Clean Vertical Identity (RTL) */}
      <div className="md:hidden flex flex-row items-center justify-between py-2 px-3 gap-2 relative z-10 font-heebo">
        {/* Mobile Right: Identity - Big Logo & Name, No Box */}
        <div className="flex flex-col items-center gap-1.5 min-w-0">
          <div className="w-32 h-16 flex items-center justify-center relative">
            {imageUrl ? (
              <Image src={imageUrl} alt="ספק" width={128} height={64} className="w-full h-full object-contain" />
            ) : (
              <User className="w-10 h-10 text-slate-300" />
            )}
          </div>

        </div>

        {/* Mobile Middle: Rating & Price (Divided into 2 centered divs) */}
        <div className="flex  w-[40%]">
          <div className="flex w-1/2 flex-col items-center justify-center">
            {hasRating && (
              <div className="bg-amber-50 px-2 py-1 rounded border border-amber-100 flex items-center gap-1.5 shrink-0">
                <span className="text-xs font-black text-amber-700 leading-none">{ratingLabel}</span>
                <svg className="w-3.5 h-3.5 text-amber-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              </div>
            )}
          </div>

          <div className="flex w-1/2 flex-col items-center justify-center">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter leading-none mb-0.5">החל מ</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl font-[1000] text-slate-900 leading-none tracking-tighter">{offer.price}</span>
              <span className="text-sm font-bold text-primary leading-none">{currencySymbol}</span>
            </div>
          </div>
        </div>
        {/* Mobile Left: Minimal Action */}
        <button
          onClick={handleContactAgent}
          disabled={isButtonDisabled}
          className="bg-primary hover:bg-primary-dark disabled:bg-slate-200 text-white font-black h-11 px-5 rounded-2xl transition-all shadow-md active:scale-95 flex items-center justify-center shrink-0"
        >
          <span className="text-[11px] tracking-tight">{buttonText}</span>
        </button>
      </div>

      {/* Premium Background Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/[0.02] to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}
