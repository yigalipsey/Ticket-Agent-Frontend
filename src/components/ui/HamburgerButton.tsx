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
        "relative w-8 h-6 bg-transparent cursor-pointer block border-0 p-0",
        "focus:outline-none",
        className
      )}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded ?? isOpen}
      type="button"
    >
      <span
        className={cn(
          "block absolute w-full rounded-[9px] opacity-100 right-0",
          "transition-all duration-[0.25s] ease-in-out",
          "origin-right center",
          isOpen
            ? "bg-white rotate-45 top-0 right-[4px]"
            : "bg-white top-0 rotate-0"
        )}
        style={{ height: "3px" }}
      />
      <span
        className={cn(
          "block absolute w-full rounded-[9px] right-0",
          "transition-all duration-[0.25s] ease-in-out",
          "origin-right center",
          isOpen
            ? "bg-white w-0 opacity-0 top-1/2 -translate-y-1/2"
            : "bg-white opacity-100 top-1/2 -translate-y-1/2"
        )}
        style={{ height: "3px" }}
      />
      <span
        className={cn(
          "block absolute w-full rounded-[9px] opacity-100 right-0",
          "transition-all duration-[0.25s] ease-in-out",
          "origin-right center",
          isOpen
            ? "bg-white rotate-[-45deg] top-[21px] right-[4px]"
            : "bg-white bottom-0 translate-y-full"
        )}
        style={{ height: "3px" }}
      />
    </button>
  );
}
