import Image from "next/image";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import {
  Gamepad2,
  Code,
  Trophy,
  Users,
  Zap,
  ArrowRight,
  Building2,
} from "lucide-react";

import { ResumeDownload } from "@/components/content";
import { Text } from "@/components/atoms";
import { InteractiveButton, Card } from "@/components/ui";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export const metadata: Metadata = generateMetadata(
  "About Luke Taylor - Unity Developer Manchester | EEG & VR Specialist",
  "Learn about Luke Taylor, a Manchester-based Unity Developer with 8+ years' experience in EEG visualization, VR development, and F2P games. Expert in brain-computer interfaces and immersive experiences.",
  "/about",
);

export default function AboutPage() {
  return (
    <div className="space-y-8 pt-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "About" }]} className="mb-0" />

      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-6">
          <Text
            variant="heading1"
            as="h1"
            className="text-4xl md:text-6xl tracking-tight text-white"
          >
            About Me
          </Text>
          <Text
            variant="paragraph"
            as="p"
            color="muted"
            className="text-xl max-w-3xl mx-auto leading-relaxed"
          >
            I&apos;m Luke Taylor, a{" "}
            <strong className="text-primary-300">
              Manchester-based Unity Developer
            </strong>{" "}
            exploring the space between technology and creativity. From
            brainwave-driven visuals to scalable free-to-play systems. My work
            spans experimental prototypes, immersive VR experiences, and
            commercial game development, always with a focus on building tools
            and systems that push ideas further and empower creative teams. I
            also have a background in{" "}
            <strong className="text-primary-300">.NET web development</strong>{" "}
            and work with <strong className="text-primary-300">React</strong>,
            this portfolio is built with Next.js.
          </Text>
        </div>

        {/* Avatar */}
        <div className="mx-auto w-40 h-40 rounded-full border-2 border-neutral-700 p-1">
          <Image
            src="/images/luke-taylor-dev.webp"
            alt="Luke Taylor - Manchester-based Unity Developer specializing in EEG visualization and VR development"
            width={160}
            height={160}
            className="w-full h-full rounded-full object-cover"
            priority
          />
        </div>
      </section>

      {/* Location Section */}
      <section className="text-center space-y-6">
        <Card variant="default" className="rounded-2xl p-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary-500 p-3">
              <Building2 className="w-full h-full text-white" />
            </div>
            <Text variant="heading3" as="h2">
              Based in Manchester
            </Text>
          </div>
          <Text
            variant="paragraph"
            as="p"
            color="muted"
            className="text-lg leading-relaxed"
          >
            I'm proud to be part of Manchester's thriving tech scene. The city's
            innovative spirit and collaborative community make it the perfect
            place for cutting-edge{" "}
            <a
              href="/projects?tags=EEG"
              className="text-primary-300 hover:text-primary-200 transition-colors underline"
            >
              EEG visualization
            </a>
            ,{" "}
            <a
              href="/projects?tags=VR"
              className="text-primary-300 hover:text-primary-200 transition-colors underline"
            >
              VR development
            </a>
            , and{" "}
            <a
              href="/projects"
              className="text-primary-300 hover:text-primary-200 transition-colors underline"
            >
              game development
            </a>{" "}
            projects. Located in the heart of Manchester's digital district, I'm
            perfectly positioned to serve clients across{" "}
            <strong className="text-primary-300">M1, M2, M3, M4</strong> and
            surrounding areas, as well as clients throughout the UK.
          </Text>
          <Text variant="paragraph" as="p" color="secondary" className="mt-4">
            Available for local Manchester projects, UK-wide collaboration, and
            remote work worldwide. Conveniently located near{" "}
            <strong className="text-primary-300">Manchester University</strong>{" "}
            and the{" "}
            <strong className="text-primary-300">Northern Quarter</strong> tech
            hub.{" "}
            <a
              href="/manchester-services"
              className="text-primary-400 hover:text-primary-300 transition-colors underline"
            >
              Learn more about my Manchester services
            </a>
            .
          </Text>
        </Card>
      </section>

      {/* Story Section */}
      <section className="space-y-8">
        <div className="text-center space-y-6">
          <Text variant="heading2" as="h2">
            My Story
          </Text>
          <Text
            variant="paragraph"
            as="p"
            className="text-lg text-primary-300 max-w-3xl mx-auto leading-relaxed"
          >
            I build scalable Unity systems that help teams ship games faster and
            with more creative freedom.
          </Text>
        </div>
        <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed">
          <Text variant="paragraph" as="p" color="muted">
            My path into Unity began after starting out in .NET web and mobile
            development, but I quickly gravitated toward it out of a passion for{" "}
            <strong className="text-primary-300">game development</strong> and
            creating interactive experiences. Over the years, I’ve worked across
            genres and platforms, shipping{" "}
            <strong className="text-primary-300">mobile casino titles</strong>{" "}
            to large audiences, prototyping VR collaboration spaces, and
            experimenting with{" "}
            <strong className="text-primary-300">
              EEG-driven visual performance
            </strong>{" "}
            systems.
          </Text>
          <Text variant="paragraph" as="p" color="muted">
            What ties all of this together is a drive to build{" "}
            <strong className="text-primary-300">frameworks and tools</strong>{" "}
            that help others create faster, smarter, and more engaging
            experiences. Every project is an opportunity to learn, push
            technical boundaries, and craft something that hasn’t been done
            before, whether that’s{" "}
            <strong className="text-primary-300">VR development</strong>,{" "}
            <strong className="text-primary-300">game systems</strong>, or new
            forms of{" "}
            <strong className="text-primary-300">interactive media</strong>.
          </Text>
          <Text variant="paragraph" as="p" color="muted">
            I’m excited to keep exploring how Unity can power the next
            generation of{" "}
            <strong className="text-primary-300">game development</strong>,{" "}
            <strong className="text-primary-300">VR</strong>, and{" "}
            <strong className="text-primary-300">immersive technology</strong>.
          </Text>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="space-y-8">
        <Text variant="heading2" as="h2" className="text-center">
          Areas of Expertise
        </Text>
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
                  Web &amp; Mobile
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

      {/* Values Section */}
      <section className="space-y-8">
        <Text variant="heading2" as="h2" className="text-center">
          What Drives Me
        </Text>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card variant="default" className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-500 p-3">
                <Trophy className="w-full h-full text-white" />
              </div>
              <Text variant="heading4" as="h3">
                Excellence
              </Text>
            </div>
            <Text
              variant="paragraph"
              as="p"
              color="secondary"
              className="leading-relaxed"
            >
              I believe in delivering work that exceeds expectations. Every
              project is an opportunity to create something exceptional that
              users will love and remember.
            </Text>
          </Card>

          <Card variant="default" className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-500 p-3">
                <Zap className="w-full h-full text-white" />
              </div>
              <Text variant="heading4" as="h3">
                Innovation
              </Text>
            </div>
            <Text
              variant="paragraph"
              as="p"
              color="secondary"
              className="leading-relaxed"
            >
              Pushing boundaries and exploring new technologies is what excites
              me. I love taking on challenges that haven't been solved before
              and finding creative solutions.
            </Text>
          </Card>

          <Card variant="default" className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-500 p-3">
                <Users className="w-full h-full text-white" />
              </div>
              <Text variant="heading4" as="h3">
                Collaboration
              </Text>
            </div>
            <Text
              variant="paragraph"
              as="p"
              color="secondary"
              className="leading-relaxed"
            >
              The best projects come from great teamwork. I value open
              communication, feedback, and working together to bring the best
              ideas to life.
            </Text>
          </Card>

          <Card variant="default" className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-500 p-3">
                <Code className="w-full h-full text-white" />
              </div>
              <Text variant="heading4" as="h3">
                Quality
              </Text>
            </div>
            <Text
              variant="paragraph"
              as="p"
              color="secondary"
              className="leading-relaxed"
            >
              Clean, maintainable code and smooth user experiences are
              non-negotiable. I believe in building things that last and can
              evolve with your needs.
            </Text>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 py-16">
        <Card variant="default" className="rounded-3xl p-8">
          <Text variant="heading2" as="h2" className="mb-6">
            Ready to Work Together?
          </Text>
          <Text
            variant="paragraph"
            as="p"
            color="muted"
            className="text-lg max-w-2xl mx-auto mb-8"
          >
            Whether you have a specific project in mind or just want to explore
            possibilities, I'd love to hear from you. Let's create something
            amazing together. Available for projects across the UK and remote
            collaboration worldwide.
          </Text>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <InteractiveButton href="/contact" variant="primary" size="lg">
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </InteractiveButton>
            <ResumeDownload variant="secondary" size="lg" />
            <InteractiveButton href="/projects" variant="secondary" size="lg">
              View My Work
            </InteractiveButton>
          </div>
        </Card>
      </section>
    </div>
  );
}
