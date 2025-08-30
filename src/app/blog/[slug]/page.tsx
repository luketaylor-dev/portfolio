import { allBlogPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MDXContent } from "@/components/mdx-content";
import SocialShare from "@/components/social-share";
import RelatedPosts from "@/components/related-posts";
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
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </Link>
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
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm font-medium bg-purple-600/20 text-purple-300 border border-purple-500/30"
                >
                  {tag}
                </span>
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
          <MDXContent code={post.body.code} />
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
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </Link>
      </div>
    </div>
  );
}
