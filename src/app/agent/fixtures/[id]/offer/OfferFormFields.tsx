import React from "react";
import { OfferFormData } from "@/hooks/agents/useOfferForm";

interface OfferFormFieldsProps {
  formData: OfferFormData;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

export default function OfferFormFields({
  formData,
  onChange,
}: OfferFormFieldsProps) {
  return (
    <div className="space-y-4">
      {/* Price Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          מחיר *
        </label>
        <input
          type="number"
          name="price"
          value={formData.price || ""}
          onChange={onChange}
          min="0"
          step="0.01"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="הזן מחיר"
        />
      </div>

      {/* Currency Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          מטבע *
        </label>
        <select
          name="currency"
          value={formData.currency}
          onChange={onChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="EUR">EUR (יורו)</option>
          <option value="USD">USD (דולר אמריקאי)</option>
          <option value="GBP">GBP (לירה שטרלינג)</option>
          <option value="ILS">ILS (שקל)</option>
        </select>
      </div>

      {/* Ticket Type Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          סוג כרטיס *
        </label>
        <select
          name="ticketType"
          value={formData.ticketType}
          onChange={onChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="standard">רגיל</option>
          <option value="vip">VIP</option>
        </select>
      </div>

      {/* Notes Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          הערות (אופציונלי)
        </label>
        <textarea
          name="notes"
          value={formData.notes || ""}
          onChange={onChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="הערות נוספות על ההצעה..."
        />
      </div>
    </div>
  );
}
