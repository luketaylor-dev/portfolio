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
        className="relative min-h-[440px] overflow-hidden md:min-h-[400px] xl:min-h-0"
        style={{
          aspectRatio: "21/9",
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

        <div className="absolute inset-0 flex flex-col justify-end space-y-3 px-6 pb-8 pt-[max(1rem,env(safe-area-inset-top))] md:space-y-4 md:p-12">
          <div className="space-y-1.5 md:space-y-2">
            <Text
              variant="heading1"
              as="h1"
              id="hero-heading"
              className="text-white text-3xl font-bold leading-tight md:text-6xl"
            >
              Luke Taylor
            </Text>
            <p className="text-lg md:text-xl text-neutral-300 font-medium">
              From Brainwaves to Gameplay
            </p>
            <p className="text-sm md:text-base text-neutral-400 max-w-2xl leading-relaxed">
              I build software that stays playful under real-world constraints.
            </p>
            <p className="text-sm text-neutral-500">Currently available</p>
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
            </div>
          </a>

          {/* Web Dev card — blue accent */}
          <a
            href="/projects?workType=web"
            className="group block focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-2xl"
            aria-label="View web and mobile projects"
          >
            <div className="h-full rounded-2xl bg-[#1a1a1a] border border-neutral-800 border-l-4 border-l-primary-500 p-8 space-y-6 hover:border-neutral-700 transition-colors duration-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center shrink-0">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <Text variant="heading3" as="h3" className="text-white">
                  Web &amp; Mobile
                </Text>
              </div>
              <Text variant="paragraph" as="p" color="secondary" className="leading-relaxed">
                Full-stack web and mobile with React, React Native, Flutter, and .NET.
                From Next.js frontends and ASP.NET Core APIs to cross-platform mobile apps.
              </Text>
            </div>
          </a>
        </div>
      </section>

      {/* Selected Works */}
      <section className="py-24" aria-labelledby="works-heading">
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
