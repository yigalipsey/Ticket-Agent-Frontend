"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  // Avoid rendering footer until we know which route we are on.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // Hide footer only for /agent routes (dashboard etc), but show for /agents (public list, reviews)
  // We check if it starts with "/agent/" or is exactly "/agent" to avoid matching "/agents"
  const shouldHideFooter =
    pathname === "/agent" || pathname?.startsWith("/agent/");

  if (shouldHideFooter) {
    return null;
  }

  return <Footer />;
}
