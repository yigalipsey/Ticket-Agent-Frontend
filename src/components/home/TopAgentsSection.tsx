import React from "react";
import SectionHeader from "./SectionHeader";
import AgentCard from "@/components/agent/AgentCard";
import { Agent } from "@/services/agentService";

interface TopAgentsSectionProps {
  agents: Agent[];
}

const TopAgentsSection = ({ agents }: TopAgentsSectionProps) => {
  const topAgents = agents
    .filter((agent) => {
      // Filter agents that have externalRating with a valid rating
      return (
        agent.externalRating?.rating != null &&
        typeof agent.externalRating.rating === "number" &&
        agent.externalRating.rating > 0
      );
    })
    .sort((a, b) => {
      // Sort by externalRating rating (highest first)
      const ratingA = a.externalRating?.rating || 0;
      const ratingB = b.externalRating?.rating || 0;
      return ratingB - ratingA;
    })
    .slice(0, 3); // Top 3 agents

  if (topAgents.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            סוכנים מובילים
          </h2>
          <p className="text-gray-500 text-sm">אין סוכנים זמינים כרגע</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-gray-50 w-full relative overflow-hidden">
      {/* Decorative background elements - Subtle */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          title={{ mobile: "סוכנים מובילים", desktop: "הסוכנים המובילים שלנו" }}
          subtitle="הצוות המובחר שלנו לשירותך"
          buttonText="לכל הסוכנים"
          href="/agents"
        />

        {/* Mobile - Horizontal scroll */}
        {/* Increased spacing (space-x-4 rtl / gap-4) and padding to fix overlap */}
        <div className="flex gap-6 overflow-x-auto pb-8 md:hidden snap-x snap-mandatory scrollbar-hide -mx-4 px-6">
          {topAgents.map((agent) => (
            <div
              key={agent._id}
              // Reduced width slightly to 80vw and ensured max-width is managed
              // Added 'snap-center' and flex-shrink-0
              className="flex-shrink-0 w-[80vw] max-w-[300px] snap-center"
            >
              <div className="h-full px-1">
                {" "}
                {/* Extra horizontal padding inside container */}
                <AgentCard agent={agent} variant="minimal" />
              </div>
            </div>
          ))}
          {/* Spacer for last item so it's not cut off */}
          <div className="w-2 flex-shrink-0" />
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {topAgents.map((agent) => (
            <div key={agent._id} className="h-full">
              <AgentCard agent={agent} variant="minimal" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopAgentsSection;
