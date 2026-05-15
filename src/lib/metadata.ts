import { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const generateMetadata = (
  title: string,
  description: string,
  path: string,
  image?: string
): Metadata => {
  const baseUrl = siteUrl;
  const url = `${baseUrl}${path}`;
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${baseUrl}${image.startsWith("/") ? image : `/${image}`}`
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
      siteName: "Luke Taylor Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@luketaylor_dev",
    },
    alternates: {
      canonical: url,
    },
  };
};

export const defaultMetadata: Metadata = {
  title:
    "Unity Developer Manchester — Luke Taylor | Games, VR, EEG & Full-Stack Web",
  description:
    "Manchester-based Unity Developer with 8+ years' experience in game development, VR, EEG visualization, and full-stack web (Next.js, React, .NET). Available for freelance and contract work across the UK.",
  authors: [{ name: "Luke Taylor" }],
  creator: "Luke Taylor",
  publisher: "Luke Taylor",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "Luke Taylor Portfolio",
    title:
      "Unity Developer Manchester — Luke Taylor | Games, VR, EEG & Full-Stack Web",
    description:
      "Manchester-based Unity Developer with 8+ years' experience in game development, VR, EEG visualization, and full-stack web (Next.js, React, .NET). Available for freelance and contract work across the UK.",
    images: [
      {
        url: `${siteUrl}/og?title=Luke%20Taylor%20-%20Unity%20Developer%20Manchester`,
        width: 1200,
        height: 630,
        alt: "Luke Taylor - Unity Developer Manchester",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Unity Developer Manchester — Luke Taylor | Games, VR, EEG & Full-Stack Web",
    description:
      "Manchester-based Unity Developer with 8+ years' experience in game development, VR, EEG visualization, and full-stack web (Next.js, React, .NET). Available for freelance and contract work across the UK.",
    images: [
      `${siteUrl}/og?title=Luke%20Taylor%20%E2%80%94%20Unity%20Developer%20Manchester`,
    ],
  },
  alternates: {
    canonical: siteUrl,
  },
  other: {
    "color-scheme": "dark",
  },
};
