export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Luke Taylor",
    jobTitle: "Unity Developer",
    description:
      "Unity Developer specialising in VR, EEG & Free-to-Play game development. Building immersive experiences that push boundaries.",
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
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelance Unity Developer",
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Unity Developer",
      description:
        "Specialized in cutting-edge Unity development with a focus on immersive experiences",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
