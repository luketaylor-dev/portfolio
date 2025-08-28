import {
  Brain,
  Gamepad2,
  Code,
  Trophy,
  Users,
  Zap,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

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
            I'm Luke Taylor, a passionate Unity Developer who loves pushing the
            boundaries of what's possible in interactive experiences. From
            brain-computer interfaces to immersive VR worlds, I'm here to turn
            your wildest ideas into reality.
          </p>
        </div>

        {/* Avatar */}
        <div className="mx-auto w-40 h-40 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 p-2 shadow-2xl shadow-purple-500/25">
          <img
            src="/images/luke-taylor-dev.jpg"
            alt="Luke Taylor - Unity Developer"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-white text-center">My Story</h2>
        <div className="max-w-4xl mx-auto space-y-6 text-lg text-neutral-300 leading-relaxed">
          <p>
            My journey into Unity development started with a fascination for how
            technology can create immersive, interactive experiences that blur
            the line between the digital and physical worlds. What began as a
            hobby quickly evolved into a passion for building experiences that
            not only entertain but also educate and inspire.
          </p>
          <p>
            I specialize in three core areas that I believe represent the future
            of interactive media:
            <strong className="text-purple-300"> EEG visualization</strong> for
            understanding the human mind,
            <strong className="text-purple-300"> VR development</strong> for
            creating truly immersive worlds, and{" "}
            <strong className="text-purple-300"> game development</strong> for
            crafting engaging experiences that millions can enjoy.
          </p>
          <p>
            Every project I work on is an opportunity to learn something new,
            push technical boundaries, and create something that hasn't been
            done before. I believe in clean, maintainable code, performance
            optimization, and most importantly, creating experiences that users
            will remember.
          </p>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-white text-center">
          Areas of Expertise
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="group p-6 rounded-2xl border border-purple-800/50 bg-gradient-to-br from-purple-900/20 to-transparent hover:border-purple-600/50 hover:bg-purple-900/30 transition-all duration-300 hover:scale-105">
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
          </div>

          <div className="group p-6 rounded-2xl border border-purple-800/50 bg-gradient-to-br from-purple-900/20 to-transparent hover:border-purple-600/50 hover:bg-purple-900/30 transition-all duration-300 hover:scale-105">
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
          </div>

          <div className="group p-6 rounded-2xl border border-purple-800/50 bg-gradient-to-br from-purple-900/20 to-transparent hover:border-purple-600/50 hover:bg-purple-900/30 transition-all duration-300 hover:scale-105">
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
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-white text-center">
          What Drives Me
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-4">
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
          </div>

          <div className="space-y-4">
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
          </div>

          <div className="space-y-4">
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
          </div>

          <div className="space-y-4">
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
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 py-16 rounded-3xl bg-gradient-to-r from-purple-900/30 via-purple-800/20 to-purple-900/30 border border-purple-800/50">
        <h2 className="text-3xl font-bold text-white">
          Ready to Work Together?
        </h2>
        <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
          Whether you have a specific project in mind or just want to explore
          possibilities, I'd love to hear from you. Let's create something
          amazing together.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
            href="/contact"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-purple-500/50 rounded-2xl font-semibold text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 hover:scale-105"
            href="/projects"
          >
            View My Work
          </Link>
        </div>
      </section>
    </div>
  );
}
