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
            Unity Developer Manchester Services
          </h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Professional Unity development services in the heart of Manchester's
            tech scene. Specializing in cutting-edge{" "}
            <strong className="text-purple-300">EEG visualization</strong>,{" "}
            <strong className="text-purple-300">VR development</strong>, and{" "}
            <strong className="text-purple-300">
              brain-computer interfaces
            </strong>{" "}
            for clients across the North West and beyond.
          </p>
        </div>
      </section>

      {/* Location Benefits */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-white text-center">
          Why Choose a Unity Developer Manchester?
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

      {/* CTA Section */}
      <section className="text-center space-y-6 py-16">
        <Card variant="default" className="rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Manchester Project?
          </h2>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
            Let's discuss your Unity development needs. Available for in-person
            meetings across the North West or remote collaboration worldwide.
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
