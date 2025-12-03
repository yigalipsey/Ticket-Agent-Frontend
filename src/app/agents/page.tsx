import React, { Suspense } from "react";
import HeroSection from "@/components/home/HeroSection";
import AgentService from "@/services/agentService";
import { Spinner } from "@/components/ui";
import AgentCard from "@/components/agent/AgentCard";
import { Search, Filter } from "lucide-react";

async function AgentsContent() {
  const agentsRes = await AgentService.getAllAgents();
  const agents = agentsRes.success ? agentsRes.data || [] : [];

  if (agents.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">לא נמצאו סוכנים</h3>
        <p className="text-gray-600">נסה לחזור מאוחר יותר או צור קשר עם התמיכה</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter Bar - Placeholder for future functionality */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
           <input 
             type="text" 
             placeholder="חיפוש סוכן לפי שם..." 
             className="w-full pr-10 pl-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-right"
           />
           <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
           <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium transition-colors w-full sm:w-auto">
             <Filter className="w-4 h-4" />
             <span>סינון</span>
           </button>
           <div className="text-sm text-gray-500 hidden sm:block whitespace-nowrap">
             נמצאו {agents.length} סוכנים
           </div>
        </div>
      </div>

      {/* All Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {agents.map((agent) => (
          <AgentCard key={agent._id} agent={agent} />
        ))}
      </div>
    </div>
  );
}

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center sm:text-right mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            הסוכנים שלנו
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mr-0">
            הכר את נבחרת הסוכנים המקצועית שלנו. כולם עברו בדיקה ואימות כדי להבטיח לך את השירות הטוב ביותר.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center py-20">
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
