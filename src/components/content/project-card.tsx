"use client";
import Link from "next/link";
import { ArrowRight, Gamepad2, Star } from "lucide-react";
import { Card } from "@/components/ui";
import Image from "next/image";

interface Project {
  slug: string;
  title: string;
  description: string;
  cover?: string | undefined;
  altText?: string | undefined;
  date: string;
  featured?: boolean | undefined;
}

interface ProjectCardProps {
  project: Project;
  variant?: "default" | "featured";
  className?: string;
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
          <div className="aspect-video bg-gradient-to-br from-neutral-800 to-primary-800/20 overflow-hidden rounded-xl relative group-hover:shadow-2xl group-hover:shadow-primary-500/20 transition-all duration-500">
            {project.cover ? (
              <Image
                src={project.cover}
                alt={project.altText || `${project.title} - project preview`}
                width={400}
                height={225}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-500 ease-out"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center">
                    <Gamepad2 className="w-8 h-8 text-primary-400" />
                  </div>
                  <p className="text-sm text-primary-300 font-medium">
                    Project Image
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Project Content */}
          <div className="space-y-3 flex flex-col flex-grow">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white group-hover:text-primary-300 transition-colors duration-300 group-hover:scale-105 transform origin-left">
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
              <ArrowRight className="w-4 h-4 text-primary-400 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 ease-out" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
