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
        return "text-neutral-300 hover:text-primary-400 transition-colors duration-200";
      case "heading":
        return "text-white hover:text-primary-300 transition-colors duration-200";
      case "glow":
        return "text-primary-300 hover:text-primary-200 transition-colors duration-200";
      case "scale":
        return "text-neutral-400 hover:text-primary-300 transition-colors duration-200";
      default:
        return "text-neutral-300 hover:text-primary-400 transition-colors duration-200";
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
