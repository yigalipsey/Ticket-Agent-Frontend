import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  Tag,
  Clock,
  ChevronLeft,
  Ticket,
  Trash2,
  Pencil,
  Icon,
} from "lucide-react";
import { soccerBall } from "@lucide/lab";
import { Fixture } from "@/types";
import { formatDate, formatTime, formatCurrency } from "@/lib/utils";
import Card, { CardContent, CardFooter } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export interface FixtureCardProps {
  fixture: Fixture;
  showOffers?: boolean;
  showVenue?: boolean;
  showLeague?: boolean;
  className?: string;
  mode?: "user" | "agent" | "agent-edit" | "agent-manage";
  onAddOffer?: () => void;
  onEditOffer?: () => void;
  onDeleteOffer?: () => void;
  variant?: "card" | "horizontal";
}

const FixtureCard: React.FC<FixtureCardProps> = ({
  fixture,
  showOffers = true,
  showVenue = true,
  className,
  mode = "user",
  onAddOffer,
  onEditOffer,
  onDeleteOffer,
  variant = "card",
}) => {
  // Horizontal variant - for internal pages
  if (variant === "horizontal") {
    // Parse date for day/month/year display
    const dateObj = new Date(fixture.date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1; // 0-indexed
    const year = dateObj.getFullYear();
    const dayOfWeek = dateObj.toLocaleDateString("he-IL", { weekday: "short" });
    const hasMinPrice = Boolean(showOffers && fixture.minPrice?.amount);
    const formattedMinPrice =
      hasMinPrice && fixture.minPrice
        ? formatCurrency(fixture.minPrice.amount, fixture.minPrice.currency)
        : null;

    const wrapperClasses =
      mode === "agent" || mode === "agent-edit" || mode === "agent-manage"
        ? "bg-white border border-gray-200 rounded-lg md:border-0 md:border-b md:rounded-none md:last:border-b-0"
        : "bg-white border-b border-gray-200 last:border-b-0";

    return (
      <div className={wrapperClasses}>
        <div
          className={`p-4 flex ${mode === "agent" || mode === "agent-edit" || mode === "agent-manage"
              ? "flex-col md:flex-row"
              : "flex-row"
            } items-start gap-4 relative ${className || ""}`}
        >
          {/* Content wrapper for Agent Mobile */}
          <div className="flex flex-row gap-4 w-full md:w-auto md:flex-1 min-w-0">
            {/* Date Box - Right side (start in RTL), aligned to top */}
            <div className="flex flex-col items-center justify-start bg-gray-50 px-3 py-2 rounded flex-shrink-0 w-20 h-20 mt-1">
              <span className="text-xs text-gray-500">{dayOfWeek}</span>
              <span className="text-xl font-bold text-gray-900">
                {day}/{month}
              </span>
              <span className="text-xs text-gray-600">{year}</span>
            </div>

            {/* Desktop containers wrapper */}
            <div className="hidden md:flex items-center gap-4">
              {/* League logo - Right after date box (desktop only) */}
              {fixture.league?.logoUrl && (
                <div className="flex flex-col items-center justify-center gap-2 flex-shrink-0 w-20 h-20">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <Image
                      src={fixture.league.logoUrl}
                      alt={fixture.league.name || "League"}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Teams */}
            <div className="flex md:items-center flex-1 min-w-0 gap-2 md:gap-6">
              {/* Desktop layout - with logos */}
              <div className="hidden md:flex items-center gap-6 min-w-0">
                <div className="flex items-start gap-6 min-h-[80px] flex-shrink-0">
                  {/* Home Team */}
                  <div className="flex flex-col items-center gap-2 w-32">
                    <div className="w-12 h-12 flex items-center justify-center">
                      {fixture.homeTeam.logo || fixture.homeTeam.logoUrl ? (
                        <Image
                          src={
                            (fixture.homeTeam.logo ||
                              fixture.homeTeam.logoUrl) as string
                          }
                          alt={fixture.homeTeam.name || "Home Team"}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Icon
                            iconNode={soccerBall}
                            className="w-8 h-8 text-gray-400"
                          />
                        </div>
                      )}
                    </div>
                    <span className="text-base font-medium text-gray-900 text-center whitespace-nowrap">
                      {fixture.homeTeam.name}
                    </span>
                  </div>

                  {/* VS */}
                  <span className="text-base font-medium text-gray-400 px-2 flex-shrink-0 self-center">
                    נגד
                  </span>

                  {/* Away Team */}
                  <div className="flex flex-col items-center gap-2 w-32">
                    <div className="w-12 h-12 flex items-center justify-center">
                      {fixture.awayTeam.logo || fixture.awayTeam.logoUrl ? (
                        <Image
                          src={
                            (fixture.awayTeam.logo ||
                              fixture.awayTeam.logoUrl) as string
                          }
                          alt={fixture.awayTeam.name || "Away Team"}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Icon
                            iconNode={soccerBall}
                            className="w-8 h-8 text-gray-400"
                          />
                        </div>
                      )}
                    </div>
                    <span className="text-base font-medium text-gray-900 text-center whitespace-nowrap">
                      {fixture.awayTeam.name}
                    </span>
                  </div>
                </div>
                {/* Venue on desktop - same row as button */}
                {showVenue && fixture.venue && (
                  <div className="flex flex-col gap-1 flex-shrink-0 bg-gray-50 rounded-lg px-3 py-2 w-[280px]">
                    {/* Match time on desktop - above venue */}
                    {fixture.date && (
                      <div className="flex items-center gap-2 min-w-0">
                        <Clock className="w-4 h-4 text-gray-600 flex-shrink-0" />
                        <span className="text-sm text-gray-600 truncate">
                          {formatTime(fixture.date)}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 min-w-0">
                      <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {fixture.venue.name}
                        </div>
                        {/* City in Hebrew below venue name */}
                        {(fixture.venue.city_he || fixture.venue.city) && (
                          <div className="text-xs text-gray-600 truncate">
                            {fixture.venue.city_he || fixture.venue.city}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile layout - text only */}
              <div className="md:hidden flex flex-col flex-1 w-full min-w-0 gap-1 text-right">
                <div className="flex items-center flex-wrap w-full text-base font-medium text-gray-900">
                  <span>{fixture.homeTeam.name}</span>
                  <span className="text-gray-400 mx-1">נגד</span>
                  <span>{fixture.awayTeam.name}</span>
                </div>
                {/* Venue on mobile */}
                {showVenue && fixture.venue && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 max-w-[200px]">
                    <MapPin className="h-3 w-3 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {fixture.venue.name}
                      </div>
                      {(fixture.venue.city_he || fixture.venue.city) && (
                        <div className="text-xs text-gray-600 truncate">
                          {fixture.venue.city_he || fixture.venue.city}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {/* Price on mobile - under venue */}
                {hasMinPrice && formattedMinPrice && (
                  <div className="flex items-center gap-1 text-sm font-semibold text-primary-dark">
                    <Ticket className="w-3 h-3 flex-shrink-0" />
                    <span>
                      {mode === "agent-edit" || mode === "agent-manage"
                        ? ""
                        : "החל מ-"}
                      {formattedMinPrice}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div
            className={`${mode === "agent" ||
                mode === "agent-edit" ||
                mode === "agent-manage"
                ? "pb-0 md:static md:pb-0 md:w-auto md:h-auto md:min-w-[180px] w-full"
                : "absolute left-4 bottom-4 md:relative md:left-auto md:bottom-auto w-10 h-10 md:w-auto md:h-auto"
              } flex-shrink-0 md:self-center`}
          >
            {mode === "agent" ? (
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={onAddOffer}
                className="w-full md:w-auto px-12"
              >
                הוסף הצעה
              </Button>
            ) : mode === "agent-manage" ? (
              <div className="flex flex-row items-center justify-end gap-6 w-full md:w-auto">
                {/* Price Display for Manage Mode - Desktop Only */}
                {hasMinPrice && formattedMinPrice && (
                  <div className="hidden md:flex items-center justify-end gap-2">
                    <span className="text-sm text-gray-500">מחיר:</span>
                    <span className="text-xl font-bold text-primary-dark">
                      {formattedMinPrice}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (onDeleteOffer) {
                        onDeleteOffer();
                      }
                    }}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2"
                  >
                    <Trash2 className="w-4 h-4 ml-1" />
                    מחק
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (onEditOffer) {
                        onEditOffer();
                      }
                    }}
                    className="text-gray-500 hover:text-primary hover:bg-blue-50 px-2"
                  >
                    <Pencil className="w-4 h-4 ml-1" />
                    ערוך
                  </Button>
                </div>
              </div>
            ) : mode === "agent-edit" ? (
              <div className="flex flex-row md:flex-col items-center md:items-end gap-4 w-full">
                {hasMinPrice && formattedMinPrice && (
                  <div className="hidden md:flex items-center gap-1 text-lg font-bold text-primary-dark">
                    <span>{formattedMinPrice}</span>
                  </div>
                )}
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={onEditOffer}
                  className="w-full md:w-auto px-8"
                >
                  ערוך
                </Button>
              </div>
            ) : (
              <Link
                href={`/fixtures/${fixture.slug}?id=${fixture._id || fixture.id
                  }`}
              >
                <Button
                  variant="primary"
                  size="md"
                  className="md:w-auto w-full h-full"
                >
                  {/* Desktop: with text */}
                  <span className="hidden md:inline">
                    {hasMinPrice && formattedMinPrice ? (
                      <span>
                        כרטיסים החל מ-
                        <span
                          className="inline-block w-[6ch] text-right tabular-nums"
                          dir="ltr"
                        >
                          {formattedMinPrice}
                        </span>
                      </span>
                    ) : (
                      "צפה בהצעות"
                    )}
                  </span>
                  {/* Mobile: icon only */}
                  <ChevronLeft className="w-5 h-5 md:hidden" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Original card variant
  return (
    <Card
      className={`group hover:shadow-medium transition-all duration-200 flex flex-col h-full ${className || ""
        }`}
    >
      <CardContent className="p-0 flex-1 flex flex-col">
        {/* Teams */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between">
            {/* Home Team */}
            <div className="flex flex-col items-start space-y-2">
              <div className="w-12 h-12 flex items-center justify-center">
                {fixture.homeTeam.logo || fixture.homeTeam.logoUrl ? (
                  <Image
                    src={
                      (fixture.homeTeam.logo ||
                        fixture.homeTeam.logoUrl) as string
                    }
                    alt={fixture.homeTeam.name || "Home Team"}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200">
                    <span className="text-lg font-semibold text-gray-600">
                      {fixture.homeTeam.name?.charAt(0)?.toUpperCase() || "?"}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-right px-1">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {fixture.homeTeam.name}
                </h3>
              </div>
            </div>

            {/* VS */}
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm md:text-lg font-medium text-gray-500">
                נגד
              </span>
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-end space-y-2">
              <div className="w-12 h-12 flex items-center justify-center">
                {fixture.awayTeam.logo || fixture.awayTeam.logoUrl ? (
                  <Image
                    src={
                      (fixture.awayTeam.logo ||
                        fixture.awayTeam.logoUrl) as string
                    }
                    alt={fixture.awayTeam.name || "Away Team"}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200">
                    <span className="text-lg font-semibold text-gray-600">
                      {fixture.awayTeam.name?.charAt(0)?.toUpperCase() || "?"}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-left px-1">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {fixture.awayTeam.name}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Venue */}
        {showVenue && fixture.venue && (
          <div className="px-6 py-2 border-t border-gray-100">
            <div className="flex items-center space-x-2 space-x-reverse">
              <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {fixture.venue.name}
                </div>
                {(fixture.venue.city_he || fixture.venue.city) && (
                  <div className="text-xs text-gray-600">
                    {fixture.venue.city_he || fixture.venue.city}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Date */}
        <div className="px-6 py-2 border-t border-gray-100">
          <div className="flex items-center space-x-3 space-x-reverse text-sm text-gray-600">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>
              {formatDate(fixture.date)} {formatTime(fixture.time)}
            </span>
          </div>
        </div>

        {/* Price */}
        {showOffers && fixture.minPrice?.amount && (
          <div className="px-6 py-2 border-t border-gray-100">
            <div className="flex items-center space-x-3 space-x-reverse text-sm text-gray-600">
              <Tag className="h-4 w-4 flex-shrink-0" />
              <span>
                החל מ
                {formatCurrency(
                  fixture.minPrice.amount,
                  fixture.minPrice.currency
                )}
              </span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto">
        {mode === "agent" ? (
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={onAddOffer}
            className="group-hover:bg-primary-dark group-hover:text-white group-hover:border-primary-dark"
          >
            הוסף הצעה
          </Button>
        ) : (
          <Link
            href={`/fixtures/${fixture.slug}?id=${fixture._id || fixture.id}`}
            className="w-full"
          >
            <Button
              variant="outline"
              size="sm"
              fullWidth
              className="group-hover:bg-primary-dark group-hover:text-white group-hover:border-primary-dark"
            >
              צפה בהצעות
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default FixtureCard;
