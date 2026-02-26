"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Text } from "@/components/atoms";
import type { TocItem } from "@/lib/headings";

interface BlogTocProps {
  items: TocItem[];
}

export function BlogToc({ items }: BlogTocProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = items.map((item) => item.slug);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    headings.forEach((slug) => {
      const el = document.getElementById(slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      className="sticky top-24 space-y-2"
      aria-label="Table of contents"
    >
      <Text variant="small" as="p" className="font-semibold text-primary-300 mb-4">
        On this page
      </Text>
      <ul className="space-y-1">
        {items.map((item) => (
          <li
            key={item.slug}
            style={{ paddingLeft: item.depth === 3 ? "1rem" : 0 }}
          >
            <Link
              href={`#${item.slug}`}
              className={`block py-1 text-sm transition-colors hover:text-primary-300 ${
                activeId === item.slug
                  ? "text-primary-400 font-medium"
                  : "text-neutral-400"
              }`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
