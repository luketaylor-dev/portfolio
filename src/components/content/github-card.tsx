"use client";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui";
import { Text } from "@/components/atoms";

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
          <div className="aspect-video bg-neutral-800 flex items-center justify-center rounded-xl">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center">
                {icon}
              </div>
              <Text as="p" variant="small" className="text-primary-300 font-medium">{title}</Text>
            </div>
          </div>

          {/* Project Content */}
          <div className="space-y-3 flex flex-col flex-grow">
            <Text variant="heading4" as="h3" className="group-hover:text-primary-300 transition-colors">
              {title}
            </Text>
            <Text variant="small" as="p" color="secondary" className="leading-relaxed flex-grow">
              {description}
            </Text>
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
