"use client";

import React from "react";

export default function UpdatesBanner() {
  return (
    <section
      className="relative mb-10 w-full mx-auto max-w-[90%] sm:max-w-3xl md:max-w-4xl overflow-hidden rounded-2xl aspect-[2.9] sm:aspect-[3] md:aspect-[2.9]"
      aria-label="updates-banner"
    >
      {/* Base color layer */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "#092274" }}
      />

      {/* First image with 40% opacity */}
      <div className="absolute inset-0 bg-[url('/images/spotlight.avif')] bg-cover bg-center opacity-40" />

      {/* Second image with 20% opacity */}
      <div className="absolute inset-0 bg-[url('/images/small-pitch.avif')] bg-cover bg-center opacity-20" />

      {/* Content container */}
      <div className="relative z-10 h-full flex items-center justify-center px-6 sm:px-12">
        <form
          className="flex items-center gap-0"
          dir="rtl"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Input (width: 328, height: 59, gap: 8 handled on container) */}
          <input
            type="email"
            placeholder="הזן דואר אלקטרוני"
            className="w-[328px] h-[59px] opacity-100 px-[24px] py-[16px] rounded-tr-[8px] rounded-br-[8px] bg-[#FFFFFF1A] text-white placeholder:text-white/90 focus:outline-none"
          />

          {/* Button (width: 167, height: 59) */}
          <button
            type="submit"
            className="w-[167px] h-[59px] opacity-100 px-[24px] py-[16px] rounded-tl-[8px] rounded-bl-[8px] bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 transition-colors"
          >
            הרשם עכשיו
          </button>
        </form>
      </div>
    </section>
  );
}
