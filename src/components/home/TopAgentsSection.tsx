import Image from "next/image";
import { Star } from "lucide-react";

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
  console.log("🎯 TopAgentsSection: Received agents:", agents);

  // Sort agents by average rating and get top 3
  const topAgents = agents
    .filter((agent: Agent) => agent.reviewStats.totalReviews > 0)
    .sort((a: Agent, b: Agent) => {
      // Primary sort: by average rating
      if (b.reviewStats.averageRating !== a.reviewStats.averageRating) {
        return b.reviewStats.averageRating - a.reviewStats.averageRating;
      }
      // Secondary sort: by total reviews
      return b.reviewStats.totalReviews - a.reviewStats.totalReviews;
    })
    .slice(0, 3);

  console.log(
    "🏆 TopAgentsSection: Top agents after filtering and sorting:",
    topAgents
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  if (topAgents.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              סוכנים מובילים
            </h2>
            <p className="text-gray-600">אין סוכנים זמינים כרגע</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-right mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            סוכנים מובילים
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topAgents.map((agent, index) => (
            <div
              key={agent._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 relative text-center"
            >
              {/* Agent Image */}
              {agent.imageUrl && (
                <div className="w-20 h-20 mx-auto mb-4">
                  <Image
                    src={agent.imageUrl}
                    alt={agent.name}
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                    sizes="80px"
                  />
                </div>
              )}

              {/* Agent Name */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {agent.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center justify-center space-x-1 mb-2">
                {renderStars(agent.reviewStats.averageRating)}
              </div>

              <p className="text-gray-600 text-sm">
                {agent.reviewStats.averageRating.toFixed(1)} ⭐ (
                {agent.reviewStats.totalReviews} ביקורות)
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopAgentsSection;
