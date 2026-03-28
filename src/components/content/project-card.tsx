"use client";
import Link from "next/link";
import { ArrowRight, Gamepad2 } from "lucide-react";
import { Card } from "@/components/ui";
import { Text } from "@/components/atoms";
import { ResponsiveProjectCover } from "./responsive-project-cover";

interface Project {
  slug: string;
  title: string;
  description: string;
  cover?: string;
  coverPortrait?: string;
  altText?: string;
  date: string;
  featured?: number | boolean;
  workType?: "game" | "web";
}

interface ProjectCardProps {
  project: Project;
  variant?: "default" | "featured" | "compact";
  className?: string;
}

export default function ProjectCard({
  project,
  variant = "default",
  className = "",
}: ProjectCardProps) {
  const hoverTitleClass = "group-hover:text-primary-300";
  const arrowClass = "text-primary-400 group-hover:translate-x-1";

  return (
    <Link href={`/projects/${project.slug}`} prefetch={true}>
      <Card
        variant="default"
        hover={true}
        className={`group cursor-pointer h-full flex flex-col ${className}`}
      >
        <div className="flex flex-col h-full">
          {/* Project Image */}
          <div className="aspect-video bg-neutral-800 overflow-hidden rounded-xl relative">
            {project.cover || project.coverPortrait ? (
              <ResponsiveProjectCover
                project={project}
                sizesLandscape="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                sizesPortrait="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-12 h-12 mx-auto rounded-xl bg-neutral-700 flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-neutral-400" />
                </div>
              </div>
            )}
          </div>

          {/* Project Content */}
          {variant === "compact" ? (
            <div className="pt-3 space-y-1">
              <Text
                variant="heading4"
                as="h3"
                className={`font-bold text-white transition-colors duration-200 ${hoverTitleClass}`}
              >
                {project.title}
              </Text>
              <Text variant="small" as="p" color="secondary" className="line-clamp-2">
                {project.description}
              </Text>
            </div>
          ) : (
            <div className="pt-4 space-y-3 flex flex-col flex-grow">
              <Text
                variant="heading4"
                as="h3"
                className={`font-bold text-white transition-colors duration-200 ${hoverTitleClass}`}
              >
                {project.title}
              </Text>
              <Text variant="paragraph" as="p" color="secondary" className="leading-relaxed flex-grow">
                {project.description}
              </Text>
              <div className="flex items-center justify-between mt-auto pt-2">
                <span className="text-sm text-neutral-500">
                  {new Date(project.date).getFullYear()}
                </span>
                <ArrowRight className={`w-4 h-4 transition-transform duration-200 ${arrowClass}`} />
              </div>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
