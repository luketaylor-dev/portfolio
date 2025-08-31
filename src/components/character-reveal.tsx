"use client";

import { useState, useEffect, useRef } from "react";

interface CharacterRevealProps {
  text: string;
  delay?: number;
  staggerDelay?: number;
  animation?: "fade" | "slideUp" | "slideLeft" | "slideRight";
  className?: string;
}

export default function CharacterReveal({
  text,
  delay = 0,
  staggerDelay = 50,
  animation = "fade",
  className = "",
}: CharacterRevealProps) {
  const [visibleChars, setVisibleChars] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setTimeout(() => {
            setVisibleChars(0);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, isVisible]);

  useEffect(() => {
    if (isVisible && visibleChars < text.length) {
      const timer = setTimeout(() => {
        setVisibleChars(visibleChars + 1);
      }, staggerDelay);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isVisible, visibleChars, text.length, staggerDelay]);

  const getAnimationClass = (index: number) => {
    const isVisible = index < visibleChars;
    const baseClass = "inline-block transition-all duration-500";

    if (!isVisible) {
      switch (animation) {
        case "slideUp":
          return `${baseClass} opacity-0 translate-y-4`;
        case "slideLeft":
          return `${baseClass} opacity-0 -translate-x-4`;
        case "slideRight":
          return `${baseClass} opacity-0 translate-x-4`;
        default:
          return `${baseClass} opacity-0`;
      }
    }

    return `${baseClass} opacity-100 translate-y-0 translate-x-0`;
  };

  return (
    <div ref={ref} className={className}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={getAnimationClass(index)}
          style={{ transitionDelay: `${index * staggerDelay}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}
