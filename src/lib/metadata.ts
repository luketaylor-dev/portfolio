import { Metadata } from "next";

export const generateMetadata = (
  title: string,
  description: string,
  path: string,
  image?: string
): Metadata => {
  const url = `https://www.dibza.co.uk${path}`;
  const imageUrl =
    image || `https://www.dibza.co.uk/og?title=${encodeURIComponent(title)}`;

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
  title: "Luke Taylor — Unity Developer Manchester | EEG & VR Specialist",
  description:
    "Unity Developer Manchester with 7+ years' experience in EEG visualization, VR development, and F2P games. Manchester-based expert in brain-computer interfaces, neuroscience applications, and immersive experiences.",
  keywords: [
    // Location-specific keywords
    "Manchester Unity Developer",
    "Manchester EEG Developer",
    "Manchester VR Developer",
    "Manchester Game Developer",
    "Unity Developer Manchester",
    "Unity Developer North West",
    "Unity Developer Greater Manchester",
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
    "Unity Developer Manchester UK",
    "Unity Developer Manchester England",
    "Greater Manchester Unity Developer",
    "Manchester Freelance Developer",
    "Manchester Contract Unity Developer",

    // UK-wide keywords
    "Unity Developer UK",
    "Unity Developer England",
    "Unity Developer Britain",
    "EEG Developer UK",
    "VR Developer UK",
    "Game Developer UK",
    "Unity Developer London",
    "Unity Developer Birmingham",
    "Unity Developer Liverpool",
    "Unity Developer Leeds",
    "Unity Developer Sheffield",
    "Unity Developer Bristol",
    "Unity Developer Newcastle",
    "Unity Developer Nottingham",
    "Unity Developer Cardiff",
    "Unity Developer Edinburgh",
    "Unity Developer Glasgow",
    "UK Unity Developer",
    "England Unity Developer",
    "Britain Unity Developer",
    "UK EEG Developer",
    "UK VR Developer",
    "UK Game Developer",
    "UK Brain Computer Interface",
    "UK Neuroscience Applications",
    "UK VR Development",
    "UK EEG Visualization",
    "UK Game Development",
    "UK Virtual Reality",
    "UK Interactive Media",
    "UK Immersive Technology",
    "UK Tech Developer",
    "UK Indie Game Developer",
    "UK Freelance Developer",
    "UK Contract Unity Developer",

    // Generic keywords (still important!)
    "Unity Developer",
    "EEG Developer",
    "VR Developer",
    "Game Developer",
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
    title: "Luke Taylor — Unity Developer Manchester | EEG & VR Specialist",
    description:
      "Manchester-based Unity Developer with 7+ years' experience in EEG visualization, VR development, and F2P games. Expert in brain-computer interfaces, neuroscience applications, and immersive experiences. Serving clients across the UK.",
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
    title: "Luke Taylor — Unity Developer Manchester | EEG & VR Specialist",
    description:
      "Manchester-based Unity Developer with 7+ years' experience in EEG visualization, VR development, and F2P games. Expert in brain-computer interfaces, neuroscience applications, and immersive experiences. Serving clients across the UK.",
    images: ["/images/luke-taylor-dev.jpg"],
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
