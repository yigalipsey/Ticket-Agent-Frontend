import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Calendar, Tag } from "lucide-react";
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
      className={`group hover:shadow-medium transition-all duration-200 flex flex-col h-full ${
        onClick ? "cursor-pointer" : ""
      } ${className || ""}`}
      onClick={handleCardClick}
      clickable={!!onClick}
    >
      <CardContent className="p-0 flex-1 flex flex-col">
        {/* Teams */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between">
            {/* Home Team */}
            <div className="flex flex-col items-start space-y-2">
              {(fixture.homeTeam.logo || fixture.homeTeam.logoUrl) && (
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image
                    src={
                      (fixture.homeTeam.logo ||
                        fixture.homeTeam.logoUrl) as string
                    }
                    alt={fixture.homeTeam.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div className="text-right px-1">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {fixture.homeTeam.name}
                </h3>
              </div>
            </div>

            {/* VS / League Logo */}
            <div className="flex flex-col items-center justify-center">
              {showLeague && fixture.league ? (
                <>
                  {fixture.league.logoUrl && (
                    <Image
                      src={fixture.league.logoUrl}
                      alt={fixture.league.name || "League Logo"}
                      width={40}
                      height={40}
                      className="object-contain"
                      style={{ width: "auto", height: "auto" }}
                    />
                  )}
                  <span className="text-xs font-medium text-gray-700 mt-1">
                    {fixture.league.name}
                  </span>
                </>
              ) : (
                <span className="text-sm md:text-lg font-medium text-gray-500">
                  נגד
                </span>
              )}
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-end space-y-2">
              {(fixture.awayTeam.logo || fixture.awayTeam.logoUrl) && (
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image
                    src={
                      (fixture.awayTeam.logo ||
                        fixture.awayTeam.logoUrl) as string
                    }
                    alt={fixture.awayTeam.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
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
            <div className="flex items-center space-x-3 space-x-reverse text-sm text-gray-600">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>{fixture.venue.name}</span>
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

        {/* Offers */}
        {showOffers && (
          <div className="px-6 py-3 border-t border-gray-100">
            <div className="flex items-center justify-between min-h-[32px]">
              {fixture.totalOffers > 0 && (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {fixture.totalOffers} הצעות
                  </span>
                </div>
              )}

              {fixture.minPrice?.amount && (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Tag className="h-4 w-4 text-primary-dark" />
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <span className="text-sm text-gray-500">החל מ</span>
                    <span className="text-lg font-bold text-primary-dark">
                      {formatCurrency(
                        fixture.minPrice.amount,
                        fixture.minPrice.currency
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto">
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
