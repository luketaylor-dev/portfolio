"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";
import Link from "next/link";

interface TouchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  touchTarget?: boolean;
}

export default function TouchButton({
  children,
  href,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  className = "",
  touchTarget = true,
  ...props
}: TouchButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-xl
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-950
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? "w-full" : ""}
    ${touchTarget ? "min-h-[44px] min-w-[44px]" : ""}
  `.trim();

  const variantClasses = {
    primary:
      "bg-primary-500 hover:bg-primary-600 text-white active:scale-95",
    secondary:
      "border-2 border-primary-500/50 text-primary-300 hover:bg-primary-500/10 hover:border-primary-400 active:scale-95",
    ghost: "text-primary-300 hover:bg-neutral-800 active:scale-95",
    danger: "bg-red-600 text-white hover:bg-red-700 active:scale-95",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.trim();

  const content = (
    <>
      {loading && (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {content}
    </button>
  );
}

export function TouchIconButton({ children, ...props }: TouchButtonProps) {
  return (
    <TouchButton
      {...props}
      size="sm"
      className="p-3 rounded-full"
      touchTarget={true}
    >
      {children}
    </TouchButton>
  );
}

export function TouchFloatingButton({ children, ...props }: TouchButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <TouchButton
        {...props}
        size="lg"
        className="w-14 h-14 rounded-full shadow-lg"
        touchTarget={true}
      >
        {children}
      </TouchButton>
    </div>
  );
}

export function TouchBackButton({
  children = "Back",
  ...props
}: TouchButtonProps) {
  return (
    <TouchButton
      {...props}
      variant="ghost"
      size="sm"
      className="flex items-center gap-2"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {children}
    </TouchButton>
  );
}
