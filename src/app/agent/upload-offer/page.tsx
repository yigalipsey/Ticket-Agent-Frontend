"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAgentAuth } from "@/providers";
import { LeagueService } from "@/services";
import { League } from "@/types/league";
import LeaguesList from "../dashboard/LeaguesList";
import SearchSection from "../dashboard/SearchSection";

export default function UploadOfferPage() {
  const { isAuthenticated, isLoading: authLoading } = useAgentAuth();
  const [leagues, setLeagues] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/agent/login");
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await LeagueService.getAllLeagues(true);

        if (response.success && response.data) {
          setLeagues(response.data);
        } else {
          setError(response.error || "שגיאה בטעינת הליגות");
        }
      } catch {
        setError("שגיאה בטעינת הליגות. נסה שוב מאוחר יותר.");
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchLeagues();
    }
  }, [isAuthenticated]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">טוען...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[400px] w-full pt-20 pb-10 flex flex-col">
        <div className="absolute inset-0 overflow-hidden">
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
            <div className="absolute inset-0 bg-[url('/images/people-soccer-stadium.avif')] bg-cover bg-center bg-no-repeat" />
          </video>
          <div className="absolute inset-0 bg-[#0A297E60]" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center flex-grow mt-10">
          <div className="flex flex-col items-center gap-4 md:gap-8 px-4 w-full md:max-w-4xl mx-auto">
            <p className="text-2xl md:text-5xl text-gray-200 animate-slide-up leading-tight font-extrabold text-center">
              העלאת הצעות כרטיסים
              <br />
              <span className="text-lg md:text-2xl">חפש קבוצה או ליגה</span>
            </p>
            <SearchSection />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            בחר ליגה להעלאת הצעות
          </h2>
          <LeaguesList leagues={leagues} isLoading={isLoading} error={error} />
        </div>
      </div>
    </div>
  );
}





