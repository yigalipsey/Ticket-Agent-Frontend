import React from "react";
import { Metadata } from "next";
import { Handshake, BarChart, Globe, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "שותפויות | TicketAgent",
    description: "הצטרפו לתוכנית השותפים של TicketAgent והגדילו את ההכנסות שלכם.",
};

export default function PartnersPage() {
    return (
        <div className="min-h-screen bg-white pb-12">
            {/* Hero Section */}
            <div className="bg-[#092274] text-white py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50 z-0" />
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heebo">
                        בואו נגדל יחד
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-200 font-light mb-8">
                        תוכנית השותפים של TicketAgent מציעה הזדמנויות עסקיות ייחודיות לסוכני נסיעות,
                        בעלי אתרים ומשפיעני רשת.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                            הצטרפו כשותפים
                        </Button>
                        <Link href="/contact">
                            <Button variant="outline" className="text-white border-white hover:bg-white/10 px-8 py-3 text-lg w-full sm:w-auto">
                                צרו קשר לפרטים
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Why Partner With Us */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 font-heebo">
                        למה לעבוד איתנו?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        אנחנו מספקים את כל הכלים שאתם צריכים כדי להצליח, החל מטכנולוגיה מתקדמת ועד לתמיכה אישית.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            icon: <BarChart className="w-8 h-8 text-blue-600" />,
                            title: "עמלות אטרקטיביות",
                            description: "מודל תגמול גמיש ורווחי המותאם להיקף הפעילות שלכם.",
                        },
                        {
                            icon: <Globe className="w-8 h-8 text-blue-600" />,
                            title: "מלאי עולמי",
                            description: "גישה למאגר עצום של כרטיסים לאירועי ספורט בכל העולם.",
                        },
                        {
                            icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
                            title: "אמינות וביטחון",
                            description: "שקט נפשי לכם וללקוחות שלכם עם ספקים בדוקים ואחריות מלאה.",
                        },
                        {
                            icon: <Handshake className="w-8 h-8 text-blue-600" />,
                            title: "ליווי אישי",
                            description: "מנהל תיק אישי שילווה אתכם ויעזור לכם למקסם את התוצאות.",
                        },
                    ].map((item, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all border-t-4 border-blue-600">
                            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{item.title}</h3>
                            <p className="text-gray-600 text-center text-sm leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-50 py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 font-heebo">
                        מוכנים להתחיל?
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        הצטרפו למאות שותפים שכבר נהנים משיתוף פעולה פורה עם TicketAgent.
                        ההרשמה מהירה, פשוטה וללא עלות.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                        הירשמו עכשיו
                    </Button>
                </div>
            </div>
        </div>
    );
}
