import Image from "next/image";
import { getAllProjects, getAllBlogPosts } from "@/lib/content";
import {
  ArrowRight,
  Play,
  Star,
  Code,
  Gamepad2,
  Brain,
  GitBranch,
} from "lucide-react";
import {
  ScrollAnimation,
  ParallaxBackground,
  TypingAnimation,
  CharacterReveal,
  AnimatedGradientText,
} from "@/components/animation";
import {
  ProjectCard,
  BlogCard,
  SkillCard,
  GitHubCard,
} from "@/components/content";
import { Text } from "@/components/atoms";
import { InteractiveButton, Card } from "@/components/ui";

// Route segment config for performance
export const revalidate = 3600; // Revalidate every hour
export const dynamic = "force-static";

export default function HomePage() {
  const allProjects = getAllProjects();
  const allBlogPosts = getAllBlogPosts();
  const featured = allProjects.filter((p) => p.featured).slice(0, 2);
  const featuredBlog = allBlogPosts.filter((p) => p.featured).slice(0, 1);
  const recent = allProjects
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 6);

  return (
    <div className="relative">
      <div className="relative z-10">
        {/* Hero Section */}
        <section
          className="min-h-screen flex items-center justify-center text-center relative pb-20"
          role="banner"
          aria-labelledby="hero-heading"
        >
          {/* Floating elements with parallax */}
          <ParallaxBackground speed={0.3}>
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl animate-pulse motion-reduce:animate-none"></div>
          </ParallaxBackground>
          <ParallaxBackground speed={0.2}>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary-600/10 rounded-full blur-3xl animate-pulse motion-reduce:animate-none delay-1000"></div>
          </ParallaxBackground>

          <div className="space-y-8 max-w-4xl mx-auto px-4 relative z-10">
            {/* Avatar */}
            <ScrollAnimation direction="up" delay={200}>
              <div className="mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 p-1 shadow-2xl shadow-primary-500/25">
                <Image
                  src="/images/luke-taylor-dev.webp"
                  alt="Luke Taylor - Manchester-based Unity Developer specializing in EEG visualization and VR development"
                  width={128}
                  height={128}
                  className="w-full h-full rounded-full object-cover"
                  priority
                />
              </div>
            </ScrollAnimation>

            <div className="space-y-6">
              <ScrollAnimation direction="up" delay={400}>
                <Text
                  variant="heading1"
                  as="h1"
                  id="hero-heading"
                  className="md:text-7xl tracking-tight bg-gradient-to-r from-white via-primary-100 to-primary-300 bg-clip-text text-transparent hover:scale-105 motion-reduce:transform-none transition-transform duration-300 leading-tight pb-2"
                >
                  <TypingAnimation text="Luke Taylor" speed={150} delay={600} />
                </Text>
              </ScrollAnimation>
              <ScrollAnimation direction="up" delay={600}>
                <Text
                  variant="heading3"
                  as="p"
                  className="text-xl md:text-3xl font-medium"
                >
                  <span className="md:hidden bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                    From Brainwaves to Gameplay – Unity Innovation
                  </span>
                  <span className="hidden md:inline">
                    <AnimatedGradientText type="moving">
                      From Brainwaves to Gameplay – Unity Innovation
                    </AnimatedGradientText>
                  </span>
                </Text>
              </ScrollAnimation>
              <ScrollAnimation direction="up" delay={800}>
                <Text
                  variant="paragraph"
                  as="p"
                  color="muted"
                  className="text-lg max-w-3xl mx-auto leading-relaxed"
                >
                  A Manchester-based Unity Developer building immersive projects
                  that push boundaries, from{" "}
                  <a
                    href="/projects?tags=EEG"
                    className="text-primary-300 hover:text-primary-200 transition-colors underline"
                  >
                    EEG‑driven visualisations
                  </a>{" "}
                  and{" "}
                  <a
                    href="/projects?tags=VR"
                    className="text-primary-300 hover:text-primary-200 transition-colors underline"
                  >
                    multiplayer VR experiences
                  </a>{" "}
                  to high‑revenue free‑to‑play poker & casino games. Serving
                  clients across the UK and beyond.
                </Text>
              </ScrollAnimation>
            </div>

            {/* CTA Buttons */}
            <ScrollAnimation direction="up" delay={1000}>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <InteractiveButton href="/projects" variant="primary" size="lg">
                  View My Work
                  <ArrowRight className="w-5 h-5" />
                </InteractiveButton>
                <InteractiveButton
                  href="/contact"
                  variant="secondary"
                  size="lg"
                >
                  Let's Collaborate
                  <Play className="w-5 h-5" />
                </InteractiveButton>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-24 space-y-12" aria-labelledby="skills-heading">
          <ScrollAnimation direction="up">
            <div className="text-center space-y-4">
              <Text
                variant="heading2"
                as="h2"
                id="skills-heading"
                className="md:text-4xl"
              >
                <CharacterReveal
                  text="What I Do Best"
                  animation="slideUp"
                  staggerDelay={30}
                  delay={100}
                />
              </Text>
              <Text
                variant="paragraph"
                as="p"
                color="secondary"
                className="max-w-2xl mx-auto"
              >
                Specialized in cutting-edge Unity development with a focus on
                immersive experiences
              </Text>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <SkillCard
              href="/projects?tags=EEG"
              icon={<Brain className="w-full h-full text-white" />}
              title="EEG Visualization"
              description="Transform brain data into stunning visual experiences that bridge the gap between neuroscience and interactive technology."
              feature="Real-time Processing"
              ariaLabel="View EEG visualization projects"
            />

            <SkillCard
              href="/projects?tags=VR"
              icon={<Gamepad2 className="w-full h-full text-white" />}
              title="VR Development"
              description="Immersive virtual reality experiences that captivate and transport users to new worlds with cutting-edge technology."
              feature="Immersive Experiences"
              ariaLabel="View VR development projects"
            />

            <SkillCard
              href="/projects?tags=Game%20Development"
              icon={<Code className="w-full h-full text-white" />}
              title="Game Development"
              description="High-performance free-to-play and casino games with engaging mechanics and scalable architectures."
              feature="Engaging Mechanics"
              ariaLabel="View game development projects"
            />
          </div>
          <a
            href="/web-development"
            className="block text-center text-sm text-neutral-500 mt-6 hover:text-primary-400 transition-colors"
            aria-label="Also experienced in .NET web development and React, including this portfolio. View web projects."
          >
            Also experienced in .NET web development and React{" "}
            <span className="text-neutral-600">(including this portfolio)</span>
            . View web projects
          </a>
        </section>

        {/* Featured Blogs & Projects */}
        <section className="py-24 space-y-12">
          <ScrollAnimation direction="up">
            <div className="text-center space-y-4">
              <Text
                variant="heading2"
                as="h2"
                className="md:text-4xl flex items-center justify-center gap-3"
              >
                <Star className="w-8 h-8 text-primary-400" />
                Featured Blogs & Projects
                <Star className="w-8 h-8 text-primary-400" />
              </Text>
              <Text variant="paragraph" as="p" color="secondary">
                My best work and latest insights that showcase innovation and
                technical excellence
              </Text>
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
                <ProjectCard project={project} variant="featured" />
              </ScrollAnimation>
            ))}

            {/* Featured Blog Post */}
            {featuredBlog.map((post, index) => (
              <ScrollAnimation
                key={post.slug}
                direction="up"
                delay={600 + index * 200}
              >
                <BlogCard post={post} />
              </ScrollAnimation>
            ))}
          </div>

          {featured.length === 0 && featuredBlog.length === 0 && (
            <div className="col-span-3 text-center py-12">
              <Text variant="paragraph" as="p" color="secondary">
                Add{" "}
                <code className="bg-primary-900/30 px-2 py-1 rounded text-primary-300">
                  featured: true
                </code>{" "}
                to projects in{" "}
                <code className="bg-primary-900/30 px-2 py-1 rounded text-primary-300">
                  /content/projects
                </code>{" "}
                or create blog posts in{" "}
                <code className="bg-primary-900/30 px-2 py-1 rounded text-primary-300">
                  /content/blog
                </code>
                .
              </Text>
            </div>
          )}
        </section>

        {/* Recent Projects */}
        <section className="py-24 space-y-12">
          <ScrollAnimation direction="up">
            <div className="text-center space-y-4">
              <Text variant="heading2" as="h2" className="md:text-4xl">
                Latest Work
              </Text>
              <Text variant="paragraph" as="p" color="secondary">
                Fresh projects hot off the Unity engine
              </Text>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {recent.map((project, index) => (
              <ScrollAnimation
                key={project.slug}
                direction="up"
                delay={200 + index * 150}
              >
                <ProjectCard project={project} />
              </ScrollAnimation>
            ))}

            {recent.length === 0 && (
              <ScrollAnimation direction="up" delay={200}>
                <div className="col-span-full text-center py-12">
                  <Text variant="paragraph" as="p" color="secondary">
                    No projects yet - create one in{" "}
                    <code className="bg-primary-900/30 px-2 py-1 rounded text-primary-300">
                      /content/projects
                    </code>
                    .
                  </Text>
                </div>
              </ScrollAnimation>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <ScrollAnimation direction="up">
            <Card
              variant="default"
              className="text-center space-y-8 py-20 rounded-3xl"
            >
              <Text variant="heading2" as="h2" className="md:text-4xl">
                Ready to Build Something Amazing?
              </Text>
              <Text
                variant="paragraph"
                as="p"
                color="muted"
                className="text-lg max-w-2xl mx-auto"
              >
                Let's collaborate on your next Unity project. Whether it's VR,
                EEG visualization, or game development, I'm here to bring your
                vision to life. Available for projects across the UK and remote
                collaboration worldwide.
              </Text>
              <InteractiveButton href="/contact" variant="primary" size="lg">
                Start a Project
                <ArrowRight className="w-5 h-5" />
              </InteractiveButton>
            </Card>
          </ScrollAnimation>
        </section>

        {/* GitHub Showcase */}
        <section className="py-24 space-y-12">
          <ScrollAnimation direction="up">
            <div className="text-center space-y-4">
              <Text
                variant="heading2"
                as="h2"
                className="md:text-4xl flex items-center justify-center gap-3"
              >
                <GitBranch className="w-8 h-8 text-primary-400" />
                Open Source & Experiments
                <GitBranch className="w-8 h-8 text-primary-400" />
              </Text>
              <Text
                variant="paragraph"
                as="p"
                color="secondary"
                className="max-w-2xl mx-auto"
              >
                Check out some of my open source projects and experimental work
                on GitHub
              </Text>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ScrollAnimation
              direction="up"
              delay={200}
              className="h-full flex flex-col"
            >
              <GitHubCard
                href="https://github.com/luketaylor-dev"
                icon={<Gamepad2 className="w-8 h-8 text-primary-400" />}
                title="Tower Defence RPG"
                description="Indie RPG prototype with tower defence mechanics and branching dialogue"
              />
            </ScrollAnimation>

            <ScrollAnimation
              direction="up"
              delay={350}
              className="h-full flex flex-col"
            >
              <GitHubCard
                href="https://github.com/luketaylor-dev/DialogueSystem"
                icon={<Code className="w-8 h-8 text-primary-400" />}
                title="Unity Dialogue System"
                description="Custom node-based conversation editor built with Unity Graph View"
              />
            </ScrollAnimation>

            <ScrollAnimation
              direction="up"
              delay={500}
              className="h-full flex flex-col"
            >
              <GitHubCard
                href="https://github.com/luketaylor-dev/Portal-Chess"
                icon={
                  <svg
                    className="w-8 h-8 text-primary-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                }
                title="Portal Chess"
                description="Chess but with portals - an experimental Unity project exploring spatial mechanics"
              />
            </ScrollAnimation>
          </div>

          <ScrollAnimation direction="up" delay={650}>
            <div className="text-center">
              <InteractiveButton
                href="https://github.com/luketaylor-dev"
                variant="secondary"
                size="md"
              >
                View All Projects on GitHub
                <ArrowRight className="w-4 h-4" />
              </InteractiveButton>
            </div>
          </ScrollAnimation>
        </section>
      </div>
    </div>
  );
}
