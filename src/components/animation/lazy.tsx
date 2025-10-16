"use client";

import dynamic from "next/dynamic";

export const ScrollAnimation = dynamic(() => import("./scroll-animation"), {
  ssr: false,
});

export const ParallaxBackground = dynamic(
  () => import("./parallax-background"),
  { ssr: false }
);

export const TypingAnimation = dynamic(() => import("./typing-animation"), {
  ssr: false,
});

export const CharacterReveal = dynamic(() => import("./character-reveal"), {
  ssr: false,
});

export const AnimatedGradientText = dynamic(
  () => import("./animated-gradient-text"),
  { ssr: false }
);
