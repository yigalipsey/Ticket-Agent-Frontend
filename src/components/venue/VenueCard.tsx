"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Car, Train, Bus } from "lucide-react";
import { Venue } from "@/types";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export interface VenueCardProps {
  venue: Venue;
  showDescription?: boolean;
  showFacilities?: boolean;
  className?: string;
  onVenueClick?: (venue: Venue) => void;
}

const VenueCard: React.FC<VenueCardProps> = ({
  venue,
  showDescription = true,
  showFacilities = true,
  className,
  onVenueClick,
}) => {
  const handleVenueClick = (venue: Venue) => {
    onVenueClick?.(venue);
  };

  const getSurfaceText = (surface: Venue["surface"]) => {
    switch (surface) {
      case "grass":
        return "דשא טבעי";
      case "artificial":
        return "דשא סינתטי";
      case "hybrid":
        return "דשא היברידי";
      default:
        return surface;
    }
  };

  return (
    <Card
      className={`group hover:shadow-medium transition-all duration-200 cursor-pointer ${className}`}
      onClick={() => handleVenueClick(venue)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3 space-x-reverse">
          {venue.images && venue.images.length > 0 && (
            <Image
              src={venue.images[0]}
              alt={venue.name}
              width={48}
              height={48}
              className="rounded-lg object-cover"
            />
          )}
          <div className="flex-1">
            <CardTitle className="text-lg group-hover:text-primary-dark transition-colors">
              {venue.name}
            </CardTitle>
            <div className="flex items-center space-x-2 space-x-reverse mt-1">
              <span className="text-sm text-gray-600">{venue.city}</span>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-600">{venue.country}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Capacity and Surface */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {venue.capacity.toLocaleString()} מושבים
            </span>
          </div>
          <span className="text-sm text-gray-600">
            {getSurfaceText(venue.surface)}
          </span>
        </div>

        {/* Address */}
        {venue.address && (
          <div className="flex items-start space-x-2 space-x-reverse">
            <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
            <span className="text-sm text-gray-700">{venue.address}</span>
          </div>
        )}

        {/* Description */}
        {showDescription && venue.description && (
          <p className="text-sm text-gray-700 line-clamp-2">
            {venue.description}
          </p>
        )}

        {/* Facilities */}
        {showFacilities && venue.facilities && venue.facilities.length > 0 && (
          <div className="pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-500 mb-2">שירותים:</div>
            <div className="flex flex-wrap gap-1">
              {venue.facilities.slice(0, 3).map((facility, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {facility}
                </span>
              ))}
              {venue.facilities.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  +{venue.facilities.length - 3} נוספים
                </span>
              )}
            </div>
          </div>
        )}

        {/* Parking */}
        {venue.parking && (
          <div className="flex items-center space-x-2 space-x-reverse pt-2 border-t border-gray-100">
            <Car className="h-4 w-4 text-gray-400" />
            <div className="text-sm text-gray-600">
              {venue.parking.available ? "חניה זמינה" : "אין חניה"}
              {venue.parking.capacity && (
                <span className="text-gray-500">
                  ({venue.parking.capacity} מקומות)
                </span>
              )}
              {venue.parking.price && (
                <span className="text-gray-500">- {venue.parking.price}₪</span>
              )}
            </div>
          </div>
        )}

        {/* Public Transport */}
        {venue.publicTransport && (
          <div className="pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-500 mb-2">תחבורה ציבורית:</div>
            <div className="flex flex-wrap gap-2">
              {venue.publicTransport.metro &&
                venue.publicTransport.metro.length > 0 && (
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Train className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-600">
                      מטרו: {venue.publicTransport.metro.join(", ")}
                    </span>
                  </div>
                )}
              {venue.publicTransport.bus &&
                venue.publicTransport.bus.length > 0 && (
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Bus className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-600">
                      אוטובוס: {venue.publicTransport.bus.join(", ")}
                    </span>
                  </div>
                )}
            </div>
          </div>
        )}

        {/* History */}
        {(venue.opened || venue.renovated) && (
          <div className="pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              {venue.opened && `נפתח ב-${venue.opened}`}
              {venue.opened && venue.renovated && " • "}
              {venue.renovated && `שופץ ב-${venue.renovated}`}
            </div>
          </div>
        )}
      </CardContent>

      <div className="px-6 pb-6">
        <Link href={`/venues/${venue.slug}`}>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            className="group-hover:bg-primary-dark group-hover:text-white group-hover:border-primary-dark"
          >
            צפה במשחקים
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default VenueCard;
