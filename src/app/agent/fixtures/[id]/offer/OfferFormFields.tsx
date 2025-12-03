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
  const inputClassName =
    "block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200";
  const labelClassName = "block text-sm font-medium text-gray-200 mb-2";

  return (
    <div className="space-y-6">
      {/* Price Field */}
      <div>
        <label className={labelClassName}>מחיר *</label>
        <div className="relative group">
          <input
            type="number"
            name="price"
            value={formData.price || ""}
            onChange={onChange}
            min="0"
            step="0.01"
            required
            className={inputClassName}
            placeholder="0.00"
          />
        </div>
      </div>

      {/* Currency Field */}
      <div>
        <label className={labelClassName}>מטבע *</label>
        <div className="relative group">
          <select
            name="currency"
            value={formData.currency}
            onChange={onChange}
            required
            className={`${inputClassName} appearance-none`}
            style={{ backgroundImage: "none" }}
          >
            <option value="EUR" className="bg-gray-800 text-white">
              EUR (יורו)
            </option>
            <option value="USD" className="bg-gray-800 text-white">
              USD (דולר אמריקאי)
            </option>
            <option value="GBP" className="bg-gray-800 text-white">
              GBP (לירה שטרלינג)
            </option>
            <option value="ILS" className="bg-gray-800 text-white">
              ILS (שקל)
            </option>
          </select>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Ticket Type Field */}
      <div>
        <label className={labelClassName}>סוג כרטיס *</label>
        <div className="relative group">
          <select
            name="ticketType"
            value={formData.ticketType}
            onChange={onChange}
            required
            className={`${inputClassName} appearance-none`}
            style={{ backgroundImage: "none" }}
          >
            <option value="standard" className="bg-gray-800 text-white">
              רגיל
            </option>
            <option value="vip" className="bg-gray-800 text-white">
              VIP
            </option>
          </select>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Sales URL Field */}
      <div>
        <label className={labelClassName}>קישור לדף המכירה (אופציונלי)</label>
        <div className="relative group">
          <input
            type="url"
            name="url"
            value={formData.url || ""}
            onChange={onChange}
            className={inputClassName}
            placeholder="https://example.com/listing"
            inputMode="url"
          />
        </div>
      </div>
    </div>
  );
}
