"use client";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
}: BadgeProps) {
  const baseClasses =
    "inline-flex items-center font-medium rounded-full transition-colors";

  const variantClasses = {
    default: "bg-neutral-800 text-neutral-300 border border-neutral-700",
    primary: "bg-purple-600/20 text-purple-300 border border-purple-500/30",
    secondary: "bg-neutral-700 text-neutral-200 border border-neutral-600",
    success: "bg-green-600/20 text-green-300 border border-green-500/30",
    warning: "bg-yellow-600/20 text-yellow-300 border border-yellow-500/30",
    error: "bg-red-600/20 text-red-300 border border-red-500/30",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
}
