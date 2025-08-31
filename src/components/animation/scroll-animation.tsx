"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  duration?: number;
  threshold?: number;
}

export default function ScrollAnimation({
  children,
  className = "",
  delay = 0,
  direction = "fade",
  duration = 600,
  threshold = 0.1,
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, hasAnimated]);

  const getTransformStyle = () => {
    if (!isVisible) {
      switch (direction) {
        case "up":
          return "translateY(30px)";
        case "down":
          return "translateY(-30px)";
        case "left":
          return "translateX(30px)";
        case "right":
          return "translateX(-30px)";
        default:
          return "none";
      }
    }
    return "none";
  };

  const getOpacity = () => {
    return isVisible ? 1 : 0;
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: getOpacity(),
        transform: getTransformStyle(),
        transition: `all ${duration}ms ease-out ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
