"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

interface ResponsiveImageProps {
  src: string;
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
  interactive?: boolean;
}

export default function ResponsiveImage({
  src,
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
  interactive = false,
}: ResponsiveImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  const imageClasses = `
    ${interactive ? "cursor-pointer" : ""}
    ${isLoading ? "animate-pulse bg-neutral-800" : ""}
    ${className}
  `.trim();

  const ImageComponent = (
    <Image
      src={src}
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

  if (interactive) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden rounded-lg"
      >
        {ImageComponent}
      </motion.div>
    );
  }

  return ImageComponent;
}

// Specialized components for different use cases
export function HeroImage(props: ResponsiveImageProps) {
  return (
    <ResponsiveImage
      {...props}
      priority={true}
      sizes="100vw"
      quality={90}
      className="w-full h-auto object-cover"
    />
  );
}

export function ProjectImage(props: ResponsiveImageProps) {
  return (
    <ResponsiveImage
      {...props}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      quality={80}
      interactive={true}
      className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg"
    />
  );
}

export function BlogImage(props: ResponsiveImageProps) {
  return (
    <ResponsiveImage
      {...props}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      quality={80}
      interactive={true}
      className="w-full h-48 sm:h-56 object-cover rounded-lg"
    />
  );
}

export function AvatarImage(props: ResponsiveImageProps) {
  return (
    <ResponsiveImage
      {...props}
      sizes="(max-width: 640px) 80px, 100px"
      quality={90}
      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
    />
  );
}

export function ThumbnailImage(props: ResponsiveImageProps) {
  return (
    <ResponsiveImage
      {...props}
      sizes="(max-width: 640px) 60px, 80px"
      quality={75}
      className="w-15 h-15 sm:w-20 sm:h-20 rounded-lg object-cover"
    />
  );
}
