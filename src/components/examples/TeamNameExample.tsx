"use client";

import { TeamName } from "@/components";

/**
 * דוגמה לשימוש בקומפוננט TeamName
 */
export default function TeamNameExample() {
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold">דוגמאות לתרגום שמות קבוצות</h2>

      {/* דוגמאות בסיסיות */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">דוגמאות בסיסיות:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-3 rounded">
            <strong>ריאל מדריד:</strong> <TeamName slug="real-madrid" />
          </div>
          <div className="border p-3 rounded">
            <strong>ברצלונה:</strong> <TeamName slug="barcelona" />
          </div>
          <div className="border p-3 rounded">
            <strong>מנצ'סטר סיטי:</strong> <TeamName slug="manchester-city" />
          </div>
          <div className="border p-3 rounded">
            <strong>באיירן מינכן:</strong> <TeamName slug="bayern-munich" />
          </div>
        </div>
      </div>

      {/* דוגמאות עם fallback */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">דוגמאות עם fallback:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-3 rounded">
            <strong>קבוצה לא קיימת:</strong>{" "}
            <TeamName slug="non-existent-team" fallback="קבוצה לא ידועה" />
          </div>
          <div className="border p-3 rounded">
            <strong>עם fallback מותאם:</strong>{" "}
            <TeamName slug="barcelona" fallback="FC Barcelona" />
          </div>
        </div>
      </div>

      {/* דוגמה במשחק */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">דוגמה במשחק:</h3>
        <div className="border p-4 rounded bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <TeamName slug="real-madrid" className="font-bold text-lg" />
              <div className="text-sm text-gray-600">בית</div>
            </div>
            <div className="text-2xl font-bold">VS</div>
            <div className="text-center">
              <TeamName slug="barcelona" className="font-bold text-lg" />
              <div className="text-sm text-gray-600">אורח</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
