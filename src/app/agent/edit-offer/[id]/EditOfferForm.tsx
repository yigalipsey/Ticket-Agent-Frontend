"use client";

import React from "react";
import { useEditOfferForm } from "@/hooks";
import OfferFormFields from "../../fixtures/[id]/offer/OfferFormFields";
import OfferFormButtons from "../../fixtures/[id]/offer/OfferFormButtons";

interface EditOfferFormProps {
  offerId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function EditOfferForm({
  offerId,
  onSuccess,
  onCancel,
}: EditOfferFormProps) {
  const { formData, isSubmitting, isLoading, error, handleChange, handleSubmit } =
    useEditOfferForm({
      offerId,
      onSuccess,
    });

  if (isLoading) {
    return (
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-300">טוען פרטי הצעה...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
          ערוך הצעה
        </h2>
        <p className="text-gray-300 text-sm">
          עדכן את הפרטים הבאים של ההצעה
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

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                מעדכן...
              </span>
            ) : (
              "עדכן הצעה"
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3.5 px-4 border border-white/10 rounded-xl text-sm font-bold text-white bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500 transition-all duration-200"
          >
            ביטול
          </button>
        </div>
      </form>
    </div>
  );
}

