"use client";

import { useEffect, useState } from "react";

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector("article");
      if (!article) return;

      const { top, height } = article.getBoundingClientRect();
      const articleTop = top + window.scrollY;
      const articleHeight = height;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const scrollableHeight = articleHeight - windowHeight;
      if (scrollableHeight <= 0) {
        setProgress(scrollY >= articleTop ? 100 : 0);
        return;
      }

      const scrolledInto = scrollY - articleTop;
      if (scrolledInto <= 0) {
        setProgress(0);
        return;
      }
      const pct = Math.min(100, Math.round((scrolledInto / scrollableHeight) * 100));
      setProgress(pct);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-primary-900/30 z-[100]"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
