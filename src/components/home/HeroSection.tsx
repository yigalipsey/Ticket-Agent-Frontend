import React from "react";
import SearchSection from "@/components/home/SearchSection";

export default function HeroSection() {
  return (
    <section className="relative h-[300px] md:h-[450px] w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/people-soccer-stadium.avif"
      >
        <source
          src="/videos/0_Soccer_Football_3840x2160.mp4"
          type="video/mp4"
        />
        {/* Fallback for browsers that don't support video */}
        <div className="absolute inset-0 bg-[url('/images/people-soccer-stadium.avif')] bg-cover bg-center bg-no-repeat" />
      </video>
      <div className="absolute inset-0 bg-[#0A297E60]" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center  text-bold text-white px-4 max-w-4xl mx-auto">
          <p className="text-2xl md:text-[56px] mb-6 md:mb-8 text-gray-200 animate-slide-up leading-none font-extrabold text-center">
            השוואת מחירי כרטיסים
            <br />
            למשחקי כדורגל
          </p>

          {/* Search Bar */}
          <SearchSection />
        </div>
      </div>
    </section>
  );
}
