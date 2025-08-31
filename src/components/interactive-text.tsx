"use client";

import { ReactNode } from "react";

interface InteractiveTextProps {
  children: ReactNode;
  variant?: "link" | "heading" | "glow" | "scale";
  className?: string;
  href?: string;
  onClick?: () => void;
}

export default function InteractiveText({
  children,
  variant = "link",
  className = "",
  href,
  onClick,
}: InteractiveTextProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "link":
        return "text-neutral-300 hover:text-purple-300 transition-all duration-300 hover:scale-105 hover:drop-shadow-lg hover:drop-shadow-purple-500/25";
      case "heading":
        return "text-white hover:text-purple-200 transition-all duration-300 hover:scale-105 hover:drop-shadow-lg hover:drop-shadow-purple-500/50";
      case "glow":
        return "text-purple-300 hover:text-purple-200 transition-all duration-300 hover:scale-105 hover:drop-shadow-xl hover:drop-shadow-purple-400/75 hover:animate-pulse";
      case "scale":
        return "text-neutral-400 hover:text-purple-300 transition-all duration-300 hover:scale-110 hover:font-semibold";
      default:
        return "text-neutral-300 hover:text-purple-300 transition-all duration-300 hover:scale-105";
    }
  };

  const baseClasses = "inline-block cursor-pointer";
  const combinedClasses = `${baseClasses} ${getVariantClasses()} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClasses} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <span className={combinedClasses} onClick={onClick}>
      {children}
    </span>
  );
}
