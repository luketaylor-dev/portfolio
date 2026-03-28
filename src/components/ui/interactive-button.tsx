"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";
import Link from "next/link";

interface InteractiveButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  onClick?: (() => void) | undefined;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  colorScheme?: "default" | "web";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export default function InteractiveButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  colorScheme = "default",
  className = "",
  disabled = false,
  loading = false,
  ...buttonProps
}: InteractiveButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-colors duration-200 relative overflow-hidden";

  const variantClasses = {
    default: {
      primary: "bg-primary-500 hover:bg-primary-600 text-white",
      secondary:
        "border-2 border-primary-500/50 text-primary-300 hover:bg-primary-500/10 hover:border-primary-400",
      ghost: "text-primary-300 hover:text-primary-200 hover:bg-primary-500/10",
    },
    web: {
      primary: "bg-blue-600 hover:bg-blue-700 text-white",
      secondary:
        "border-2 border-blue-500/50 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400",
      ghost: "text-blue-300 hover:text-blue-200 hover:bg-blue-500/10",
    },
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  const buttonContent = (
    <span className="flex items-center gap-2">
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
      )}
      {children}
    </span>
  );

  const resolvedVariant = variantClasses[colorScheme][variant];

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClasses} ${resolvedVariant} ${sizeClasses[size]} ${disabledClasses} ${className}`}
        {...(onClick && { onClick })}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      className={`${baseClasses} ${resolvedVariant} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...buttonProps}
    >
      {buttonContent}
    </button>
  );
}
