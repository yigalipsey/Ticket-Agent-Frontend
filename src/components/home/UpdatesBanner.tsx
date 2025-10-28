"use client";

import React from "react";

export default function UpdatesBanner() {
  return (
    <section
      className="relative mb-16 w-full py-6 my-16 bg-black mx-auto max-w-[90%] sm:max-w-3xl md:max-w-4xl lg:max-w-5xl overflow-hidden rounded-2xl"
      aria-label="updates-banner"
      dir="rtl"
    >
      {/* רקע */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "#092274" }}
      />
      <div className="absolute inset-0 bg-[url('/images/spotlight.avif')] bg-cover bg-center opacity-40" />
      <div className="absolute inset-0 bg-[url('/images/small-pitch.avif')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />

      {/* תוכן מרכזי */}
      <div className="relative z-10 px-5 py-6 sm:py-8 md:py-10 flex flex-col items-center text-center">
        <div className="w-full max-w-3xl">
          <h2 className="text-white text-lg sm:text-2xl md:text-3xl font-bold leading-tight">
            קבל עדכונים בלעדיים
          </h2>

          <p className="mt-2 text-white/90 text-xs sm:text-sm md:text-base max-w-2xl mx-auto">
            קבל התראות על משחקים, הצעות כרטיסים וחדשות כדורגל ישירות לתיבת הדואר
            שלך
          </p>
        </div>

        {/* טופס בשורה אחת גם במובייל — מצטמצם במידות קטנות */}
        <div className="w-full mt-4 sm:mt-6 flex justify-center">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full max-w-2xl mx-auto flex items-center justify-center gap-0"
          >
            <label htmlFor="updates-email" className="sr-only">
              דואר אלקטרוני
            </label>

            {/* input: ממלא את המקום; במובייל קצר יותר כדי לא לשבור שורה */}
            <input
              id="updates-email"
              name="email"
              type="email"
              required
              placeholder="הזן דואר אלקטרוני"
              className="
                flex-1
                h-10 sm:h-12 md:h-14
                px-3 sm:px-4 md:px-6
                bg-white/12 placeholder-white/80 text-white
                text-right
                rounded-r-md rounded-l-none
                outline-none
                transition
              "
            />

            {/* כפתור: רוחב מותאם במובייל וגדול יותר במידות גדולות */}
            <button
              type="submit"
              className="
                h-10 sm:h-12 md:h-14
                w-24 sm:w-32 md:w-40
                bg-yellow-400 text-gray-900 font-semibold
                rounded-l-md rounded-r-none
                hover:bg-yellow-300
                transition
              "
            >
              הרשם עכשיו
            </button>
          </form>
        </div>

        {/* הערה קטנה מרכזית */}
        <div className="w-full mt-3 sm:mt-4 text-xs text-white/70 max-w-2xl mx-auto">
          בלחיצה על הרשמה אתה מאשר קבלת עדכונים. ניתן להסיר הרשמה בכל עת.
        </div>
      </div>
    </section>
  );
}
