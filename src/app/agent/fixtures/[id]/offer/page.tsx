"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAgentAuth } from "@/providers";
import { useRouteValidation, routeValidators } from "@/hooks";
import OfferForm from "./OfferForm";

interface AddOfferPageProps {
  params: Promise<{ id: string }>;
}

export default function AddOfferPage({ params }: AddOfferPageProps) {
  const router = useRouter();
  const { agent, isAuthenticated, isLoading: authLoading } = useAgentAuth();
  const [fixtureId, setFixtureId] = useState("");

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
    <div className="min-h-screen bg-gray-50">
      {/* Blue background div under navbar */}
      <div className="bg-primary h-16 w-full absolute top-0 left-0 right-0 z-[99998]"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Offer Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <OfferForm
            fixtureId={fixtureId}
            onSuccess={() => {
              alert("ההצעה נוספה בהצלחה!");
              router.back();
            }}
            onCancel={() => router.back()}
          />
        </div>
      </div>
    </div>
  );
}
