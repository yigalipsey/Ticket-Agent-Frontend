"use client";

import { useState, useEffect } from "react";
import { TeamName } from "@/components";
import { useUITranslation } from "@/lib/hooks/useUITranslation";
import { useTeamTranslation } from "@/lib/hooks/useDataTranslation";
import { 
  prefetchTranslations, 
  getTranslationMetrics,
  getMissingTranslations 
} from "@/lib/i18n/loaders";

/**
 * דוגמה למערכת התרגומים המתקדמת
 * כולל Type Safety, Monitoring, Prefetch
 */
export default function AdvancedTranslationExample() {
  const { getCommonText, getLeaguesText } = useUITranslation();
  const { getTeamName, loading } = useTeamTranslation();
  const [metrics, setMetrics] = useState<any>(null);
  const [missingTranslations, setMissingTranslations] = useState<string[]>([]);

  useEffect(() => {
    // טוען metrics
    setMetrics(getTranslationMetrics());
    
    // בודק תרגומים חסרים
    const missing = getMissingTranslations("teams", "he");
    setMissingTranslations(missing);
  }, []);

  const handlePrefetch = async () => {
    await prefetchTranslations("he", ["teams", "leagues"]);
    setMetrics(getTranslationMetrics());
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">מערכת תרגומים מתקדמת</h1>
      
      {/* Type Safety */}
      <section className="border p-4 rounded-lg bg-blue-50">
        <h2 className="text-xl font-semibold mb-4">Type Safety</h2>
        <div className="text-sm space-y-2">
          <p>✅ <strong>טיפוסים חזקים:</strong> EntityType, Locale, DataTranslations</p>
          <p>✅ <strong>Type Guards:</strong> בדיקת קיום תרגומים</p>
          <p>✅ <strong>Error Handling:</strong> טיפול בשגיאות עם טיפוסים</p>
        </div>
      </section>

      {/* Monitoring */}
      <section className="border p-4 rounded-lg bg-green-50">
        <h2 className="text-xl font-semibold mb-4">Monitoring</h2>
        {metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="p-2 bg-white rounded">
              <strong>Cache Hits:</strong> {metrics.cacheHits}
            </div>
            <div className="p-2 bg-white rounded">
              <strong>Cache Misses:</strong> {metrics.cacheMisses}
            </div>
            <div className="p-2 bg-white rounded">
              <strong>Fallbacks:</strong> {metrics.fallbacksUsed}
            </div>
            <div className="p-2 bg-white rounded">
              <strong>Errors:</strong> {metrics.errors.length}
            </div>
          </div>
        )}
        
        {missingTranslations.length > 0 && (
          <div className="mt-4 p-3 bg-yellow-100 rounded">
            <strong>תרגומים חסרים:</strong>
            <ul className="list-disc list-inside mt-2">
              {missingTranslations.map((key) => (
                <li key={key} className="text-sm">{key}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Prefetch */}
      <section className="border p-4 rounded-lg bg-purple-50">
        <h2 className="text-xl font-semibold mb-4">Prefetch חכם</h2>
        <button
          onClick={handlePrefetch}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          טען תרגומים מראש
        </button>
        <p className="text-sm mt-2 text-gray-600">
          טוען את כל התרגומים הנדרשים ב-Promise.all לביצועים מהירים
        </p>
      </section>

      {/* דוגמה בפועל */}
      <section className="border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">דוגמה בפועל</h2>
        {loading && <div className="text-gray-500">טוען תרגומי קבוצות...</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded">
            <strong>UI Text:</strong> {getCommonText("save")}
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <strong>League Text:</strong> {getLeaguesText("title")}
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <strong>Team:</strong> <TeamName slug="real-madrid" fallback="Real Madrid" />
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <strong>Team:</strong> <TeamName slug="barcelona" fallback="Barcelona" />
          </div>
        </div>
      </section>

      {/* SSR Integration */}
      <section className="border p-4 rounded-lg bg-orange-50">
        <h2 className="text-xl font-semibold mb-4">SSR Integration</h2>
        <div className="text-sm space-y-2">
          <p>✅ <strong>getMessages():</strong> משולב עם next-intl</p>
          <p>✅ <strong>Server Context:</strong> תרגומים זמינים ב-SSR</p>
          <p>✅ <strong>Hydration Safe:</strong> אין mismatches</p>
        </div>
      </section>

      {/* יתרונות */}
      <section className="border p-4 rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">יתרונות המערכת החדשה</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">ביצועים</h3>
            <ul className="space-y-1">
              <li>• Cache חכם עם Type Safety</li>
              <li>• Prefetch עם Promise.all</li>
              <li>• טעינה דינמית לפי צורך</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">פיתוח</h3>
            <ul className="space-y-1">
              <li>• Type Safety מלא</li>
              <li>• Monitoring ו-debugging</li>
              <li>• Error handling מתקדם</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

