"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAgentAuth } from "@/providers";
import EditOfferForm from "./EditOfferForm";

interface EditOfferPageProps {
  params: Promise<{ id: string }>;
}

export default function EditOfferPage({ params }: EditOfferPageProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAgentAuth();
  const [offerId, setOfferId] = useState("");

  useEffect(() => {
    params.then((p) => {
      setOfferId(p.id);
    });
  }, [params]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/agent/login");
    }
  }, [authLoading, isAuthenticated, router]);

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

  if (!isAuthenticated || !offerId) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans" dir="rtl">
      {/* Hero Section with Form Overlay */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-20">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover scale-105 fixed"
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
          {/* Fallback for browsers that don't support video */}
          <div className="absolute inset-0 bg-[url('/images/people-soccer-stadium.avif')] bg-cover bg-center bg-no-repeat" />
        </video>

        {/* Dark Overlay with Blur */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/90 via-primary/80 to-black/90 backdrop-blur-[3px] fixed" />

        {/* Content - Centered */}
        <div className="relative z-10 w-full max-w-2xl px-4 animate-slide-up">
          <EditOfferForm
            offerId={offerId}
            onSuccess={() => {
              alert("ההצעה עודכנה בהצלחה!");
              router.push("/agent/my-offers");
            }}
            onCancel={() => router.push("/agent/my-offers")}
          />
        </div>
      </section>
    </div>
  );
}









