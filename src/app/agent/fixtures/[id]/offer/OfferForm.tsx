"use client";

import React, { useState } from "react";
import { apiClient } from "@/lib/api";

interface OfferFormProps {
  fixtureId: string;
  agentId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function OfferForm({
  fixtureId,
  agentId,
  onSuccess,
  onCancel,
}: OfferFormProps) {
  const [formData, setFormData] = useState({
    price: "",
    currency: "ILS",
    category: "Standard",
    section: "",
    row: "",
    seat: "",
    quantity: "1",
    deliveryMethod: "E-Ticket",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const offerData = {
        fixtureId,
        agentId,
        price: parseFloat(formData.price),
        currency: formData.currency,
        category: formData.category,
        section: formData.section || undefined,
        row: formData.row || undefined,
        seat: formData.seat || undefined,
        quantity: parseInt(formData.quantity),
        deliveryMethod: formData.deliveryMethod,
        isAvailable: true,
        metadata: {
          notes: formData.notes || undefined,
        },
      };

      console.log("🚀 OfferForm: Submitting offer data:", offerData);

      const response = await apiClient.postAuth("/offers", offerData, "agent");

      console.log("✅ OfferForm: Success response:", response);
      onSuccess();
    } catch (err: any) {
      console.error("❌ OfferForm: Error details:", err);

      let errorMessage = "שגיאה בהוספת ההצעה. נסה שוב.";

      if (err.response) {
        // Server responded with error status
        console.error("📡 Server response error:", err.response.data);
        console.error("📡 Status code:", err.response.status);

        if (err.response.data?.error) {
          errorMessage = `שגיאת שרת: ${
            err.response.data.error.message || err.response.data.error
          }`;
        } else if (err.response.data?.message) {
          errorMessage = `שגיאה: ${err.response.data.message}`;
        }
      } else if (err.request) {
        // Request was made but no response received
        console.error("🌐 Network error - no response:", err.request);
        errorMessage = "שגיאת רשת. בדוק את החיבור לאינטרנט.";
      } else {
        // Something else happened
        console.error("⚠️ Other error:", err.message);
        errorMessage = `שגיאה: ${err.message}`;
      }

      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        הוסף הצעה חדשה
      </h3>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            מחיר *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Currency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            מטבע
          </label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ILS">₪ שקל</option>
            <option value="USD">$ דולר</option>
            <option value="EUR">€ יורו</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            קטגוריה
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="VIP">VIP</option>
            <option value="Premium">Premium</option>
            <option value="Standard">Standard</option>
            <option value="Economy">Economy</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            כמות כרטיסים
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            יציע
          </label>
          <input
            type="text"
            name="section"
            value={formData.section}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Row */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            שורה
          </label>
          <input
            type="text"
            name="row"
            value={formData.row}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Seat */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            מושב
          </label>
          <input
            type="text"
            name="seat"
            value={formData.seat}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Delivery Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            שיטת משלוח
          </label>
          <select
            name="deliveryMethod"
            value={formData.deliveryMethod}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="E-Ticket">כרטיס אלקטרוני</option>
            <option value="Physical">כרטיס פיזי</option>
            <option value="Mobile">כרטיס נייד</option>
            <option value="Will Call">איסוף בקופה</option>
          </select>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          הערות
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="הערות נוספות על ההצעה..."
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          {isSubmitting ? "שומר..." : "שמור הצעה"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          ביטול
        </button>
      </div>
    </form>
  );
}
