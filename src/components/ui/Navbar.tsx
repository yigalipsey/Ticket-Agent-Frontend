"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAgentAuth } from "@/providers";
import HamburgerButton from "./HamburgerButton";
import {
  Home,
  Trophy,
  Users,
  Calendar,
  MapPin,
  UserCheck,
  PlusCircle,
  LayoutDashboard,
  ChevronLeft,
  User
} from "lucide-react";

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
        { href: "/agent/upload-offer", label: "העלאת הצעה", icon: PlusCircle },
        { href: "/agent/my-offers", label: "ההצעות שלי", icon: LayoutDashboard },
      ]
      : [
        { href: "/", label: "בית", icon: Home },
        { href: "/leagues", label: "ליגות", icon: Trophy },
        { href: "/teams", label: "קבוצות", icon: Users },
        { href: "/fixtures", label: "משחקים", icon: Calendar },
        { href: "/venues", label: "אצטדיונים", icon: MapPin },
        { href: "/agents", label: "סוכנים", icon: UserCheck },
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
      className={`${navbarClasses} ${isMobileMenuOpen ? "z-[10000000]" : "z-[99999]"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Right Side Items: User Menu (Desktop) + Hamburger (Mobile) - Appears on the RIGHT in RTL */}
          <div className={`flex items-center gap-4 flex-row-reverse md:flex-row ${isMobileMenuOpen ? 'relative z-[10000000]' : ''}`}>
            {/* User Menu Area */}
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

            {/* Hamburger Button (Mobile) */}
            <div className="md:hidden">
              <HamburgerButton
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "סגור תפריט" : "פתח תפריט"}
              />
            </div>
          </div>

          {/* Brand Logo - Appears on the LEFT in RTL */}
          <div
            className={`${shouldShowLogo ? "flex" : "hidden"} md:flex items-center ${isMobileMenuOpen ? "relative z-[10000000]" : ""}`}
          >
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity overflow-hidden rounded-lg shadow-lg"
              onClick={closeMobileMenu}
            >
              <div
                className="h-10 w-auto md:h-14"
                style={{ filter: "brightness(0) invert(1)" }}
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
            <div className="flex flex-col h-full w-full relative z-10 pt-24 pb-8 px-4 overflow-y-auto">
              <div className="flex-1 flex flex-col space-y-2">
                {navigationItems.map((item, index) => (
                  <div
                    key={item.href}
                    className="transform transition-all duration-300 ease-out"
                    style={{
                      animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both`,
                    }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-200 group active:scale-[0.98]"
                      onClick={closeMobileMenu}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <span className="text-lg font-medium text-white/90 group-hover:text-white">
                          {item.label}
                        </span>
                      </div>

                      <ChevronLeft className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
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
              <div className="mt-8 border-t border-white/10 pt-6">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-end gap-4 p-4 mb-2">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">{agent?.email}</p>
                        <p className="text-xs text-white/50">
                          {agent?.agentType === "agency"
                            ? "סוכנות מורשית"
                            : "סוכן עצמאי"}
                        </p>
                      </div>
                    </div>

                    {agent && (
                      <Link
                        href="/agent/dashboard"
                        className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
                        onClick={closeMobileMenu}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                            <LayoutDashboard className="w-5 h-5" />
                          </div>
                          <span className="font-medium text-white/90">דשבורד ניהול</span>
                        </div>
                        <ChevronLeft className="w-5 h-5 text-white/20" />
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        handleLogout();
                        closeMobileMenu();
                      }}
                      className="flex items-center justify-end w-full p-4 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <span className="font-medium mr-4">התנתק מהמערכת</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/agent/login"
                    className="group relative flex items-center justify-center w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-lg shadow-xl shadow-blue-500/25 overflow-hidden transition-all hover:scale-[1.02] active:scale-95"
                    onClick={closeMobileMenu}
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center gap-2">
                      כניסת סוכנים
                      <User className="w-5 h-5" />
                    </span>
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
