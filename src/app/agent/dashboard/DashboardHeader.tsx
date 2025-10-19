"use client";

import React from "react";
import { Agent } from "@/services/agentAuthService";

interface DashboardHeaderProps {
  agent: Agent | null;
  onLogout: () => void;
}

export default function DashboardHeader({
  agent,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">דשבורד סוכן</h1>
            <p className="text-gray-600">
              שלום {agent?.email} -{" "}
              {agent?.agentType === "agency" ? "סוכנות" : "סוכן עצמאי"}
              {agent?.companyName && ` (${agent.companyName})`}
            </p>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            התנתק
          </button>
        </div>
      </div>
    </div>
  );
}

