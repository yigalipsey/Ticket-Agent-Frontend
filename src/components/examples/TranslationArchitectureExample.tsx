"use client";

import { TeamName } from "@/components";
import { useUITranslation } from "@/lib/hooks/useUITranslation";
import { useTeamTranslation } from "@/lib/hooks/useDataTranslation";

/**
 * דוגמה לארכיטקטורת התרגומים החדשה
 * מפרידה בין UI strings ל-Data entities
 */
export default function TranslationArchitectureExample() {
  const { getCommonText, getLeaguesText } = useUITranslation();
  const { getTeamName, loading } = useTeamTranslation();

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">ארכיטקטורת התרגומים החדשה</h1>

      {/* UI Strings */}
      <section className="border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          UI Strings (מקבצי locale)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 rounded">
            <strong>כפתור שמירה:</strong> {getCommonText("save")}
          </div>
          <div className="p-3 bg-blue-50 rounded">
            <strong>טקסט חיפוש:</strong> {getCommonText("search")}
          </div>
          <div className="p-3 bg-blue-50 rounded">
            <strong>כותרת ליגות:</strong> {getLeaguesText("title")}
          </div>
          <div className="p-3 bg-blue-50 rounded">
            <strong>משחקים קרובים:</strong> {getLeaguesText("upcomingMatches")}
          </div>
        </div>
      </section>

      {/* Data Entities */}
      <section className="border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          Data Entities (מקבצי data נפרדים)
        </h2>
        {loading && (
          <div className="text-gray-500 mb-4">טוען תרגומי קבוצות...</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-green-50 rounded">
            <strong>ריאל מדריד:</strong>{" "}
            <TeamName slug="real-madrid" fallback="Real Madrid" />
          </div>
          <div className="p-3 bg-green-50 rounded">
            <strong>ברצלונה:</strong>{" "}
            <TeamName slug="barcelona" fallback="Barcelona" />
          </div>
          <div className="p-3 bg-green-50 rounded">
            <strong>מנצ'סטר סיטי:</strong>{" "}
            <TeamName slug="manchester-city" fallback="Manchester City" />
          </div>
          <div className="p-3 bg-green-50 rounded">
            <strong>באיירן מינכן:</strong>{" "}
            <TeamName slug="bayern-munich" fallback="Bayern Munich" />
          </div>
        </div>
      </section>

      {/* דוגמה במשחק */}
      <section className="border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">דוגמה במשחק</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <TeamName
                slug="real-madrid"
                fallback="Real Madrid"
                className="font-bold text-lg"
              />
              <div className="text-sm text-gray-600">בית</div>
            </div>
            <div className="text-2xl font-bold">VS</div>
            <div className="text-center">
              <TeamName
                slug="barcelona"
                fallback="Barcelona"
                className="font-bold text-lg"
              />
              <div className="text-sm text-gray-600">אורח</div>
            </div>
          </div>
          <div className="text-center mt-4 text-sm text-gray-600">
            {getLeaguesText("upcomingMatches")} • {getCommonText("date")}:
            18/01/2026
          </div>
        </div>
      </section>

      {/* יתרונות */}
      <section className="border p-4 rounded-lg bg-yellow-50">
        <h2 className="text-xl font-semibold mb-4">
          יתרונות הארכיטקטורה החדשה
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            ✅ <strong>הפרדת אחריות:</strong> UI strings נפרדים מ-Data entities
          </li>
          <li>
            ✅ <strong>טעינה דינמית:</strong> תרגומים נטענים לפי צורך
          </li>
          <li>
            ✅ <strong>Cache חכם:</strong> תרגומים נשמרים בזיכרון
          </li>
          <li>
            ✅ <strong>Fallback:</strong> תמיד fallback לאנגלית
          </li>
          <li>
            ✅ <strong>סקיילביליות:</strong> קל להוסיף קבוצות וליגות חדשות
          </li>
          <li>
            ✅ <strong>ביצועים:</strong> טעינה מהירה ואופטימיזציה
          </li>
        </ul>
      </section>
    </div>
  );
}
