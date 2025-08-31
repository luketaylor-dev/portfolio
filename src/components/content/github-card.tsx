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
      className={`group block ${className}`}
    >
      <Card variant="default" hover={true} className="cursor-pointer">
        <div className="space-y-4">
          {/* Project Icon */}
          <div className="aspect-video bg-gradient-to-br from-neutral-800 to-purple-800/20 flex items-center justify-center rounded-xl">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                {icon}
              </div>
              <p className="text-sm text-purple-300 font-medium">{title}</p>
            </div>
          </div>

          {/* Project Content */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {description}
            </p>
            <div className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors">
              <span className="text-sm font-medium">View on GitHub</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Card>
    </a>
  );
}
