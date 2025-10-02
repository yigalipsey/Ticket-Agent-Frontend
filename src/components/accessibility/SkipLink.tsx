import React from "react";
import { cn } from "@/lib/utils";

export interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const SkipLink: React.FC<SkipLinkProps> = ({ href, children, className }) => {
  return (
    <a
      href={href}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4",
        "bg-primary-dark text-white px-4 py-2 rounded-md",
        "z-50 focus:outline-none focus:ring-2 focus:ring-white",
        "transition-all duration-200",
        className
      )}
    >
      {children}
    </a>
  );
};

export default SkipLink;
