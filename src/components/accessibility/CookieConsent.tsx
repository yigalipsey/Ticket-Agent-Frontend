"use client";

import React, { useState, useEffect } from "react";
import { X, Cookie } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "ticketagent-cookie-consent";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem(STORAGE_KEY);
        if (!consent) {
            // Show banner after a short delay for better UX
            setTimeout(() => setIsVisible(true), 1000);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem(STORAGE_KEY, "accepted");
        setIsVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem(STORAGE_KEY, "rejected");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div
            className={cn(
                "fixed bottom-0 left-0 right-0 z-50",
                "bg-white border-t-2 border-gray-200 shadow-2xl",
                "animate-slide-up"
            )}
            role="dialog"
            aria-labelledby="cookie-consent-title"
            aria-describedby="cookie-consent-description"
        >
            <div className="container-responsive py-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    {/* Content */}
                    <div className="flex-1">
                        <div className="flex items-start gap-3">
                            <Cookie
                                className="w-6 h-6 text-primary-dark flex-shrink-0 mt-1"
                                aria-hidden="true"
                            />
                            <div>
                                <h2
                                    id="cookie-consent-title"
                                    className="text-lg font-bold text-gray-900 mb-2"
                                >
                                    שימוש בעוגיות (Cookies)
                                </h2>
                                <p
                                    id="cookie-consent-description"
                                    className="text-sm text-gray-700 leading-relaxed"
                                >
                                    אנחנו משתמשים בעוגיות כדי לשפר את חוויית הגלישה שלך, לנתח תנועה באתר
                                    ולהציג תוכן מותאם אישית. על ידי לחיצה על &quot;אני מסכים&quot;, אתה
                                    מאשר את השימוש שלנו בעוגיות.{" "}
                                    <a
                                        href="/privacy"
                                        className="text-primary-dark hover:text-primary-medium underline font-semibold focus:outline-none focus:ring-2 focus:ring-primary-dark rounded"
                                    >
                                        מדיניות פרטיות
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button
                            onClick={handleReject}
                            className={cn(
                                "flex-1 md:flex-none px-6 py-2.5 rounded-md",
                                "border-2 border-gray-300 text-gray-700 font-semibold",
                                "hover:bg-gray-50 transition-colors",
                                "focus:outline-none focus:ring-2 focus:ring-gray-400"
                            )}
                            aria-label="דחה שימוש בעוגיות"
                        >
                            לא מעוניין
                        </button>
                        <button
                            onClick={handleAccept}
                            className={cn(
                                "flex-1 md:flex-none px-6 py-2.5 rounded-md",
                                "bg-primary-dark text-white font-semibold",
                                "hover:bg-primary-medium transition-colors",
                                "focus:outline-none focus:ring-2 focus:ring-primary-light"
                            )}
                            aria-label="אשר שימוש בעוגיות"
                        >
                            אני מסכים
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
