import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";
import { Card } from "@/components/ui";
import { Text } from "@/components/atoms";
import { Brain, Building2, MapPin, Users, Zap } from "lucide-react";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export const metadata: Metadata = generateMetadata(
  "Unity Developer Manchester Services | EEG & VR Development",
  "Unity Developer Manchester offering professional development services. Specializing in EEG visualization, VR development, and brain-computer interfaces. Serving M1, M2, M3, M4 and surrounding areas.",
  "/manchester-services"
);

export default function ManchesterServicesPage() {
  return (
    <div className="space-y-8 pt-8">
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
              url: siteUrl,
            },
            areaServed: ["Manchester", "North West", "United Kingdom"],
            serviceType: [
              "EEG Visualization",
              "VR Development",
              "Unity Development",
              "Game Development",
            ],
            url: `${siteUrl}/manchester-services`,
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
        className="mb-0"
      />

      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-6">
          <Text
            variant="heading1"
            as="h1"
            className="tracking-tight text-white"
          >
            Manchester Unity Development Services
          </Text>
          <Text
            variant="paragraph"
            as="p"
            color="muted"
            className="text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Professional Unity development services in the heart of Manchester's
            tech scene. Specializing in cutting-edge{" "}
            <strong className="text-primary-300">EEG visualization</strong>,{" "}
            <strong className="text-primary-300">VR development</strong>, and{" "}
            <strong className="text-primary-300">
              brain-computer interfaces
            </strong>{" "}
            for clients across the North West, UK-wide, and beyond.
          </Text>
        </div>
      </section>

      {/* Location Benefits */}
      <section className="space-y-8">
        <Text variant="heading2" as="h2" className="text-center">
          Why Choose a Manchester Unity Developer?
        </Text>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card variant="default" hover={true} className="group">
            <div className="w-16 h-16 rounded-2xl bg-primary-500 p-3 mb-4 transition-transform">
              <Building2 className="w-full h-full text-white" />
            </div>
            <Text variant="heading4" as="h3" className="mb-3">
              Local Tech Hub
            </Text>
            <Text variant="paragraph" as="p" color="secondary" className="leading-relaxed">
              Based in Manchester's thriving digital district, close to{" "}
              <strong className="text-primary-300">Manchester University</strong>
              , <strong className="text-primary-300">MediaCityUK</strong>, and
              the <strong className="text-primary-300">Northern Quarter</strong>{" "}
              tech community.
            </Text>
          </Card>

          <Card variant="default" hover={true} className="group">
            <div className="w-16 h-16 rounded-2xl bg-primary-500 p-3 mb-4 transition-transform">
              <MapPin className="w-full h-full text-white" />
            </div>
            <Text variant="heading4" as="h3" className="mb-3">
              Convenient Location
            </Text>
            <Text variant="paragraph" as="p" color="secondary" className="leading-relaxed">
              Easily accessible from Manchester city centre and surrounding
              areas. Available for in-person meetings and collaborative sessions
              across the North West, including Liverpool, Leeds, and Sheffield.
              Also available for UK-wide projects and               remote collaboration.
            </Text>
          </Card>

          <Card variant="default" hover={true} className="group">
            <div className="w-16 h-16 rounded-2xl bg-primary-500 p-3 mb-4 transition-transform">
              <Users className="w-full h-full text-white" />
            </div>
            <Text variant="heading4" as="h3" className="mb-3">
              Local Network
            </Text>
            <Text variant="paragraph" as="p" color="secondary" className="leading-relaxed">
              Connected to Manchester's vibrant tech community, including{" "}
              <strong className="text-primary-300">startups</strong>,{" "}
              <strong className="text-primary-300">universities</strong>, and{" "}
              <strong className="text-primary-300">innovation hubs</strong>.
            </Text>
          </Card>
        </div>
      </section>

      {/* Services Offered */}
      <section className="space-y-8">
        <Text variant="heading2" as="h2" className="text-center">
          Manchester-Based Development Services
        </Text>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* EEG card */}
          <div className="h-full rounded-2xl bg-[#1a1a1a] border border-neutral-800 border-l-4 border-l-primary-500 p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center shrink-0">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <Text variant="heading3" as="h3" className="text-white">
                EEG Visualisation
              </Text>
            </div>
            <Text variant="paragraph" as="p" color="secondary" className="leading-relaxed">
              Cutting-edge brain-computer interface development for Manchester's
              neuroscience and entertainment industries.
            </Text>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                Real-time EEG data processing
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                BrainFlow &amp; Shader Graph
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                Brain-computer interface systems
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                Unity visualisation pipelines
              </li>
            </ul>
            <a
              href="/projects/eeg-visualiser"
              className="inline-flex items-center gap-1.5 text-sm text-primary-400 hover:gap-2.5 transition-all duration-200"
            >
              See the Brainrave project <Zap className="w-4 h-4" />
            </a>
          </div>

          {/* VR card */}
          <div className="h-full rounded-2xl bg-[#1a1a1a] border border-neutral-800 border-l-4 border-l-primary-500 p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <Text variant="heading3" as="h3" className="text-white">
                VR Development
              </Text>
            </div>
            <Text variant="paragraph" as="p" color="secondary" className="leading-relaxed">
              Immersive virtual reality experiences for Manchester's growing XR
              and entertainment industries.
            </Text>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                Meta SDK &amp; XR Toolkit
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                Educational &amp; enterprise simulations
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                Performance-optimised experiences
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                Unity XR development
              </li>
            </ul>
            <a
              href="/projects/vr-office"
              className="inline-flex items-center gap-1.5 text-sm text-primary-400 hover:gap-2.5 transition-all duration-200"
            >
              See the VR Office project <MapPin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="space-y-8">
        <Text variant="heading2" as="h2" className="text-center">
          Service Areas
        </Text>
        <Card variant="default" className="p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Text variant="heading4" as="h3" className="mb-3">
                North West England
              </Text>
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
              <Text variant="heading4" as="h3" className="mb-3">
                Central England
              </Text>
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
              <Text variant="heading4" as="h3" className="mb-3">
                Remote & Online
              </Text>
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
        <Text variant="heading2" as="h2" className="text-center">FAQ</Text>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card variant="default" className="p-6 space-y-3">
            <Text variant="heading4" as="h3">
              Do you work with clients outside Manchester?
            </Text>
            <Text variant="paragraph" as="p" color="secondary">
              Yes. I collaborate across the UK and remotely worldwide. In-person
              sessions are available across the               North West.
            </Text>
          </Card>
          <Card variant="default" className="p-6 space-y-3">
            <Text variant="heading4" as="h3">
              What industries do you support?
            </Text>
            <Text variant="paragraph" as="p" color="secondary">
              Games, research, education, events, and creative tech, especially
              projects involving Unity, EEG/BCI,               or VR.
            </Text>
          </Card>
          <Card variant="default" className="p-6 space-y-3">
            <Text variant="heading4" as="h3">
              Can you integrate EEG hardware and SDKs?
            </Text>
            <Text variant="paragraph" as="p" color="secondary">
              Yes. Experience includes BrainFlow and custom data pipelines for
              real‑time visualisation and               interaction.
            </Text>
          </Card>
          <Card variant="default" className="p-6 space-y-3">
            <Text variant="heading4" as="h3">
              How do we start a project?
            </Text>
            <Text variant="paragraph" as="p" color="secondary">
              Reach out via the contact page with goals, timeline, and any
              reference material. I’ll propose a clear               next step.
            </Text>
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
                  text: "Games, research, education, events, and creative tech, especially projects involving Unity, EEG/BCI, or VR.",
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
          <Text variant="heading2" as="h2" className="mb-6">
            Ready to Start Your Manchester Project?
          </Text>
          <Text variant="paragraph" as="p" color="muted" className="text-lg max-w-2xl mx-auto mb-8">
            Let's discuss your Unity development needs. Available for in-person
            meetings across the North West, UK-wide projects, or remote
            collaboration worldwide.
          </Text>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors duration-200"
            >
              Get in Touch
            </a>
            <a
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-3 border border-primary-600 text-primary-300 font-semibold rounded-xl hover:bg-primary-600/10 transition-all duration-300"
            >
              View My Work
            </a>
          </div>
        </Card>
      </section>
    </div>
  );
}
