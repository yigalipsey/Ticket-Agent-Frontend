import React from "react";
import { notFound } from "next/navigation";
import AgentService from "@/services/agentService";
import { Star, User, CheckCircle, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function ReviewsList({ agentId }: { agentId: string }) {
  const agentRes = await AgentService.getAgentById(agentId);

  if (!agentRes.success || !agentRes.data) {
    notFound();
  }

  const agent = agentRes.data;
  const reviews = agent.reviewStats.recentReviews || [];

  // Get rating from externalRating if available, otherwise fallback to reviewStats
  const displayRating =
    agent.externalRating?.rating != null &&
    typeof agent.externalRating.rating === "number" &&
    agent.externalRating.rating > 0
      ? agent.externalRating.rating
      : agent.reviewStats.averageRating || 0;

  const hasExternalRating =
    agent.externalRating?.rating != null &&
    typeof agent.externalRating.rating === "number" &&
    agent.externalRating.rating > 0 &&
    agent.externalRating?.url;

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-200"
        }`}
      />
    ));

  const getAgentLogoUrl = (logoUrl?: string): string | undefined => {
    if (!logoUrl) return undefined;
    if (logoUrl.includes("res.cloudinary.com")) {
      const urlParts = logoUrl.split("/image/upload/");
      if (urlParts.length === 2) {
        return `${urlParts[0]}/image/upload/f_png/${urlParts[1]}`;
      }
    }
    return logoUrl;
  };

  // Use logoUrl if available, fallback to imageUrl for backward compatibility
  const displayLogoUrl = agent.logoUrl || agent.imageUrl;

  return (
    <>
      <div className="h-64 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              ביקורות וחוות דעת
            </h1>
            <p className="text-gray-300">מה לקוחות חושבים על {agent.name}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 -mt-20 relative z-30">
        {/* Agent Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-24 h-24 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0">
            {getAgentLogoUrl(displayLogoUrl) ? (
              <Image
                src={getAgentLogoUrl(displayLogoUrl)!}
                alt={agent.name}
                fill
                className="object-contain p-2"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <User className="w-10 h-10" />
              </div>
            )}
          </div>
          <div className="text-center md:text-right flex-grow">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {agent.name}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <span className="text-2xl font-bold text-gray-900">
                {displayRating.toFixed(1)}
              </span>
            </div>
            <Link
              href={`/agents/${agent._id}/review`}
              className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors"
            >
              הוסף ביקורת
            </Link>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            ביקורות אחרונות
          </h2>

          {reviews.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              {hasExternalRating ? (
                <>
                  <div className="mb-4">
                    <div className="text-center mb-4">
                      <span className="text-4xl font-bold text-gray-900">
                        {displayRating.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">
                      אין ביקורות עדיין מהאתר שלנו
                    </p>
                    <p className="text-gray-500 text-sm mb-4">
                      אבל הדירוג הוא מ-
                      {agent.externalRating?.provider === "google"
                        ? "Google"
                        : "Trustpilot"}
                    </p>
                    {agent.externalRating?.url && (
                      <a
                        href={agent.externalRating.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors"
                      >
                        צפה בביקורות ב-
                        {agent.externalRating?.provider === "google"
                          ? "Google"
                          : "Trustpilot"}
                      </a>
                    )}
                  </div>
                  <div className="pt-4 border-t border-gray-200 mt-4">
                    <Link
                      href={`/agents/${agent._id}/review`}
                      className="text-primary font-medium inline-block"
                    >
                      היה הראשון לדרג באתר שלנו!
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-500">
                    טרם התקבלו ביקורות עבור סוכן זה.
                  </p>
                  <Link
                    href={`/agents/${agent._id}/review`}
                    className="text-primary font-medium mt-2 inline-block"
                  >
                    היה הראשון לדרג!
                  </Link>
                </>
              )}
            </div>
          ) : (
            reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {review.reviewerName}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(review.createdAt).toLocaleDateString(
                            "he-IL"
                          )}
                        </span>
                        {review.isVerified && (
                          <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            <CheckCircle className="w-3 h-3" />
                            קנייה מאומתת
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex bg-gray-50 px-2 py-1 rounded-lg">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default async function AgentReviewsPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <ReviewsList agentId={id} />
    </div>
  );
}
