// Accessibility utilities and helpers

export const ARIA_LABELS = {
  // Common actions
  CLOSE: "סגור",
  OPEN: "פתח",
  SEARCH: "חיפוש",
  FILTER: "סנן",
  SORT: "מיון",
  LOADING: "טוען...",
  ERROR: "שגיאה",
  SUCCESS: "הצלחה",

  // Navigation
  MAIN_NAV: "ניווט ראשי",
  BREADCRUMB: "ניווט בדפים",
  PAGINATION: "ניווט בין עמודים",

  // Content
  CARD: "כרטיס",
  BUTTON: "כפתור",
  LINK: "קישור",
  IMAGE: "תמונה",
  VIDEO: "וידאו",

  // Forms
  FORM: "טופס",
  INPUT: "שדה קלט",
  SELECT: "רשימה נפתחת",
  CHECKBOX: "תיבת סימון",
  RADIO: "כפתור בחירה",

  // Status
  UPCOMING: "משחק קרוב",
  FINISHED: "משחק הסתיים",
  POSTPONED: "משחק נדחה",
} as const;

export const ROLES = {
  BUTTON: "button",
  LINK: "link",
  NAVIGATION: "navigation",
  MAIN: "main",
  BANNER: "banner",
  CONTENTINFO: "contentinfo",
  COMPLEMENTARY: "complementary",
  SEARCH: "search",
  FORM: "form",
  LIST: "list",
  LISTITEM: "listitem",
  GRID: "grid",
  GRIDCELL: "gridcell",
  TAB: "tab",
  TABLIST: "tablist",
  TABPANEL: "tabpanel",
  DIALOG: "dialog",
  ALERT: "alert",
  STATUS: "status",
  PROGRESSBAR: "progressbar",
  TOOLTIP: "tooltip",
} as const;

export const KEYBOARD_KEYS = {
  ENTER: "Enter",
  SPACE: " ",
  ESCAPE: "Escape",
  TAB: "Tab",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  HOME: "Home",
  END: "End",
  PAGE_UP: "PageUp",
  PAGE_DOWN: "PageDown",
} as const;

// Focus management utilities
export const focusManagement = {
  // Trap focus within an element
  trapFocus: (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === KEYBOARD_KEYS.TAB) {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    element.addEventListener("keydown", handleTabKey);
    firstElement?.focus();

    return () => {
      element.removeEventListener("keydown", handleTabKey);
    };
  },

  // Restore focus to previous element
  restoreFocus: (previousElement: HTMLElement | null) => {
    if (previousElement) {
      previousElement.focus();
    }
  },

  // Get the currently focused element
  getCurrentFocus: () => document.activeElement as HTMLElement,
};

// Screen reader utilities
export const screenReader = {
  // Announce text to screen readers
  announce: (text: string, priority: "polite" | "assertive" = "polite") => {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", priority);
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = text;

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  // Hide element from screen readers
  hideFromScreenReader: (element: HTMLElement) => {
    element.setAttribute("aria-hidden", "true");
  },

  // Show element to screen readers
  showToScreenReader: (element: HTMLElement) => {
    element.removeAttribute("aria-hidden");
  },
};

// Color contrast utilities
export const colorContrast = {
  // Calculate relative luminance
  getLuminance: (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },

  // Calculate contrast ratio
  getContrastRatio: (
    color1: [number, number, number],
    color2: [number, number, number]
  ) => {
    const lum1 = colorContrast.getLuminance(...color1);
    const lum2 = colorContrast.getLuminance(...color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  },

  // Check if contrast meets WCAG AA standards
  meetsWCAGAA: (
    color1: [number, number, number],
    color2: [number, number, number]
  ) => {
    const ratio = colorContrast.getContrastRatio(color1, color2);
    return ratio >= 4.5; // WCAG AA standard for normal text
  },

  // Check if contrast meets WCAG AAA standards
  meetsWCAGAAA: (
    color1: [number, number, number],
    color2: [number, number, number]
  ) => {
    const ratio = colorContrast.getContrastRatio(color1, color2);
    return ratio >= 7; // WCAG AAA standard for normal text
  },
};

// Motion and animation utilities
export const motion = {
  // Check if user prefers reduced motion
  prefersReducedMotion: () => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },

  // Apply reduced motion styles
  applyReducedMotion: (element: HTMLElement) => {
    if (motion.prefersReducedMotion()) {
      element.style.animation = "none";
      element.style.transition = "none";
    }
  },

  // Remove reduced motion styles
  removeReducedMotion: (element: HTMLElement) => {
    element.style.animation = "";
    element.style.transition = "";
  },
};

// Form accessibility utilities
export const formAccessibility = {
  // Associate label with input
  associateLabel: (inputId: string, labelText: string) => {
    const input = document.getElementById(inputId);
    const label = document.createElement("label");
    label.setAttribute("for", inputId);
    label.textContent = labelText;

    if (input) {
      input.parentNode?.insertBefore(label, input);
    }

    return label;
  },

  // Add error message association
  associateErrorMessage: (inputId: string, errorMessage: string) => {
    const input = document.getElementById(inputId);
    const errorId = `${inputId}-error`;
    const errorElement = document.createElement("div");

    errorElement.id = errorId;
    errorElement.setAttribute("role", "alert");
    errorElement.setAttribute("aria-live", "polite");
    errorElement.textContent = errorMessage;
    errorElement.className = "text-red-600 text-sm mt-1";

    if (input) {
      input.setAttribute("aria-describedby", errorId);
      input.setAttribute("aria-invalid", "true");
      input.parentNode?.appendChild(errorElement);
    }

    return errorElement;
  },

  // Remove error message association
  removeErrorMessage: (inputId: string) => {
    const input = document.getElementById(inputId);
    const errorId = `${inputId}-error`;
    const errorElement = document.getElementById(errorId);

    if (input) {
      input.removeAttribute("aria-describedby");
      input.removeAttribute("aria-invalid");
    }

    if (errorElement) {
      errorElement.remove();
    }
  },
};
