import React from "react";
import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  name: string;
  href: string;
  current?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  return (
    <nav
      className={cn("flex", className)}
      aria-label="Breadcrumb"
      role="navigation"
    >
      <ol className="flex items-center space-x-2 space-x-reverse">
        {/* Home link */}
        <li>
          <Link
            href="/"
            className="text-gray-400 hover:text-gray-500 transition-colors"
            aria-label="בית"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">בית</span>
          </Link>
        </li>

        {/* Breadcrumb items */}
        {items.map((item) => (
          <li key={item.href} className="flex items-center">
            <ChevronLeft className="h-4 w-4 text-gray-400 mx-2" />
            {item.current ? (
              <span className="text-gray-900 font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
