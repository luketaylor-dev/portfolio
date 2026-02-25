"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import Image from "next/image";

interface VideoWithPlayButtonProps {
  videoSrc: string;
  posterSrc: string;
  alt: string;
  className?: string;
}

export default function VideoWithPlayButton({
  videoSrc,
  posterSrc,
  alt,
  className = "",
}: VideoWithPlayButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  if (isPlaying) {
    return (
      <video
        src={videoSrc}
        controls
        loop
        muted
        className={`w-full h-full object-cover ${className}`}
        poster={posterSrc}
        autoPlay
      />
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Poster Image */}
      <Image
        src={posterSrc}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors duration-300 cursor-pointer group">
        <div className="w-20 h-20 rounded-full bg-primary-600/90 hover:bg-primary-500/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
          <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
        </div>
      </div>

      {/* Click handler */}
      <button
        onClick={handlePlay}
        className="absolute inset-0 w-full h-full"
        aria-label="Play video"
      />
    </div>
  );
}
