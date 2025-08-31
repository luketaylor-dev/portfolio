import { allBlogPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

import { MdxContent, SocialShare, RelatedPosts } from "@/components/content";
import { InteractiveButton, Badge } from "@/components/ui";
import { formatDate, calculateReadingTime } from "@/lib/blog-utils";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return allBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = allBlogPosts
    ? allBlogPosts.find((post) => post.slug === params.slug)
    : undefined;

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-16">
      {/* Back to Blog */}
      <div className="max-w-4xl mx-auto">
        <InteractiveButton href="/blog" variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </InteractiveButton>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto space-y-8">
        {/* Title & Meta */}
        <header className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-neutral-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>
                {post.readingTime || calculateReadingTime(post.body.raw)}
              </span>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="primary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Description */}
          {post.description && (
            <p className="text-xl text-neutral-300 leading-relaxed">
              {post.description}
            </p>
          )}
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="aspect-video overflow-hidden rounded-2xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-invert prose-purple max-w-none">
          <MdxContent code={post.body.code} />
        </div>

        {/* Social Sharing */}
        <div className="pt-8 border-t border-neutral-800">
          <SocialShare
            url={`https://www.dibza.co.uk/blog/${post.slug}`}
            title={post.title}
          />
        </div>
      </article>

      {/* Related Posts */}
      <RelatedPosts currentPostSlug={post.slug} allPosts={allBlogPosts || []} />

      {/* Navigation */}
      <div className="max-w-4xl mx-auto pt-8 border-t border-neutral-800">
        <InteractiveButton href="/blog" variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </InteractiveButton>
      </div>
    </div>
  );
}
