export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // Person Schema
      {
        "@type": "Person",
        "@id": "https://www.dibza.co.uk/#person",
        name: "Luke Taylor",
        jobTitle: "Unity Developer",
        description:
          "Unity Developer Manchester with 7+ years' experience in EEG visualization, VR development, and F2P games. Manchester-based expert in brain-computer interfaces, neuroscience applications, and immersive experiences.",
        url: "https://www.dibza.co.uk",
        image: "https://www.dibza.co.uk/images/luke-taylor-dev.jpg",
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
      // Organization Schema
      {
        "@type": "Organization",
        "@id": "https://www.dibza.co.uk/#organization",
        name: "Luke Taylor - Unity Developer",
        description:
          "Unity Developer Manchester services specializing in EEG visualization, VR development, and brain-computer interfaces",
        url: "https://www.dibza.co.uk",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Manchester",
          addressCountry: "United Kingdom",
        },
        areaServed: [
          "Manchester",
          "Liverpool",
          "Leeds",
          "Sheffield",
          "Birmingham",
          "United Kingdom",
        ],
        serviceType: [
          "Unity Development",
          "VR Development",
          "EEG Visualization",
          "Brain Computer Interface Development",
          "Game Development",
        ],
        founder: {
          "@type": "Person",
          name: "Luke Taylor",
        },
      },
      // Service Schema
      {
        "@type": "Service",
        "@id": "https://www.dibza.co.uk/#service",
        name: "Unity Development Services",
        description:
          "Professional Unity development services including EEG visualization, VR development, and brain-computer interfaces",
        provider: {
          "@type": "Person",
          name: "Luke Taylor",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Manchester",
            addressCountry: "United Kingdom",
          },
        },
        areaServed: [
          "Manchester",
          "Liverpool",
          "Leeds",
          "Sheffield",
          "Birmingham",
          "United Kingdom",
        ],
        serviceType: "Software Development",
        category: "Technology Services",
        offers: {
          "@type": "Offer",
          description:
            "Unity development, VR development, EEG visualization services",
          priceCurrency: "GBP",
          availability: "https://schema.org/InStock",
        },
      },
      // FAQ Schema
      {
        "@type": "FAQPage",
        "@id": "https://www.dibza.co.uk/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What Unity development services do you offer?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "I specialize in Unity development, VR development, EEG visualization, brain-computer interfaces, and general game development. I work with F2P games, casino games, immersive experiences, and cutting-edge neuroscience applications.",
            },
          },
          {
            "@type": "Question",
            name: "Do you work with clients outside Manchester?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, I work with clients across the North West including Liverpool, Leeds, Sheffield, and Birmingham. I also offer remote collaboration services worldwide.",
            },
          },
          {
            "@type": "Question",
            name: "What makes your EEG visualization services unique?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "I combine neuroscience expertise with Unity development to create real-time brain-computer interfaces. My experience includes working with BrainFlow SDK, custom Rust modules for beat detection, and adaptive VFX systems.",
            },
          },
          {
            "@type": "Question",
            name: "How much experience do you have with Unity?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "I have 7+ years of experience in Unity development, working on F2P games, VR experiences, and innovative prototypes. I've shipped multiple titles and created cutting-edge EEG visualization systems.",
            },
          },
        ],
      },
      // Breadcrumb Schema
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.dibza.co.uk/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.dibza.co.uk",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About",
            item: "https://www.dibza.co.uk/about",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Manchester Services",
            item: "https://www.dibza.co.uk/manchester-services",
          },
        ],
      },
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
