"use client";
import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | undefined;
  helperText?: string;
  variant?: "default" | "filled";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, helperText, variant = "default", className = "", ...props },
    ref
  ) => {
    const baseClasses =
      "w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20";

    const variantClasses = {
      default:
        "bg-neutral-900/50 border-purple-800/50 text-white placeholder-neutral-500 focus:border-purple-500",
      filled:
        "bg-neutral-800/50 border-neutral-700 text-white placeholder-neutral-400 focus:border-purple-500",
    };

    const errorClasses = error
      ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
      : "";

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-white">
            {label}
          </label>
        )}

        <input
          ref={ref}
          className={`${baseClasses} ${variantClasses[variant]} ${errorClasses} ${className}`}
          {...props}
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        {helperText && !error && (
          <p className="text-sm text-neutral-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
