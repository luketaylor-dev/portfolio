"use client";
import { Download } from "lucide-react";

interface ResumeDownloadProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}

export default function ResumeDownload({
  variant = "primary",
  size = "md",
  className = "",
  children,
}: ResumeDownloadProps) {
  const handleDownload = () => {
    // Analytics tracking
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "download_resume", {
        event_category: "engagement",
        event_label: "resume_download",
      });
    }

    // Create download link
    const link = document.createElement("a");
    link.href = "/resume/Luke Taylor - CV.pdf";
    link.download = "Luke Taylor - CV.pdf";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const baseClasses =
    "inline-flex items-center gap-2 font-medium transition-all duration-300 hover:scale-105";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40",
    secondary:
      "bg-neutral-900/50 text-primary-300 border border-primary-800/50 hover:bg-primary-900/20 hover:border-primary-600/50",
    ghost: "text-primary-400 hover:text-primary-300 hover:bg-primary-900/10",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl",
  };

  const defaultText = children || "Download Resume";

  return (
    <button
      onClick={handleDownload}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      <Download
        className={`${
          size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5"
        }`}
      />
      {defaultText}
    </button>
  );
}
