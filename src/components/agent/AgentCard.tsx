import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Mail,
  MessageCircle,
  Building2,
  User,
  CheckCircle,
  PenLine,
  Eye,
  Globe,
  Instagram,
} from "lucide-react";
import { Agent } from "@/services/agentService";

interface AgentCardProps {
  agent: Agent;
  variant?: "default" | "minimal";
}

const AgentCard: React.FC<AgentCardProps> = ({
  agent,
  variant = "default",
}) => {
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
        className={`w-3.5 h-3.5 ${
          index < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-200"
        }`}
      />
    ));

  const isAgency = agent.agentType === "agency";

  if (variant === "minimal") {
    return (
      <div className="group bg-white rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300 p-4 h-full flex flex-col w-[320px] sm:w-full">
        {/* Top Section: Logo & Info side-by-side or stacked? User wants wide image. */}
        {/* Let's put the logo in a wide container at the top */}
        <div className="w-full h-32 bg-gray-50 rounded-lg mb-4 relative overflow-hidden border border-gray-100 flex items-center justify-center">
          {getAgentImageUrl(agent.imageUrl) ? (
            <Image
              src={getAgentImageUrl(agent.imageUrl)!}
              alt={agent.name}
              fill
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-300">
              <User className="w-10 h-10 mb-1" />
              <span className="text-xs">אין לוגו</span>
            </div>
          )}
          {agent.reviewStats.verifiedReviews > 0 && (
            <div
              className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-sm"
              title="מאומת"
            >
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="flex-grow flex flex-col gap-1 mb-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-primary transition-colors">
              {agent.name}
            </h3>
            <div className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-md">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-gray-900">
                {agent.reviewStats.averageRating.toFixed(1)}
              </span>
            </div>
          </div>
          {/* Company Name Removed as requested */}
        </div>

        {/* Actions */}
        <div className="mt-auto border-t border-gray-100 pt-4 space-y-3">
          {/* Contact Icons - Minimalist (Grayscale/Simple) */}
          <div className="flex items-center justify-center gap-4">
            {agent.whatsapp ? (
              <Link
                href={`https://wa.me/${agent.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#25D366] transition-colors"
                title="וואטסאפ"
              >
                <MessageCircle className="w-6 h-6" />
              </Link>
            ) : (
              <MessageCircle className="w-6 h-6 text-gray-200 cursor-not-allowed" />
            )}

            <div className="w-px h-4 bg-gray-200"></div>

            {agent.instagramUrl ? (
              <Link
                href={agent.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#E4405F] transition-colors"
                title="אינסטגרם"
              >
                <Instagram className="w-6 h-6" />
              </Link>
            ) : agent.websiteUrl ? (
              <Link
                href={agent.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors"
                title="אתר"
              >
                <Globe className="w-6 h-6" />
              </Link>
            ) : agent.email ? (
              <Link
                href={`mailto:${agent.email}`}
                className="text-gray-400 hover:text-blue-600 transition-colors"
                title="אימייל"
              >
                <Mail className="w-6 h-6" />
              </Link>
            ) : (
              <Globe className="w-6 h-6 text-gray-200 cursor-not-allowed" />
            )}
          </div>

          {/* Review Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/agents/${agent._id}/reviews`}
              className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg border border-gray-200 hover:border-primary hover:text-primary bg-white transition-all text-xs font-medium text-gray-600"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>ביקורות ({agent.reviewStats.totalReviews})</span>
            </Link>
            <Link
              href={`/agents/${agent._id}/review`}
              className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all text-xs font-medium shadow-sm"
            >
              <PenLine className="w-3.5 h-3.5" />
              <span>הוספת ביקורת</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Default "Full" Variant (for /agents page)
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Wide Image Area for Logos */}
      <div className="w-full h-40 bg-gray-50 relative overflow-hidden border-b border-gray-100 flex items-center justify-center p-6">
        {getAgentImageUrl(agent.imageUrl) ? (
          <Image
            src={getAgentImageUrl(agent.imageUrl)!}
            alt={agent.name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-300">
            <User className="w-12 h-12 mb-2" />
            <span className="text-sm">אין לוגו</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
              isAgency
                ? "bg-white border-gray-200 text-gray-600"
                : "bg-white border-gray-200 text-gray-600"
            }`}
          >
            {isAgency ? (
              <Building2 className="w-3 h-3" />
            ) : (
              <User className="w-3 h-3" />
            )}
            {isAgency ? "סוכנות" : "סוכן עצמאי"}
          </span>
        </div>
        {agent.reviewStats.verifiedReviews > 0 && (
          <div
            className="absolute top-3 left-3 bg-white rounded-full p-1 shadow-sm border border-gray-100"
            title="מאומת"
          >
            <CheckCircle className="w-4 h-4 text-green-500" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
            {agent.name}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-gray-900">
              {agent.reviewStats.averageRating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Company Name Removed as requested */}

        <div className="mt-auto pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
          {/* Contact Actions - Minimalist */}
          <div className="col-span-2 flex items-center justify-center gap-6 mb-2">
            {agent.whatsapp ? (
              <Link
                href={`https://wa.me/${agent.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-500 hover:text-[#25D366] transition-colors text-sm font-medium"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="hidden sm:inline">וואטסאפ</span>
              </Link>
            ) : (
              <span className="flex items-center gap-2 text-gray-300 text-sm font-medium cursor-not-allowed">
                <MessageCircle className="w-5 h-5" />
                <span className="hidden sm:inline">וואטסאפ</span>
              </span>
            )}

            <div className="w-px h-4 bg-gray-200"></div>

            {agent.instagramUrl ? (
              <Link
                href={agent.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-500 hover:text-[#E4405F] transition-colors text-sm font-medium"
              >
                <Instagram className="w-5 h-5" />
                <span className="hidden sm:inline">אינסטגרם</span>
              </Link>
            ) : agent.websiteUrl ? (
              <Link
                href={agent.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                <Globe className="w-5 h-5" />
                <span className="hidden sm:inline">אתר</span>
              </Link>
            ) : agent.email ? (
              <Link
                href={`mailto:${agent.email}`}
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                <Mail className="w-5 h-5" />
                <span className="hidden sm:inline">אימייל</span>
              </Link>
            ) : (
              <span className="flex items-center gap-2 text-gray-300 text-sm font-medium cursor-not-allowed">
                <Globe className="w-5 h-5" />
                <span className="hidden sm:inline">אתר</span>
              </span>
            )}
          </div>

          {/* Buttons */}
          <Link
            href={`/agents/${agent._id}/reviews`}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-gray-200 hover:border-primary hover:text-primary bg-white transition-all text-xs font-bold text-gray-700"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>ביקורות ({agent.reviewStats.totalReviews})</span>
          </Link>
          <Link
            href={`/agents/${agent._id}/review`}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all text-xs font-bold shadow-sm"
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>הוספת ביקורת</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
