"use client";

import { useSearchParams } from "next/navigation";
import { BlogCard } from "@/components/content";
import { Tag } from "lucide-react";
import type { BlogPost } from "@/lib/content";

interface BlogPostsGridProps {
  posts: BlogPost[];
}

export function BlogPostsGrid({ posts }: BlogPostsGridProps) {
  const searchParams = useSearchParams();
  const tagsParam = searchParams.get("tags");
  const activeTags = tagsParam
    ? tagsParam.split(",").map((t) => t.trim())
    : [];

  const filteredPosts =
    activeTags.length > 0
      ? posts.filter(
          (post) =>
            post.tags && post.tags.some((t) => activeTags.includes(t))
        )
      : posts;

  return (
    <section className="space-y-12">
      {activeTags.length > 0 && (
        <p className="text-center text-neutral-400 text-sm">
          Filtering by: {activeTags.join(", ")}
        </p>
      )}

      {filteredPosts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredPosts.map((post, idx) => (
            <BlogCard key={post.slug} post={post} priority={idx < 3} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto rounded-full bg-primary-600/20 border border-primary-500/30 flex items-center justify-center mb-6">
            <Tag className="w-12 h-12 text-primary-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">
            {activeTags.length > 0 ? "No matching posts" : "No Blog Posts Yet"}
          </h3>
          <p className="text-neutral-400 max-w-md mx-auto">
            {activeTags.length > 0
              ? `No posts tagged with ${activeTags.join(", ")}.`
              : "Your first blog post will appear here. Start writing about your projects and development experiences!"}
          </p>
        </div>
      )}
    </section>
  );
}
