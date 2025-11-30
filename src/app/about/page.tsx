import React from "react";
import { Metadata } from "next";
import { Users, Target, Shield, Globe } from "lucide-react";

export const metadata: Metadata = {
    title: "מי אנחנו | TicketAgent",
    description: "הכירו את TicketAgent - המנוע החכם להשוואת כרטיסים למשחקי כדורגל.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white pb-12">
            {/* Hero Section */}
            <div className="bg-blue-900 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/stadium-bg.jpg')] opacity-10 bg-cover bg-center" />
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heebo">
                        מי אנחנו
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100 font-light">
                        אנחנו משנים את הדרך שבה אוהדים רוכשים כרטיסים למשחקי כדורגל ברחבי העולם.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-heebo">
                                הסיפור שלנו
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                TicketAgent נולד מתוך תשוקה אמיתית לכדורגל וצורך בפתרון אמין ופשוט לרכישת כרטיסים.
                                זיהינו שהאוהד הישראלי נתקל לעיתים קרובות בחוסר ודאות, מחירים מופקעים וקושי בהשוואת אפשרויות.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                המטרה שלנו היא להנגיש את חווית הכדורגל העולמית לכל אוהד, עם טכנולוגיה מתקדמת שסורקת ומשווה
                                בין הספקים האמינים ביותר בשוק, כדי להבטיח לכם את הכרטיס הטוב ביותר במחיר המשתלם ביותר.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-blue-50 p-6 rounded-xl text-center hover:shadow-md transition-shadow">
                                <Shield className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                                <h3 className="font-bold text-gray-900 mb-2">ביטחון מלא</h3>
                                <p className="text-sm text-gray-600">רכישה בטוחה מספקים מאומתים בלבד</p>
                            </div>
                            <div className="bg-blue-50 p-6 rounded-xl text-center hover:shadow-md transition-shadow">
                                <Target className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                                <h3 className="font-bold text-gray-900 mb-2">דיוק ומחיר</h3>
                                <p className="text-sm text-gray-600">השוואת מחירים חכמה בזמן אמת</p>
                            </div>
                            <div className="bg-blue-50 p-6 rounded-xl text-center hover:shadow-md transition-shadow">
                                <Globe className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                                <h3 className="font-bold text-gray-900 mb-2">כיסוי עולמי</h3>
                                <p className="text-sm text-gray-600">גישה לליגות הגדולות בעולם</p>
                            </div>
                            <div className="bg-blue-50 p-6 rounded-xl text-center hover:shadow-md transition-shadow">
                                <Users className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                                <h3 className="font-bold text-gray-900 mb-2">שירות אישי</h3>
                                <p className="text-sm text-gray-600">תמיכה בעברית לכל אורך הדרך</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 font-heebo">
                    הערכים שלנו
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "שקיפות",
                            description: "אנחנו מאמינים במחיר סופי ידוע מראש, ללא עמלות נסתרות וללא הפתעות.",
                        },
                        {
                            title: "אמינות",
                            description: "אנחנו עובדים רק עם ספקים שעברו בדיקת איכות קפדנית כדי להבטיח שהכרטיס שלכם יחכה לכם.",
                        },
                        {
                            title: "חווית משתמש",
                            description: "אנחנו משקיעים בטכנולוגיה כדי להפוך את תהליך הרכישה לפשוט, מהיר ומהנה.",
                        },
                    ].map((value, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                            <h3 className="text-xl font-bold text-blue-900 mb-4">{value.title}</h3>
                            <p className="text-gray-600">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
