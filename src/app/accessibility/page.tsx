import React from "react";
import { Metadata } from "next";
import { Accessibility, Mail } from "lucide-react";

export const metadata: Metadata = {
    title: "הצהרת נגישות | TicketAgent",
    description: "הצהרת הנגישות של אתר TicketAgent בהתאם לתקן הישראלי 5568.",
};

export default function AccessibilityPage() {
    return (
        <div className="min-h-screen bg-white pb-12">
            {/* Hero Section */}
            <div className="bg-blue-600 text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
                <div className="flex justify-center mb-4">
                    <div className="bg-white/20 p-3 rounded-full">
                        <Accessibility className="w-10 h-10 text-white" />
                    </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 font-heebo">
                    הצהרת נגישות
                </h1>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                    אנו מחויבים לספק חווית גלישה שוויונית ונגישה לכלל המשתמשים.
                </p>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="prose prose-lg max-w-none text-gray-600">
                    <p className="lead">
                        אנו ב-TicketAgent רואים חשיבות רבה במתן שירות שוויוני לכלל הגולשים ובשיפור חווית הגלישה לאנשים עם מוגבלויות. אנו משקיעים משאבים רבים בהנגשת האתר והתאמתו לתקן הישראלי 5568 ולתקנות הנגישות הבינלאומיות WCAG 2.1 ברמה AA.
                    </p>

                    <h3>אמצעי הנגישות באתר</h3>
                    <p>
                        באתר הוטמעו רכיבי נגישות הכוללים, בין היתר:
                    </p>
                    <ul>
                        <li>תמיכה בכל הדפדפנים הנפוצים (Chrome, Firefox, Safari, Edge).</li>
                        <li>תכנים כתובים בשפה ברורה ופשוטה.</li>
                        <li>מבנה דפים סמנטי וברור (כותרות, פסקאות, רשימות).</li>
                        <li>אפשרות לניווט באמצעות המקלדת בלבד.</li>
                        <li>התאמה לקוראי מסך.</li>
                        <li>אפשרות להגדלת הטקסט ללא פגיעה בתצוגה.</li>
                        <li>ניגודיות צבעים מותאמת.</li>
                        <li>תיאור טקסטואלי לתמונות (Alt Text).</li>
                        <li>סרגל נגישות ייעודי המאפשר התאמה אישית של התצוגה.</li>
                    </ul>

                    <h3>סייגים לנגישות</h3>
                    <p>
                        למרות מאמצנו להנגיש את כלל דפי האתר, ייתכן ויתגלו חלקים שטרם הונגשו במלואם או שנמצאים בתהליך הנגשה. אנו ממשיכים במאמצים לשפר את נגישות האתר כחלק מחויבותנו לאפשר שימוש בו עבור כלל האוכלוסייה, כולל אנשים עם מוגבלויות.
                    </p>

                    <h3>יצירת קשר ודיווח על בעיות נגישות</h3>
                    <p>
                        אם נתקלתם בבעיה בנושא נגישות באתר או שיש לכם הערות ובקשות, נשמח אם תפנו אלינו כדי שנוכל לטפל בבעיה בהקדם.
                    </p>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-6 not-prose">
                        <h4 className="text-lg font-bold text-gray-900 mb-4">פרטי רכז הנגישות</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="font-semibold w-24">שם:</span>
                                <span>יגאל ליפסי</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gray-500" />
                                <span className="font-semibold w-24">אימייל:</span>
                                <a href="mailto:infotiketagent@gmail.com" className="text-blue-600 hover:underline">
                                    infotiketagent@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 mt-8">
                        הצהרת הנגישות עודכנה לאחרונה בתאריך: 30 בנובמבר 2025
                    </p>
                </div>
            </div>
        </div>
    );
}
