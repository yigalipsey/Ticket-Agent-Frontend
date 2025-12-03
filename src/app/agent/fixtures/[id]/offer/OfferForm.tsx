"use client";

import React from "react";
import { useOfferForm } from "@/hooks";
import OfferFormFields from "./OfferFormFields";
import OfferFormButtons from "./OfferFormButtons";

interface OfferFormProps {
  fixtureId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function OfferForm({
  fixtureId,
  onSuccess,
  onCancel,
}: OfferFormProps) {
  const { formData, isSubmitting, error, handleChange, handleSubmit } =
    useOfferForm({
      fixtureId,
      onSuccess,
    });

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
          הוסף הצעה חדשה
        </h2>
        <p className="text-gray-300 text-sm">
          מלא את הפרטים הבאים כדי להוסיף כרטיסים למכירה
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl backdrop-blur-sm animate-fade-in">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-red-400 ml-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-red-100 text-sm">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <OfferFormFields formData={formData} onChange={handleChange} />

        <OfferFormButtons isSubmitting={isSubmitting} onCancel={onCancel} />
      </form>
    </div>
  );
}
