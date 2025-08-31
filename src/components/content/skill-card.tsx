"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { Card } from "@/components/ui";
import InteractiveText from "@/components/interactive-text";

interface SkillCardProps {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
  feature: string;
  ariaLabel: string;
}

export default function SkillCard({
  href,
  icon,
  title,
  description,
  feature,
  ariaLabel,
}: SkillCardProps) {
  return (
    <Link
      href={href}
      className="group block focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
      aria-label={ariaLabel}
    >
      <Card
        variant="default"
        hover={true}
        className="relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 space-y-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-4 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40">
            {icon}
          </div>

          <h3 className="text-2xl font-bold mb-3 transition-colors duration-300">
            <InteractiveText variant="heading">{title}</InteractiveText>
          </h3>

          <p className="text-neutral-300 leading-relaxed text-lg">
            {description}
          </p>

          <div className="pt-4">
            <div className="flex items-center gap-2 text-purple-300 text-sm font-medium">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              {feature}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
