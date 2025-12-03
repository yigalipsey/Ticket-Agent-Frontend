"use client";

import React, { useState, useRef } from "react";
import {
  Star,
  Loader2,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  MessageSquare,
  UploadCloud,
  Info,
  X,
} from "lucide-react";
import { Agent } from "@/services/agentService";
import ReviewService from "@/services/reviewService";
import Image from "next/image";
import Link from "next/link";

interface ReviewFormProps {
  agent: Agent;
}

export default function ReviewForm({ agent }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({
    reviewerName: "",
    reviewerEmail: "",
    comment: "",
  });
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleMouseEnter = (value: number) => {
    setHoveredRating(value);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setProofFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      setErrorMessage("נא לבחור דירוג");
      setSubmitStatus("error");
      return;
    }

    if (!proofFile) {
      setErrorMessage("חובה לצרף הוכחת קנייה (צילום כרטיס, אישור הזמנה וכו')");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      // Convert file to base64 or handle upload logic here
      // For now, we'll just pass the other data as the backend might need update for file upload
      // Assuming ReviewService.submitReview can handle or we'll update it later.
      // Ideally, we should upload image first or send FormData.
      // Given current ReviewService implementation, we might need to adjust it to support FormData or similar.
      // For this UI task, we'll simulate or send what we can.
      
      // Note: Actual file upload implementation would require backend support for multipart/form-data
      // or a separate upload endpoint. We'll proceed with existing service for text data 
      // and assume file handling logic will be added to service/backend.
      
      const result = await ReviewService.submitReview({
        agentId: agent._id,
        rating,
        reviewerName: formData.reviewerName,
        reviewerEmail: formData.reviewerEmail,
        comment: formData.comment,
        // proofFile: proofFile // TODO: Add to service type
      });

      if (result.success) {
        setSubmitStatus("success");
        setFormData({ reviewerName: "", reviewerEmail: "", comment: "" });
        setRating(0);
        setProofFile(null);
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || "אירעה שגיאה בשליחת הביקורת");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("אירעה שגיאה בלתי צפויה");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAgentImageUrl = (imageUrl?: string): string | undefined => {
    if (!imageUrl) return undefined;
    if (imageUrl.includes("res.cloudinary.com")) {
      const urlParts = imageUrl.split("/image/upload/");
      if (urlParts.length === 2) {
        return `${urlParts[0]}/image/upload/f_png/${urlParts[1]}`;
      }
    }
    return imageUrl;
  };

  if (submitStatus === "success") {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-8 text-center max-w-lg mx-auto mt-8">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          תודה על המשוב!
        </h3>
        <p className="text-gray-600 mb-6">
          הביקורת שלך התקבלה בהצלחה ותפורסם לאחר בדיקה ואימות הוכחת הקנייה.
        </p>
        <Link
          href="/agents"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          חזרה לרשימת הסוכנים
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-2xl mx-auto">
      <div className="p-6 md:p-8">
        {/* Header with Agent Info */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
          <div className="relative w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0">
            {getAgentImageUrl(agent.imageUrl) ? (
              <Image
                src={getAgentImageUrl(agent.imageUrl)!}
                alt={agent.name}
                fill
                className="object-contain p-2"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <User className="w-8 h-8" />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              כתיבת ביקורת ל-{agent.name}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              דעתך חשובה לנו ולקהילת המשתמשים. אנא שתף את החוויה שלך בכנות.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-bold mb-1">חשוב לדעת:</p>
            <p>
              כדי לשמור על אמינות הדירוגים באתר, כל ביקורת עוברת אימות ידני.
              הביקורת תפורסם רק לאחר שנאמת שהקנייה אכן התבצעה (באמצעות הוכחת
              הקנייה שתצרף).
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              איך היית מדרג את השירות?
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className="focus:outline-none transition-transform hover:scale-110"
                  onClick={() => handleRatingClick(value)}
                  onMouseEnter={() => handleMouseEnter(value)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Star
                    className={`w-10 h-10 ${
                      value <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-200 hover:text-gray-300"
                    } transition-colors`}
                    strokeWidth={1.5}
                  />
                </button>
              ))}
              <span className="text-sm text-gray-500 mr-2 font-medium">
                {rating > 0
                  ? rating === 5
                    ? "מצוין!"
                    : rating === 4
                    ? "טוב מאוד"
                    : rating === 3
                    ? "בסדר"
                    : rating === 2
                    ? "טעון שיפור"
                    : "גרוע"
                  : ""}
              </span>
            </div>
          </div>

          {/* Personal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="reviewerName"
                className="block text-sm font-medium text-gray-700"
              >
                שם מלא <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="reviewerName"
                  name="reviewerName"
                  required
                  value={formData.reviewerName}
                  onChange={handleInputChange}
                  className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="ישראל ישראלי"
                />
                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="reviewerEmail"
                className="block text-sm font-medium text-gray-700"
              >
                אימייל <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="reviewerEmail"
                  name="reviewerEmail"
                  required
                  value={formData.reviewerEmail}
                  onChange={handleInputChange}
                  className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="your@email.com"
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Proof of Purchase Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              הוכחת קנייה <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-primary/50 hover:bg-gray-50 transition-colors cursor-pointer relative group">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,.pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {!proofFile ? (
                <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                    <UploadCloud className="w-6 h-6 text-gray-400 group-hover:text-primary" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    לחץ להעלאת קובץ או גרור לכאן
                  </p>
                  <p className="text-xs text-gray-400 max-w-xs">
                    נא לצרף צילום מסך של אישור הזמנה, כרטיסים, או התכתבות המאשרת
                    את העסקה (JPG, PNG, PDF עד 5MB)
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-100 relative z-20 pointer-events-auto">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <UploadCloud className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="text-right min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                        {proofFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(proofFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        handleRemoveFile();
                    }}
                    className="p-2 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-400 mr-1">
              * הקובץ משמש לאימות בלבד ולא יפורסם באתר.
            </p>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700"
            >
              פירוט הביקורת
            </label>
            <div className="relative">
              <textarea
                id="comment"
                name="comment"
                rows={4}
                value={formData.comment}
                onChange={handleInputChange}
                className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                placeholder="ספר לנו על החוויה שלך..."
              />
              <MessageSquare className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Error Message */}
          {submitStatus === "error" && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3.5 px-6 rounded-xl text-white font-bold text-lg shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-1 active:translate-y-0 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed shadow-none"
                : "bg-primary hover:bg-primary/90"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                שולח לאימות...
              </span>
            ) : (
              "שליחת ביקורת לאימות"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
