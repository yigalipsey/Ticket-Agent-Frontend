import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Team } from "@/types";
import SectionHeader from "./SectionHeader";

interface HotTeamsSectionProps {
  teams: Team[];
}

export default function HotTeamsSection({ teams }: HotTeamsSectionProps) {
  // Filter popular teams in frontend - using isPopular field
  const hotTeams = teams?.filter((team) => team.isPopular) || [];

  return (
    <section className="pb-4 mt-4 md:pb-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={{
            mobile: "הקבוצות החמות",
            desktop: "הקבוצות החמות",
          }}
          subtitle="קבוצות נבחרות עם המשחקים הכי חמים"
          buttonText="כל הקבוצות"
          href="/teams"
        />

        {hotTeams && hotTeams.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {hotTeams.slice(0, 10).map((team) => (
              <Link
                key={team._id || team.id}
                href={`/teams/${team.slug}?id=${team._id || team.id}`}
                className="group flex flex-col items-center text-center hover:scale-105 transition-transform duration-200 bg-white p-4 rounded-lg"
                style={{ boxShadow: "0px 3px 8px 0px #00000014" }}
              >
                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                  {team.logoUrl ? (
                    <Image
                      src={team.logoUrl}
                      alt={team.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-400 text-xs font-medium">
                        {team.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {team.name}
                </h3>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-yellow-600 font-medium">אין קבוצות זמינות</p>
            <p className="text-yellow-500 text-sm mt-1">
              לא נמצאו קבוצות חמות להצגה
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
