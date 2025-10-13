import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import { Card } from "@/components/ui";
import { Building2, MapPin, Users, Zap } from "lucide-react";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export const metadata: Metadata = generateMetadata(
  "Unity Developer Manchester Services | EEG & VR Development",
  "Unity Developer Manchester offering professional development services. Specializing in EEG visualization, VR development, and brain-computer interfaces. Serving M1, M2, M3, M4 and surrounding areas.",
  "/manchester-services"
);

export default function ManchesterServicesPage() {
  return (
    <div className="space-y-16">
      {/* Structured Data: Service (Manchester services) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Unity Development Services (Manchester)",
            description:
              "EEG visualization, VR development, and brain-computer interface projects for clients in Manchester and across the UK.",
            provider: {
              "@type": "Person",
              name: "Luke Taylor",
              url: "https://www.dibza.co.uk",
            },
            areaServed: ["Manchester", "North West", "United Kingdom"],
            serviceType: [
              "EEG Visualization",
              "VR Development",
              "Unity Development",
              "Game Development",
            ],
            url: "https://www.dibza.co.uk/manchester-services",
          }),
        }}
        suppressHydrationWarning={true}
      />
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Services", href: "/about" },
          { label: "Manchester Services" },
        ]}
        className="mb-8"
      />

      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
            Manchester Unity Development Services
          </h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Professional Unity development services in the heart of Manchester's
            tech scene. Specializing in cutting-edge{" "}
            <strong className="text-purple-300">EEG visualization</strong>,{" "}
            <strong className="text-purple-300">VR development</strong>, and{" "}
            <strong className="text-purple-300">
              brain-computer interfaces
            </strong>{" "}
            for clients across the North West, UK-wide, and beyond.
          </p>
        </div>
      </section>

      {/* Location Benefits */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-white text-center">
          Why Choose a Manchester Unity Developer?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card variant="default" hover={true} className="group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-3 mb-4 group-hover:scale-110 transition-transform">
              <Building2 className="w-full h-full text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Local Tech Hub
            </h3>
            <p className="text-neutral-400 leading-relaxed">
              Based in Manchester's thriving digital district, close to{" "}
              <strong className="text-purple-300">Manchester University</strong>
              , <strong className="text-purple-300">MediaCityUK</strong>, and
              the <strong className="text-purple-300">Northern Quarter</strong>{" "}
              tech community.
            </p>
          </Card>

          <Card variant="default" hover={true} className="group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-3 mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-full h-full text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Convenient Location
            </h3>
            <p className="text-neutral-400 leading-relaxed">
              Easily accessible from Manchester city centre and surrounding
              areas. Available for in-person meetings and collaborative sessions
              across the North West, including Liverpool, Leeds, and Sheffield.
              Also available for UK-wide projects and remote collaboration.
            </p>
          </Card>

          <Card variant="default" hover={true} className="group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-3 mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-full h-full text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Local Network
            </h3>
            <p className="text-neutral-400 leading-relaxed">
              Connected to Manchester's vibrant tech community, including{" "}
              <strong className="text-purple-300">startups</strong>,{" "}
              <strong className="text-purple-300">universities</strong>, and{" "}
              <strong className="text-purple-300">innovation hubs</strong>.
            </p>
          </Card>
        </div>
      </section>

      {/* Services Offered */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-white text-center">
          Manchester-Based Development Services
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card variant="default" className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-3">
                <Zap className="w-full h-full text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                EEG Visualization
              </h3>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Cutting-edge brain-computer interface development for Manchester's
              neuroscience and entertainment industries. Real-time EEG data
              processing and visualization systems.{" "}
              <a
                href="/projects/eeg-visualiser"
                className="text-purple-300 hover:text-purple-200 transition-colors underline"
              >
                See my EEG Visualiser project
              </a>
              .
            </p>
          </Card>

          <Card variant="default" className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-3">
                <Building2 className="w-full h-full text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                VR Development
              </h3>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Immersive virtual reality experiences for Manchester's growing VR
              market. From educational simulations to entertainment experiences.{" "}
              <a
                href="/projects/vr-office"
                className="text-purple-300 hover:text-purple-200 transition-colors underline"
              >
                Check out my VR Office project
              </a>
              .
            </p>
          </Card>
        </div>
      </section>

      {/* Service Areas */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-white text-center">
          Service Areas
        </h2>
        <Card variant="default" className="p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                North West England
              </h3>
              <ul className="space-y-2 text-neutral-400">
                <li>• Manchester</li>
                <li>• Liverpool</li>
                <li>• Leeds</li>
                <li>• Sheffield</li>
                <li>• Bradford</li>
                <li>• Huddersfield</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Central England
              </h3>
              <ul className="space-y-2 text-neutral-400">
                <li>• Birmingham</li>
                <li>• Nottingham</li>
                <li>• Derby</li>
                <li>• Leicester</li>
                <li>• Coventry</li>
                <li>• Stoke-on-Trent</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Remote & Online
              </h3>
              <ul className="space-y-2 text-neutral-400">
                <li>• UK-wide</li>
                <li>• Europe</li>
                <li>• North America</li>
                <li>• Video consultations</li>
                <li>• Online collaboration</li>
                <li>• Remote project management</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* FAQ Section (visible content) */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-white text-center">FAQ</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card variant="default" className="p-6 space-y-3">
            <h3 className="text-lg font-semibold text-white">
              Do you work with clients outside Manchester?
            </h3>
            <p className="text-neutral-400">
              Yes. I collaborate across the UK and remotely worldwide. In-person
              sessions are available across the North West.
            </p>
          </Card>
          <Card variant="default" className="p-6 space-y-3">
            <h3 className="text-lg font-semibold text-white">
              What industries do you support?
            </h3>
            <p className="text-neutral-400">
              Games, research, education, events, and creative tech—especially
              projects involving Unity, EEG/BCI, or VR.
            </p>
          </Card>
          <Card variant="default" className="p-6 space-y-3">
            <h3 className="text-lg font-semibold text-white">
              Can you integrate EEG hardware and SDKs?
            </h3>
            <p className="text-neutral-400">
              Yes. Experience includes BrainFlow and custom data pipelines for
              real‑time visualisation and interaction.
            </p>
          </Card>
          <Card variant="default" className="p-6 space-y-3">
            <h3 className="text-lg font-semibold text-white">
              How do we start a project?
            </h3>
            <p className="text-neutral-400">
              Reach out via the contact page with goals, timeline, and any
              reference material. I’ll propose a clear next step.
            </p>
          </Card>
        </div>
      </section>

      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Do you work with clients outside Manchester?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. I collaborate across the UK and remotely worldwide. In-person sessions are available across the North West.",
                },
              },
              {
                "@type": "Question",
                name: "What industries do you support?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Games, research, education, events, and creative tech—especially projects involving Unity, EEG/BCI, or VR.",
                },
              },
              {
                "@type": "Question",
                name: "Can you integrate EEG hardware and SDKs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Experience includes BrainFlow and custom data pipelines for real‑time visualisation and interaction.",
                },
              },
              {
                "@type": "Question",
                name: "How do we start a project?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Reach out via the contact page with goals, timeline, and any reference material. I’ll propose a clear next step.",
                },
              },
            ],
          }),
        }}
        suppressHydrationWarning={true}
      />

      {/* CTA Section */}
      <section className="text-center space-y-6 py-16">
        <Card variant="default" className="rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Manchester Project?
          </h2>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
            Let's discuss your Unity development needs. Available for in-person
            meetings across the North West, UK-wide projects, or remote
            collaboration worldwide.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
            >
              Get in Touch
            </a>
            <a
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-3 border border-purple-600 text-purple-300 font-semibold rounded-xl hover:bg-purple-600/10 transition-all duration-300"
            >
              View My Work
            </a>
          </div>
        </Card>
      </section>
    </div>
  );
}
