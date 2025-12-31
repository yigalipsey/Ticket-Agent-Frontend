"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAgentAuth } from "@/providers";
import { useRouteValidation, routeValidators } from "@/hooks";
import OfferForm from "./OfferForm";
import SuccessModal from "@/components/ui/SuccessModal";

interface AddOfferPageProps {
  params: Promise<{ id: string }>;
}

export default function AddOfferPage({ params }: AddOfferPageProps) {
  const router = useRouter();
  const { agent, isAuthenticated, isLoading: authLoading } = useAgentAuth();
  const [fixtureId, setFixtureId] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Auto-close success modal after 500ms and navigate back
  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
        router.back();
      }, 500); // Half a second

      return () => clearTimeout(timer);
    }
  }, [showSuccessModal, router]);

  // Validate the route exists
  const {
    isValid,
    isLoading: validationLoading,
    error,
  } = useRouteValidation({
    validateFunction: routeValidators.agentFixture,
    timeout: 5000,
  });

  useEffect(() => {
    params.then((p) => {
      setFixtureId(p.id);
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

  if (authLoading || validationLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">טוען...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !fixtureId) {
    return null;
  }

  // Show error if route validation failed
  if (!isValid) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            משחק לא נמצא
          </h2>
          <p className="text-gray-600 mb-4">
            {error || "המשחק שחיפשת לא קיים או הועבר למיקום אחר"}
          </p>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            חזור אחורה
          </button>
        </div>
      </div>
    );
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
          <OfferForm
            fixtureId={fixtureId}
            onSuccess={() => {
              setShowSuccessModal(true);
            }}
            onCancel={() => router.back()}
          />
        </div>
      </section>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          router.back();
        }}
        title="ההצעה נוספה בהצלחה! ✅"
        message="ההצעה שלך נשמרה במערכת ותוצג למשתמשים."
        buttonText="סגור"
      />
    </div>
  );
}
