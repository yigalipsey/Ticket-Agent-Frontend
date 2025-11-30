import React from "react";
import { Metadata } from "next";
import { Search, Ticket, CreditCard, User, ShieldQuestion, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "מרכז עזרה | TicketAgent",
    description: "מרכז העזרה של TicketAgent. תשובות לשאלות נפוצות, מדריכים ומידע שימושי.",
};

export default function SupportPage() {
    const categories = [
        {
            icon: <Ticket className="w-8 h-8 text-blue-600" />,
            title: "הזמנות וכרטיסים",
            description: "איך מזמינים, קבלת הכרטיסים, שינויים וביטולים",
            link: "/faq#orders",
        },
        {
            icon: <CreditCard className="w-8 h-8 text-blue-600" />,
            title: "תשלומים וחיובים",
            description: "אמצעי תשלום, חשבוניות, זיכויים",
            link: "/faq#payments",
        },
        {
            icon: <User className="w-8 h-8 text-blue-600" />,
            title: "החשבון שלי",
            description: "הרשמה, שיחזור סיסמה, עדכון פרטים",
            link: "/faq#account",
        },
        {
            icon: <ShieldQuestion className="w-8 h-8 text-blue-600" />,
            title: "מידע כללי",
            description: "אודות האתר, יצירת קשר, מדיניות פרטיות",
            link: "/faq#general",
        },
    ];

    return (
        <div className="min-h-screen bg-white pb-12">
            {/* Hero Search Section */}
            <div className="bg-blue-600 py-20 px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 font-heebo">
                    איך אפשר לעזור לך היום?
                </h1>
                <div className="max-w-2xl mx-auto relative">
                    <input
                        type="text"
                        placeholder="חפש תשובה לשאלה שלך..."
                        className="w-full py-4 pr-12 pl-4 rounded-full shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                </div>
            </div>

            {/* Categories Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <Link href={category.link} key={index} className="block group">
                            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all h-full border border-transparent hover:border-blue-100">
                                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                                    {category.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                    {category.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {category.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Quick Links */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 font-heebo">שאלות פופולריות</h2>
                <div className="space-y-4">
                    {[
                        "מתי אקבל את הכרטיסים שלי?",
                        "האם אפשר לבטל הזמנה?",
                        "האם הכרטיסים הם זוגיים?",
                        "איך אני יודע שהכרטיסים מקוריים?",
                    ].map((question, index) => (
                        <Link href="/faq" key={index} className="block bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all flex justify-between items-center group">
                            <span className="text-gray-700 font-medium group-hover:text-blue-700">{question}</span>
                            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Contact CTA */}
            <div className="text-center py-8">
                <p className="text-gray-600 mb-4">לא מצאתם את מה שחיפשתם?</p>
                <Link href="/contact" className="text-blue-600 font-bold hover:underline">
                    צרו קשר עם התמיכה
                </Link>
            </div>
        </div>
    );
}
