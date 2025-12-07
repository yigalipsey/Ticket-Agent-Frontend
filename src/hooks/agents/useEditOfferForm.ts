import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { OfferService } from "@/services";
import { OfferResponse } from "@/services/offerService";

export interface OfferFormData {
  price: number;
  currency: string;
  ticketType: string;
  url?: string;
}

export interface UseEditOfferFormProps {
  offerId: string;
  initialOfferData?: OfferResponse | null;
  onSuccess: () => void;
  onError?: (error: string) => void;
}

export interface UseEditOfferFormReturn {
  formData: OfferFormData;
  isSubmitting: boolean;
  isLoading: boolean;
  error: string | null;
  offer: OfferResponse | null;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  resetForm: () => void;
}

export const useEditOfferForm = ({
  offerId,
  initialOfferData,
  onSuccess,
  onError,
}: UseEditOfferFormProps): UseEditOfferFormReturn => {
  const queryClient = useQueryClient();

  // Try to get offer from TanStack Query cache first
  const getOfferFromCache = (): OfferResponse | null => {
    if (initialOfferData) {
      return initialOfferData;
    }

    // Get from TanStack Query cache
    const cachedOffers = queryClient.getQueryData<OfferResponse[]>([
      "agentOffers",
    ]);

    if (cachedOffers) {
      const offer = cachedOffers.find((o) => (o.id || o._id) === offerId);
      return offer || null;
    }

    return null;
  };

  const cachedOffer = getOfferFromCache();
  const [offer, setOffer] = useState<OfferResponse | null>(cachedOffer);
  const [isLoading, setIsLoading] = useState(!cachedOffer);

  const [formData, setFormData] = useState<OfferFormData>(() => {
    // Initialize form data from cached offer if available
    if (cachedOffer) {
      return {
        price: cachedOffer.price || 0,
        currency: cachedOffer.currency || "EUR",
        ticketType: cachedOffer.ticketType || "standard",
        url: cachedOffer.url || "",
      };
    }
    return {
      price: 0,
      currency: "EUR",
      ticketType: "standard",
      url: "",
    };
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load offer data from cache or API only if not in cache
  useEffect(() => {
    if (cachedOffer) {
      // Data already in cache, no need to load
      setIsLoading(false);
      return;
    }

    // If not in cache, try to fetch from API (fallback for direct URL access)
    const loadOffer = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await OfferService.getOfferById(offerId);

        if (result.success && result.data) {
          setOffer(result.data);
          setFormData({
            price: result.data.price || 0,
            currency: result.data.currency || "EUR",
            ticketType: result.data.ticketType || "standard",
            url: result.data.url || "",
          });
        } else {
          const errorMessage = result.error || "שגיאה בטעינת ההצעה";
          setError(errorMessage);
          if (onError) {
            onError(errorMessage);
          }
        }
      } catch {
        const errorMessage = "שגיאת רשת. בדוק את החיבור לאינטרנט.";
        setError(errorMessage);
        if (onError) {
          onError(errorMessage);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (offerId) {
      loadOffer();
    }
  }, [offerId, cachedOffer, onError, queryClient]);

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
    if (offer) {
      setFormData({
        price: offer.price || 0,
        currency: offer.currency || "EUR",
        ticketType: offer.ticketType || "standard",
        url: offer.url || "",
      });
    }
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
      "%c[EDIT OFFER FORM] 🔵 Starting form submission",
      "color: #3b82f6; font-weight: bold; font-size: 12px;",
      {
        offerId,
        formData,
      }
    );

    try {
      const updateData = {
        price: formData.price,
        currency: formData.currency,
        ticketType: formData.ticketType,
        url: formData.url?.trim() || undefined,
      };

      console.log(
        "%c[EDIT OFFER FORM] 📤 Sending update request",
        "color: #3b82f6; font-weight: bold; font-size: 12px;",
        {
          offerId,
          updateData,
        }
      );

      const result = await OfferService.updateOffer(offerId, updateData);

      if (result.success) {
        console.log(
          "%c[EDIT OFFER FORM] ✅ Update successful, updating cache",
          "color: #10b981; font-weight: bold; font-size: 12px;",
          {
            offerId,
            updateData,
          }
        );

        // Update the cache with the updated offer
        queryClient.setQueryData<OfferResponse[]>(["agentOffers"], (old) => {
          if (!old) return [];
          const updated = old.map((o) => {
            if ((o.id || o._id) === offerId) {
              return {
                ...o,
                price: updateData.price,
                currency: updateData.currency as "EUR" | "USD" | "ILS" | "GBP",
                ticketType: updateData.ticketType as "standard" | "vip",
                url: updateData.url || null,
              };
            }
            return o;
          });

          console.log(
            "%c[EDIT OFFER FORM] 📊 Cache updated",
            "color: #3b82f6; font-weight: bold; font-size: 12px;",
            {
              offerId,
              oldPrice: old.find((o) => (o.id || o._id) === offerId)?.price,
              newPrice: updateData.price,
            }
          );

          return updated;
        });

        onSuccess();
      } else {
        console.error(
          "%c[EDIT OFFER FORM] ❌ Update failed",
          "color: #ef4444; font-weight: bold; font-size: 12px;",
          {
            offerId,
            result,
          }
        );
        let errorMessage = "שגיאה בעדכון ההצעה. נסה שוב.";

        if (result.error) {
          if (result.error.message) {
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
        "%c[EDIT OFFER FORM] ❌ Network error",
        "color: #ef4444; font-weight: bold; font-size: 12px;",
        {
          offerId,
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
        "%c[EDIT OFFER FORM] 🏁 Form submission finished",
        "color: #6b7280; font-weight: bold; font-size: 12px;",
        { offerId }
      );
    }
  };

  return {
    formData,
    isSubmitting,
    isLoading,
    error,
    offer,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
