import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/content";
import { InteractiveButton, Card, Badge, WebPImage } from "@/components/ui";
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

// Helper function to get WebP and fallback paths
function getImagePaths(coverPath: string) {
  // If it's already a WebP file, use it as WebP and derive PNG fallback
  if (coverPath.endsWith('.webp')) {
    const basePath = coverPath.replace(/\.webp$/i, '');
    return {
      webp: coverPath,
      fallback: `${basePath}.png`,
    };
  }
  
  // If it's PNG/JPG, convert to WebP
  const basePath = coverPath.replace(/\.(png|jpg|jpeg)$/i, "");
  const extension = coverPath.match(/\.(png|jpg|jpeg)$/i)?.[1] || "png";

  return {
    webp: `${basePath}.webp`,
    fallback: `${basePath}.${extension}`,
  };
}

// Helper function to generate structured data for projects
function generateProjectStructuredData(project: any) {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork" as const,
    name: project.title,
    description: project.seoDescription || project.description,
    author: {
      "@type": "Person",
      name: "Luke Taylor",
      jobTitle: "Unity Developer",
      url: "https://www.dibza.co.uk",
    },
    creator: {
      "@type": "Person",
      name: "Luke Taylor",
    },
    dateCreated: project.date,
    dateModified: project.date,
    image: project.cover
      ? `https://www.dibza.co.uk${project.cover}`
      : undefined,
    url: `https://www.dibza.co.uk/projects/${project.slug}`,
    genre: project.tags || [],
    keywords: project.tags?.join(", ") || "",
    inLanguage: "en",
    isAccessibleForFree: true,
    license: "https://creativecommons.org/licenses/by-nc/4.0/",
  };

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
}

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

  // Use SEO description from MDX if available, otherwise fall back to regular description
  const seoDescription = project.seoDescription || project.description;

  return {
    title: `${project.title} — Luke Taylor`,
    description: seoDescription,
    openGraph: {
      title: `${project.title} — Luke Taylor`,
      description: seoDescription,
      type: "article",
      images: project.cover ? [project.cover] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Luke Taylor`,
      description: seoDescription,
      images: project.cover ? [project.cover] : [],
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = allProjects.find((project) => project.slug === params.slug);
  if (!project) notFound();

  // Generate structured data for this project
  const projectStructuredData = generateProjectStructuredData(project);

  // Function to get icon component from icon name
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
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

  return (
    <div className="space-y-12">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectStructuredData),
        }}
        suppressHydrationWarning={true}
      />

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
              loop
              muted
              autoPlay
              className="w-full h-full object-cover"
              poster={project.cover}
            />
          </div>
        ) : project.cover ? (
          <div className="aspect-video rounded-2xl border border-purple-800/50 overflow-hidden relative">
            <WebPImage
              webpSrc={getImagePaths(project.cover).webp}
              fallbackSrc={getImagePaths(project.cover).fallback}
              alt={
                project.altText ||
                `${project.title} — project preview and interface`
              }
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
      {project.featureTitles && project.featureTitles.length > 0 && (
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-white">Highlights</h2>
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
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-3 mb-4">
                    <IconComponent className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {title}
                  </h3>
                  <p className="text-neutral-400 text-sm">{description}</p>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* Technology Stack */}
      {project.technologies && project.technologies.length > 0 && (
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-white">Technology Stack</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.technologies.map((tech, i) => (
              <Card key={i} variant="default" className="text-center">
                <span className="text-purple-300 font-medium">{tech}</span>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="text-center space-y-6 py-16">
        <Card variant="default" className="rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Inspired by This Project?
          </h2>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
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
