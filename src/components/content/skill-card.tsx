"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { Card } from "@/components/ui";
import { Text } from "@/components/atoms";

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
      prefetch={true}
      className="group block focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
      aria-label={ariaLabel}
    >
      <Card
        variant="default"
        hover={true}
        className="h-full flex flex-col"
      >
        <div className="space-y-4 flex flex-col h-full">
          <div className="w-16 h-16 rounded-2xl bg-primary-500 p-3 flex items-center justify-center">
            {icon}
          </div>

          <h3 className="text-xl font-bold text-white group-hover:text-primary-300 transition-colors duration-200">
            {title}
          </h3>

          <Text variant="paragraph" as="p" color="muted" className="leading-relaxed flex-grow">
            {description}
          </Text>

          <div className="pt-2 mt-auto">
            <div className="flex items-center gap-2 text-primary-400 text-sm font-medium">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
              {feature}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
