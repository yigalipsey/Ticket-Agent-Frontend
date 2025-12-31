"use client";

import React from "react";
import Image from "next/image";
import { Calendar, Clock, MapPin, Icon } from "lucide-react";
import { soccerBall } from "@lucide/lab";
import { formatDate, formatTime } from "@/lib/utils";

export interface FixtureHeaderProps {
  fixture: {
    homeTeam: {
      name: string;
      logo?: string;
    };
    awayTeam: {
      name: string;
      logo?: string;
    };
    league?: {
      name: string;
      logo?: string;
    };
    venue?: {
      name: string;
    };
    date: string;
    time: string;
  };
  slug?: string;
}

export default function FixtureHeader({ fixture, slug }: FixtureHeaderProps) {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* לוגו הליגה */}
        {fixture.league && (
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-3">
              {fixture.league.logo && (
                <Image
                  src={fixture.league.logo}
                  alt={fixture.league.name}
                  width={32}
                  height={32}
                  className="rounded"
                />
              )}
              <span className="text-lg font-medium text-gray-600">
                {fixture.league.name}
              </span>
            </div>
          </div>
        )}

        {/* הקבוצות */}
        <div className="flex items-center justify-center space-x-8 mb-6">
          {/* קבוצה ביתית */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-16 h-16 flex items-center justify-center">
              {fixture.homeTeam.logo ? (
                <Image
                  src={fixture.homeTeam.logo}
                  alt={fixture.homeTeam.name}
                  width={64}
                  height={64}
                  className="rounded-lg"
                />
              ) : (
                <div className="w-16 h-16 flex items-center justify-center">
                  <Icon
                    iconNode={soccerBall}
                    className="w-12 h-12 text-gray-400"
                  />
                </div>
              )}
            </div>
            <span className="text-xl font-bold text-gray-900 text-center">
              {fixture.homeTeam.name}
            </span>
          </div>

          {/* VS */}
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold text-gray-400">VS</div>
          </div>

          {/* קבוצה אורחת */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-16 h-16 flex items-center justify-center">
              {fixture.awayTeam.logo ? (
                <Image
                  src={fixture.awayTeam.logo}
                  alt={fixture.awayTeam.name}
                  width={64}
                  height={64}
                  className="rounded-lg"
                />
              ) : (
                <div className="w-16 h-16 flex items-center justify-center">
                  <Icon
                    iconNode={soccerBall}
                    className="w-12 h-12 text-gray-400"
                  />
                </div>
              )}
            </div>
            <span className="text-xl font-bold text-gray-900 text-center">
              {fixture.awayTeam.name}
            </span>
          </div>
        </div>

        {/* פרטי המשחק */}
        <div className="flex items-center justify-center space-x-8 text-gray-600">
          {/* תאריך */}
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>{formatDate(fixture.date)}</span>
          </div>

          {/* שעה */}
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>{formatTime(fixture.time)}</span>
          </div>

          {/* אצטדיון */}
          {fixture.venue && (
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>{fixture.venue.name}</span>
            </div>
          )}
        </div>

        {/* אם אין פרטי משחק, נציג את ה-slug */}
        {!fixture.homeTeam && !fixture.awayTeam && slug && (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              הצעות לכרטיסים
            </h1>
            <p className="text-gray-600">משחק: {slug}</p>
          </div>
        )}
      </div>
    </div>
  );
}
