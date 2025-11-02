import React from "react";
import Image from "next/image";
import SearchSection from "@/components/home/SearchSection";

export default function HeroSection() {
  return (
    <section className="relative h-[55vh]  md:h-[450px] w-full">
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
      <div className="relative z-[99998] flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-4 md:gap-8 px-4 w-full md:max-w-4xl mx-auto">
          {/* Logo - רק במובייל */}
          <div className="flex items-center justify-center -mb-1 md:hidden">
            <div
              className="h-20 w-auto"
              style={{
                filter: "brightness(0) invert(1)",
              }}
            >
              <Image
                src="/logo.svg"
                alt="TicketAgent"
                width={400}
                height={200}
                className="h-full w-auto object-contain"
                priority
              />
            </div>
          </div>

          <p className="text-3xl md:text-[56px] text-gray-200 animate-slide-up leading-tight font-extrabold text-center">
            השוואת מחירי כרטיסים
            <br />
            למשחקי כדורגל
          </p>

          <SearchSection />
        </div>
      </div>
    </section>
  );
}
