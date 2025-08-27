import Link from "next/link";
import { allProjects } from "contentlayer/generated";
import { ArrowRight, Play, Star, Code, Gamepad2, Brain } from "lucide-react";

export default function HomePage() {
  const featured = allProjects.filter((p) => p.featured).slice(0, 3);
  const recent = allProjects
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 6);

  return (
    <div className="relative">
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center text-center relative pb-20">
          {/* Floating elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

          <div className="space-y-8 max-w-4xl mx-auto px-4 relative z-10">
            {/* Avatar placeholder */}
            <div className="mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 p-1 shadow-2xl shadow-purple-500/25">
              <div className="w-full h-full rounded-full bg-neutral-800 flex items-center justify-center">
                <span className="text-4xl font-bold text-purple-400">LT</span>
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
                Luke Taylor
              </h1>
              <p className="text-2xl md:text-3xl font-medium text-purple-200">
                Unity Developer for VR, EEG & Free‑to‑Play
              </p>
              <p className="text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                I build immersive Unity projects that push boundaries — from
                EEG‑driven visualisations and multiplayer VR experiences to
                high‑revenue free‑to‑play poker & casino games.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                href="/projects"
              >
                View My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                className="group px-8 py-4 border-2 border-purple-500/50 rounded-2xl font-semibold text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                href="/contact"
              >
                Let's Collaborate
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-24 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              What I Do Best
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Specialized in cutting-edge Unity development with a focus on
              immersive experiences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group p-6 rounded-2xl border border-purple-800/50 bg-gradient-to-br from-purple-900/20 to-transparent hover:border-purple-600/50 hover:bg-purple-900/30 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-3 mb-4 group-hover:scale-110 transition-transform">
                <Brain className="w-full h-full text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                EEG Visualization
              </h3>
              <p className="text-neutral-400">
                Transform brain data into stunning visual experiences
              </p>
            </div>

            <div className="group p-6 rounded-2xl border border-purple-800/50 bg-gradient-to-br from-purple-900/20 to-transparent hover:border-purple-600/50 hover:bg-purple-900/30 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-3 mb-4 group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-full h-full text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                VR Development
              </h3>
              <p className="text-neutral-400">
                Immersive virtual reality experiences that captivate
              </p>
            </div>

            <div className="group p-6 rounded-2xl border border-purple-800/50 bg-gradient-to-br from-purple-900/20 to-transparent hover:border-purple-600/50 hover:bg-purple-900/30 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-3 mb-4 group-hover:scale-110 transition-transform">
                <Code className="w-full h-full text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Game Development
              </h3>
              <p className="text-neutral-400">
                High-performance free-to-play and casino games
              </p>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-24 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center gap-3">
              <Star className="w-8 h-8 text-purple-400" />
              Featured Projects
              <Star className="w-8 h-8 text-purple-400" />
            </h2>
            <p className="text-neutral-400">
              My best work that showcases innovation and technical excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featured.map((p) => (
              <article
                key={p.slug}
                className="group relative overflow-hidden rounded-2xl border border-purple-800/50 bg-gradient-to-br from-neutral-900 to-purple-900/20 hover:border-purple-600/50 transition-all duration-500 hover:scale-105"
              >
                {/* Project Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-purple-800/30 to-neutral-800 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                      <Gamepad2 className="w-8 h-8 text-purple-400" />
                    </div>
                    <p className="text-sm text-purple-300 font-medium">
                      Project Preview
                    </p>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    <Link href={p.url} className="hover:underline">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="text-neutral-300 leading-relaxed">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags?.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-purple-600/20 text-purple-300 border border-purple-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </article>
            ))}

            {featured.length === 0 && (
              <div className="col-span-3 text-center py-12">
                <p className="text-neutral-400">
                  Add{" "}
                  <code className="bg-purple-900/30 px-2 py-1 rounded text-purple-300">
                    featured: true
                  </code>{" "}
                  to a project in{" "}
                  <code className="bg-purple-900/30 px-2 py-1 rounded text-purple-300">
                    /content/projects
                  </code>
                  .
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Recent Projects */}
        <section className="py-24 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Latest Work
            </h2>
            <p className="text-neutral-400">
              Fresh projects hot off the Unity engine
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {recent.map((p) => (
              <article
                key={p.slug}
                className="group overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-purple-900/10 hover:border-purple-600/50 hover:bg-purple-900/20 transition-all duration-300 hover:scale-105"
              >
                {/* Project Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-neutral-800 to-purple-800/20 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                      <Code className="w-6 h-6 text-purple-400" />
                    </div>
                    <p className="text-xs text-purple-300">Preview</p>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                    <Link href={p.url} className="hover:underline">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </article>
            ))}

            {recent.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-neutral-400">
                  No projects yet — create one in{" "}
                  <code className="bg-purple-900/30 px-2 py-1 rounded text-purple-300">
                    /content/projects
                  </code>
                  .
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="text-center space-y-8 py-20 rounded-3xl bg-gradient-to-r from-purple-900/30 via-purple-800/20 to-purple-900/30 border border-purple-800/50">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Let's collaborate on your next Unity project. Whether it's VR, EEG
              visualization, or game development, I'm here to bring your vision
              to life.
            </p>
            <Link
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
              href="/contact"
            >
              Start a Project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
