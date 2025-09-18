import { Metadata } from "next";

export const generateMetadata = (
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
  title: "Luke Taylor — Manchester Unity Developer | EEG & VR Specialist",
  description:
    "Manchester-based Unity Developer with 7+ years' experience in EEG visualization, VR development, and F2P games. Expert in brain-computer interfaces, neuroscience applications, and immersive experiences.",
  keywords: [
    // Location-specific keywords
    "Manchester Unity Developer",
    "Manchester EEG Developer",
    "Manchester VR Developer",
    "Manchester Game Developer",
    "Unity Developer Manchester",
    "EEG Visualization Manchester",
    "VR Development Manchester",
    "Brain Computer Interface Manchester",
    "Neuroscience Applications Manchester",
    "Manchester Indie Game Developer",
    "Manchester VR Specialist",
    "Manchester EEG Specialist",
    "Manchester Tech Developer",
    "Manchester Interactive Media",
    "Manchester Immersive Technology",
    "Manchester Northern Quarter Developer",
    "MediaCityUK Unity Developer",
    "Manchester Digital District Developer",
    "M1 Unity Developer",
    "M2 Unity Developer",
    "M3 Unity Developer",
    "M4 Unity Developer",
    "Greater Manchester Unity Developer",
    "Manchester Freelance Developer",
    "Manchester Contract Unity Developer",

    // Generic keywords (still important!)
    "Unity Developer",
    "EEG Developer",
    "VR Developer",
    "Game Developer",
    "Unity Developer UK",
    "EEG Developer UK",
    "VR Developer UK",
    "Brain Computer Interface",
    "Neuroscience Applications",
    "Brainwave Visualization",
    "Neural Interface Development",
    "Unity Development",
    "VR Development",
    "EEG Visualization",
    "Game Development",
    "Virtual Reality",
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
    locale: "en_GB",
    url: "https://www.dibza.co.uk",
    siteName: "Luke Taylor Portfolio",
    title: "Luke Taylor — Manchester Unity Developer | EEG & VR Specialist",
    description:
      "Manchester-based Unity Developer with 7+ years' experience in EEG visualization, VR development, and F2P games. Expert in brain-computer interfaces, neuroscience applications, and immersive experiences.",
    images: [
      {
        url: "/images/luke-taylor-dev.jpg",
        width: 1200,
        height: 630,
        alt: "Luke Taylor - Manchester Unity Developer specializing in EEG and VR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luke Taylor — Manchester Unity Developer | EEG & VR Specialist",
    description:
      "Manchester-based Unity Developer with 7+ years' experience in EEG visualization, VR development, and F2P games. Expert in brain-computer interfaces, neuroscience applications, and immersive experiences.",
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
  other: {
    "theme-color": "#7c3aed", // Purple theme color
    "color-scheme": "dark",
  },
};
