import React from "react";
import { Mail, Phone, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccessibilityStatementProps {
    className?: string;
}

const AccessibilityStatement: React.FC<AccessibilityStatementProps> = ({
    className,
}) => {
    const lastUpdated = "נובמבר 2025";
    const coordinatorName = "יגאל ליפסי";
    const coordinatorEmail = "infotiketagent@gmail.com";

    return (
        <div className={cn("bg-white", className)}>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        הצהרת נגישות
                    </h1>
                    <p className="text-gray-700 leading-relaxed">
                        TicketAgent מחויבת להנגיש את האתר שלה לכלל האוכלוסייה, לרבות אנשים עם
                        מוגבלויות. אנו פועלים ליישום תקן הנגישות הישראלי (ת&quot;י 5568) ולעמידה
                        בדרישות WCAG 2.1 ברמת AA.
                    </p>
                </div>

                {/* Compliance status */}
                <div className="bg-green-50 border-r-4 border-green-500 p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        מצב עמידה בתקן
                    </h2>
                    <p className="text-gray-700">
                        אתר זה עומד בדרישות{" "}
                        <strong>תקן ישראלי 5568 (ת&quot;י 5568)</strong> ו-
                        <strong>WCAG 2.1 ברמת AA</strong>.
                    </p>
                </div>

                {/* Accessibility features */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        תכונות נגישות באתר
                    </h2>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-primary-dark font-bold mt-1">•</span>
                            <span>
                                <strong>סרגל נגישות:</strong> כלי נגישות מתקדם המאפשר התאמה
                                אישית של גודל הגופן, ניגודיות גבוהה והדגשת ניווט מקלדת
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary-dark font-bold mt-1">•</span>
                            <span>
                                <strong>תמיכה בקוראי מסך:</strong> האתר תומך בטכנולוגיות עזר
                                כגון NVDA, JAWS ו-VoiceOver
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary-dark font-bold mt-1">•</span>
                            <span>
                                <strong>ניווט מקלדת:</strong> ניתן לנווט באתר באמצעות מקלדת
                                בלבד (Tab, Enter, חצים)
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary-dark font-bold mt-1">•</span>
                            <span>
                                <strong>ניגודיות צבעים:</strong> כל הטקסטים והאלמנטים עומדים
                                בדרישות ניגודיות מינימלית של 4.5:1
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary-dark font-bold mt-1">•</span>
                            <span>
                                <strong>תמיכה ב-RTL:</strong> האתר מותאם במלואו לשפה העברית
                                וכיוון כתיבה מימין לשמאל
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary-dark font-bold mt-1">•</span>
                            <span>
                                <strong>טקסטים חלופיים:</strong> כל התמונות והאייקונים כוללים
                                תיאורים טקסטואליים
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary-dark font-bold mt-1">•</span>
                            <span>
                                <strong>מבנה סמנטי:</strong> השימוש בתגיות HTML5 סמנטיות לניווט
                                קל ומובן
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Accessibility coordinator */}
                <div className="bg-blue-50 border-r-4 border-blue-500 p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        רכז נגישות
                    </h2>
                    <p className="text-gray-700 mb-4">
                        במידה ונתקלתם בבעיית נגישות באתר, או שיש לכם הצעות לשיפור, אנא צרו
                        קשר עם רכז הנגישות שלנו:
                    </p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-gray-900">
                            <div className="w-8 h-8 bg-primary-dark rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-sm">
                                    {coordinatorName.charAt(0)}
                                </span>
                            </div>
                            <div>
                                <div className="font-semibold">{coordinatorName}</div>
                                <div className="text-sm text-gray-600">רכז נגישות</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                            <Mail className="w-5 h-5 text-primary-dark" aria-hidden="true" />
                            <a
                                href={`mailto:${coordinatorEmail}`}
                                className="hover:text-primary-dark underline focus:outline-none focus:ring-2 focus:ring-primary-dark rounded"
                            >
                                {coordinatorEmail}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Feedback */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        דיווח על בעיות נגישות
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        אנו מחויבים לספק חוויית גלישה נגישה לכל המשתמשים. אם נתקלתם בבעיית
                        נגישות באתר, אנא דווחו לנו ואנו נפעל לתיקון בהקדם האפשרי.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        בדיווח, אנא ציינו את הדף בו נתקלתם בבעיה, תיאור הבעיה, ואת סוג
                        הטכנולוגיה המסייעת בה אתם משתמשים (אם רלוונטי).
                    </p>
                </div>

                {/* Continuous improvement */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        שיפור מתמיד
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        אנו ממשיכים לעבוד על שיפור נגישות האתר ומבצעים בדיקות נגישות באופן
                        קבוע. אנו מעדכנים את האתר בהתאם לסטנדרטים העדכניים ביותר ומקבלים
                        בברכה משוב מהמשתמשים שלנו.
                    </p>
                </div>

                {/* Last updated */}
                <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Calendar className="w-4 h-4" aria-hidden="true" />
                        <span>הצהרה זו עודכנה לאחרונה: {lastUpdated}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccessibilityStatement;
