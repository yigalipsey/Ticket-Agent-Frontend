import { useState } from "react";
import { OfferService } from "@/services";

export interface OfferFormData {
  price: number;
  currency: string;
  ticketType: string;
  url?: string;
}

export interface UseOfferFormProps {
  fixtureId: string;
  onSuccess: () => void;
  onError?: (error: string) => void;
}

export interface UseOfferFormReturn {
  formData: OfferFormData;
  isSubmitting: boolean;
  error: string | null;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  resetForm: () => void;
}

export const useOfferForm = ({
  fixtureId,
  onSuccess,
  onError,
}: UseOfferFormProps): UseOfferFormReturn => {
  const [formData, setFormData] = useState<OfferFormData>({
    price: 0,
    currency: "EUR",
    ticketType: "standard",
    url: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));

    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  const resetForm = () => {
    setFormData({
      price: 0,
      currency: "EUR",
      ticketType: "standard",
      url: "",
    });
    setError(null);
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Validate form data
    if (!formData.price || formData.price <= 0) {
      setError("המחיר חייב להיות גדול מ-0");
      return;
    }

    if (!formData.currency) {
      setError("יש לבחור מטבע");
      return;
    }

    if (!formData.ticketType) {
      setError("יש לבחור סוג כרטיס");
      return;
    }

    if (formData.url) {
      try {
        const parsedUrl = new URL(formData.url);
        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          setError("הקישור חייב להתחיל ב-http או https");
          return;
        }
      } catch {
        setError("אנא הזן קישור תקין לדף המכירה");
        return;
      }
    }

    setIsSubmitting(true);
    setError(null);

    console.log(
      "%c[OFFER FORM] 🟢 Starting form submission",
      "color: #10b981; font-weight: bold; font-size: 12px;",
      {
        fixtureId,
        formData,
      }
    );

    try {
      const offerData = {
        fixtureId,
        price: formData.price,
        currency: formData.currency,
        ticketType: formData.ticketType,
        url: formData.url?.trim() || undefined,
      };

      console.log(
        "%c[OFFER FORM] 📤 Sending create offer request",
        "color: #3b82f6; font-weight: bold; font-size: 12px;",
        {
          fixtureId,
          offerData,
        }
      );

      const result = await OfferService.createOffer(offerData);

      if (result.success) {
        console.log(
          "%c[OFFER FORM] ✅ Offer created successfully, calling onSuccess",
          "color: #10b981; font-weight: bold; font-size: 12px;",
          {
            fixtureId,
            offerData,
          }
        );
        onSuccess();
      } else {
        console.error(
          "%c[OFFER FORM] ❌ Offer creation failed",
          "color: #ef4444; font-weight: bold; font-size: 12px;",
          {
            fixtureId,
            result,
          }
        );
        let errorMessage = "שגיאה בהוספת ההצעה. נסה שוב.";

        if (result.error) {
          if (result.error.code === "OFFER_ALREADY_EXISTS") {
            errorMessage =
              "יש לך כבר הצעה עבור המשחק הזה. ניתן לעדכן את ההצעה הקיימת.";
          } else if (result.error.message) {
            errorMessage = `שגיאת שרת: ${result.error.message}`;
          }
        }

        setError(errorMessage);

        if (onError) {
          onError(errorMessage);
        }
      }
    } catch (error) {
      console.error(
        "%c[OFFER FORM] ❌ Network error",
        "color: #ef4444; font-weight: bold; font-size: 12px;",
        {
          fixtureId,
          error,
        }
      );

      const errorMessage = "שגיאת רשת. בדוק את החיבור לאינטרנט.";
      setError(errorMessage);

      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
      console.log(
        "%c[OFFER FORM] 🏁 Form submission finished",
        "color: #6b7280; font-weight: bold; font-size: 12px;",
        { fixtureId }
      );
    }
  };

  return {
    formData,
    isSubmitting,
    error,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
