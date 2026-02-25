"use client";

import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TextVariant =
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "paragraph"
  | "small"
  | "mini";

export type TextColor =
  | "primary"
  | "secondary"
  | "muted"
  | "error"
  | "success"
  | "warning"
  | "black"
  | "white";

export type TextWeight = "bold" | "regular" | "medium" | "semibold";

export type TextProps = {
  variant?: TextVariant;
  as?: ElementType;
  color?: TextColor;
  weight?: TextWeight;
  className?: string;
  children: ReactNode;
  [key: string]: unknown;
};

const variantClasses: Record<TextVariant, string> = {
  heading1: "text-5xl",
  heading2: "text-3xl",
  heading3: "text-2xl",
  heading4: "text-xl",
  paragraph: "text-base",
  small: "text-sm",
  mini: "text-xs",
};

const colorClasses: Record<TextColor, string> = {
  primary: "text-primary-300",
  secondary: "text-neutral-400",
  muted: "text-neutral-300",
  error: "text-red-400",
  success: "text-green-400",
  warning: "text-yellow-400",
  black: "text-neutral-950",
  white: "text-white",
};

const defaultWeightByVariant: Record<TextVariant, TextWeight> = {
  heading1: "bold",
  heading2: "bold",
  heading3: "semibold",
  heading4: "semibold",
  paragraph: "regular",
  small: "regular",
  mini: "regular",
};

const weightClasses: Record<TextWeight, string> = {
  bold: "font-bold",
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
};

export const Text = ({
  variant = "paragraph",
  as: Component = "p",
  color = "white",
  weight,
  className = "",
  children,
  ...rest
}: TextProps) => {
  const effectiveWeight = weight ?? defaultWeightByVariant[variant];

  return (
    <Component
      className={cn(
        variantClasses[variant],
        colorClasses[color],
        weightClasses[effectiveWeight],
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};
