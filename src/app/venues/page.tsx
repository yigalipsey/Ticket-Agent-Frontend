"use client";

import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Users, Building2, AlertCircle, ArrowLeft } from "lucide-react";
import VenueService, { Venue } from "@/services/venueService";
import { Spinner } from "@/components/ui";

export default function VenuesPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["venues", "popular"],
    queryFn: () => VenueService.getStadiums({ limit: 10, isPopular: true }),
  });

  const venues = data?.data?.data || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[500px] w-full overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/people-soccer-stadium.avif"
        >
          <source
            src="/videos/0_Soccer_Football_3840x2160.mp4"
            type="video/mp4"
          />
          {/* Fallback */}
          <div className="absolute inset-0 bg-[url('/images/people-soccer-stadium.avif')] bg-cover bg-center bg-no-repeat" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 to-blue-900/80" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20 shadow-xl">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
              אצטדיונים
            </h1>
            <p className="text-xl md:text-2xl text-blue-50 max-w-2xl mx-auto font-medium drop-shadow-md leading-relaxed">
              גלו את האצטדיונים המפורסמים והמרשימים ביותר
              <br className="hidden md:block" />
              בעולם הכדורגל
            </p>
          </div>
        </div>

        {/* Decorative curve at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-50 rounded-t-[50%] scale-x-150 translate-y-8" />
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-blue-600 rounded-full block"></span>
            האצטדיונים הפופולריים
          </h2>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <Spinner />
            <p className="text-gray-500 mt-4 font-medium">
              טוען אצטדיונים מרגשים...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center max-w-2xl mx-auto">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-red-900 mb-2">
              שגיאה בטעינת האצטדיונים
            </h3>
            <p className="text-red-600">
              אנא נסו לרענן את העמוד או נסו שוב מאוחר יותר
            </p>
          </div>
        )}

        {/* Success State - Grid */}
        {!isLoading && !error && (
          <>
            {venues.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {venues.map((venue: Venue) => (
                  <VenueCard key={venue._id} venue={venue} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  לא נמצאו אצטדיונים פופולריים
                </h3>
                <p className="text-gray-500">
                  כרגע אין אצטדיונים מסומנים כפופולריים במערכת
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
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
        {venue.imageUrl ? (
          <Image
            src={venue.imageUrl}
            alt={venue.name_he || venue.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <Building2 className="w-20 h-20 text-gray-300" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-gray-900 shadow-lg flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-blue-600" />
            {venue.city}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col relative">
        {/* Country Flag/Name - Overlapping Image */}
        <div className="absolute -top-6 right-6 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2">
          {venue.country}
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors mt-2">
          {venue.name_he || venue.name}
        </h3>

        {venue.name_he && venue.name !== venue.name_he && (
          <p className="text-sm text-gray-400 mb-4 font-medium">{venue.name}</p>
        )}

        <div className="mt-auto pt-4 border-t border-gray-50 space-y-3">
          <div className="flex items-center justify-between text-gray-600">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium">תכולה</span>
            </div>
            <span className="text-sm font-bold text-gray-900">
              {venue.capacity
                ? venue.capacity.toLocaleString("he-IL")
                : "לא ידוע"}
            </span>
          </div>
        </div>

        {/* Hover Action */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="w-full py-2.5 bg-blue-50 text-blue-600 rounded-xl font-bold text-center text-sm hover:bg-blue-100 transition-colors flex items-center justify-center gap-2">
            לכל המשחקים באצטדיון
            <ArrowLeft className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
