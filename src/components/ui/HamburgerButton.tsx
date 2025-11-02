"use client";

import React, { useId } from "react";
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
  const checkboxId = useId();

  return (
    <div className={className}>
      <input
        type="checkbox"
        id={checkboxId}
        checked={isOpen}
        onChange={onClick}
        className="hidden"
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded ?? isOpen}
      />
      <label
        htmlFor={checkboxId}
        className={cn(
          "relative w-10 h-10 cursor-pointer flex flex-col items-center justify-center gap-2.5 transition-all duration-500",
          isOpen && "rotate-180"
        )}
        onClick={(e) => {
          e.preventDefault();
          onClick?.();
        }}
      >
        <div
          className={cn(
            "h-1 bg-white rounded transition-all duration-500",
            isOpen
              ? "absolute rotate-45 w-full"
              : "w-[70%]"
          )}
        />
        <div
          className={cn(
            "w-full h-1 bg-white rounded transition-all duration-[800ms]",
            isOpen && "scale-x-0 opacity-0"
          )}
        />
        <div
          className={cn(
            "h-1 bg-white rounded transition-all duration-500",
            isOpen
              ? "absolute rotate-[-45deg] w-full"
              : "w-[70%]"
          )}
        />
      </label>
    </div>
  );
}
