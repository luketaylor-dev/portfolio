import Image from "next/image";
import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/content";
import { InteractiveButton, Card, Badge } from "@/components/ui";
import {
  ArrowLeft,
  Calendar,
  Tag,
  Play,
  Image as ImageIcon,
  Video,
  ArrowRight,
} from "lucide-react";

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const project = allProjects.find((project) => project.slug === params.slug);
  if (!project) return {};

  return {
    title: `${project.title} — Luke Taylor`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = allProjects.find((project) => project.slug === params.slug);
  if (!project) notFound();

  return (
    <div className="space-y-12">
      {/* Back Navigation */}
      <div className="flex items-center gap-4">
        <InteractiveButton href="/projects" variant="ghost" size="sm">
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </InteractiveButton>
      </div>

      {/* Project Header */}
      <section className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
              {project.title}
            </h1>
            <p className="text-xl text-neutral-300 max-w-4xl leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Project Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(project.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {project.tags && project.tags.length > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="primary" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Project Media */}
        {project.video ? (
          <div className="aspect-video rounded-2xl border border-purple-800/50 overflow-hidden relative">
            <video
              src={project.video}
              controls
              className="w-full h-full object-cover"
              poster={project.cover}
            />
          </div>
        ) : project.cover ? (
          <div className="aspect-video rounded-2xl border border-purple-800/50 overflow-hidden relative">
            <Image
              src={project.cover}
              alt={`${project.title} preview`}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        ) : (
          <div className="aspect-video rounded-2xl bg-gradient-to-br from-purple-800/30 to-neutral-800 border border-purple-800/50 overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-purple-400" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg text-purple-300 font-medium">
                    Project Media
                  </p>
                  <p className="text-sm text-purple-400">
                    Add a cover image or video to your project
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Project Content */}
      <section className="space-y-8">
        <div className="prose prose-lg max-w-none">
          <MdxContent code={project.body.code} />
        </div>
      </section>

      {/* Project Features */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-white">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature Placeholders */}
          <Card variant="default">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-3 mb-4">
              <Play className="w-full h-full text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Interactive Experience
            </h3>
            <p className="text-neutral-400 text-sm">
              Engaging user interactions and responsive design elements that
              create memorable experiences.
            </p>
          </Card>

          <Card variant="default">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-3 mb-4">
              <ImageIcon className="w-full h-full text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Visual Excellence
            </h3>
            <p className="text-neutral-400 text-sm">
              Stunning graphics and smooth animations that bring your vision to
              life with polish and style.
            </p>
          </Card>

          <Card variant="default">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-3 mb-4">
              <Video className="w-full h-full text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Performance Optimized
            </h3>
            <p className="text-neutral-400 text-sm">
              Built with performance in mind, ensuring smooth operation across
              all devices and platforms.
            </p>
          </Card>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-white">Technology Stack</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Unity", "C#", "VR/AR", "EEG Integration"].map((tech, i) => (
            <Card key={i} variant="default" className="text-center">
              <span className="text-purple-300 font-medium">{tech}</span>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 py-16">
        <Card variant="default" className="rounded-3xl">
          <h2 className="text-3xl font-bold text-white">
            Inspired by This Project?
          </h2>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            Let's work together to create something equally amazing for your
            next Unity project. Whether it's VR, EEG visualization, or game
            development, I'm here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <InteractiveButton href="/contact" variant="primary" size="lg">
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </InteractiveButton>
            <InteractiveButton href="/projects" variant="secondary" size="lg">
              View More Projects
            </InteractiveButton>
          </div>
        </Card>
      </section>
    </div>
  );
}
