import React from "react";

/**
 * Team Pattern Background - רקע דפוס עם 10% שקיפות לקרוסלת קבוצות
 */
const TeamPatternBackground = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "repeating-radial-gradient(circle at 50%, rgb(26, 133, 233), rgb(104, 183, 230) 1em, white 1em, white 2em)",
        opacity: 0.1,
      }}
    />
  );
};

export default TeamPatternBackground;
