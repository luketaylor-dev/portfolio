"use client";
import Link from "next/link";
import Image from "next/image";
import { allProjects, allBlogPosts } from "contentlayer/generated";
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
import ScrollAnimation from "@/components/scroll-animation";
import ParallaxBackground from "@/components/parallax-background";

export default function HomePage() {
  const featured = allProjects.filter((p) => p.featured).slice(0, 2);
  const featuredBlog = allBlogPosts.filter((p) => p.featured).slice(0, 1);
  const recent = allProjects
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 6);

  return (
    <div className="relative">
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center text-center relative pb-20">
          {/* Floating elements with parallax */}
          <ParallaxBackground speed={0.3}>
            <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          </ParallaxBackground>
          <ParallaxBackground speed={0.2}>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </ParallaxBackground>

          <div className="space-y-8 max-w-4xl mx-auto px-4 relative z-10">
            {/* Avatar */}
            <ScrollAnimation direction="up" delay={200}>
              <div className="mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 p-1 shadow-2xl shadow-purple-500/25">
                <Image
                  src="/images/luke-taylor-dev.jpg"
                  alt="Luke Taylor - Unity Developer"
                  width={128}
                  height={128}
                  className="w-full h-full rounded-full object-cover"
                  priority
                />
              </div>
            </ScrollAnimation>

            <div className="space-y-6">
              <ScrollAnimation direction="up" delay={400}>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                  Luke Taylor
                </h1>
              </ScrollAnimation>
              <ScrollAnimation direction="up" delay={600}>
                <p className="text-2xl md:text-3xl font-medium text-purple-200">
                  Unity Developer for VR, EEG & Free‑to‑Play
                </p>
              </ScrollAnimation>
              <ScrollAnimation direction="up" delay={800}>
                <p className="text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                  I build immersive Unity projects that push boundaries — from
                  EEG‑driven visualisations and multiplayer VR experiences to
                  high‑revenue free‑to‑play poker & casino games.
                </p>
              </ScrollAnimation>
            </div>

            {/* CTA Buttons */}
            <ScrollAnimation direction="up" delay={1000}>
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
            </ScrollAnimation>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-24 space-y-12">
          <ScrollAnimation direction="up">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                What I Do Best
              </h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                Specialized in cutting-edge Unity development with a focus on
                immersive experiences
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group relative p-8 rounded-2xl border border-purple-800/50 bg-gradient-to-br from-purple-900/20 to-transparent hover:border-purple-600/50 hover:bg-purple-900/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 hover:shadow-purple-500/20 overflow-hidden">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10 space-y-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-4 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40">
                  <Brain className="w-full h-full text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  EEG Visualization
                </h3>
                <p className="text-neutral-300 leading-relaxed text-lg">
                  Transform brain data into stunning visual experiences that
                  bridge the gap between neuroscience and interactive
                  technology.
                </p>
                <div className="pt-4">
                  <div className="flex items-center gap-2 text-purple-300 text-sm font-medium">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    Real-time Processing
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative p-8 rounded-2xl border border-purple-800/50 bg-gradient-to-br from-purple-900/20 to-transparent hover:border-purple-600/50 hover:bg-purple-900/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10 space-y-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-4 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40">
                  <Gamepad2 className="w-full h-full text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  VR Development
                </h3>
                <p className="text-neutral-300 leading-relaxed text-lg">
                  Immersive virtual reality experiences that captivate and
                  transport users to new worlds with cutting-edge technology.
                </p>
                <div className="pt-4">
                  <div className="flex items-center gap-2 text-purple-300 text-sm font-medium">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    Immersive Experiences
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative p-8 rounded-2xl border border-purple-800/50 bg-gradient-to-br from-purple-900/20 to-transparent hover:border-purple-600/50 hover:bg-purple-900/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10 space-y-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-4 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40">
                  <Code className="w-full h-full text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  Game Development
                </h3>
                <p className="text-neutral-300 leading-relaxed text-lg">
                  High-performance free-to-play and casino games with engaging
                  mechanics and scalable architectures.
                </p>
                <div className="pt-4">
                  <div className="flex items-center gap-2 text-purple-300 text-sm font-medium">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    Engaging Mechanics
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Blogs & Projects */}
        <section className="py-24 space-y-12">
          <ScrollAnimation direction="up">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center gap-3">
                <Star className="w-8 h-8 text-purple-400" />
                Featured Blogs & Projects
                <Star className="w-8 h-8 text-purple-400" />
              </h2>
              <p className="text-neutral-400">
                My best work and latest insights that showcase innovation and
                technical excellence
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Featured Projects */}
            {featured.map((project, index) => (
              <ScrollAnimation
                key={project.slug}
                direction="up"
                delay={200 + index * 200}
              >
                <Link href={`/projects/${project.slug}`}>
                  <article className="group overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-purple-900/10 hover:border-purple-600/50 hover:bg-purple-900/20 transition-all duration-300 hover:scale-105 cursor-pointer">
                    <div className="aspect-video bg-gradient-to-br from-neutral-800 to-purple-800/20 overflow-hidden">
                      {project.cover ? (
                        <Image
                          src={project.cover}
                          alt={project.title}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
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
              </ScrollAnimation>
            ))}

            {/* Featured Blog Post */}
            {featuredBlog.map((post, index) => (
              <ScrollAnimation
                key={post.slug}
                direction="up"
                delay={600 + index * 200}
              >
                <Link href={`/blog/${post.slug}`}>
                  <article className="group overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-purple-900/10 hover:border-purple-600/50 hover:bg-purple-900/20 transition-all duration-300 hover:scale-105 cursor-pointer">
                    <div className="aspect-video bg-gradient-to-br from-neutral-800 to-purple-800/20 overflow-hidden">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center space-y-2">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                              <Code className="w-8 h-8 text-purple-400" />
                            </div>
                            <p className="text-sm text-purple-300 font-medium">
                              Blog Post
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-neutral-400 leading-relaxed">
                          {post.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-neutral-400">
                            Blog Post
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </article>
                </Link>
              </ScrollAnimation>
            ))}
          </div>

          {featured.length === 0 && featuredBlog.length === 0 && (
            <div className="col-span-3 text-center py-12">
              <p className="text-neutral-400">
                Add{" "}
                <code className="bg-purple-900/30 px-2 py-1 rounded text-purple-300">
                  featured: true
                </code>{" "}
                to projects in{" "}
                <code className="bg-purple-900/30 px-2 py-1 rounded text-purple-300">
                  /content/projects
                </code>{" "}
                or create blog posts in{" "}
                <code className="bg-purple-900/30 px-2 py-1 rounded text-purple-300">
                  /content/blog
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
                      <Image
                        src={project.cover}
                        alt={project.title}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
              href="https://github.com/luketaylor-dev/DialogueSystem"
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
