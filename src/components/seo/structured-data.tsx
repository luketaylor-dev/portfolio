export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Luke Taylor",
    jobTitle: "Unity Developer",
    description:
      "Unity Developer with 7+ years' experience in F2P games, VR, EEG visualisation, and tool development. Portfolio of shipped titles and innovative prototypes.",
    url: "https://www.dibza.co.uk",
    image: "https://www.dibza.co.uk/images/luke-taylor-dev.jpg",
    sameAs: [
      "https://github.com/luketaylor-dev",
      "https://www.linkedin.com/in/luke-taylor-ab5080166/",
    ],
    knowsAbout: [
      "Unity Development",
      "VR Development",
      "EEG Visualization",
      "Game Development",
      "C# Programming",
      "Virtual Reality",
      "Brain Computer Interface",
      "Free-to-Play Games",
      "Casino Games",
      "Mobile Game Development",
      "Unity Tools Development",
      "Neuroscience Technology",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelance Unity Developer",
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Unity Developer",
      description:
        "From Brainwaves to Gameplay – Unity Innovation. Specialized in cutting-edge Unity development with a focus on immersive experiences",
    },
    alumniOf: {
      "@type": "Organization",
      name: "Unity Developer Community",
    },
    award: [
      "Multi-million dollar revenue from shipped F2P games",
      "Innovative EEG visualization technology",
      "Advanced VR development expertise",
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
