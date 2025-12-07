"use client";

import React, { useState, useEffect } from "react";
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Navbar is always transparent and absolute (לא דוחף את ההירו למטה)
  const navbarClasses = "absolute top-0 left-0 right-0 bg-transparent";

  // Show logo logic: On home page, hide desktop logo (because of hero logo). Elsewhere, show it.
  const isHomePage = pathname === "/";
  const shouldShowLogo = !isHomePage || isMobileMenuOpen;

  // Hide regular nav if user is agent
  const navigationItems =
    isAuthenticated && agent
      ? [
          { href: "/agent/upload-offer", label: "העלאת הצעה" },
          { href: "/agent/my-offers", label: "ההצעות שלי" },
        ]
      : [
          { href: "/", label: "בית" },
          { href: "/leagues", label: "ליגות" },
          { href: "/teams", label: "קבוצות" },
          { href: "/fixtures", label: "משחקים" },
          { href: "/venues", label: "אצטדיונים" },
          { href: "/agents", label: "סוכנים" },
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
      className={`${navbarClasses} ${
        isMobileMenuOpen ? "z-[10000000]" : "z-[99999]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo */}
          <div
            className={`${
              shouldShowLogo ? "flex" : "hidden"
            } md:flex items-center order-2 md:order-1 ${
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

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
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

          {/* Mobile menu button */}
          <div
            className={`md:hidden order-1 md:order-2 ${
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

        {/* Mobile Navigation Menu - Full Screen Fixed Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 w-screen h-screen md:hidden flex flex-col overflow-hidden bg-primary z-[999999] pointer-events-auto"
            style={{ height: "100dvh" }}
          >
            {/* Soccer Net Background Pattern for Mobile Menu */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23ffffff' stroke-width='1' stroke-opacity='1' /%3E%3C/svg%3E")`,
                backgroundSize: "60px 60px",
                backgroundRepeat: "repeat",
                maskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 100%)",
              }}
            />

            {/* Menu Content */}
            <div className="flex flex-col h-full w-full relative z-10 pt-20 pb-8 px-6 overflow-y-auto">
              <div className="flex-1 flex flex-col justify-center space-y-6 text-center">
                {navigationItems.map((item, index) => (
                  <div
                    key={item.href}
                    className="transform transition-all duration-300 ease-out"
                    style={{
                      animation: `fadeInUp 0.3s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <Link
                      href={item.href}
                      className="inline-block text-3xl font-bold text-white/90 hover:text-white hover:scale-110 transition-all duration-300 py-2 relative group"
                      onClick={closeMobileMenu}
                    >
                      <span className="relative z-10">{item.label}</span>
                      <span className="absolute bottom-0 left-1/2 w-0 h-1 bg-blue-500 transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full opacity-0 group-hover:opacity-100" />
                    </Link>
                  </div>
                ))}
              </div>

              <style jsx>{`
                @keyframes fadeInUp {
                  from {
                    opacity: 0;
                    transform: translateY(20px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `}</style>

              {/* User Menu / Login */}
              <div className="mt-auto border-t border-white/10 pt-8">
                {isAuthenticated ? (
                  <div className="space-y-4 text-center">
                    <div className="text-white/90">
                      <p className="font-medium text-lg">{agent?.email}</p>
                      <p className="text-sm text-white/60 mt-1">
                        {agent?.agentType === "agency"
                          ? "סוכנות"
                          : "סוכן עצמאי"}
                      </p>
                    </div>
                    {agent && (
                      <Link
                        href="/agent/dashboard"
                        className="block w-full py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all"
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
                      className="block w-full py-3 rounded-xl text-red-300 hover:text-red-200 hover:bg-white/5 transition-all"
                    >
                      התנתק
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/agent/login"
                    className="block w-full py-4 rounded-xl bg-white text-primary text-xl font-bold text-center shadow-lg hover:bg-white/90 transition-transform active:scale-95"
                    onClick={closeMobileMenu}
                  >
                    כניסת סוכנים
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
