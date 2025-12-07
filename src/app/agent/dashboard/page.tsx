"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAgentAuth } from "@/providers";

export default function AgentDashboardPage() {
  const { agent, isAuthenticated, isLoading: authLoading } = useAgentAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/agent/login");
    }
  }, [isAuthenticated, authLoading, router]);

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
      {/* Hero Section */}
      <section className="relative min-h-[350px] w-full pt-20 pb-10 flex flex-col">
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

        <div className="relative z-10 flex flex-col items-center justify-center flex-grow mt-4">
          <div className="text-center text-white/90 animate-fade-in mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">דשבורד סוכן</h1>
            <p className="text-xl">
              שלום {agent?.email}
              {agent?.companyName && ` • ${agent.companyName}`}
            </p>
            <p className="text-sm opacity-80">
              {agent?.agentType === "agency" ? "סוכנות" : "סוכן עצמאי"}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - Navigation Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-sm md:max-w-4xl mx-auto">
          {/* Upload Offer Card */}
          <Link
            href="/agent/upload-offer"
            className="group bg-white rounded-2xl shadow-xl p-5 md:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 md:w-20 md:h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-blue-100 transition-colors">
              <svg
                className="w-7 h-7 md:w-10 md:h-10 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              העלאת הצעה חדשה
            </h2>
            <p className="text-gray-600 mb-4 md:mb-6">
              חפש משחק או ליגה, בחר את הפרטים והעלה הצעה חדשה למערכת
            </p>
            <span className="inline-flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
              התחל עכשיו
              <svg
                className="w-4 h-4 mr-2 transform rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </Link>

          {/* My Offers Card */}
          <Link
            href="/agent/my-offers"
            className="group bg-white rounded-2xl shadow-xl p-5 md:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 md:w-20 md:h-20 bg-purple-50 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-purple-100 transition-colors">
              <svg
                className="w-7 h-7 md:w-10 md:h-10 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              ההצעות שלי
            </h2>
            <p className="text-gray-600 mb-4 md:mb-6">
              צפה בכל ההצעות שהעלית, נהל אותן, ועדכן פרטים או זמינות
            </p>
            <span className="inline-flex items-center text-purple-600 font-medium group-hover:translate-x-1 transition-transform">
              צפה בהצעות
              <svg
                className="w-4 h-4 mr-2 transform rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
