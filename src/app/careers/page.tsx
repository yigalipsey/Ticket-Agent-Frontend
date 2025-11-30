import React from "react";
import { Metadata } from "next";
import { Briefcase, Code, TrendingUp, Users, Heart, Coffee } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "קריירה | TicketAgent",
    description: "הצטרפו לנבחרת המנצחת של TicketAgent. דרושים אנשים מוכשרים שאוהבים כדורגל וטכנולוגיה.",
};

export default function CareersPage() {
    const benefits = [
        {
            icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
            title: "צמיחה והתפתחות",
            description: "אנחנו משקיעים בעובדים שלנו ומעודדים למידה והתפתחות מקצועית מתמדת.",
        },
        {
            icon: <Users className="w-6 h-6 text-blue-600" />,
            title: "צוות מנצח",
            description: "עבודה עם אנשים מוכשרים, יצירתיים ומלאי תשוקה למה שהם עושים.",
        },
        {
            icon: <Heart className="w-6 h-6 text-blue-600" />,
            title: "איזון בית-עבודה",
            description: "אנחנו מאמינים שחיים מאוזנים הם המפתח ליצירתיות ולשביעות רצון.",
        },
        {
            icon: <Coffee className="w-6 h-6 text-blue-600" />,
            title: "אווירה צעירה",
            description: "משרדים מפנקים, Happy Hour שבועי ואירועי חברה מפתיעים.",
        },
    ];

    const positions = [
        {
            title: "Full Stack Developer",
            department: "R&D",
            location: "תל אביב / היברידי",
            type: "משרה מלאה",
            icon: <Code className="w-5 h-5" />,
        },
        {
            title: "Product Manager",
            department: "Product",
            location: "תל אביב",
            type: "משרה מלאה",
            icon: <Briefcase className="w-5 h-5" />,
        },
        {
            title: "Customer Success Manager",
            department: "Support",
            location: "תל אביב",
            type: "משרה מלאה",
            icon: <Users className="w-5 h-5" />,
        },
    ];

    return (
        <div className="min-h-screen bg-white pb-12">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20 px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heebo">
                    בואו לעבוד איתנו
                </h1>
                <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100 font-light mb-8">
                    אנחנו מחפשים אנשים שחולמים בגדול, אוהבים אתגרים וחיים כדורגל.
                </p>
                <Button className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-8 py-3 rounded-full">
                    צפו במשרות הפתוחות
                </Button>
            </div>

            {/* Benefits Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 font-heebo">
                        למה כדאי להצטרף אלינו?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        ב-TicketAgent אנחנו לא רק בונים מוצר, אנחנו בונים תרבות. הנה כמה סיבות למה העובדים שלנו אוהבים להגיע בבוקר.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                            <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                {benefit.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                            <p className="text-sm text-gray-600">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Open Positions Section */}
            <div className="bg-white py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center font-heebo">
                        משרות פתוחות
                    </h2>

                    <div className="space-y-4">
                        {positions.map((position, index) => (
                            <div
                                key={index}
                                className="group border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-100 p-3 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        {position.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {position.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Briefcase className="w-3 h-3" /> {position.department}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Users className="w-3 h-3" /> {position.location}
                                            </span>
                                            <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium text-gray-600">
                                                {position.type}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Button variant="outline" className="w-full md:w-auto group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
                                        הגש מועמדות
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center bg-gray-50 p-8 rounded-xl border border-dashed border-gray-300">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">לא מצאתם את המשרה המתאימה?</h3>
                        <p className="text-gray-600 mb-4">
                            אנחנו תמיד שמחים להכיר אנשים מוכשרים. שלחו לנו קורות חיים ונשמור על קשר.
                        </p>
                        <Link href="/contact" className="text-blue-600 font-semibold hover:underline">
                            צרו קשר
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
