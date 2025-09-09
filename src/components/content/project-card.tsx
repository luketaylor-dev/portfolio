"use client";
import Link from "next/link";
import { ArrowRight, Gamepad2, Star } from "lucide-react";
import { Card, WebPImage } from "@/components/ui";

interface Project {
  slug: string;
  title: string;
  description: string;
  cover?: string | undefined;
  altText?: string | undefined;
  date: string;
  featured?: boolean | undefined;
}

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

interface ProjectCardProps {
  project: Project;
  variant?: "default" | "featured";
  className?: string;
}

export default function ProjectCard({
  project,
  variant = "default",
  className = "",
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} prefetch={true}>
      <Card
        variant="default"
        hover={true}
        className={`group cursor-pointer h-full flex flex-col ${className}`}
      >
        <div className="space-y-4 flex flex-col h-full">
          {/* Project Image */}
          <div className="aspect-video bg-gradient-to-br from-neutral-800 to-purple-800/20 overflow-hidden rounded-xl relative group-hover:shadow-2xl group-hover:shadow-purple-500/20 transition-all duration-500">
            {project.cover ? (
              <WebPImage
                webpSrc={getImagePaths(project.cover).webp}
                fallbackSrc={getImagePaths(project.cover).fallback}
                alt={project.altText || `${project.title} — project preview`}
                width={400}
                height={225}
                className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-500 ease-out"
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

          {/* Project Content */}
          <div className="space-y-3 flex flex-col flex-grow">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300 group-hover:scale-105 transform origin-left">
                {project.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors duration-300 flex-grow">
                {project.description}
              </p>
            </div>

            {/* Project Meta */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2">
                {variant === "featured" ? (
                  <>
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-neutral-400">
                      {project.featured ? "Featured" : "Project"}
                    </span>
                  </>
                ) : (
                  <span className="text-sm text-neutral-400">
                    {new Date(project.date).getFullYear()}
                  </span>
                )}
              </div>
              <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 ease-out" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
