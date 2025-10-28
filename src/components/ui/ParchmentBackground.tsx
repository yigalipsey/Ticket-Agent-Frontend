import React from "react";

interface ParchmentBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * ParchmentBackground - רכיב רקע שמדמה נייר עתיק
 * מאפשר שילוב אפקטים נוספים דרך children
 */
export function ParchmentBackground({
  children,
  className = "",
}: ParchmentBackgroundProps) {
  return (
    <div
      className={`parchment-container relative ${className}`}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#000000",
        borderRadius: "0.5em",
        overflow: "hidden",
        boxShadow: "0 0.3em 0.6em rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* ::before layer - animated pattern */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              135deg,
              transparent 0%,
              transparent 47%,
              #161616 47%,
              #2c2c2c 53%,
              transparent 53%,
              transparent 100%
            ) 0 0/2em 2em,
            linear-gradient(
              45deg,
              #434343 0%,
              #0a0a0a 47%,
              transparent 47%,
              transparent 53%,
              #434343 53%,
              #0a0a0a 100%
            ) 0 0/2em 2em,
            linear-gradient(
              -45deg,
              #434343 0%,
              #434343 47%,
              transparent 47%,
              transparent 53%,
              #434343 53%,
              #434343 100%
            ) 0 0/2em 2em,
            linear-gradient(
              45deg,
              transparent 0%,
              transparent 47%,
              #000000 47%,
              #434343 53%,
              transparent 53%,
              transparent 100%
            ) 1em 1em/2em 2em
          `,
          opacity: 0.1,
          animation: "patternFloat 20s linear infinite",
          pointerEvents: "none",
        }}
      />

      {/* ::after layer - radial dots */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              circle at 25% 25%,
              rgba(255, 255, 255, 0.11) 0.5em,
              transparent 0.5em
            ) 0 0/4em 4em,
            radial-gradient(
              circle at 75% 75%,
              rgba(255, 255, 255, 0.1) 0.3em,
              transparent 0.3em
            ) 0 0/4em 4em,
            radial-gradient(
              circle at 75% 25%,
              rgba(13, 35, 69, 0.1) 0.4em,
              transparent 0.4em
            ) 2em 0/4em 4em,
            radial-gradient(
              circle at 25% 75%,
              rgba(0, 0, 0, 0.15) 0.2em,
              transparent 0.2em
            ) 2em 2em/4em 4em
          `,
          pointerEvents: "none",
        }}
      />

      {/* Children content */}
      {children && (
        <div className="relative z-10 h-full w-full flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}

export default ParchmentBackground;
