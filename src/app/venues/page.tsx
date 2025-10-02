"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { VenueCard } from "@/components";
import { Spinner } from "@/components/ui";

// Mock data for venues - replace with actual API call
const mockVenues = [
  {
    id: "1",
    name: "אצטדיון טדי",
    nameHe: "אצטדיון טדי",
    slug: "teddy-stadium",
    city: "ירושלים",
    country: "ישראל",
    address: "רחוב טדי קולק 1, ירושלים",
    capacity: 31000,
    surface: "grass" as const,
    opened: 1991,
    images: ["/venues/teddy-stadium.jpg"],
    description: 'אצטדיון הבית של בית"ר ירושלים',
    facilities: ["חניה", "מזנונים", "חנות מזכרות"],
    parking: {
      available: true,
      capacity: 2000,
      price: 20,
    },
    publicTransport: {
      bus: ["1", "2", "3"],
      train: ["ירושלים - תל אביב"],
    },
  },
  {
    id: "2",
    name: "אצטדיון בלומפילד",
    nameHe: "אצטדיון בלומפילד",
    slug: "bloomfield-stadium",
    city: "תל אביב",
    country: "ישראל",
    address: "רחוב הבלומפילד 1, תל אביב",
    capacity: 29000,
    surface: "grass" as const,
    opened: 1962,
    images: ["/venues/bloomfield-stadium.jpg"],
    description: "אצטדיון הבית של מכבי תל אביב",
    facilities: ["חניה", "מזנונים", "חנות מזכרות", "VIP"],
    parking: {
      available: true,
      capacity: 1500,
      price: 25,
    },
    publicTransport: {
      bus: ["4", "5", "6"],
      train: ["תל אביב מרכז"],
    },
  },
];

export default function VenuesPage() {
  const t = useTranslations();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <div className="bg-white shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-text-dark mb-4">
              {t("venues.title")}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              גלו את כל האצטדיונים המובילים והמשחקים המרתקים ביותר מכל העולם
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockVenues.map((venue) => (
              <VenueCard
                key={venue.id}
                venue={venue}
                showDescription={true}
                showFacilities={true}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
