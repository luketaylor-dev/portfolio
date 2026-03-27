import Image from "next/image";
import { getAllProjects } from "@/lib/content";
import { ArrowRight, Gamepad2, Code, Mail } from "lucide-react";
import { TestimonialsSection } from "@/components/content";
import { Text } from "@/components/atoms";
import { InteractiveButton } from "@/components/ui";
import SelectedWorksClient from "./selected-works-client";

export const revalidate = 3600;
export const dynamic = "force-static";

export default function HomePage() {
  const allProjects = getAllProjects();

  return (
    <div className="space-y-0">
      {/* Hero — full-width bleed */}
      <section
        className="relative overflow-hidden"
        style={{
          aspectRatio: "21/9",
          minHeight: 320,
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
        }}
        role="banner"
        aria-labelledby="hero-heading"
      >
        <Image
          src="/images/brainrave.webp"
          alt="EEG Visualiser — real-time brainwave-driven VFX running in Unity"
          fill
          className="object-cover"
          priority
        />
        {/* Dark scrim */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 space-y-4">
          <div className="space-y-2">
            <Text
              variant="heading1"
              as="h1"
              id="hero-heading"
              className="text-white text-4xl md:text-6xl font-bold leading-tight"
            >
              Luke Taylor
            </Text>
            <p className="text-lg md:text-xl text-neutral-300 font-medium">
              From Brainwaves to Gameplay
            </p>
            <p className="text-sm text-neutral-400">Currently available</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <InteractiveButton href="/projects" variant="primary" size="md">
              View My Work
              <ArrowRight className="w-4 h-4" />
            </InteractiveButton>
            <InteractiveButton href="/contact" variant="secondary" size="md">
              Get in Touch
              <Mail className="w-4 h-4" />
            </InteractiveButton>
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section className="py-24 space-y-12" aria-labelledby="skills-heading">
        <div className="text-center space-y-2">
          <Text variant="heading2" as="h2" id="skills-heading" className="md:text-4xl">
            What I Do
          </Text>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Game Dev card — orange accent */}
          <a
            href="/projects?workType=game"
            className="group block focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-2xl"
            aria-label="View game development projects"
          >
            <div className="h-full rounded-2xl bg-[#1a1a1a] border border-neutral-800 border-l-4 border-l-primary-500 p-8 space-y-6 hover:border-neutral-700 transition-colors duration-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center shrink-0">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <Text variant="heading3" as="h3" className="text-white">
                  Game Development
                </Text>
              </div>
              <Text variant="paragraph" as="p" color="secondary" className="leading-relaxed">
                Unity-first across game dev, XR, and brain-computer interfaces. From shipped
                F2P casino titles to experimental EEG-driven visuals and immersive VR spaces.
              </Text>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                  Unity &amp; C#
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                  XR / VR (Meta SDK, XR Toolkit)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                  EEG Visualisation (BrainFlow, Shader Graph)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                  F2P systems, IAP &amp; LiveOps
                </li>
              </ul>
              <span className="inline-flex items-center gap-1.5 text-sm text-primary-400 group-hover:gap-2.5 transition-all duration-200">
                View game projects <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </a>

          {/* Web Dev card — blue accent */}
          <a
            href="/projects?workType=web"
            className="group block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-2xl"
            aria-label="View web development projects"
          >
            <div className="h-full rounded-2xl bg-[#1a1a1a] border border-neutral-800 border-l-4 border-l-blue-500 p-8 space-y-6 hover:border-neutral-700 transition-colors duration-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <Text variant="heading3" as="h3" className="text-white">
                  Web Development
                </Text>
              </div>
              <Text variant="paragraph" as="p" color="secondary" className="leading-relaxed">
                Full-stack web with a focus on React and .NET. Background in building
                production platforms — from Next.js frontends to ASP.NET Core APIs.
              </Text>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  Next.js &amp; React (TypeScript)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  ASP.NET Core, C# &amp; Umbraco
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  PostgreSQL &amp; REST APIs
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  Tailwind CSS &amp; modern tooling
                </li>
              </ul>
              <span className="inline-flex items-center gap-1.5 text-sm text-blue-400 group-hover:gap-2.5 transition-all duration-200">
                View web projects <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* Selected Works */}
      <section className="py-24 space-y-10" aria-labelledby="works-heading">
        <div className="text-center space-y-2">
          <Text variant="heading2" as="h2" id="works-heading" className="md:text-4xl">
            Selected Works
          </Text>
          <Text variant="paragraph" as="p" color="secondary">
            A cross-section of game dev and web projects
          </Text>
        </div>

        <SelectedWorksClient projects={allProjects} />
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Contact CTA */}
      <section className="py-24">
        <div className="border border-neutral-800 rounded-2xl bg-[#1a1a1a] text-center space-y-6 py-16 px-8">
          <Text variant="heading2" as="h2" className="md:text-4xl">
            Ready to Work Together?
          </Text>
          <Text
            variant="paragraph"
            as="p"
            color="muted"
            className="max-w-xl mx-auto"
          >
            Whether it's VR, EEG visualisation, or game development — let's
            build something worth playing.
          </Text>
          <InteractiveButton href="/contact" variant="primary" size="lg">
            Get in Touch
            <ArrowRight className="w-5 h-5" />
          </InteractiveButton>
        </div>
      </section>
    </div>
  );
}
