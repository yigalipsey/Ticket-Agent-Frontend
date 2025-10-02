interface TeamNameProps {
  slug: string;
  fallback?: string;
  className?: string;
}

/**
 * קומפוננט פשוט להצגת שמות קבוצות
 */
export default function TeamName({ slug, fallback, className }: TeamNameProps) {
  const displayName = fallback || slug;

  return <span className={className}>{displayName}</span>;
}
