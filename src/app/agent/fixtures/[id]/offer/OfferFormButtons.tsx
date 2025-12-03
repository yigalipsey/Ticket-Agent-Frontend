import React from "react";

interface OfferFormButtonsProps {
  isSubmitting: boolean;
  onCancel: () => void;
}

export default function OfferFormButtons({
  isSubmitting,
  onCancel,
}: OfferFormButtonsProps) {
  return (
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
            שולח...
          </span>
        ) : (
          "שלח הצעה"
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
  );
}
