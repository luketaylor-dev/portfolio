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
          "Manchester-based Unity Developer with 8+ years' experience in game development, VR, EEG visualization, and full-stack web (Next.js, React, .NET). Available for freelance and contract work across the UK.",
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
          "Game Development",
          "VR Development",
          "EEG Visualization",
          "Brain Computer Interface",
          "C# Programming",
          "Full-Stack Web Development",
          "Next.js",
          "React",
          "ASP.NET Core",
          "TypeScript",
        ],
        hasOccupation: {
          "@type": "Occupation",
          name: "Unity Developer",
          description:
            "Unity development for games, VR, and EEG visualization; full-stack web development with Next.js, React, and .NET.",
          skills:
            "Unity, C#, VR, EEG, BrainFlow, Game Development, Next.js, React, TypeScript, ASP.NET Core, Node.js",
        },
      },
      // Organization Schema (global)
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Luke Taylor - Unity Developer",
        description:
          "Manchester-based Unity development and full-stack web services: games, VR, EEG/BCI, Next.js, React, and .NET.",
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
