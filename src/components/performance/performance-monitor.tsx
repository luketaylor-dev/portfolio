"use client";

import { useEffect } from "react";

export default function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Track Core Web Vitals
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "largest-contentful-paint") {
            console.log("LCP:", entry.startTime);
            // You can send this to your analytics service
          }
        }
      });
      observer.observe({ entryTypes: ["largest-contentful-paint"] });
    }

    // Track page load time
    const handleLoad = () => {
      const loadTime = performance.now();
      console.log("Page load time:", loadTime);
      // You can send this to your analytics service
    };

    window.addEventListener("load", handleLoad);

    // Preload critical images
    const criticalImages = ["/images/luke-taylor-dev.jpg"];
    criticalImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });

    // Optimize for slower connections
    if ("connection" in navigator && navigator.connection) {
      const connection = navigator.connection as any;
      if (
        connection.effectiveType === "slow-2g" ||
        connection.effectiveType === "2g"
      ) {
        document.documentElement.classList.add("reduced-motion");
      }
    }

    // Clear focus after navigation to prevent persistent focus rings
    const handleClick = (e: MouseEvent) => {
      // If clicking on a navigation link, clear focus after a short delay
      if ((e.target as Element)?.closest("nav a")) {
        setTimeout(() => {
          if (
            document.activeElement &&
            document.activeElement.tagName === "A"
          ) {
            (document.activeElement as HTMLElement).blur();
          }
        }, 100);
      }
    };

    // Clear focus when clicking outside navigation
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target as Element)?.closest("nav")) {
        if (document.activeElement && document.activeElement.tagName === "A") {
          (document.activeElement as HTMLElement).blur();
        }
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("load", handleLoad);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return null;
}
