"use client";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui";

interface GitHubCardProps {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export default function GitHubCard({
  href,
  icon,
  title,
  description,
  className = "",
}: GitHubCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block h-full ${className}`}
    >
      <Card
        variant="default"
        hover={true}
        className="cursor-pointer h-full flex flex-col"
      >
        <div className="space-y-4 flex flex-col h-full">
          {/* Project Icon */}
          <div className="aspect-video bg-gradient-to-br from-neutral-800 to-primary-800/20 flex items-center justify-center rounded-xl">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center">
                {icon}
              </div>
              <p className="text-sm text-primary-300 font-medium">{title}</p>
            </div>
          </div>

          {/* Project Content */}
          <div className="space-y-3 flex flex-col flex-grow">
            <h3 className="font-semibold text-white group-hover:text-primary-300 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed flex-grow">
              {description}
            </p>
            <div className="flex items-center gap-2 text-primary-400 group-hover:text-primary-300 transition-colors mt-auto">
              <span className="text-sm font-medium">View on GitHub</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Card>
    </a>
  );
}
