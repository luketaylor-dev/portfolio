import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import { getAllProjects } from "@/lib/content";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import { Text } from "@/components/atoms";
import { InteractiveButton, Card, Breadcrumbs } from "@/components/ui";
import { ProjectsGrid } from "./projects-client";

export const metadata: Metadata = generateMetadata(
  "Projects - Luke Taylor | Unity Development Portfolio",
  "Explore Luke Taylor's Unity development projects including EEG visualization, VR experiences, and game development. See the technical challenges and solutions behind each project.",
  "/projects"
);

export const revalidate = 3600; // 1 hour

const ProjectsContent = () => {
  const allProjects = getAllProjects();
  const allProjectsSorted = allProjects
    ? allProjects.sort((a, b) => +new Date(b.date) - +new Date(a.date))
    : [];

  return (
    <div className="space-y-8 pt-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Projects" }]} className="mb-0" />

      {/* Hero Section */}
      <section className="text-center space-y-8">
        <Text
          variant="heading1"
          as="h1"
          className="tracking-tight text-white"
        >
          My Projects
        </Text>
        <Text
          variant="paragraph"
          as="p"
          color="muted"
          className="text-xl max-w-3xl mx-auto leading-relaxed"
        >
          A collection of my work in Unity development, from{" "}
          <a
            href="/projects/eeg-visualiser"
            className="text-primary-300 hover:text-primary-200 transition-colors underline"
          >
            EEG visualizations
          </a>{" "}
          and{" "}
          <a
            href="/projects/vr-office"
            className="text-primary-300 hover:text-primary-200 transition-colors underline"
          >
            VR experiences
          </a>{" "}
          to engaging free-to-play games. Each project represents a unique
          challenge and learning opportunity.
        </Text>
      </section>

      {/* Projects Grid with Filtering */}
      <section>
        <ProjectsGrid projects={allProjectsSorted} />
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 py-16">
        <Card variant="default" className="rounded-3xl p-8">
          <Text variant="heading2" as="h2" className="mb-6">
            Have a Project in Mind?
          </Text>
          <Text
            variant="paragraph"
            as="p"
            color="muted"
            className="text-lg max-w-2xl mx-auto mb-8"
          >
            Whether it&apos;s a VR experience, EEG visualization, or game
            development project, I&apos;d love to help bring your vision to
            life. Let&apos;s create something amazing together.
          </Text>
          <InteractiveButton href="/contact" variant="primary" size="lg">
            Let&apos;s Discuss Your Project
            <ArrowRight className="w-5 h-5" />
          </InteractiveButton>
        </Card>
      </section>
    </div>
  );
};

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="space-y-16">Loading...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}
