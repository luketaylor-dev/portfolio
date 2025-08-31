"use client";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "none" | "subtle" | "gradient";
}

export default function Section({
  children,
  className = "",
  padding = "lg",
  background = "none",
}: SectionProps) {
  const paddingClasses = {
    none: "",
    sm: "py-8",
    md: "py-12",
    lg: "py-16",
    xl: "py-24",
  };

  const backgroundClasses = {
    none: "",
    subtle: "bg-neutral-900/50",
    gradient: "bg-gradient-to-br from-neutral-950 to-purple-950/50",
  };

  return (
    <section
      className={`${paddingClasses[padding]} ${backgroundClasses[background]} ${className}`}
    >
      {children}
    </section>
  );
}
