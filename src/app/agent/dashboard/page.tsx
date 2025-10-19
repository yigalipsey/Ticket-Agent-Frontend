"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAgentAuth } from "@/hooks";
import { LeagueService } from "@/services";
import { League } from "@/types/league";
import DashboardHeader from "./DashboardHeader";
import LeaguesList from "./LeaguesList";

export default function AgentDashboardPage() {
  const {
    agent,
    isAuthenticated,
    isLoading: authLoading,
    logout,
  } = useAgentAuth();
  const [leagues, setLeagues] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  // Redirect if not authenticated or not an agent
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push("/agent/login");
        return;
      }

      // Agent auth is handled by useAgentAuth hook
    }
  }, [isAuthenticated, authLoading, router]);

  // Fetch leagues
  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        setIsLoading(true);
        setError("");

        // Fetch all leagues with teams count
        const response = await LeagueService.getAllLeagues(true);

        if (response.success && response.data) {
          setLeagues(response.data);
        } else {
          setError(response.error || "שגיאה בטעינת הליגות");
        }
      } catch (err: unknown) {
        setError("שגיאה בטעינת הליגות. נסה שוב מאוחר יותר.");
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchLeagues();
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">טוען...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader agent={agent} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            בחר ליגה להעלאת הצעות
          </h2>

          <LeaguesList leagues={leagues} isLoading={isLoading} error={error} />
        </div>
      </div>
    </div>
  );
}
