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
            <p className="text-base md:text-lg text-primary-300 font-semibold">
              Unity Developer in Manchester — Games, VR, EEG &amp; Full-Stack Web
            </p>
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
            href="/manchester-services"
            className="group block focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-2xl"
            aria-label="Manchester Unity development services — games, VR, EEG"
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
            href="/web-development"
            className="group block focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-2xl"
            aria-label="Web and mobile development services — Next.js, React, .NET"
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

      {/* FAQ */}
      <section className="py-24 space-y-12" aria-labelledby="faq-heading">
        <div className="text-center space-y-2">
          <Text variant="heading2" as="h2" id="faq-heading" className="md:text-4xl">
            Frequently Asked Questions
          </Text>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="rounded-2xl bg-[#1a1a1a] border border-neutral-800 p-6 space-y-3">
            <Text variant="heading4" as="h3" className="text-white">
              Where are you based?
            </Text>
            <Text variant="paragraph" as="p" color="secondary" className="leading-relaxed">
              Manchester, UK. I work with clients across the North West in
              person, UK-wide on contract, and remotely with teams worldwide.
            </Text>
          </div>

          <div className="rounded-2xl bg-[#1a1a1a] border border-neutral-800 p-6 space-y-3">
            <Text variant="heading4" as="h3" className="text-white">
              What do you specialise in?
            </Text>
            <Text variant="paragraph" as="p" color="secondary" className="leading-relaxed">
              Unity development for games, VR, and EEG / brain-computer
              interfaces, plus full-stack web with Next.js, React, and
              ASP.NET Core.
            </Text>
          </div>

          <div className="rounded-2xl bg-[#1a1a1a] border border-neutral-800 p-6 space-y-3">
            <Text variant="heading4" as="h3" className="text-white">
              Are you available for freelance or contract work?
            </Text>
            <Text variant="paragraph" as="p" color="secondary" className="leading-relaxed">
              Yes — currently available for freelance and contract roles, both
              short prototypes and longer engagements.
            </Text>
          </div>

          <div className="rounded-2xl bg-[#1a1a1a] border border-neutral-800 p-6 space-y-3">
            <Text variant="heading4" as="h3" className="text-white">
              How much Unity experience do you have?
            </Text>
            <Text variant="paragraph" as="p" color="secondary" className="leading-relaxed">
              Over 8 years across shipped F2P mobile titles, VR prototypes, and
              experimental EEG-driven visuals in Unity with C#.
            </Text>
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Where are you based?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Manchester, UK. I work with clients across the North West in person, UK-wide on contract, and remotely with teams worldwide.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What do you specialise in?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Unity development for games, VR, and EEG / brain-computer interfaces, plus full-stack web with Next.js, React, and ASP.NET Core.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are you available for freelance or contract work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes — currently available for freelance and contract roles, both short prototypes and longer engagements.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How much Unity experience do you have?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Over 8 years across shipped F2P mobile titles, VR prototypes, and experimental EEG-driven visuals in Unity with C#.",
                  },
                },
              ],
            }),
          }}
          suppressHydrationWarning={true}
        />
      </section>

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
