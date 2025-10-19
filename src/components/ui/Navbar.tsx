"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAgentAuth } from "@/hooks";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { agent, isAuthenticated, logout } = useAgentAuth();

  // הסתר ניווט רגיל אם המשתמש הוא סוכן
  const navigationItems =
    isAuthenticated && agent
      ? [] // סוכן - אין ניווט רגיל
      : [
          { href: "/", label: "בית" },
          { href: "/leagues", label: "ליגות" },
          { href: "/teams", label: "קבוצות" },
          { href: "/fixtures", label: "משחקים" },
          { href: "/venues", label: "אצטדיונים" },
        ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const closeUserMenu = () => setIsUserMenuOpen(false);

  const handleLogout = async () => {
    try {
      await logout();
      closeUserMenu();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white shadow-soft border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
              onClick={closeMobileMenu}
            >
              TicketAgent
            </Link>
          </div>

          {/* User Menu - Desktop */}
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {agent?.email?.slice(-2) || "?"}
                    </span>
                  </div>
                  <span className="mr-2 text-gray-700">
                    {agent?.agentType === "agency" ? "סוכנות" : "סוכן עצמאי"}
                  </span>
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                      {agent?.email}
                    </div>
                    {agent && (
                      <Link
                        href="/agent/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeUserMenu}
                      >
                        דשבורד סוכן
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      התנתק
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/agent/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                כניסת סוכנים
              </Link>
            )}
          </div>

          {/* Desktop Navigation - ממורכז */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-baseline space-x-4 space-x-reverse">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
              aria-expanded="false"
              aria-label="פתח תפריט"
            >
              <span className="sr-only">פתח תפריט ראשי</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                }`}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile User Menu */}
            <div className="border-t border-gray-200 pt-2 mt-2">
              {isAuthenticated ? (
                <div className="space-y-1">
                  <div className="px-3 py-2 text-sm text-gray-500">
                    {agent?.email} -{" "}
                    {agent?.agentType === "agency" ? "סוכנות" : "סוכן עצמאי"}
                  </div>
                  {agent && (
                    <Link
                      href="/agent/dashboard"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                      onClick={closeMobileMenu}
                    >
                      דשבורד סוכן
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="block w-full text-right px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100"
                  >
                    התנתק
                  </button>
                </div>
              ) : (
                <Link
                  href="/agent/login"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                  onClick={closeMobileMenu}
                >
                  כניסת סוכנים
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
