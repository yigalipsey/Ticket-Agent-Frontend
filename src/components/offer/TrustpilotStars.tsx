import React from "react";

const STAR_INDICES = [0, 1, 2, 3, 4] as const;

const StarIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const clampRating = (value: number) => Math.max(0, Math.min(5, value));

export const roundUpToNextHalf = (value: number | null) => {
  if (value === null || !Number.isFinite(value)) {
    return null;
  }

  return Math.ceil(clampRating(value) * 2) / 2;
};

const buildStarFillStates = (rating: number) =>
  STAR_INDICES.map((index) => {
    const remaining = rating - index;
    if (remaining >= 1) {
      return 1 as const;
    }
    if (remaining >= 0.5) {
      return 0.5 as const;
    }
    return 0 as const;
  });

export const renderStarRow = (rating: number, sizeClass = "w-4 h-4") => {
  const fills = buildStarFillStates(rating);
  return (
    <div className="flex items-center gap-1">
      {fills.map((fill, index) => (
        <div key={`star-${index}`} className="relative">
          <StarIcon className={`${sizeClass} text-gray-300`} />
          {fill > 0 && (
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <StarIcon className={`${sizeClass} text-yellow-400`} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};


