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
          <Card
            key={league._id}
            className="group hover:shadow-medium transition-all duration-200 cursor-pointer"
            onClick={() => handleLeagueClick(league)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 space-x-reverse">
                  {/* דגל המדינה */}
                  <div className="flex-shrink-0">
                    {league.logoUrl ? (
                      <Image
                        src={league.logoUrl}
                        alt={league.nameHe}
                        width={48}
                        height={48}
                        className="rounded-lg object-contain"
                        style={{ width: "auto", height: "auto" }}
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-primary-dark transition-colors">
                      {league.nameHe}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {league.countryHe}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>

            <div className="px-6 pb-6">
              <Link href={`/leagues/${league.slug}?id=${league._id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  className="group-hover:bg-primary-dark group-hover:text-white group-hover:border-primary-dark"
                >
                  צפה בהצעות
                </Button>
              </Link>
            </div>
          </Card>
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
