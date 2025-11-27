import React, { Suspense } from "react";
import HeroSection from "@/components/home/HeroSection";
import AgentService, { Agent } from "@/services/agentService";
import { Spinner } from "@/components/ui";
import Image from "next/image";
import { Star, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

async function AgentsContent() {
  const agentsRes = await AgentService.getAllAgents();
  const agents = agentsRes.success ? agentsRes.data || [] : [];

  const getAgentImageUrl = (imageUrl?: string): string | undefined => {
    if (!imageUrl) return undefined;
    if (imageUrl.includes("res.cloudinary.com")) {
      const urlParts = imageUrl.split("/image/upload/");
      if (urlParts.length === 2) {
        return `${urlParts[0]}/image/upload/f_png/${urlParts[1]}`;
      }
    }
    return imageUrl;
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));

  if (agents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">אין סוכנים זמינים כרגע</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* All Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {agents.map((agent: Agent) => (
          <div
            key={agent._id}
            className="relative rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden text-center"
          >
            {/* Image Container */}
            <div className="relative p-16 bg-gray-50">
              <div className="absolute inset-0 mt-2 w-[95%] mx-auto bg-gray-200 rounded-lg" />

              {getAgentImageUrl(agent.imageUrl) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-40 aspect-[4/3]">
                    <Image
                      src={getAgentImageUrl(agent.imageUrl)!}
                      alt={agent.name}
                      fill
                      className="object-contain"
                      sizes="128px"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Agent Type Badge */}
              <div className="flex justify-center mb-3">
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  {agent.agentType === "agency" ? "סוכנות" : "סוכן עצמאי"}
                </span>
              </div>

              {/* Company Name (for agencies) */}
              {agent.companyName && (
                <p className="text-sm text-gray-600 mb-2">{agent.companyName}</p>
              )}

              {/* Agent Name */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {agent.name}
              </h3>

              {/* Rating */}
              {agent.reviewStats.totalReviews > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    {renderStars(agent.reviewStats.averageRating)}
                  </div>
                  <p className="text-sm text-gray-600">
                    {agent.reviewStats.averageRating.toFixed(1)} ({agent.reviewStats.totalReviews}{" "}
                    ביקורות)
                  </p>
                </div>
              )}

              {/* Contact Info */}
              <div className="flex flex-col gap-2 mb-4">
                {agent.email && (
                  <Link
                    href={`mailto:${agent.email}`}
                    className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{agent.email}</span>
                  </Link>
                )}
                {agent.whatsapp && (
                  <Link
                    href={`https://wa.me/${agent.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </Link>
                )}
              </div>

              {/* Contact Button */}
              <button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors font-medium">
                צור קשר עם הסוכן
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AgentsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-right mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            כל הסוכנים
          </h1>
          <p className="text-gray-600">
            גלה את כל הסוכנים המקצועיים שלנו הזמינים לעזור לך
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          }
        >
          <AgentsContent />
        </Suspense>
      </main>
    </div>
  );
}






