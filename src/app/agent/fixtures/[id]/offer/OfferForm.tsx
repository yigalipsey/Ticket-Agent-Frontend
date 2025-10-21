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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-right">
        הוסף הצעה חדשה
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800 text-right">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <OfferFormFields formData={formData} onChange={handleChange} />

        <OfferFormButtons isSubmitting={isSubmitting} onCancel={onCancel} />
      </form>
    </div>
  );
}
