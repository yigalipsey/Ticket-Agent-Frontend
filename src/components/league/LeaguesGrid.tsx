"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trophy, MapPin, ArrowLeft } from "lucide-react";
import { League } from "@/types";

interface LeaguesGridProps {
  leagues: League[];
  isLoading?: boolean;
  hrefPrefix?: string;
}

export default function LeaguesGrid({
  leagues,
  isLoading = false,
  hrefPrefix = "",
}: LeaguesGridProps) {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-gray-100 h-[280px] animate-pulse"
          >
            <div className="h-24 md:h-32 bg-gray-100 rounded-t-xl" />
            <div className="p-4 md:p-6 space-y-4">
              <div className="h-14 w-14 md:h-16 md:w-16 bg-gray-200 rounded-full mx-auto -mt-12 md:-mt-14 border-4 border-white" />
              <div className="h-4 bg-gray-100 rounded w-3/4 mx-auto" />
              <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (leagues.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
        <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">לא נמצאו ליגות</h3>
        <p className="text-gray-500">
          נסה לשנות את סינון החיפוש או נסה שוב מאוחר יותר
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
      {leagues.map((league) => (
        <div
          key={league._id}
          onClick={() =>
            router.push(`${hrefPrefix}/leagues/${league.slug}?id=${league._id}`)
          }
          className="group relative bg-white rounded-xl md:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer flex flex-col h-full transform hover:-translate-y-1"
        >
          {/* Header / Background Image Area */}
          <div className="relative h-24 md:h-32 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            {league.backgroundImage ? (
              <Image
                src={league.backgroundImage}
                alt={`${league.nameHe || league.name} background`}
                fill
                className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
            )}

            {/* Country Badge */}
            <div className="absolute top-2 right-2 md:top-3 md:right-3">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 md:px-2.5 md:py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] md:text-xs font-medium text-gray-700 shadow-sm">
                <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" />
                <span className="truncate max-w-[80px] md:max-w-none">
                  {league.countryHe || league.country}
                </span>
              </span>
            </div>
          </div>

          {/* Logo Container (Overlapping) */}
          <div className="relative px-4 md:px-6 flex justify-center">
            <div className="relative -mt-10 md:-mt-12 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-lg p-3 md:p-4 flex items-center justify-center border-4 border-white group-hover:border-blue-50 transition-colors">
              {league.logoUrl ? (
                <div className="relative w-full h-full">
                  <Image
                    src={league.logoUrl}
                    alt={league.nameHe || league.name}
                    fill
                    className="object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ) : (
                <Trophy className="w-8 h-8 text-gray-300" />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6 pt-3 md:pt-4 text-center flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {league.nameHe || league.name}
              </h3>

              {/* Stats or Description if available */}
              <div className="flex items-center justify-center gap-4 mt-2 md:mt-3 text-xs md:text-sm text-gray-500">
                {league.teamsCount ? (
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-gray-700">
                      {league.teamsCount}
                    </span>
                    קבוצות
                  </span>
                ) : null}
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-4 md:mt-6">
              <div className="w-full py-2 md:py-2.5 rounded-lg md:rounded-xl bg-gray-50 text-gray-600 font-medium text-xs md:text-sm group-hover:bg-primary group-hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 md:gap-2">
                לכל המשחקים
                <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover:-translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
