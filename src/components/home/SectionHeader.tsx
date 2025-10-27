import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui";

interface SectionHeaderProps {
  // Title for mobile and desktop
  title: {
    mobile: string;
    desktop: string;
  };
  // Subtitle
  subtitle: string;
  // Button text
  buttonText: string;
  // Link href
  href: string;
}

export default function SectionHeader({
  title,
  subtitle,
  buttonText,
  href,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 md:mb-8 py-4 md:py-8">
      <div className="text-right">
        <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
          <span className="md:hidden">{title.mobile}</span>
          <span className="hidden md:inline">{title.desktop}</span>
        </h2>
        <p className="text-gray-600 text-xs md:text-base">{subtitle}</p>
      </div>
      <Link href={href}>
        <Button
          variant="outline-primary"
          size="sm"
          className="text-right md:hidden"
        >
          {buttonText}
        </Button>
        <Button
          variant="outline-primary"
          size="design-spec"
          className="text-right hidden md:block"
        >
          {buttonText}
        </Button>
      </Link>
    </div>
  );
}
