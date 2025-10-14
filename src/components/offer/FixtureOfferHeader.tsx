import React from "react";
import Image from "next/image";

interface FixtureOfferHeaderProps {
  homeTeam: {
    name: string;
    logo?: string;
  };
  awayTeam: {
    name: string;
    logo?: string;
  };
  date: string;
  venue?: {
    name: string;
    city?: string;
  };
  league?: {
    name: string;
  };
  totalOffers?: number;
}

export function FixtureOfferHeader({
  homeTeam,
  awayTeam,
  date,
  venue,
  league,
  totalOffers,
}: FixtureOfferHeaderProps) {
  const formattedDate = new Date(date).toLocaleDateString("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = new Date(date).toLocaleTimeString("he-IL", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="mb-6">
        {/* Teams centered */}
        <div className="flex items-center justify-center gap-8">
          {/* Home Team */}
          <div className="flex flex-col items-center">
            {homeTeam.logo && (
              <Image
                src={homeTeam.logo}
                alt={homeTeam.name}
                width={64}
                height={64}
                className="w-16 h-16 object-contain mb-2"
              />
            )}
            <h2 className="text-lg font-bold text-gray-900 text-center">
              {homeTeam.name}
            </h2>
          </div>

          {/* VS */}
          <div className="text-2xl font-bold text-gray-400">VS</div>

          {/* Away Team */}
          <div className="flex flex-col items-center">
            {awayTeam.logo && (
              <Image
                src={awayTeam.logo}
                alt={awayTeam.name}
                width={64}
                height={64}
                className="w-16 h-16 object-contain mb-2"
              />
            )}
            <h2 className="text-lg font-bold text-gray-900 text-center">
              {awayTeam.name}
            </h2>
          </div>
        </div>
      </div>

      {/* Match Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-gray-600">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>
            {formattedDate}, {formattedTime}
          </span>
        </div>

        {venue && (
          <div className="flex items-center gap-2 text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>
              {venue.name}
              {venue.city && `, ${venue.city}`}
            </span>
          </div>
        )}

        {league && (
          <div className="flex items-center gap-2 text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
            <span>{league.name}</span>
          </div>
        )}

        {totalOffers !== undefined && (
          <div className="flex items-center gap-2 text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>הצעות זמינות: {totalOffers}</span>
          </div>
        )}
      </div>
    </div>
  );
}
