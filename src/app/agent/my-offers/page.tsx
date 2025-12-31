"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAgentAuth } from "@/providers";
import AgentOffersList from "@/components/agent/AgentOffersList";

export default function MyOffersPage() {
  const { isAuthenticated, isLoading: authLoading } = useAgentAuth();
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
      <section className="relative min-h-[300px] w-full pt-20 pb-10 flex flex-col">
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

        <div className="relative z-10 flex flex-col items-center justify-center flex-grow">
          <h1 className="text-3xl md:text-5xl text-white font-bold mb-4 animate-slide-up">
            ההצעות שלי
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AgentOffersList />
      </div>
    </div>
  );
}








