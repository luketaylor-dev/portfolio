"use client";

import { useState, ReactNode, useRef, useEffect } from "react";

interface InteractiveTooltipProps {
  children: ReactNode;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export default function InteractiveTooltip({
  children,
  content,
  position = "top",
  className = "",
}: InteractiveTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const triggerRef = useRef<HTMLDivElement>(null);

  const updateTooltipPosition = () => {
    if (triggerRef.current && isVisible) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipWidth = 200; // Approximate tooltip width

      let left = rect.left + rect.width / 2 - tooltipWidth / 2;
      let top = position === "top" ? rect.top - 40 : rect.bottom + 8;

      // Ensure tooltip doesn't go off-screen
      if (left < 10) left = 10;
      if (left + tooltipWidth > window.innerWidth - 10) {
        left = window.innerWidth - tooltipWidth - 10;
      }

      setTooltipStyle({
        position: "fixed" as const,
        left: `${left}px`,
        top: `${top}px`,
        zIndex: 9999,
      });
    }
  };

  useEffect(() => {
    if (isVisible) {
      updateTooltipPosition();
      window.addEventListener("scroll", updateTooltipPosition);
      window.addEventListener("resize", updateTooltipPosition);

      return () => {
        window.removeEventListener("scroll", updateTooltipPosition);
        window.removeEventListener("resize", updateTooltipPosition);
      };
    }
    return undefined;
  }, [isVisible, position]);

  return (
    <div
      ref={triggerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className="px-3 py-2 text-sm text-white bg-neutral-900/95 backdrop-blur-sm border border-primary-500/30 rounded-lg shadow-lg whitespace-nowrap transition-all duration-200"
          style={{
            ...tooltipStyle,
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          {content}
          {/* Arrow */}
          <div
            className={`absolute w-2 h-2 bg-neutral-900/95 border-primary-500/30 transform rotate-45 ${
              position === "top"
                ? "top-full left-1/2 -translate-x-1/2 border-t-0 border-l-0"
                : position === "bottom"
                ? "bottom-full left-1/2 -translate-x-1/2 border-b-0 border-r-0"
                : position === "left"
                ? "left-full top-1/2 -translate-y-1/2 border-l-0 border-b-0"
                : "right-full top-1/2 -translate-y-1/2 border-r-0 border-t-0"
            }`}
          />
        </div>
      )}
    </div>
  );
}
