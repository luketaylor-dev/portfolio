"use client";

import { ReactNode } from "react";

interface AnimatedGradientTextProps {
  children: ReactNode;
  type?: "moving" | "pulsing" | "rainbow" | "shimmer";
  className?: string;
  duration?: number;
}

export default function AnimatedGradientText({
  children,
  type = "moving",
  className = "",
  duration = 3000,
}: AnimatedGradientTextProps) {
  const getGradientClass = () => {
    switch (type) {
      case "moving":
        return "bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x";
      case "pulsing":
        return "bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent animate-pulse";
      case "rainbow":
        return "bg-gradient-to-r from-purple-400 via-pink-500 via-yellow-500 via-green-500 via-blue-500 to-purple-400 bg-clip-text text-transparent animate-gradient-x";
      case "shimmer":
        return "bg-gradient-to-r from-transparent via-purple-400 to-transparent bg-clip-text text-transparent animate-shimmer";
      default:
        return "bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent";
    }
  };

  return (
    <span className={`${getGradientClass()} ${className}`}>{children}</span>
  );
}
