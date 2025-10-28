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
  // Function to transform Cloudinary URL to include background removal
  const getAgentImageUrl = (imageUrl?: string): string | undefined => {
    if (!imageUrl) return undefined;

    // If it's a Cloudinary URL, add background removal transformation
    if (imageUrl.includes("res.cloudinary.com")) {
      // Extract the image path after /image/upload/
      const urlParts = imageUrl.split("/image/upload/");
      if (urlParts.length === 2) {
        // Insert the background removal transformation with PNG format for transparency
        // Format: /image/upload/e_background_removal/f_png/...original_path
        return `${urlParts[0]}/image/upload/e_background_removal/f_png/${urlParts[1]}`;
      }
    }

    // Return original URL if not Cloudinary
    return imageUrl;
  };

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
      <section className="py-16 bg-white">
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
    <section className="pb-4 md:pb-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={{
            mobile: "סוכנים מובילים",
            desktop: "הסוכנים המובילים שלנו",
          }}
          subtitle="סוכנים עם דירוג גבוה וביקורות אימות"
          buttonText="הכל"
          href="/#"
        />

        {/* Mobile: Horizontal scroll container */}
        <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-4" style={{ width: "max-content" }}>
            {topAgents.map((agent) => (
              <div
                key={agent._id}
                className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden text-center flex-shrink-0"
                style={{ width: "70vw", maxWidth: "70vw" }}
              >
                {/* Background Image with padding and agent image */}
                <div className="relative h-64 p-4">
                  <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <div className="absolute inset-0 opacity-90">
                      <Image
                        src="/images/bb1f606e2f19085148153c9f25e7746e659f0343 (1).avif"
                        alt="Background"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>

                  {/* Agent Image with background removal - bottom aligned */}
                  {getAgentImageUrl(agent.imageUrl) && (
                    <div className="absolute inset-0 flex items-end justify-center pb-2">
                      <div className="relative w-40 h-52">
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
                  {/* Agent Name */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {agent.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center justify-center space-x-1 mb-3">
                    {renderStars(agent.reviewStats.averageRating)}
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

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {topAgents.map((agent) => (
            <div
              key={agent._id}
              className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden text-center"
            >
              {/* Background Image with padding and agent image */}
              <div className="relative h-64 p-4">
                <div className="relative w-full h-full rounded-lg overflow-hidden opacity-50">
                  <Image
                    src="/images/bb1f606e2f19085148153c9f25e7746e659f0343 (1).avif"
                    alt="Background"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Agent Image with background removal */}
                {getAgentImageUrl(agent.imageUrl) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-40 h-52">
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
                {/* Agent Name */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {agent.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center justify-center space-x-1 mb-3">
                  {renderStars(agent.reviewStats.averageRating)}
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
    </section>
  );
};

export default TopAgentsSection;
