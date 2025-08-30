import { Metadata } from "next";

export function generateMetadata(
  title: string,
  description: string,
  path: string,
  image?: string
): Metadata {
  const url = `https://www.dibza.co.uk${path}`;
  const imageUrl =
    image || "https://www.dibza.co.uk/images/luke-taylor-dev.jpg";

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
}

export const defaultMetadata: Metadata = {
  title: "Luke Taylor — Unity Developer Portfolio",
  description:
    "Unity Developer specialising in VR, EEG & Free-to-Play game development. Building immersive experiences that push boundaries.",
  keywords: [
    "Unity Developer",
    "VR Development",
    "EEG Visualization",
    "Game Development",
    "Virtual Reality",
    "Brain Computer Interface",
    "Free-to-Play Games",
    "Casino Games",
    "Indie Games",
    "Unity3D",
    "C# Development",
    "Interactive Experiences",
  ],
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
    locale: "en_US",
    url: "https://www.dibza.co.uk",
    siteName: "Luke Taylor Portfolio",
    title: "Luke Taylor — Unity Developer Portfolio",
    description:
      "Unity Developer specialising in VR, EEG & Free-to-Play game development. Building immersive experiences that push boundaries.",
    images: [
      {
        url: "/images/luke-taylor-dev.jpg",
        width: 1200,
        height: 630,
        alt: "Luke Taylor - Unity Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luke Taylor — Unity Developer Portfolio",
    description:
      "Unity Developer specialising in VR, EEG & Free-to-Play game development. Building immersive experiences that push boundaries.",
    images: ["/images/luke-taylor-dev.jpg"],
    creator: "@luketaylor_dev",
  },
  alternates: {
    canonical: "https://www.dibza.co.uk",
  },
  icons: {
    icon: "/icons/favicon.png",
    shortcut: "/icons/favicon.png",
    apple: "/icons/favicon.png",
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
  other: {
    "theme-color": "#7c3aed", // Purple theme color
    "color-scheme": "dark",
  },
};
