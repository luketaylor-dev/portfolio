"use client";
import Link from "next/link";
import { allProjects } from "contentlayer/generated";
import {
  ArrowRight,
  Play,
  Star,
  Code,
  Gamepad2,
  Brain,
  Eye,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for demo purposes
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-purple-600 p-1 shadow-2xl shadow-purple-500/25 animate-pulse">
            <div className="w-full h-full rounded-full bg-neutral-800"></div>
          </div>
          <div className="space-y-4">
            <div className="h-8 bg-neutral-800 rounded-lg w-64 mx-auto animate-pulse"></div>
            <div className="h-4 bg-neutral-800 rounded w-96 mx-auto animate-pulse"></div>
            <div className="h-4 bg-neutral-800 rounded w-80 mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

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
            {/* Avatar */}
            <div className="mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 p-1 shadow-2xl shadow-purple-500/25">
              <img
                src="/images/luke-taylor-dev.jpg"
                alt="Luke Taylor - Unity Developer"
                className="w-full h-full rounded-full object-cover"
              />
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {featured.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`}>
                <article className="group overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-purple-900/10 hover:border-purple-600/50 hover:bg-purple-900/20 transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-neutral-800 to-purple-800/20 overflow-hidden">
                    {project.cover ? (
                      <img
                        src={project.cover}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center space-y-2">
                          <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                            <Gamepad2 className="w-8 h-8 text-purple-400" />
                          </div>
                          <p className="text-sm text-purple-300 font-medium">
                            Project Image
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-neutral-400 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-neutral-400">
                          {project.featured ? "Featured" : "Project"}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

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
            {recent.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`}>
                <article className="group overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-purple-900/10 hover:border-purple-600/50 hover:bg-purple-900/20 transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-neutral-800 to-purple-800/20 overflow-hidden">
                    {project.cover ? (
                      <img
                        src={project.cover}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center space-y-2">
                          <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                            <Code className="w-8 h-8 text-purple-400" />
                          </div>
                          <p className="text-sm text-purple-300 font-medium">
                            Project Image
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-neutral-400 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-neutral-400">
                          {new Date(project.date).getFullYear()}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
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

        {/* GitHub Showcase */}
        <section className="py-24 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center gap-3">
              <svg
                className="w-8 h-8 text-purple-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Open Source & Experiments
              <svg
                className="w-8 h-8 text-purple-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Check out some of my open source projects and experimental work on
              GitHub
            </p>
          </div>

          {/* Environment Debug (Remove this after testing) */}
          <div className="text-center p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg max-w-md mx-auto">
            <p className="text-sm text-purple-300">
              <strong>Environment:</strong> {process.env.NODE_ENV}
            </p>
            <p className="text-sm text-purple-300">
              <strong>URL:</strong>{" "}
              {typeof window !== "undefined"
                ? window.location.hostname
                : "server-side"}
            </p>
            <p className="text-sm text-purple-300">
              <strong>Vercel URL:</strong>{" "}
              {process.env.NEXT_PUBLIC_VERCEL_URL || "not set"}
            </p>
            {/* Trigger redeploy for environment variables */}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Portal Chess */}
            <a
              href="https://github.com/luketaylor-dev/Portal-Chess"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <article className="overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-purple-900/10 hover:border-purple-600/50 hover:bg-purple-900/20 transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-neutral-800 to-purple-800/20 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-purple-400"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </div>
                    <p className="text-sm text-purple-300 font-medium">
                      Portal Chess
                    </p>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                    Portal Chess
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Chess but with portals - an experimental Unity project
                    exploring spatial mechanics
                  </p>
                  <div className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                    <span className="text-sm font-medium">View on GitHub</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </a>

            {/* Tower Defence RPG */}
            <a
              href="https://github.com/luketaylor-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <article className="overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-purple-900/10 hover:border-purple-600/50 hover:bg-purple-900/20 transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-neutral-800 to-purple-800/20 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                      <Gamepad2 className="w-8 h-8 text-purple-400" />
                    </div>
                    <p className="text-sm text-purple-300 font-medium">
                      Tower Defence RPG
                    </p>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                    Tower Defence RPG
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Indie RPG prototype with tower defence mechanics and
                    branching dialogue
                  </p>
                  <div className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                    <span className="text-sm font-medium">View on GitHub</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </a>

            {/* Unity Dialogue System */}
            <a
              href="https://github.com/luketaylor-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <article className="overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-purple-900/10 hover:border-purple-600/50 hover:bg-purple-900/20 transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-neutral-800 to-purple-800/20 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                      <Code className="w-8 h-8 text-purple-400" />
                    </div>
                    <p className="text-sm text-purple-300 font-medium">
                      Dialogue System
                    </p>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                    Unity Dialogue System
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Custom node-based conversation editor built with Unity Graph
                    View
                  </p>
                  <div className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                    <span className="text-sm font-medium">View on GitHub</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </a>
          </div>

          <div className="text-center">
            <a
              href="https://github.com/luketaylor-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-purple-500/50 rounded-xl font-medium text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 hover:scale-105"
            >
              View All Projects on GitHub
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
