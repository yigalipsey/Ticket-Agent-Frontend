import React from "react";
import { notFound } from "next/navigation";
import AgentService from "@/services/agentService";
import ReviewForm from "./ReviewForm";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AgentReviewPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch agent details
  const agentRes = await AgentService.getAgentById(id);

  if (!agentRes.success || !agentRes.data) {
    notFound();
  }

  const agent = agentRes.data;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="h-64 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10" />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              הוספת ביקורת
            </h1>
            <p className="text-gray-300">שתף את החוויה שלך ועזור לאחרים</p>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-30 pb-12">
        <ReviewForm agent={agent} />
      </main>
    </div>
  );
}
