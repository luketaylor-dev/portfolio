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
  const baseClasses = "rounded-2xl transition-colors duration-200";

  const variantClasses = {
    default: "bg-[#1a1a1a] border border-neutral-800",
    elevated: "bg-[#1a1a1a] border border-neutral-700 shadow-lg",
    outlined: "bg-transparent border-2 border-neutral-700",
  };

  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const hoverClasses = hover
    ? "hover:border-primary-600/50 hover:bg-[#1f1f1f]"
    : "";

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
}
