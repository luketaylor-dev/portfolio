"use client";

import Image from "next/image";
import { useState } from "react";

interface WebPImageProps {
  webpSrc: string;
  fallbackSrc: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  onClick?: () => void;
}

export default function WebPImage({
  webpSrc,
  fallbackSrc,
  alt,
  width = 800,
  height = 600,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 85,
  placeholder = "empty",
  blurDataURL,
  onClick,
}: WebPImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    if (!useFallback) {
      // Try fallback image
      setUseFallback(true);
      setIsError(false);
    } else {
      // Both failed
      setIsError(true);
      setIsLoading(false);
    }
  };

  const currentSrc = useFallback ? fallbackSrc : webpSrc;
  const imageClasses = `
    ${onClick ? "cursor-pointer" : ""}
    ${isLoading ? "animate-pulse bg-neutral-800" : ""}
    ${className}
  `.trim();

  if (isError) {
    return (
      <div
        className={`flex items-center justify-center bg-neutral-800 text-neutral-400 ${className}`}
        style={{ width, height }}
      >
        <div className="text-center">
          <div className="text-2xl mb-2">🖼️</div>
          <div className="text-sm">Image not available</div>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      className={imageClasses}
      priority={priority}
      sizes={sizes}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      onLoad={handleLoad}
      onError={handleError}
      onClick={onClick}
    />
  );
}

// Specialized components for different use cases
export function ProjectWebPImage(props: WebPImageProps) {
  return (
    <WebPImage
      {...props}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      quality={80}
      className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg"
    />
  );
}

export function HeroWebPImage(props: WebPImageProps) {
  return (
    <WebPImage
      {...props}
      priority={true}
      sizes="100vw"
      quality={90}
      className="w-full h-auto object-cover"
    />
  );
}
