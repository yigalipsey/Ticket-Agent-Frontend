import React from "react";
import LeagueService from "@/services/leagueService";
import Link from "next/link";
import Image from "next/image";
import FireLoader from "@/components/ui/FireLoader";
import { Team } from "@/types";

export default async function TeamsPage() {
    // שליפת כל הליגות עם הקבוצות - בדיוק כמו בדף הבית
    const leaguesRes = await LeagueService.getAllLeaguesWithTeams();
    const leagues = leaguesRes.success ? leaguesRes.data || [] : [];

    // איסוף כל הקבוצות מהליגות (ללא כפילויות)
    const allTeams = leagues.flatMap((league) => league.teams || []);

    // שימוש ב-Map למניעת כפילויות לפי _id
    const teamsMap = new Map();
    allTeams.forEach((team) => {
        if (!teamsMap.has(team._id)) {
            teamsMap.set(team._id, team);
        }
    });

    const uniqueTeams = Array.from(teamsMap.values());
    const hotTeams = uniqueTeams.filter((team) => team.isPopular);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero-like header with image layers (matches fixtures hero style) */}
            <section className="relative overflow-hidden w-full -mt-16 pt-16 h-[360px] md:h-[420px] mb-4">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0"
                        style={{ backgroundColor: "#092274" }}
                    />
                    <div className="absolute inset-0 bg-[url('/images/spotlight.avif')] bg-cover bg-center opacity-40" />
                    <div className="absolute inset-0 bg-[url('/images/small-pitch.avif')] bg-cover bg-center opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <div className="mb-4">
                        <FireLoader />
                    </div>
                    <div className="px-4 text-center">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white">
                            הקבוצות החמות
                        </h1>
                        <p className="mt-3 text-white/80 text-sm md:text-base">
                            קבוצות נבחרות עם המשחקים הכי חמים{" "}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {hotTeams.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                        {hotTeams.map((team: Team) => (
                            <Link
                                key={team._id || team.id}
                                href={`/teams/${team.slug}?id=${team._id || team.id}`}
                                className="group flex flex-col items-center text-center transition-all duration-300 bg-white p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="w-20 h-20 mb-4 flex items-center justify-center relative">
                                    <div className="absolute inset-0 bg-gray-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out -z-10" />
                                    {team.logoUrl ? (
                                        <Image
                                            src={team.logoUrl}
                                            alt={team.name}
                                            width={64}
                                            height={64}
                                            loading="lazy"
                                            className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                            <span className="text-gray-400 text-lg font-medium">
                                                {team.name.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                    {team.name}
                                </h3>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                        <p className="text-yellow-700 font-medium">
                            אין קבוצות חמות זמינות להצגה
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
