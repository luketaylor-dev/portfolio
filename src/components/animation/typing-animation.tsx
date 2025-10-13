"use client";

import { useState, useEffect, useRef } from "react";

interface TypingAnimationProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export default function TypingAnimation({
  text,
  speed = 100,
  delay = 0,
  className = "",
  onComplete,
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    // Reset state when text changes
    setDisplayText("");
    setCurrentIndex(0);
    setHasStarted(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [text]);

  useEffect(() => {
    if (prefersReduced) {
      setDisplayText(text);
      setHasStarted(true);
      setCurrentIndex(text.length);
      onComplete?.();
      return;
    }
    if (!hasStarted) {
      const startTimer = setTimeout(() => {
        setHasStarted(true);
        setCurrentIndex(0);
      }, delay);

      return () => clearTimeout(startTimer);
    }
    return undefined;
  }, [delay, hasStarted, prefersReduced, text, onComplete]);

  useEffect(() => {
    if (hasStarted && currentIndex < text.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    } else if (hasStarted && currentIndex >= text.length && onComplete) {
      onComplete();
    }
    return undefined;
  }, [hasStarted, currentIndex, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayText}
      <span className="motion-reduce:hidden animate-pulse">|</span>
    </span>
  );
}
