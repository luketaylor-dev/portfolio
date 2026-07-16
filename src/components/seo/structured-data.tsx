import { siteUrl } from "@/lib/site";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // WebSite Schema (global)
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Luke Taylor - Unity Developer in Manchester",
        description:
          "Portfolio of Luke Taylor, a Unity developer in Manchester specialising in game development, VR, EEG visualization, and full-stack web.",
        inLanguage: "en-GB",
        publisher: { "@id": `${siteUrl}/#person` },
      },
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
          addressRegion: "Greater Manchester",
          addressCountry: "GB",
        },
        worksFor: { "@id": `${siteUrl}/#organization` },
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
      // Organization / local ProfessionalService Schema (global)
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${siteUrl}/#organization`,
        name: "Luke Taylor - Unity Developer",
        alternateName: [
          "Unity Developer Manchester",
          "Unity Developer in Manchester",
          "Manchester Unity Developer",
          "Freelance Unity Developer Manchester",
        ],
        description:
          "Freelance Unity developer in Manchester offering Manchester-based Unity development and full-stack web services: games, VR, EEG/BCI, Next.js, React, and .NET, for clients in Manchester and across the UK.",
        url: siteUrl,
        image: `${siteUrl}/images/luke-taylor-dev.webp`,
        logo: `${siteUrl}/icons/favicon.png`,
        priceRange: "££",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Manchester",
          addressRegion: "Greater Manchester",
          addressCountry: "GB",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 53.4808,
          longitude: -2.2426,
        },
        areaServed: [
          { "@type": "City", name: "Manchester" },
          { "@type": "AdministrativeArea", name: "Greater Manchester" },
          { "@type": "AdministrativeArea", name: "North West England" },
          { "@type": "Country", name: "United Kingdom" },
        ],
        knowsAbout: [
          "Unity Development",
          "Game Development",
          "VR Development",
          "EEG Visualization",
          "Brain-Computer Interface",
          "Full-Stack Web Development",
        ],
        sameAs: [
          "https://github.com/luketaylor-dev",
          "https://www.linkedin.com/in/luke-taylor-ab5080166/",
        ],
        founder: { "@id": `${siteUrl}/#person` },
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
