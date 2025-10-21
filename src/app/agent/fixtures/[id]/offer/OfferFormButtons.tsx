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
    <div className="flex gap-3 pt-4">
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "שולח..." : "שלח הצעה"}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        ביטול
      </button>
    </div>
  );
}
