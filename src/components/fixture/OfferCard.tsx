"use client";

import React from "react";
import { Offer, Fixture } from "@/types";
import { formatCurrency } from "@/lib/utils";
import Card, { CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Star, Shield, Phone, Users } from "lucide-react";

export interface OfferCardProps {
  offer: Offer;
  fixture?: Fixture;
  onContactAgent?: (agent: Offer["agent"]) => void;
  className?: string;
}

const OfferCard: React.FC<OfferCardProps> = ({
  offer,
  onContactAgent,
  className,
}) => {
  const getCategoryColor = (category: string | undefined) => {
    if (!category) return "bg-gray-100 text-gray-800";

    switch (category.toLowerCase()) {
      case "premium":
        return "bg-purple-100 text-purple-800";
      case "vip":
        return "bg-gold-100 text-gold-800";
      case "standard":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card
      className={`hover:shadow-medium transition-shadow ${className || ""}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          {/* פרטי ההצעה */}
          <div className="flex-1">
            <div className="flex items-center space-x-3 space-x-reverse mb-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                  offer.category
                )}`}
              >
                {offer.category || "כללי"}
              </span>
              {offer.section && (
                <span className="text-sm text-gray-600">
                  קטע {offer.section}
                </span>
              )}
              {offer.row && (
                <span className="text-sm text-gray-600">שורה {offer.row}</span>
              )}
            </div>

            <div className="mb-3">
              <div className="text-2xl font-bold text-primary-dark mb-1">
                {formatCurrency(offer.price, offer.currency)}
              </div>
              <div className="text-sm text-gray-600">
                {offer.availableQuantity} כרטיסים זמינים
              </div>
            </div>

            {offer.description && (
              <p className="text-sm text-gray-700 mb-3">{offer.description}</p>
            )}

            {/* פרטי הסוכן */}
            {offer.agent && (
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">
                    {offer.agent.rating || "5.0"}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600">
                    {offer.agent.isVerified ? "מאומת" : "לא מאומת"}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-600">
                    {offer.agent.totalSales || 0} מכירות
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* כפתור יצירת קשר */}
          <div className="ml-4">
            <Button
              variant="primary"
              size="sm"
              onClick={() => onContactAgent?.(offer.agent)}
              className="flex items-center space-x-2 space-x-reverse"
            >
              <Phone className="h-4 w-4" />
              <span>צור קשר</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OfferCard;
