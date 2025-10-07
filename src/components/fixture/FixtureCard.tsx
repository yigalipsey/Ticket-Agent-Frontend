"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Calendar } from "lucide-react";
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
  onClick?: (fixture: Fixture) => void;
}

const FixtureCard: React.FC<FixtureCardProps> = ({
  fixture,
  showOffers = true,
  showVenue = true,
  showLeague = true,
  className,
  onClick,
}) => {
  const handleCardClick = () => {
    onClick?.(fixture);
  };

  return (
    <Card
      className={`group hover:shadow-medium transition-all duration-200 ${
        onClick ? "cursor-pointer" : ""
      } ${className || ""}`}
      onClick={handleCardClick}
      clickable={!!onClick}
    >
      <CardContent className="p-0">
        {/* Teams */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between">
            {/* Home Team */}
            <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-3 md:space-x-reverse">
              {(fixture.homeTeam.logo || fixture.homeTeam.logoUrl) && (
                <Image
                  src={
                    (fixture.homeTeam.logo ||
                      fixture.homeTeam.logoUrl) as string
                  }
                  alt={fixture.homeTeam.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                  style={{ width: "auto", height: "auto" }}
                />
              )}
              <div className="text-center md:text-right">
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                  {fixture.homeTeam.name}
                </h3>
              </div>
            </div>

            {/* League Logo */}
            {showLeague && fixture.league && (
              <div className="flex flex-col items-center">
                {fixture.league.logoUrl && (
                  <Image
                    src={fixture.league.logoUrl}
                    alt={fixture.league.name || "League Logo"}
                    width={40}
                    height={40}
                    className="rounded-full"
                    style={{ width: "auto", height: "auto" }}
                  />
                )}
                <span className="text-xs font-medium text-gray-700 mt-1">
                  {fixture.league.name}
                </span>
              </div>
            )}

            {/* Away Team */}
            <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-3">
              {(fixture.awayTeam.logo || fixture.awayTeam.logoUrl) && (
                <Image
                  src={
                    (fixture.awayTeam.logo ||
                      fixture.awayTeam.logoUrl) as string
                  }
                  alt={fixture.awayTeam.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                  style={{ width: "auto", height: "auto" }}
                />
              )}
              <div className="text-center md:text-left">
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                  {fixture.awayTeam.name}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Venue & Date */}
        {showVenue && fixture.venue && (
          <div className="px-6 py-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-2 space-x-reverse">
                <MapPin className="h-4 w-4" />
                <span>{fixture.venue.name}</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <Calendar className="h-4 w-4" />
                <span>
                  {formatDate(fixture.date)} {formatTime(fixture.time)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Offers */}
        {showOffers && (
          <div className="px-6 py-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {fixture.totalOffers || 0} הצעות
                </span>
              </div>

              {fixture.minPrice?.amount && (
                <div className="text-left">
                  <div className="text-sm text-gray-500">החל מ</div>
                  <div className="text-lg font-bold text-primary-dark">
                    {formatCurrency(
                      fixture.minPrice.amount,
                      fixture.minPrice.currency
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link
          href={`/fixtures/${fixture._id || fixture.id}/${fixture.slug}`}
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
      </CardFooter>
    </Card>
  );
};

export default FixtureCard;
