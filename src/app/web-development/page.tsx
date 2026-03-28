import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import { getAllProjects } from "@/lib/content";
import { Card } from "@/components/ui";
import { Code, Globe, Database, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { ProjectCard } from "@/components/content";
import Link from "next/link";
import { InteractiveButton } from "@/components/ui";

export const metadata: Metadata = generateMetadata(
  "Web Development | .NET & React | Luke Taylor",
  "Luke Taylor - .NET and React web development. Full-stack experience with ASP.NET Core, Next.js, and TypeScript. Founding developer on Tatfindr and builder of this portfolio.",
  "/web-development"
);

const WEB_TAGS = [
  "React",
  "Next.js",
  "ASP.NET",
  ".NET",
  "TypeScript",
  "Web Development",
];

export default function WebDevelopmentPage() {
  const allProjects = getAllProjects();
  const webProjects = allProjects.filter((project) =>
    project.tags.some((tag) =>
      WEB_TAGS.some((webTag) =>
        tag.toLowerCase().includes(webTag.toLowerCase())
      )
    )
  );

  return (
    <div className="space-y-8 pt-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Services", href: "/about" },
          { label: "Web Development" },
        ]}
        className="mb-0"
      />

      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Web &amp; Mobile Development
          </h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Beyond Unity, I build full-stack web and mobile applications with{" "}
            <strong className="text-primary-300">.NET</strong>,{" "}
            <strong className="text-primary-300">React</strong>,{" "}
            <strong className="text-primary-300">React Native</strong>, and{" "}
            <strong className="text-primary-300">Flutter</strong>. From API
            design and database architecture to cross-platform mobile apps and
            modern frontend experiences with Next.js and TypeScript.
          </p>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-white text-center">
          What I Work With
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card variant="default" hover={true} className="group">
            <div className="w-16 h-16 rounded-2xl bg-primary-500 p-3 mb-4 transition-transform">
              <Code className="w-full h-full text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Backend
            </h3>
            <p className="text-neutral-400 leading-relaxed text-sm">
              ASP.NET Core, EF Core, PostgreSQL, FluentValidation, JWT auth, and
              REST APIs.
            </p>
          </Card>
          <Card variant="default" hover={true} className="group">
            <div className="w-16 h-16 rounded-2xl bg-primary-500 p-3 mb-4 transition-transform">
              <Globe className="w-full h-full text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Frontend
            </h3>
            <p className="text-neutral-400 leading-relaxed text-sm">
              React, Next.js, React Native, Flutter, TypeScript, and Tailwind CSS.
            </p>
          </Card>
          <Card variant="default" hover={true} className="group">
            <div className="w-16 h-16 rounded-2xl bg-primary-500 p-3 mb-4 transition-transform">
              <Database className="w-full h-full text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              DevOps & Data
            </h3>
            <p className="text-neutral-400 leading-relaxed text-sm">
              Docker, PostgreSQL, CI/CD, and cloud deployment.
            </p>
          </Card>
        </div>
      </section>

      {/* Web Projects */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-white text-center">
          Web Projects
        </h2>
        {webProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {webProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                variant="default"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-400 mb-6">
              Web projects will appear here once tagged.
            </p>
            <InteractiveButton href="/projects" variant="secondary">
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </InteractiveButton>
          </div>
        )}
        <div className="text-center">
          <Link
            href="/projects"
            className="text-primary-300 hover:text-primary-200 transition-colors text-sm"
          >
            View all projects →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-6 max-w-2xl mx-auto">
        <p className="text-neutral-400">
          Interested in a web or mobile project? I&apos;m available for
          full-stack web and React Native / Flutter work alongside Unity development.
        </p>
        <InteractiveButton href="/contact" variant="primary" size="lg">
          Get in Touch
          <ArrowRight className="w-5 h-5" />
        </InteractiveButton>
      </section>
    </div>
  );
}
