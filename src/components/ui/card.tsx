"use client";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "outlined";
  padding?: "sm" | "md" | "lg";
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  variant = "default",
  padding = "md",
  hover = false,
}: CardProps) {
  const baseClasses = "rounded-2xl transition-all duration-300";

  const variantClasses = {
    default:
      "bg-gradient-to-br from-neutral-900 to-purple-900/20 border border-purple-800/50",
    elevated:
      "bg-gradient-to-br from-neutral-900 to-purple-900/30 border border-purple-600/50 shadow-lg shadow-purple-500/25",
    outlined: "bg-neutral-900/50 border-2 border-purple-500/30",
  };

  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const hoverClasses = hover
    ? "hover:border-purple-600/50 hover:bg-purple-900/30 hover:scale-105"
    : "";

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
}
