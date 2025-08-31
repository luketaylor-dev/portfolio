"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Gamepad2, Star } from "lucide-react";
import { Card } from "@/components/ui";

interface Project {
  slug: string;
  title: string;
  description: string;
  cover?: string | undefined;
  date: string;
  featured?: boolean | undefined;
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
    <Link href={`/projects/${project.slug}`}>
      <Card
        variant="default"
        hover={true}
        className={`group cursor-pointer ${className}`}
      >
        <div className="space-y-4">
          {/* Project Image */}
          <div className="aspect-video bg-gradient-to-br from-neutral-800 to-purple-800/20 overflow-hidden rounded-xl">
            {project.cover ? (
              <Image
                src={project.cover}
                alt={project.title}
                width={400}
                height={225}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
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
          <div className="space-y-3">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Project Meta */}
            <div className="flex items-center justify-between">
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
              <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
