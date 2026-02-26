import { siteUrl } from "@/lib/site";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // Person Schema (global)
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Luke Taylor",
        jobTitle: "Unity Developer",
        description:
          "Unity Developer Manchester with 7+ years' experience in EEG visualization, VR development, and F2P games. Manchester-based expert in brain-computer interfaces, neuroscience applications, and immersive experiences.",
        url: siteUrl,
        image: `${siteUrl}/images/luke-taylor-dev.webp`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Manchester",
          addressCountry: "United Kingdom",
        },
        sameAs: [
          "https://github.com/luketaylor-dev",
          "https://www.linkedin.com/in/luke-taylor-ab5080166/",
        ],
        knowsAbout: [
          "Unity Development",
          "EEG Visualization",
          "VR Development",
          "Brain Computer Interface",
          "Neuroscience Applications",
          "Game Development",
          "C# Programming",
          "Virtual Reality",
          "Interactive Media",
        ],
        hasOccupation: {
          "@type": "Occupation",
          name: "Unity Developer",
          description:
            "Specializes in EEG visualization, VR development, and immersive experiences",
          skills:
            "Unity, C#, EEG, VR, Brain Computer Interface, Game Development",
        },
      },
      // Organization Schema (global)
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Luke Taylor - Unity Developer",
        description:
          "Unity Developer Manchester services specializing in EEG visualization, VR development, and brain-computer interfaces",
        url: siteUrl,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Manchester",
          addressCountry: "United Kingdom",
        },
        founder: {
          "@type": "Person",
          name: "Luke Taylor",
        },
      },
      // Note: Page-specific schema (FAQ, Breadcrumbs, BlogPosting, CreativeWork)
      // should be added in the respective pages/components that render that content.
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      suppressHydrationWarning={true}
    />
  );
}
