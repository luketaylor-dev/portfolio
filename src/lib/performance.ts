import { logger } from "./logger";

// Performance monitoring utilities
export const trackPerformance = () => {
  if (typeof window !== "undefined") {
    // Track Core Web Vitals
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "largest-contentful-paint") {
            logger.log("LCP:", entry.startTime);
          }
        }
      });

      observer.observe({ entryTypes: ["largest-contentful-paint"] });
    }

    // Track page load time
    window.addEventListener("load", () => {
      const loadTime = performance.now();
      logger.log("Page load time:", loadTime);
    });
  }
};

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window !== "undefined") {
    // Preload critical images
    const criticalImages = [
      "/images/luke-taylor-dev.webp",
      // Add other critical images here
    ];

    criticalImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });
  }
};

// Optimize images
export const optimizeImageLoading = () => {
  if (typeof window !== "undefined" && "IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            imageObserver.unobserve(img);
          }
        }
      });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }
};
