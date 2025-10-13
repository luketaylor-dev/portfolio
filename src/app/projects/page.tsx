import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import { allProjects } from "contentlayer/generated";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import { ProjectCard } from "@/components/content";
import { InteractiveButton, Card, Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = generateMetadata(
  "Projects - Luke Taylor | Unity Development Portfolio",
  "Explore Luke Taylor's Unity development projects including EEG visualization, VR experiences, and game development. See the technical challenges and solutions behind each project.",
  "/projects"
);

// Prefer static rendering with periodic ISR for predictable performance
export const revalidate = 3600; // 1 hour
export const dynamic = "force-static";

const ProjectsContent = () => {
  // Sort projects immediately on server - no client-side state needed
  const allProjectsSorted = allProjects
    ? allProjects.sort((a, b) => +new Date(b.date) - +new Date(a.date))
    : [];

  return (
    <Suspense fallback={<div className="space-y-16">Loading...</div>}>
      <div className="space-y-16">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Projects" }]} className="mb-8" />

        {/* Hero Section */}
        <section className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            A collection of my work in Unity development, from{" "}
            <a
              href="/projects/eeg-visualiser"
              className="text-purple-300 hover:text-purple-200 transition-colors underline"
            >
              EEG visualizations
            </a>{" "}
            and{" "}
            <a
              href="/projects/vr-office"
              className="text-purple-300 hover:text-purple-200 transition-colors underline"
            >
              VR experiences
            </a>{" "}
            to engaging free-to-play games. Each project represents a unique
            challenge and learning opportunity.
          </p>
        </section>

        {/* Projects Grid */}
        <section className="space-y-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProjectsSorted.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-6 py-16">
          <Card variant="default" className="rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">
              Have a Project in Mind?
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
              Whether it's a VR experience, EEG visualization, or game
              development project, I'd love to help bring your vision to life.
              Let's create something amazing together.
            </p>
            <InteractiveButton href="/contact" variant="primary" size="lg">
              Let's Discuss Your Project
              <ArrowRight className="w-5 h-5" />
            </InteractiveButton>
          </Card>
        </section>
      </div>
    </Suspense>
  );
};

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="space-y-16">Loading...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}
