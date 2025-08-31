"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
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
  touchTarget?: boolean; // Ensures minimum 44px touch target
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
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-neutral-950
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? "w-full" : ""}
    ${touchTarget ? "min-h-[44px] min-w-[44px]" : ""}
  `.trim();

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 active:scale-95",
    secondary:
      "border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 active:scale-95",
    ghost: "text-purple-300 hover:bg-purple-900/20 active:scale-95",
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

  const MotionButton = motion.button;
  const MotionLink = motion.create(Link);

  const content = (
    <>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"
        />
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <MotionLink
        href={href}
        className={buttonClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <MotionButton
      className={buttonClasses}
      disabled={disabled || loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      {...(props as any)}
    >
      {content}
    </MotionButton>
  );
}

// Specialized touch button components
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
    <motion.div
      className="fixed bottom-6 right-6 z-40"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: "spring" }}
    >
      <TouchButton
        {...props}
        size="lg"
        className="w-14 h-14 rounded-full shadow-lg shadow-purple-500/25"
        touchTarget={true}
      >
        {children}
      </TouchButton>
    </motion.div>
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
