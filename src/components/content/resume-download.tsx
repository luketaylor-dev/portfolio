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
    "inline-flex items-center gap-2 font-medium transition-colors duration-200";

  const variantClasses = {
    primary:
      "bg-primary-500 hover:bg-primary-600 text-white",
    secondary:
      "text-primary-300 border border-neutral-700 hover:border-neutral-600 hover:bg-neutral-800",
    ghost: "text-primary-400 hover:text-primary-300",
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
