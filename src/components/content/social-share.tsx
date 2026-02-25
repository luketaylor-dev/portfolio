"use client";
import { Twitter, Linkedin, Facebook, Share2 } from "lucide-react";
import { socialShareUrls } from "@/lib/blog-utils";

interface SocialShareProps {
  url: string;
  title: string;
  className?: string;
}

export default function SocialShare({
  url,
  title,
  className = "",
}: SocialShareProps) {
  const handleShare = async (platform: "twitter" | "linkedin" | "facebook") => {
    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = socialShareUrls.twitter(url, title);
        break;
      case "linkedin":
        shareUrl = socialShareUrls.linkedin(url);
        break;
      case "facebook":
        shareUrl = socialShareUrls.facebook(url);
        break;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-sm font-medium text-neutral-400">Share:</span>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handleShare("twitter")}
          className="p-2 rounded-lg bg-neutral-900/50 border border-primary-800/50 text-primary-300 hover:bg-primary-900/20 hover:border-primary-600/50 transition-all duration-200 hover:scale-105"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleShare("linkedin")}
          className="p-2 rounded-lg bg-neutral-900/50 border border-primary-800/50 text-primary-300 hover:bg-primary-900/20 hover:border-primary-600/50 transition-all duration-200 hover:scale-105"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleShare("facebook")}
          className="p-2 rounded-lg bg-neutral-900/50 border border-primary-800/50 text-primary-300 hover:bg-primary-900/20 hover:border-primary-600/50 transition-all duration-200 hover:scale-105"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-4 h-4" />
        </button>

        {typeof navigator !== "undefined" && "share" in navigator && (
          <button
            onClick={handleNativeShare}
            className="p-2 rounded-lg bg-neutral-900/50 border border-primary-800/50 text-primary-300 hover:bg-primary-900/20 hover:border-primary-600/50 transition-all duration-200 hover:scale-105"
            aria-label="Share using native share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
