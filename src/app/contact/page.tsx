"use client";

import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";

type ContactFormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

export default function ContactPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormData>();

    const onSubmit = async (data: ContactFormData) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Form submitted:", data);
        alert("ההודעה נשלחה בהצלחה! נחזור אליך בהקדם.");
        reset();
    };

    return (
        <div className="min-h-screen bg-white pb-12">
            {/* Hero Section */}
            <div className="bg-[#092274] text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-bold mb-4 font-heebo">צור קשר</h1>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                    יש לכם שאלה? צריכים עזרה? אנחנו כאן בשבילכם.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Contact Info */}
                        <div className="bg-blue-600 p-10 text-white flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl font-bold mb-6 font-heebo">פרטי התקשרות</h2>
                                <p className="text-blue-100 mb-8 leading-relaxed">
                                    צוות התמיכה שלנו זמין עבורכם לכל שאלה או בקשה.
                                    אנחנו משתדלים לענות לכל הפניות תוך 24 שעות עסקים.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4 space-x-reverse">
                                        <Mail className="w-6 h-6 mt-1 text-blue-200" />
                                        <div>
                                            <h3 className="font-semibold mb-1">אימייל</h3>
                                            <p className="text-blue-100">support@ticketagent.co.il</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4 space-x-reverse">
                                        <Phone className="w-6 h-6 mt-1 text-blue-200" />
                                        <div>
                                            <h3 className="font-semibold mb-1">טלפון</h3>
                                            <p className="text-blue-100">*5555 (שלוחה 2)</p>
                                            <p className="text-sm text-blue-200 mt-1">א'-ה' 09:00-18:00</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4 space-x-reverse">
                                        <MapPin className="w-6 h-6 mt-1 text-blue-200" />
                                        <div>
                                            <h3 className="font-semibold mb-1">כתובת</h3>
                                            <p className="text-blue-100">רחוב הברזל 1, תל אביב</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12">
                                <div className="w-full h-48 bg-blue-700 rounded-xl opacity-50 flex items-center justify-center">
                                    {/* Placeholder for Map */}
                                    <span className="text-blue-200">מפה</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="p-10 bg-white">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-heebo">
                                שלחו לנו הודעה
                            </h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            שם מלא
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            {...register("name", { required: "שדה חובה" })}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-300"
                                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                                            placeholder="ישראל ישראלי"
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            אימייל
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            {...register("email", {
                                                required: "שדה חובה",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "כתובת אימייל לא תקינה",
                                                },
                                            })}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"
                                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                                            placeholder="your@email.com"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        נושא הפנייה
                                    </label>
                                    <select
                                        id="subject"
                                        {...register("subject", { required: "אנא בחר נושא" })}
                                        className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? "border-red-500" : "border-gray-300"
                                            } focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white`}
                                    >
                                        <option value="">בחר נושא...</option>
                                        <option value="support">תמיכה טכנית</option>
                                        <option value="sales">שירות לקוחות / הזמנות</option>
                                        <option value="business">שיתופי פעולה</option>
                                        <option value="other">אחר</option>
                                    </select>
                                    {errors.subject && (
                                        <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        הודעה
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        {...register("message", { required: "שדה חובה" })}
                                        className={`w-full px-4 py-3 rounded-lg border ${errors.message ? "border-red-500" : "border-gray-300"
                                            } focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                                        placeholder="כתוב את הודעתך כאן..."
                                    />
                                    {errors.message && (
                                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        "שולח..."
                                    ) : (
                                        <>
                                            <span>שלח הודעה</span>
                                            <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
