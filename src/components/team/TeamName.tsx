"use client";

import { useTeamTranslation } from "@/lib/hooks/useDataTranslation";

interface TeamNameProps {
  slug: string;
  fallback?: string;
  className?: string;
}

/**
 * קומפוננט לתרגום שמות קבוצות
 * משתמש במערכת Data Translation החדשה
 */
export default function TeamName({ slug, fallback, className }: TeamNameProps) {
  const { getTeamName, loading } = useTeamTranslation();

  const displayName = getTeamName(slug, fallback);

  return (
    <span className={className}>
      {loading ? fallback || slug : displayName}
    </span>
  );
}
