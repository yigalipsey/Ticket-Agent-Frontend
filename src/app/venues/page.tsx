"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Users, Building2, AlertCircle } from "lucide-react";
import VenueService, { Venue } from "@/services/venueService";
import { Spinner } from "@/components/ui";

export default function VenuesPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["venues", { limit: 10 }],
    queryFn: () => VenueService.getVenues({ limit: 10 }),
  });

  return (
    <div className="min-h-screen bg-white pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Building2 className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-heebo">
            אצטדיונים
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            גלו את האצטדיונים המפורסמים ביותר בעולם הכדורגל
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Spinner />
            <p className="text-gray-600 mt-4">טוען אצטדיונים...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-bold text-red-900 mb-2">
                שגיאה בטעינת האצטדיונים
              </h3>
              <p className="text-red-700">
                {data?.error || "אירעה שגיאה בטעינת הנתונים. אנא נסה שוב מאוחר יותר."}
              </p>
            </div>
          </div>
        )}

        {/* Success State */}
        {!isLoading && !error && data?.data && (
          <>
            {/* Stats */}
            <div className="mb-8 text-center">
              <p className="text-gray-600">
                מציג <span className="font-bold text-blue-600">{data.data.data.length}</span> אצטדיונים
                {data.data.pagination && (
                  <span className="text-gray-500">
                    {" "}מתוך {data.data.pagination.total}
                  </span>
                )}
              </p>
            </div>

            {/* Venues Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.data.data.map((venue: Venue) => (
                <VenueCard key={venue._id} venue={venue} />
              ))}
            </div>

            {/* Empty State */}
            {data.data.data.length === 0 && (
              <div className="text-center py-20">
                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  לא נמצאו אצטדיונים
                </h3>
                <p className="text-gray-600">
                  נסה לשנות את הפילטרים או לחפש משהו אחר
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Venue Card Component
function VenueCard({ venue }: { venue: Venue }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-700 overflow-hidden">
        {venue.imageUrl ? (
          <img
            src={venue.imageUrl}
            alt={venue.name_he || venue.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Building2 className="w-16 h-16 text-white/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Country Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-900">
          {venue.country}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {venue.name_he || venue.name}
        </h3>

        {venue.name_he && venue.name !== venue.name_he && (
          <p className="text-sm text-gray-500 mb-3">{venue.name}</p>
        )}

        <div className="space-y-2">
          {/* City */}
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span className="text-sm">{venue.city}</span>
          </div>

          {/* Capacity */}
          {venue.capacity && (
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-sm">
                {venue.capacity.toLocaleString("he-IL")} מקומות ישיבה
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
