"use client";

import React, { useState, useEffect } from "react";
import {
    Type,
    Contrast,
    Keyboard,
    X,
    Plus,
    Minus,
    RotateCcw,
    Accessibility,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FontSize = "normal" | "large" | "xlarge" | "xxlarge";

interface AccessibilitySettings {
    fontSize: FontSize;
    highContrast: boolean;
    keyboardNav: boolean;
}

const STORAGE_KEY = "ticketagent-accessibility-settings";

export default function AccessibilityToolbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState<AccessibilitySettings>({
        fontSize: "normal",
        highContrast: false,
        keyboardNav: false,
    });
    const [announcement, setAnnouncement] = useState("");

    // Load settings from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setSettings(parsed);
                applySettings(parsed);
            } catch (e) {
                console.error("Failed to parse accessibility settings:", e);
            }
        }
    }, []);

    // Save settings to localStorage and apply them
    const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
        const updated = { ...settings, ...newSettings };
        setSettings(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        applySettings(updated);
    };

    // Apply settings to document
    const applySettings = (settings: AccessibilitySettings) => {
        // Target html (documentElement) for rem scaling to work
        const root = document.documentElement;

        // Remove all font size classes
        root.classList.remove(
            "text-size-normal",
            "text-size-large",
            "text-size-xlarge",
            "text-size-xxlarge"
        );
        root.classList.add(`text-size-${settings.fontSize}`);

        // Toggle high contrast
        if (settings.highContrast) {
            root.classList.add("high-contrast");
        } else {
            root.classList.remove("high-contrast");
        }

        // Toggle keyboard navigation highlights
        if (settings.keyboardNav) {
            root.classList.add("keyboard-navigation");
        } else {
            root.classList.remove("keyboard-navigation");
        }
    };

    const increaseFontSize = () => {
        const sizes: FontSize[] = ["normal", "large", "xlarge", "xxlarge"];
        const currentIndex = sizes.indexOf(settings.fontSize);
        if (currentIndex < sizes.length - 1) {
            const newSize = sizes[currentIndex + 1];
            updateSettings({ fontSize: newSize });
            announce("גודל הגופן הוגדל");
        }
    };

    const decreaseFontSize = () => {
        const sizes: FontSize[] = ["normal", "large", "xlarge", "xxlarge"];
        const currentIndex = sizes.indexOf(settings.fontSize);
        if (currentIndex > 0) {
            const newSize = sizes[currentIndex - 1];
            updateSettings({ fontSize: newSize });
            announce("גודל הגופן הוקטן");
        }
    };

    const resetFontSize = () => {
        updateSettings({ fontSize: "normal" });
        announce("גודל הגופן אופס");
    };

    const toggleHighContrast = () => {
        const newValue = !settings.highContrast;
        updateSettings({ highContrast: newValue });
        announce(newValue ? "מצב ניגודיות גבוהה הופעל" : "מצב ניגודיות גבוהה כובה");
    };

    const toggleKeyboardNav = () => {
        const newValue = !settings.keyboardNav;
        updateSettings({ keyboardNav: newValue });
        announce(
            newValue ? "הדגשת ניווט מקלדת הופעלה" : "הדגשת ניווט מקלדת כובתה"
        );
    };

    const announce = (message: string) => {
        setAnnouncement(message);
        setTimeout(() => setAnnouncement(""), 3000);
    };

    const isDefaultSettings =
        settings.fontSize === "normal" &&
        !settings.highContrast &&
        !settings.keyboardNav;

    const resetAll = () => {
        const defaultSettings: AccessibilitySettings = {
            fontSize: "normal",
            highContrast: false,
            keyboardNav: false,
        };
        setSettings(defaultSettings);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));

        // Force direct DOM update to ensure immediate visual feedback
        // Target html (documentElement)
        const root = document.documentElement;
        root.classList.remove(
            "text-size-large",
            "text-size-xlarge",
            "text-size-xxlarge",
            "high-contrast",
            "keyboard-navigation"
        );
        root.classList.add("text-size-normal");

        announce("כל ההגדרות אופסו");
    };

    return (
        <>
            {/* Floating accessibility button - subtle and professional */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "fixed bottom-6 left-6 z-50",
                    "bg-primary-dark hover:bg-primary-medium text-white",
                    "w-12 h-12 rounded-full shadow-md hover:shadow-lg",
                    "flex items-center justify-center",
                    "transition-all duration-300 hover:scale-105",
                    "focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2",
                    "opacity-90 hover:opacity-100"
                )}
                aria-label={isOpen ? "סגור תפריט נגישות" : "פתח תפריט נגישות"}
                aria-expanded={isOpen}
                title="נגישות"
            >
                {isOpen ? (
                    <X className="w-5 h-5" aria-hidden="true" />
                ) : (
                    <Accessibility className="w-5 h-5" aria-hidden="true" />
                )}
            </button>

            {/* Accessibility toolbar panel */}
            {isOpen && (
                <div
                    className={cn(
                        "fixed bottom-24 left-6 z-50",
                        "bg-white border-2 border-gray-200 rounded-lg shadow-2xl",
                        "w-80 p-4",
                        "animate-slide-up"
                    )}
                    role="dialog"
                    aria-label="תפריט נגישות"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Accessibility className="w-5 h-5" aria-hidden="true" />
                            הגדרות נגישות
                        </h2>
                        <button
                            type="button"
                            onClick={resetAll}
                            disabled={isDefaultSettings}
                            className={cn(
                                "text-sm flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary-dark rounded px-2 py-1 transition-colors",
                                isDefaultSettings
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-primary-dark hover:text-primary-medium hover:bg-gray-50"
                            )}
                            aria-label="אפס את כל ההגדרות"
                        >
                            <RotateCcw className="w-4 h-4" aria-hidden="true" />
                            אפס הכל
                        </button>
                    </div>

                    {/* Font size controls */}
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Type className="w-5 h-5 text-gray-700" aria-hidden="true" />
                            <span className="font-semibold text-gray-900">גודל גופן</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={decreaseFontSize}
                                disabled={settings.fontSize === "normal"}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md",
                                    "border border-gray-300 hover:bg-gray-50",
                                    "disabled:opacity-50 disabled:cursor-not-allowed",
                                    "focus:outline-none focus:ring-2 focus:ring-primary-dark"
                                )}
                                aria-label="הקטן גופן"
                            >
                                <Minus className="w-4 h-4" aria-hidden="true" />
                                הקטן
                            </button>
                            <button
                                type="button"
                                onClick={resetFontSize}
                                disabled={settings.fontSize === "normal"}
                                className={cn(
                                    "flex-1 px-3 py-2 rounded-md",
                                    "border border-gray-300 hover:bg-gray-50",
                                    "disabled:opacity-50 disabled:cursor-not-allowed",
                                    "focus:outline-none focus:ring-2 focus:ring-primary-dark"
                                )}
                                aria-label="אפס גודל גופן"
                            >
                                רגיל
                            </button>
                            <button
                                type="button"
                                onClick={increaseFontSize}
                                disabled={settings.fontSize === "xxlarge"}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md",
                                    "border border-gray-300 hover:bg-gray-50",
                                    "disabled:opacity-50 disabled:cursor-not-allowed",
                                    "focus:outline-none focus:ring-2 focus:ring-primary-dark"
                                )}
                                aria-label="הגדל גופן"
                            >
                                <Plus className="w-4 h-4" aria-hidden="true" />
                                הגדל
                            </button>
                        </div>
                        <div className="text-xs text-gray-600 mt-1 text-center">
                            גודל נוכחי: {getFontSizeLabel(settings.fontSize)}
                        </div>
                    </div>

                    {/* High contrast toggle */}
                    <div className="mb-4">
                        <button
                            onClick={toggleHighContrast}
                            className={cn(
                                "w-full flex items-center justify-between px-4 py-3 rounded-md",
                                "border-2 transition-colors",
                                settings.highContrast
                                    ? "border-primary-dark bg-primary-dark text-white"
                                    : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50",
                                "focus:outline-none focus:ring-2 focus:ring-primary-dark"
                            )}
                            role="switch"
                            aria-checked={settings.highContrast}
                            aria-label="ניגודיות גבוהה"
                        >
                            <div className="flex items-center gap-2">
                                <Contrast className="w-5 h-5" aria-hidden="true" />
                                <span className="font-semibold">ניגודיות גבוהה</span>
                            </div>
                            <div
                                className={cn(
                                    "w-12 h-6 rounded-full transition-colors relative",
                                    settings.highContrast ? "bg-white" : "bg-gray-300"
                                )}
                            >
                                <div
                                    className={cn(
                                        "absolute top-1 w-4 h-4 rounded-full transition-all",
                                        settings.highContrast
                                            ? "right-1 bg-primary-dark"
                                            : "left-1 bg-white"
                                    )}
                                />
                            </div>
                        </button>
                    </div>

                    {/* Keyboard navigation toggle */}
                    <div className="mb-2">
                        <button
                            onClick={toggleKeyboardNav}
                            className={cn(
                                "w-full flex items-center justify-between px-4 py-3 rounded-md",
                                "border-2 transition-colors",
                                settings.keyboardNav
                                    ? "border-primary-dark bg-primary-dark text-white"
                                    : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50",
                                "focus:outline-none focus:ring-2 focus:ring-primary-dark"
                            )}
                            role="switch"
                            aria-checked={settings.keyboardNav}
                            aria-label="הדגשת ניווט מקלדת"
                        >
                            <div className="flex items-center gap-2">
                                <Keyboard className="w-5 h-5" aria-hidden="true" />
                                <span className="font-semibold">הדגשת ניווט מקלדת</span>
                            </div>
                            <div
                                className={cn(
                                    "w-12 h-6 rounded-full transition-colors relative",
                                    settings.keyboardNav ? "bg-white" : "bg-gray-300"
                                )}
                            >
                                <div
                                    className={cn(
                                        "absolute top-1 w-4 h-4 rounded-full transition-all",
                                        settings.keyboardNav
                                            ? "right-1 bg-primary-dark"
                                            : "left-1 bg-white"
                                    )}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            )}

            {/* Screen reader announcements */}
            <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
            >
                {announcement}
            </div>
        </>
    );
}

function getFontSizeLabel(size: FontSize): string {
    const labels: Record<FontSize, string> = {
        normal: "רגיל",
        large: "גדול",
        xlarge: "גדול מאוד",
        xxlarge: "ענק",
    };
    return labels[size];
}
