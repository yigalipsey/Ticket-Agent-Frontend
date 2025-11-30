import React from "react";
import { Metadata } from "next";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
    title: "שאלות נפוצות | TicketAgent",
    description: "תשובות לשאלות הנפוצות ביותר בנושא הזמנת כרטיסים, משלוח, תשלום ועוד.",
};

export default function FAQPage() {
    const faqs = [
        {
            category: "הזמנות וכרטיסים",
            items: [
                {
                    q: "מתי אקבל את הכרטיסים שלי?",
                    a: "ברוב המקרים, הכרטיסים נשלחים למייל שלך 24-48 שעות לפני המשחק. לעיתים, בהתאם למדיניות המועדון, הכרטיסים עשויים להישלח ביום המשחק עצמו. אנחנו מתחייבים שהכרטיסים יגיעו אליך בזמן למשחק.",
                },
                {
                    q: "האם הכרטיסים הם זוגיים?",
                    a: "כן, אנחנו מתחייבים שכל זוג כרטיסים שנרכש באותה הזמנה יהיה בישיבה צמודה (זה לצד זה). בהזמנות של מספר אי זוגי או קבוצות גדולות, אנחנו עושים את מירב המאמצים להושיב את כולם יחד או בזוגות/שלשות.",
                },
                {
                    q: "האם הכרטיסים הם אלקטרוניים?",
                    a: "רוב הכרטיסים כיום הם כרטיסים אלקטרוניים (E-Tickets) או כרטיסים לנייד (Mobile Tickets). תקבלו הנחיות מדויקות במייל אישור ההזמנה.",
                },
            ],
        },
        {
            category: "ביטולים ושינויים",
            items: [
                {
                    q: "האם אפשר לבטל הזמנה?",
                    a: "מכיוון שמדובר בכרטיסים לאירועי בידור וספורט, חוק הגנת הצרכן אינו מאפשר ביטול עסקה רגיל. עם זאת, במקרים מסוימים נוכל לנסות למכור את הכרטיסים עבורכם. מומלץ ליצור קשר עם שירות הלקוחות לבדיקת האפשרויות.",
                },
                {
                    q: "מה קורה אם המשחק נדחה?",
                    a: "אם המשחק נדחה לתאריך אחר, הכרטיסים שלכם יהיו תקפים לתאריך החדש באופן אוטומטי. אם אינכם יכולים להגיע בתאריך החדש, ננסה לסייע במכירת הכרטיסים, אך איננו יכולים להבטיח החזר כספי במקרה זה.",
                },
            ],
        },
        {
            category: "תשלום וביטחון",
            items: [
                {
                    q: "האם האתר מאובטח?",
                    a: "כן, האתר מאובטח בתקן PCI-DSS המחמיר ביותר. כל פרטי האשראי מוצפנים ואינם נשמרים בשרתים שלנו.",
                },
                {
                    q: "אילו אמצעי תשלום מתקבלים?",
                    a: "אנחנו מקבלים את כל כרטיסי האשראי הבינלאומיים (ויזה, מאסטרקארד, אמריקן אקספרס) וכן תשלום באמצעות PayPal.",
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-white pb-12">
            {/* Hero Section */}
            <div className="bg-blue-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 font-heebo">
                    שאלות נפוצות
                </h1>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                    ריכזנו עבורכם את התשובות לשאלות שאנחנו נשאלים הכי הרבה.
                </p>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="space-y-8">
                    {faqs.map((section, idx) => (
                        <div key={idx} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                            <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
                                <h2 className="text-xl font-bold text-blue-900">{section.category}</h2>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {section.items.map((item, itemIdx) => (
                                    <details key={itemIdx} className="group">
                                        <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-gray-900 hover:text-blue-600 transition-colors">
                                            <span className="text-lg">{item.q}</span>
                                            <span className="transition group-open:rotate-180">
                                                <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                                            </span>
                                        </summary>
                                        <div className="text-gray-600 px-6 pb-6 leading-relaxed animate-fadeIn">
                                            {item.a}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
