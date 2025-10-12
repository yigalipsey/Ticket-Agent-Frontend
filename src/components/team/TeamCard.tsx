"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, Users } from "lucide-react";
import { Team } from "@/types";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export interface TeamCardProps {
  team: Team;
  showDescription?: boolean;
  showStats?: boolean;
  className?: string;
  onTeamClick?: (team: Team) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({
  team,
  showDescription = true,
  showStats = true,
  className,
  onTeamClick,
}) => {
  const handleTeamClick = (team: Team) => {
    onTeamClick?.(team);
  };

  return (
    <Card
      className={`group hover:shadow-medium transition-all duration-200 cursor-pointer ${className}`}
      onClick={() => handleTeamClick(team)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3 space-x-reverse">
          {team.logo && (
            <Image
              src={team.logo}
              alt={team.name}
              width={48}
              height={48}
              className="rounded-lg"
            />
          )}
          <div className="flex-1">
            <CardTitle className="text-lg group-hover:text-primary-dark transition-colors">
              {team.name}
            </CardTitle>
            <div className="flex items-center space-x-2 space-x-reverse mt-1">
              <span className="text-sm text-gray-600">{team.city}</span>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-600">{team.country}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stadium */}
        <div className="flex items-center space-x-2 space-x-reverse">
          <MapPin className="h-4 w-4 text-gray-400" />
          <div>
            <div className="text-sm font-medium text-gray-900">
              {team.stadium}
            </div>
            {team.capacity && (
              <div className="text-xs text-gray-600">
                {team.capacity.toLocaleString()} מושבים
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {showDescription && team.description && (
          <p className="text-sm text-gray-700 line-clamp-2">
            {team.description}
          </p>
        )}

        {/* Stats */}
        {showStats && (
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            {team.founded && (
              <div className="flex items-center space-x-2 space-x-reverse">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">שנת הקמה</div>
                  <div className="text-sm font-medium">{team.founded}</div>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2 space-x-reverse">
              <Users className="h-4 w-4 text-gray-400" />
              <div>
                <div className="text-xs text-gray-500">עיר</div>
                <div className="text-sm font-medium">{team.city}</div>
              </div>
            </div>
          </div>
        )}

        {/* Colors */}
        {team.colors && (
          <div className="flex items-center space-x-2 space-x-reverse pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-500">צבעי הקבוצה:</span>
            <div className="flex space-x-1 space-x-reverse">
              <div
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: team.colors.primary }}
                title="צבע ראשי"
              />
              <div
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: team.colors.secondary }}
                title="צבע משני"
              />
            </div>
          </div>
        )}

        {/* Social Media */}
        {team.socialMedia && (
          <div className="flex items-center space-x-2 space-x-reverse pt-2 border-t border-gray-100">
            {team.socialMedia.twitter && (
              <a
                href={team.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="טוויטר"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            )}
            {team.socialMedia.facebook && (
              <a
                href={team.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors"
                aria-label="פייסבוק"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            )}
            {team.socialMedia.instagram && (
              <a
                href={team.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                aria-label="אינסטגרם"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243s.122-.928.49-1.243c.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243s-.122.928-.49 1.243c-.369.315-.807.49-1.297.49z" />
                </svg>
              </a>
            )}
          </div>
        )}
      </CardContent>

      <div className="px-6 pb-6">
        <Link href={`/teams/${team.slug}?id=${team._id || team.id}`}>
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

export default TeamCard;
