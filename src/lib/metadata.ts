import { Metadata } from "next";

export const generateMetadata = (
  title: string,
  description: string,
  path: string,
  image?: string
): Metadata => {
  const baseUrl = "https://www.dibza.co.uk";
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
  title: "Luke Taylor - Unity Developer Manchester | EEG & VR Specialist",
  description:
    "Unity Developer Manchester with 7+ years' experience in EEG visualization, VR development, and F2P games. Manchester-based expert in brain-computer interfaces, neuroscience applications, and immersive experiences.",
  keywords: [
    "Unity Developer Manchester",
    "EEG Visualization",
    "VR Development",
    "Game Development",
    "Brain-Computer Interface",
    "Unity3D",
    "C#",
    "Immersive Experiences",
    "Manchester",
    "UK",
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
    locale: "en_GB",
    url: "https://www.dibza.co.uk",
    siteName: "Luke Taylor Portfolio",
    title: "Luke Taylor - Unity Developer Manchester | EEG & VR Specialist",
    description:
      "Manchester-based Unity Developer with 7+ years' experience in EEG visualization, VR development, and F2P games. Expert in brain-computer interfaces, neuroscience applications, and immersive experiences. Serving clients across the UK.",
    images: [
      {
        url: "https://www.dibza.co.uk/og?title=Luke%20Taylor%20-%20Unity%20Developer%20Manchester",
        width: 1200,
        height: 630,
        alt: "Luke Taylor - Unity Developer Manchester",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luke Taylor - Unity Developer Manchester | EEG & VR Specialist",
    description:
      "Manchester-based Unity Developer with 7+ years' experience in EEG visualization, VR development, and F2P games. Expert in brain-computer interfaces, neuroscience applications, and immersive experiences. Serving clients across the UK.",
    images: [
      "https://www.dibza.co.uk/og?title=Luke%20Taylor%20%E2%80%94%20Unity%20Developer%20Manchester",
    ],
    creator: "@luketaylor_dev",
  },
  alternates: {
    canonical: "https://www.dibza.co.uk",
  },
  other: {
    "theme-color": "#7c3aed", // Purple theme color
    "color-scheme": "dark",
  },
};
