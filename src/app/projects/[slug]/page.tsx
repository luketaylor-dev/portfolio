import { getAllProjects, getProjectBySlug, type Project } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/content";
import { Text } from "@/components/atoms";
import { InteractiveButton, Card, Badge, Breadcrumbs } from "@/components/ui";
import Image from "next/image";
import VideoWithPlayButton from "@/components/ui/video-with-play-button";
import type { ComponentType } from "react";
import {
  ArrowLeft,
  Calendar,
  Tag,
  Play,
  Image as ImageIcon,
  ArrowRight,
  Zap,
  BarChart3,
  Users,
  Settings,
  Shield,
  Globe,
  Database,
  Code,
  Gamepad2,
  Brain,
  Smartphone,
  Monitor,
  Server,
  Cloud,
  Lock,
  Eye,
  Target,
  TrendingUp,
  Star,
  Award,
  Lightbulb,
  Rocket,
  Cpu,
  HardDrive,
} from "lucide-react";

// Helper function to generate structured data for projects
const generateProjectStructuredData = (project: Project) => {
  // Base CreativeWork schema
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork" as const,
    name: project.title,
    description: project.seoDescription || project.description,
    author: {
      "@type": "Person",
      name: "Luke Taylor",
      jobTitle: "Unity Developer",
      url: siteUrl,
    },
    creator: {
      "@type": "Person",
      name: "Luke Taylor",
    },
    dateCreated: project.date,
    dateModified: project.date,
    image: project.cover
      ? `${siteUrl}${project.cover}`
      : undefined,
    url: `${siteUrl}/projects/${project.slug}`,
    genre: project.tags || [],
    keywords: project.tags?.join(", ") || "",
    inLanguage: "en",
    isAccessibleForFree: true,
    license: "https://creativecommons.org/licenses/by-nc/4.0/",
  };

  // Add VideoObject if project has video
  if (project.video) {
    return {
      ...baseStructuredData,
      "@type": "VideoObject" as const,
      contentUrl: `${siteUrl}${project.video}`,
      embedUrl: `${siteUrl}${project.video}`,
      thumbnailUrl: project.cover
        ? `${siteUrl}${project.cover}`
        : undefined,
      uploadDate: project.date,
      duration: "PT5M", // Default 5 minutes, adjust as needed
    };
  }

  // Add SoftwareSourceCode type for technical projects
  if (
    project.tags?.some((tag: string) =>
      ["Unity", "C#", "Tools", "Development"].includes(tag)
    )
  ) {
    return {
      ...baseStructuredData,
      "@type": "SoftwareSourceCode" as const,
      programmingLanguage: "C#",
      runtimePlatform: "Unity",
      codeRepository: "https://github.com/luketaylor-dev",
    };
  }

  return baseStructuredData;
};

export async function generateStaticParams() {
  try {
    const allProjects = getAllProjects();
    return allProjects.map((project) => ({
      slug: project.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  // Handle params as either Promise or direct object (Next.js 16 compatibility)
  const resolvedParams = params instanceof Promise ? await params : params;
  const project = getProjectBySlug(resolvedParams.slug);
  if (!project) return {};

  // Use SEO description from MDX if available, otherwise fall back to regular description
  const seoDescription = project.seoDescription || project.description;
  const ogImage = project.cover
    ? `${siteUrl}${project.cover}`
    : `${siteUrl}/og?title=${encodeURIComponent(project.title)}`;

  return {
    title: `${project.title} - Luke Taylor`,
    description: seoDescription,
    openGraph: {
      title: `${project.title} - Luke Taylor`,
      description: seoDescription,
      type: "article",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} - Luke Taylor`,
      description: seoDescription,
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  // Handle params as either Promise or direct object (Next.js 16 compatibility)
  const resolvedParams = params instanceof Promise ? await params : params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    console.error("Project not found for slug:", resolvedParams.slug);
    notFound();
  }

  // Generate structured data for this project
  const projectStructuredData = generateProjectStructuredData(project);

  // Function to get icon component from icon name
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, ComponentType<{ className?: string }>> = {
      // Performance & Optimization
      zap: Zap,
      trendingUp: TrendingUp,

      // Analytics & Data
      barChart3: BarChart3,
      eye: Eye,

      // User & Social
      users: Users,
      globe: Globe,

      // Security & Privacy
      shield: Shield,
      lock: Lock,

      // Technology & Development
      code: Code,
      database: Database,
      cloud: Cloud,
      server: Server,
      brain: Brain,
      cpu: Cpu,
      hardDrive: HardDrive,

      // Gaming & VR
      gamepad2: Gamepad2,
      monitor: Monitor,
      smartphone: Smartphone,

      // Business & Monetization
      target: Target,
      settings: Settings,
      calendar: Calendar,

      // Quality & Testing
      star: Star,
      award: Award,

      // Innovation & Features
      lightbulb: Lightbulb,
      rocket: Rocket,

      // Default
      play: Play,
    };

    return iconMap[iconName.toLowerCase()] || Play;
  };

  const theme = {
    accentBg: "bg-primary-500",
    accentText: "text-primary-300",
    badgeVariant: "primary" as const,
    techText: "text-primary-300",
    colorScheme: "default" as const,
  };

  return (
    <div className="space-y-8 -mt-4">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectStructuredData),
        }}
        suppressHydrationWarning={true}
      />

      {/* Breadcrumbs + Back Navigation */}
      <div className="max-w-4xl mx-auto space-y-3">
        <Breadcrumbs
          items={[
            { label: "Projects", href: "/projects" },
            { label: project.title },
          ]}
          className="mb-0"
          colorScheme={theme.colorScheme}
        />
        <InteractiveButton href="/projects" variant="ghost" size="sm" colorScheme={theme.colorScheme}>
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </InteractiveButton>
      </div>

      {/* Project Header */}
      <section className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <Text
              variant="heading1"
              as="h1"
              className="tracking-tight text-white"
            >
              {project.title}
            </Text>
            <Text
              variant="paragraph"
              as="p"
              color="muted"
              className="text-xl max-w-4xl leading-relaxed"
            >
              {project.description}
            </Text>
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
                    <Badge key={i} variant={theme.badgeVariant} size="sm">
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
          <div className="aspect-video rounded-2xl border border-neutral-800 overflow-hidden relative">
            <VideoWithPlayButton
              videoSrc={project.video}
              posterSrc={project.cover || ""}
              alt={project.altText || `${project.title} - project video`}
              className="w-full h-full"
            />
          </div>
        ) : project.cover ? (
          <div className="aspect-video rounded-2xl border border-neutral-800 overflow-hidden relative">
            <Image
              src={project.cover || ""}
              alt={
                project.altText ||
                `${project.title} - project preview and interface`
              }
              width={1200}
              height={675}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              className="w-full h-full object-cover"
              priority
            />
          </div>
        ) : (
          <div className="aspect-video rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                  <ImageIcon className={`w-12 h-12 ${theme.accentText}`} />
                </div>
                <div className="space-y-2">
                  <Text variant="paragraph" as="p" className={`${theme.accentText} font-medium`}>
                    Project Media
                  </Text>
                  <Text variant="small" as="p" color="secondary">
                    Add a cover image or video to your project
                  </Text>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Project Content */}
      <section className="max-w-4xl mx-auto space-y-8">
        <div className="prose prose-lg max-w-none">
          <MdxContent source={project.body.raw} />
        </div>
      </section>

      {/* Project Features */}
      {project.featureTitles && project.featureTitles.length > 0 && (
        <section className="max-w-4xl mx-auto space-y-8">
          <Text variant="heading2" as="h2">Highlights</Text>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.featureTitles.slice(0, 3).map((title, i) => {
              const IconComponent = getIconComponent(
                project.featureIcons?.[i] || "play"
              );
              const description =
                project.featureDescriptions?.[i] ||
                "A key feature that enhances the project's capabilities.";
              return (
                <Card key={i} variant="default">
                  <div className={`w-12 h-12 rounded-xl ${theme.accentBg} p-3 mb-4`}>
                    <IconComponent className="w-full h-full text-white" />
                  </div>
                  <Text variant="heading4" as="h3" className="mb-2">
                    {title}
                  </Text>
                  <Text variant="small" as="p" color="secondary">{description}</Text>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* Technology Stack */}
      {project.technologies && project.technologies.length > 0 && (
        <section className="max-w-4xl mx-auto space-y-8">
          <Text variant="heading2" as="h2">Technology Stack</Text>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.technologies.map((tech, i) => (
              <Card
                key={i}
                variant="default"
                className="text-center h-20 flex items-center justify-center"
              >
                <span className={`${theme.techText} font-medium`}>{tech}</span>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto text-center space-y-6 py-16">
        <Card variant="default" className="rounded-3xl p-8">
          <Text variant="heading2" as="h2" className="mb-6">
            Inspired by This Project?
          </Text>
          <Text variant="paragraph" as="p" color="muted" className="text-lg max-w-2xl mx-auto mb-8">
            Let's work together to create something equally amazing for your
            next Unity project. Whether it's VR, EEG visualization, or game
            development, I'm here to help.
          </Text>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <InteractiveButton href="/contact" variant="primary" size="lg" colorScheme={theme.colorScheme}>
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </InteractiveButton>
            <InteractiveButton href="/projects" variant="secondary" size="lg" colorScheme={theme.colorScheme}>
              View More Projects
            </InteractiveButton>
          </div>
        </Card>
      </section>
    </div>
  );
}
