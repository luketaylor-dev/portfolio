import Image from "next/image";
import {
  Brain,
  Gamepad2,
  Code,
  Trophy,
  Users,
  Zap,
  ArrowRight,
} from "lucide-react";

import { ResumeDownload } from "@/components/content";
import { InteractiveButton, Card } from "@/components/ui";

export default function AboutPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            I’m Luke Taylor, a Unity Developer exploring the space between
            technology and creativity. From brainwave-driven visuals to scalable
            free-to-play systems. My work spans experimental prototypes,
            immersive VR experiences, and commercial game development, always
            with a focus on building tools and systems that push ideas further
            and empower creative teams.
          </p>
        </div>

        {/* Avatar */}
        <div className="mx-auto w-40 h-40 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 p-2 shadow-2xl shadow-purple-500/25">
          <Image
            src="/images/luke-taylor-dev.jpg"
            alt="Luke Taylor - Unity Developer"
            width={160}
            height={160}
            className="w-full h-full rounded-full object-cover"
            priority
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="space-y-8">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-white">My Story</h2>
          <p className="text-lg text-purple-300 max-w-3xl mx-auto leading-relaxed">
            I build scalable Unity systems that help teams ship games faster and
            with more creative freedom.
          </p>
        </div>
        <div className="max-w-4xl mx-auto space-y-6 text-lg text-neutral-300 leading-relaxed">
          <p>
            My path into Unity began after starting out in web and mobile
            development, but I quickly gravitated toward it out of a passion for{" "}
            <strong className="text-purple-300">game development</strong> and
            creating interactive experiences. Over the years, I’ve worked across
            genres and platforms — shipping{" "}
            <strong className="text-purple-300">mobile casino titles</strong> to
            large audiences, prototyping VR collaboration spaces, and
            experimenting with{" "}
            <strong className="text-purple-300">
              EEG-driven visual performance
            </strong>{" "}
            systems.
          </p>
          <p>
            What ties all of this together is a drive to build{" "}
            <strong className="text-purple-300">frameworks and tools</strong>{" "}
            that help others create faster, smarter, and more engaging
            experiences. Every project is an opportunity to learn, push
            technical boundaries, and craft something that hasn’t been done
            before — whether that’s{" "}
            <strong className="text-purple-300">VR development</strong>,{" "}
            <strong className="text-purple-300">game systems</strong>, or new
            forms of{" "}
            <strong className="text-purple-300">interactive media</strong>.
          </p>
          <p>
            I’m excited to keep exploring how Unity can power the next
            generation of{" "}
            <strong className="text-purple-300">game development</strong>,{" "}
            <strong className="text-purple-300">VR</strong>, and{" "}
            <strong className="text-purple-300">immersive technology</strong>.
          </p>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-white text-center">
          Areas of Expertise
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card variant="default" hover={true} className="group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-3 mb-4 group-hover:scale-110 transition-transform">
              <Brain className="w-full h-full text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              EEG Visualization
            </h3>
            <p className="text-neutral-400 leading-relaxed">
              Transform complex brainwave data into intuitive, beautiful visual
              experiences. I've worked with various EEG devices and created
              real-time visualization systems that make brain-computer
              interfaces accessible and engaging.
            </p>
          </Card>

          <Card variant="default" hover={true} className="group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-3 mb-4 group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-full h-full text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              VR Development
            </h3>
            <p className="text-neutral-400 leading-relaxed">
              Create immersive virtual reality experiences that transport users
              to new worlds. From educational simulations to entertainment
              experiences, I focus on performance, comfort, and creating truly
              engaging VR content.
            </p>
          </Card>

          <Card variant="default" hover={true} className="group">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-3 mb-4 group-hover:scale-110 transition-transform">
              <Code className="w-full h-full text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Game Development
            </h3>
            <p className="text-neutral-400 leading-relaxed">
              Build high-performance games that millions can enjoy. Specializing
              in free-to-play and casino games, I focus on creating engaging
              gameplay loops, monetization strategies, and scalable
              architectures.
            </p>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-white text-center">
          What Drives Me
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card variant="default" className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-3">
                <Trophy className="w-full h-full text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Excellence</h3>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              I believe in delivering work that exceeds expectations. Every
              project is an opportunity to create something exceptional that
              users will love and remember.
            </p>
          </Card>

          <Card variant="default" className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-3">
                <Zap className="w-full h-full text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Innovation</h3>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Pushing boundaries and exploring new technologies is what excites
              me. I love taking on challenges that haven't been solved before
              and finding creative solutions.
            </p>
          </Card>

          <Card variant="default" className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-3">
                <Users className="w-full h-full text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Collaboration
              </h3>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              The best projects come from great teamwork. I value open
              communication, feedback, and working together to bring the best
              ideas to life.
            </p>
          </Card>

          <Card variant="default" className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-3">
                <Code className="w-full h-full text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Quality</h3>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Clean, maintainable code and smooth user experiences are
              non-negotiable. I believe in building things that last and can
              evolve with your needs.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 py-16">
        <Card variant="default" className="rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
            Whether you have a specific project in mind or just want to explore
            possibilities, I'd love to hear from you. Let's create something
            amazing together.
          </p>
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
