import Image from "next/image";
import { Star } from "lucide-react";
import SectionHeader from "./SectionHeader";

interface Agent {
  _id: string;
  name: string;
  email: string;
  whatsapp: string;
  agentType: "individual" | "agency";
  companyName?: string;
  imageUrl?: string;
  isActive: boolean;
  reviewStats: {
    totalReviews: number;
    averageRating: number;
    verifiedReviews: number;
    recentReviews: Array<{
      rating: number;
      comment: string;
      reviewerName: string;
      createdAt: string;
      isVerified: boolean;
    }>;
  };
}

interface TopAgentsSectionProps {
  agents: Agent[];
}

const TopAgentsSection = ({ agents }: TopAgentsSectionProps) => {
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

  const topAgents = agents
    .filter((agent) => agent.reviewStats.totalReviews > 0)
    .sort((a, b) =>
      b.reviewStats.averageRating !== a.reviewStats.averageRating
        ? b.reviewStats.averageRating - a.reviewStats.averageRating
        : b.reviewStats.totalReviews - a.reviewStats.totalReviews
    )
    .slice(0, 3);

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

  if (topAgents.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            סוכנים מובילים
          </h2>
          <p className="text-gray-600">אין סוכנים זמינים כרגע</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-4 md:pb-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={{ mobile: "סוכנים מובילים", desktop: "הסוכנים המובילים שלנו" }}
          subtitle="סוכנים עם דירוג גבוה וביקורות אימות"
          buttonText="הכל"
          href="/#"
        />

        {/* Mobile - Horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 md:hidden snap-x snap-mandatory scrollbar-hide">
          {topAgents.map((agent) => (
            <div
              key={agent._id}
              className="relative flex-shrink-0 w-[280px] rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden text-center snap-start"
            >
              <div className="relative p-16">
                <div className="absolute inset-0 mt-2 w-[95%]  mx-auto bg-gray-200 rounded-lg" />

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

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {agent.name}
                </h3>
                <div className="flex items-center justify-center space-x-1 mb-3">
                  {renderStars(agent.reviewStats.averageRating)}
                </div>
                <button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors font-medium">
                  צור קשר עם הסוכן
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {topAgents.map((agent) => (
            <div
              key={agent._id}
              className="relative rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden text-center"
            >
              <div className="relative p-16">
                <div className="absolute inset-0 mt-2 w-[95%]  mx-auto bg-gray-200 rounded-lg" />

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

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {agent.name}
                </h3>
                <div className="flex items-center justify-center space-x-1 mb-3">
                  {renderStars(agent.reviewStats.averageRating)}
                </div>
                <button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors font-medium">
                  צור קשר עם הסוכן
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopAgentsSection;
