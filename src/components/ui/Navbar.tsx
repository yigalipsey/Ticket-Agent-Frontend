"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAgentAuth } from "@/providers";
import HamburgerButton from "./HamburgerButton";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { agent, isAuthenticated, logout } = useAgentAuth();
  const pathname = usePathname();

  // דפים שבהם הלוגו לא יופיע במובייל
  const hideLogoOnMobile = ["/", "/leagues", "/teams"];
  const showMobileLogo = !hideLogoOnMobile.includes(pathname);

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
    <nav
      className={`absolute top-0 left-0 right-0 bg-transparent pointer-events-none ${
        isMobileMenuOpen ? "z-[10000000]" : "z-[99999]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo - תמיד מופיע במובייל ובדסקטופ */}
          <div
            className={`flex md:flex items-center order-2 md:order-1 pointer-events-auto ${
              isMobileMenuOpen ? "z-[10000000]" : ""
            }`}
          >
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity overflow-hidden rounded-lg shadow-lg"
              onClick={closeMobileMenu}
            >
              <div
                className={`h-10 w-auto md:h-14 ${
                  isMobileMenuOpen ? "drop-shadow-lg" : ""
                }`}
                style={{
                  filter: "brightness(0) invert(1)",
                }}
              >
                <Image
                  src="/logo.svg"
                  alt="TicketAgent"
                  width={300}
                  height={150}
                  className="h-full w-auto object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* User Menu - Desktop */}
          <div className="hidden md:flex items-center pointer-events-auto">
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
                  <span className="mr-2 text-white transition-colors">
                    {agent?.agentType === "agency" ? "סוכנות" : "סוכן עצמאי"}
                  </span>
                  <svg
                    className="h-4 w-4 text-white/70 transition-colors"
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
                className="px-4 py-2 rounded-md text-sm font-medium bg-transparent border border-white/30 hover:bg-white/10 text-white transition-colors"
              >
                כניסת סוכנים
              </Link>
            )}
          </div>

          {/* Desktop Navigation - ממורכז */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 pointer-events-auto">
            <div className="flex items-baseline space-x-4 space-x-reverse">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-white/80 hover:text-white hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button - מובייל: ימין, דסקטופ: נסתר */}
          {/* המבורגר נשאר באותו מקום גם כשהוא פתוח - עם z-index גבוה כדי שיהיה מעל התפריט */}
          <div
            className={`md:hidden order-1 md:order-2 pointer-events-auto ${
              isMobileMenuOpen ? "z-[10000000]" : ""
            }`}
          >
            <HamburgerButton
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "סגור תפריט" : "פתח תפריט"}
              aria-expanded={isMobileMenuOpen}
            />
          </div>
        </div>

        {/* Mobile Navigation Menu - Full Height Sidebar from Right */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 z-[999998] md:hidden"
              onClick={closeMobileMenu}
            />

            {/* Sidebar */}
            <div className="fixed top-0 right-0 h-screen w-full bg-primary text-white shadow-xl z-[999999] md:hidden pointer-events-auto overflow-y-auto">
              <div className="flex flex-col h-full">
                {/* Navigation Items */}
                <div className="flex-1 px-4 mt-12 py-4 space-y-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-3 rounded-lg text-base font-medium transition-colors text-white/90 hover:text-white hover:bg-white/10"
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* User Menu */}
                <div className="border-t border-white/20 px-4 py-4">
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <div className="px-4 py-2 text-sm text-white/80 border-b border-white/20 pb-3">
                        {agent?.email}
                        <br />
                        <span className="text-xs">
                          {agent?.agentType === "agency"
                            ? "סוכנות"
                            : "סוכן עצמאי"}
                        </span>
                      </div>
                      {agent && (
                        <Link
                          href="/agent/dashboard"
                          className="block px-4 py-3 rounded-lg text-base font-medium text-white/90 hover:text-white hover:bg-white/10"
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
                        className="block w-full text-right px-4 py-3 rounded-lg text-base font-medium text-white/90 hover:text-red-200 hover:bg-white/10"
                      >
                        התנתק
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/agent/login"
                      className="block px-4 py-3 rounded-lg text-base font-medium text-center bg-white text-primary hover:bg-white/90 transition-colors"
                      onClick={closeMobileMenu}
                    >
                      כניסת סוכנים
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
