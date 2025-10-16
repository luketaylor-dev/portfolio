// Mobile performance utilities

// Check if device is mobile
export const isMobile = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
};

// Check if device supports touch
export const isTouchDevice = (): boolean => {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

// Check connection speed
export const getConnectionSpeed = (): "slow" | "fast" | "unknown" => {
  if (typeof navigator === "undefined" || !("connection" in navigator)) {
    return "unknown";
  }

  const connection = (navigator as any).connection;

  if (connection.effectiveType) {
    switch (connection.effectiveType) {
      case "slow-2g":
      case "2g":
      case "3g":
        return "slow";
      case "4g":
        return "fast";
      default:
        return "unknown";
    }
  }

  if (connection.downlink) {
    return connection.downlink < 1.5 ? "slow" : "fast";
  }

  return "unknown";
};

// Check if user prefers reduced data usage
export function prefersReducedData(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-data: reduce)").matches;
}

// Optimize images based on device and connection
export function getImageOptimizationSettings() {
  const isMobileDevice = isMobile();
  const connectionSpeed = getConnectionSpeed();
  const reducedData = prefersReducedData();

  let quality = 85;
  let format = "webp";
  let sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

  // Reduce quality for slow connections or reduced data preference
  if (connectionSpeed === "slow" || reducedData) {
    quality = 60;
  }

  // Further reduce for mobile slow connections
  if (isMobileDevice && connectionSpeed === "slow") {
    quality = 50;
    sizes = "100vw";
  }

  return {
    quality,
    format,
    sizes,
    priority: false,
  };
}

// Lazy load utilities
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null {
  if (typeof window === "undefined") return null;

  const defaultOptions: IntersectionObserverInit = {
    rootMargin: "50px",
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window === "undefined") return;

  const criticalResources = [
    "/fonts/inter-var.woff2",
    "/images/luke-taylor-dev.webp",
  ];

  criticalResources.forEach((resource) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = resource;
    link.as = resource.includes("font") ? "font" : "image";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  });
}

// Optimize for mobile viewport
export function optimizeViewport() {
  if (typeof window === "undefined") return;

  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute(
      "content",
      "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"
    );
  }
}

// Touch event utilities
export function addTouchFeedback(element: HTMLElement) {
  if (typeof window === "undefined") return;

  const handleTouchStart = () => {
    element.style.transform = "scale(0.95)";
  };

  const handleTouchEnd = () => {
    element.style.transform = "scale(1)";
  };

  element.addEventListener("touchstart", handleTouchStart, { passive: true });
  element.addEventListener("touchend", handleTouchEnd, { passive: true });

  return () => {
    element.removeEventListener("touchstart", handleTouchStart);
    element.removeEventListener("touchend", handleTouchEnd);
  };
}

// Mobile-specific CSS classes
export const mobileClasses = {
  // Touch targets
  touchTarget: "min-h-[44px] min-w-[44px]",

  // Mobile spacing
  mobilePadding: "px-4 sm:px-6 lg:px-8",
  mobileMargin: "mx-4 sm:mx-6 lg:mx-8",

  // Mobile text sizes
  mobileText: "text-sm sm:text-base lg:text-lg",
  mobileHeading: "text-xl sm:text-2xl lg:text-3xl",

  // Mobile grid
  mobileGrid: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",

  // Mobile navigation
  mobileNav: "md:hidden",
  desktopNav: "hidden md:flex",
};

// Performance monitoring
export function monitorMobilePerformance() {
  if (typeof window === "undefined") return;

  // Monitor Core Web Vitals
  if ("web-vital" in window) {
    // Note: web-vitals v5 has a different API structure
    // This is commented out until we can properly implement it
    // import("web-vitals").then((webVitals) => {
    //   webVitals.getCLS(console.log);
    //   webVitals.getFID(console.log);
    //   webVitals.getFCP(console.log);
    //   webVitals.getLCP(console.log);
    //   webVitals.getTTFB(console.log);
    // });
  }

  // Monitor memory usage
  if ("memory" in performance) {
    setInterval(() => {
      const memory = (performance as any).memory;
      if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8) {
        console.warn("High memory usage detected");
      }
    }, 10000);
  }
}

// Mobile-specific optimizations
export function applyMobileOptimizations() {
  if (typeof window === "undefined") return;

  const isMobileDevice = isMobile();
  const connectionSpeed = getConnectionSpeed();

  // Reduce animations for slow connections
  if (connectionSpeed === "slow") {
    document.documentElement.style.setProperty("--animation-duration", "0.1s");
  }

  // Optimize for mobile devices
  if (isMobileDevice) {
    // Reduce motion for better performance
    document.documentElement.style.setProperty(
      "--transition-duration",
      "0.15s"
    );
  }
}

// Export all utilities
export const mobilePerformanceUtils = {
  isMobile,
  isTouchDevice,
  getConnectionSpeed,
  prefersReducedData,
  getImageOptimizationSettings,
  createIntersectionObserver,
  preloadCriticalResources,
  optimizeViewport,
  addTouchFeedback,
  mobileClasses,
  monitorMobilePerformance,
  applyMobileOptimizations,
};
