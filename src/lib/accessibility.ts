import { useEffect, useRef, KeyboardEvent } from "react";

// Keyboard navigation utilities
export function useKeyboardNavigation() {
  const containerRef = useRef<HTMLElement>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!containerRef.current) return;

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const currentElement = document.activeElement;
    const currentIndex = Array.from(focusableElements).indexOf(
      currentElement as Element
    );

    let nextIndex = -1;

    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        nextIndex =
          currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        nextIndex =
          currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
        break;
      case "Home":
        event.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        event.preventDefault();
        nextIndex = focusableElements.length - 1;
        break;
    }

    if (nextIndex >= 0) {
      (focusableElements[nextIndex] as HTMLElement)?.focus();
    }
  };

  return { containerRef, handleKeyDown };
}

// Focus trap utility
export function useFocusTrap(enabled: boolean = true) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown as any);
    firstElement.focus();

    return () => {
      container.removeEventListener("keydown", handleKeyDown as any);
    };
  }, [enabled]);

  return containerRef;
}

// Skip to content utility
export function useSkipToContent() {
  const mainContentRef = useRef<HTMLElement>(null);

  const handleSkipToContent = () => {
    mainContentRef.current?.focus();
  };

  return { mainContentRef, handleSkipToContent };
}

// ARIA helpers
export const ariaHelpers = {
  // Live region announcements
  announce: (message: string, priority: "polite" | "assertive" = "polite") => {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", priority);
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = message;

    document.body.appendChild(announcement);
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  // Generate unique IDs
  generateId: (prefix: string = "id") => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },

  // Format numbers for screen readers
  formatNumber: (num: number): string => {
    return new Intl.NumberFormat("en-US").format(num);
  },

  // Format dates for screen readers
  formatDate: (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  },
};

// Color contrast utilities
export const contrastHelpers = {
  // Calculate relative luminance
  getLuminance: (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * (rs ?? 0) + 0.7152 * (gs ?? 0) + 0.0722 * (bs ?? 0);
  },

  // Calculate contrast ratio
  getContrastRatio: (luminance1: number, luminance2: number): number => {
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    return (lighter + 0.05) / (darker + 0.05);
  },

  // Check if contrast meets WCAG AA standards
  meetsWCAGAA: (
    contrastRatio: number,
    isLargeText: boolean = false
  ): boolean => {
    return isLargeText ? contrastRatio >= 3 : contrastRatio >= 4.5;
  },

  // Check if contrast meets WCAG AAA standards
  meetsWCAGAAA: (
    contrastRatio: number,
    isLargeText: boolean = false
  ): boolean => {
    return isLargeText ? contrastRatio >= 4.5 : contrastRatio >= 7;
  },
};

// Screen reader utilities
export const screenReaderHelpers = {
  // Hide content visually but keep it available to screen readers
  visuallyHidden: "sr-only",

  // Hide content from screen readers
  screenReaderOnly: "sr-only",

  // Show content only to screen readers
  screenReaderOnlyClass: "sr-only",

  // Announce page changes
  announcePageChange: (title: string) => {
    ariaHelpers.announce(`Page loaded: ${title}`);
  },

  // Announce loading states
  announceLoading: () => {
    ariaHelpers.announce("Loading...", "polite");
  },

  // Announce completion
  announceComplete: () => {
    ariaHelpers.announce("Complete", "polite");
  },
};

// Motion utilities
export const motionHelpers = {
  // Check if user prefers reduced motion
  prefersReducedMotion: (): boolean => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },

  // Get motion-safe class
  motionSafe: "motion-safe:",
  motionReduce: "motion-reduce:",

  // Disable animations if user prefers reduced motion
  disableAnimations: (className: string): string => {
    if (motionHelpers.prefersReducedMotion()) {
      return className.replace(/animate-/g, "");
    }
    return className;
  },
};

// High contrast mode utilities
export const highContrastHelpers = {
  // Check if user prefers high contrast
  prefersHighContrast: (): boolean => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-contrast: high)").matches;
  },

  // High contrast class
  highContrast: "contrast-more",
};

// Export all utilities
export const accessibilityUtils = {
  useKeyboardNavigation,
  useFocusTrap,
  useSkipToContent,
  ariaHelpers,
  contrastHelpers,
  screenReaderHelpers,
  motionHelpers,
  highContrastHelpers,
};
