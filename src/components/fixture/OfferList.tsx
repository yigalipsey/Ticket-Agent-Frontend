"use client";

import React, { useState } from "react";
import { Offer, Agent } from "@/types";
import { formatCurrency } from "@/lib/utils";
import Card, { CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Star, Shield, Phone, Users } from "lucide-react";

export interface OfferListProps {
  offers: Offer[];
  onOfferSelect?: (offer: Offer) => void;
  onContactAgent?: (agent: Agent) => void;
  className?: string;
  showFilters?: boolean;
  onFilterChange?: (filters: Record<string, unknown>) => void;
}

const OfferList: React.FC<OfferListProps> = ({
  offers,
  onOfferSelect,
  onContactAgent,
  className,
  showFilters = true,
  onFilterChange: _onFilterChange,
}) => {
  const [sortBy, setSortBy] = useState<"price" | "rating" | "createdAt">(
    "price"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { value: "all", label: "כל הקטגוריות" },
    { value: "VIP", label: "VIP" },
    { value: "Premium", label: "Premium" },
    { value: "Standard", label: "Standard" },
    { value: "Economy", label: "Economy" },
  ];

  const filteredOffers = offers
    .filter(
      (offer) =>
        selectedCategory === "all" || offer.category === selectedCategory
    )
    .sort((a, b) => {
      let aValue: number | string, bValue: number | string;

      switch (sortBy) {
        case "price":
          aValue = a.price;
          bValue = b.price;
          break;
        case "rating":
          aValue = a.agent.rating || 0;
          bValue = b.agent.rating || 0;
          break;
        case "createdAt":
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        default:
          return 0;
      }

      return sortOrder === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

  const handleSortChange = (newSortBy: typeof sortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("asc");
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const getCategoryColor = (category: Offer["category"]) => {
    switch (category) {
      case "VIP":
        return "bg-purple-100 text-purple-800";
      case "Premium":
        return "bg-blue-100 text-blue-800";
      case "Standard":
        return "bg-green-100 text-green-800";
      case "Economy":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className={className}>
      {/* Filters */}
      {showFilters && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              {/* Category Filter */}
              <div className="flex items-center space-x-2 space-x-reverse">
                <label className="text-sm font-medium text-gray-700">
                  קטגוריה:
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Options */}
              <div className="flex items-center space-x-2 space-x-reverse">
                <label className="text-sm font-medium text-gray-700">
                  מיון:
                </label>
                <div className="flex space-x-1 space-x-reverse">
                  {[
                    { key: "price", label: "מחיר" },
                    { key: "rating", label: "דירוג" },
                    { key: "createdAt", label: "תאריך" },
                  ].map((option) => (
                    <button
                      key={option.key}
                      onClick={() =>
                        handleSortChange(option.key as typeof sortBy)
                      }
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${
                        sortBy === option.key
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {option.label}
                      {sortBy === option.key && (
                        <span className="mr-1">
                          {sortOrder === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Offers List */}
      <div className="space-y-4">
        {filteredOffers.map((offer) => (
          <Card
            key={offer.id}
            className="hover:shadow-medium transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                {/* Offer Details */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 space-x-reverse mb-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                        offer.category
                      )}`}
                    >
                      {offer.category}
                    </span>
                    {offer.section && (
                      <span className="text-sm text-gray-600">
                        קטע {offer.section}
                      </span>
                    )}
                    {offer.row && (
                      <span className="text-sm text-gray-600">
                        שורה {offer.row}
                      </span>
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
                    <p className="text-sm text-gray-700 mb-3">
                      {offer.description}
                    </p>
                  )}

                  {offer.terms && (
                    <details className="mb-3">
                      <summary className="text-sm text-gray-600 cursor-pointer hover:text-gray-800">
                        תנאים והגבלות
                      </summary>
                      <p className="text-sm text-gray-700 mt-2 pr-4">
                        {offer.terms}
                      </p>
                    </details>
                  )}
                </div>

                {/* Agent Info */}
                <div className="text-left ml-6">
                  <div className="flex items-center space-x-2 space-x-reverse mb-2">
                    {offer.agent.logo && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <Users className="h-4 w-4 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {offer.agent.name}
                      </h4>
                      {offer.agent.rating && (
                        <div className="flex items-center space-x-1 space-x-reverse">
                          {renderStars(offer.agent.rating)}
                          <span className="text-sm text-gray-600">
                            ({offer.agent.rating})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 space-x-reverse mb-3">
                    {offer.agent.isVerified && (
                      <div className="flex items-center space-x-1 space-x-reverse text-green-600">
                        <Shield className="h-4 w-4" />
                        <span className="text-xs">מאומת</span>
                      </div>
                    )}
                    {offer.agent.totalSales && (
                      <span className="text-xs text-gray-600">
                        {offer.agent.totalSales} מכירות
                      </span>
                    )}
                  </div>

                  {/* Contact Actions */}
                  <div className="flex space-x-2 space-x-reverse">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onOfferSelect?.(offer)}
                      className="flex-1"
                    >
                      בחר הצעה
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onContactAgent?.(offer.agent)}
                      className="px-2"
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOffers.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">אין הצעות זמינות</h3>
              <p className="text-sm">לא נמצאו הצעות עבור הקטגוריה הנבחרת</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OfferList;
