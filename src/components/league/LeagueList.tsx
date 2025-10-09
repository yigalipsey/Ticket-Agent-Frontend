"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Trophy } from "lucide-react";
import { League } from "@/types";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export interface LeagueListProps {
  leagues: League[];
  showDescription?: boolean;
  showStats?: boolean;
  className?: string;
  onLeagueClick?: (league: League) => void;
}

const LeagueList: React.FC<LeagueListProps> = ({
  leagues,
  showDescription = true,
  showStats = true,
  className,
  onLeagueClick,
}) => {
  const handleLeagueClick = (league: League) => {
    onLeagueClick?.(league);
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leagues.map((league) => (
          <Link
            key={league._id}
            href={`/leagues/${league.slug}?id=${league._id}`}
            onClick={() => handleLeagueClick(league)}
          >
            <Card className="group hover:shadow-medium transition-all duration-200 cursor-pointer h-full">
              <CardContent className="p-3 md:p-6">
                <div className="flex flex-col items-center text-center space-y-2 md:space-y-4">
                  {/* לוגו הליגה */}
                  <div className="flex-shrink-0">
                    {league.logoUrl ? (
                      <Image
                        src={league.logoUrl}
                        alt={league.nameHe}
                        width={80}
                        height={80}
                        className="object-contain w-12 h-12 md:w-20 md:h-20"
                        style={{ width: "auto", height: "auto" }}
                      />
                    ) : (
                      <div className="w-12 h-12 md:w-20 md:h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Trophy className="w-6 h-6 md:w-10 md:h-10 text-gray-400" />
                      </div>
                    )}
                  </div>
                  {/* שם הליגה */}
                  <div className="w-full">
                    <CardTitle className="text-sm md:text-lg group-hover:text-primary-dark transition-colors">
                      {league.nameHe}
                    </CardTitle>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {leagues.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-500">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">אין ליגות זמינות</h3>
              <p className="text-sm">לא נמצאו ליגות עבור החיפוש הנוכחי</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LeagueList;
