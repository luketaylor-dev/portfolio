"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  progress?: number; // 0-100
  duration?: number; // milliseconds
  className?: string;
  showPercentage?: boolean;
  variant?: "default" | "gradient" | "pulse";
}

export function ProgressIndicator({
  progress,
  duration = 2000,
  className,
  showPercentage = false,
  variant = "default",
}: ProgressIndicatorProps) {
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    if (progress !== undefined) {
      setCurrentProgress(progress);
      return;
    }

    // Auto-progress animation
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);

      setCurrentProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [progress, duration]);

  const getVariantClasses = () => {
    switch (variant) {
      case "gradient":
        return "bg-gradient-to-r from-primary-500 to-primary-600";
      case "pulse":
        return "bg-primary-500 animate-pulse";
      default:
        return "bg-primary-500";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300 ease-out",
            getVariantClasses()
          )}
          style={{ width: `${currentProgress}%` }}
        />
      </div>
      {showPercentage && (
        <div className="text-sm text-neutral-400 text-center">
          {Math.round(currentProgress)}%
        </div>
      )}
    </div>
  );
}

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn(
          "border-2 border-neutral-800 border-t-primary-500 rounded-full animate-spin",
          sizeClasses[size]
        )}
      />
    </div>
  );
}

interface LoadingDotsProps {
  className?: string;
}

export function LoadingDots({ className }: LoadingDotsProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"
          style={{
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}
