"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface HamburgerButtonProps {
  isOpen?: boolean;
  onClick?: () => void;
  className?: string;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
}

export default function HamburgerButton({
  isOpen = false,
  onClick,
  className,
  "aria-label": ariaLabel = "פתח תפריט",
  "aria-expanded": ariaExpanded,
}: HamburgerButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center justify-center p-2",
        "bg-[rgb(27,27,27)] rounded-xl",
        "transition-all duration-[0.4s]",
        "focus:outline-none active:outline-none",
        "touch-manipulation",
        className
      )}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded ?? isOpen}
    >
      <div className="relative flex flex-col items-center justify-center h-8">
        {/* Bar 1 - Top */}
        <div
          className={cn(
            "rounded-full bg-white w-8 mb-2.5",
            "transition-all duration-[0.4s] h-0.5",
            isOpen && "opacity-0 w-5"
          )}
        />

        {/* Bar 2 - Middle (absolute, rotates on open) */}
        <div
          className={cn(
            "rounded-full bg-white w-8 h-0.5",
            "absolute transition-all duration-[0.4s]",
            isOpen && "rotate-45"
          )}
        />

        {/* Bar 3 - Middle (absolute, rotates on open) */}
        <div
          className={cn(
            "rounded-full bg-white w-8 h-0.5",
            "absolute transition-all duration-[0.4s]",
            isOpen && "-rotate-45"
          )}
        />

        {/* Bar 4 - Bottom */}
        <div
          className={cn(
            "rounded-full bg-white w-8 mt-2.5",
            "transition-all duration-[0.4s] h-0.5",
            isOpen && "opacity-0 w-5"
          )}
        />
      </div>
    </button>
  );
}
