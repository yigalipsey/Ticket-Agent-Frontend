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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
        >
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          חזרה
        </button>

        {/* Page Title */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">הוסף הצעה למשחק</h1>
        </div>

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
