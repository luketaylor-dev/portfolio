import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import { getAllBlogPosts } from "@/lib/content";
import { BlogPostsGrid } from "@/components/content";
import { Text } from "@/components/atoms";
import { Breadcrumbs } from "@/components/ui";
import { Suspense } from "react";

export const metadata: Metadata = generateMetadata(
  "Blog - Luke Taylor | Unity Development Insights & Project Updates",
  "Read insights from Luke Taylor's Unity development projects, including EEG visualization, VR development, and game development experiences. Technical deep dives and project updates.",
  "/blog"
);

export const revalidate = 3600;
export const dynamic = "force-static";

export default function BlogPage() {
  const allBlogPosts = getAllBlogPosts();
  const sortedPosts = allBlogPosts
    ? allBlogPosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    : [];

  return (
    <div className="space-y-16">
      <Breadcrumbs items={[{ label: "Blog" }]} className="mb-8" />

      <section className="text-center space-y-8">
        <Text
          variant="heading1"
          as="h1"
          className="tracking-tight bg-gradient-to-r from-white via-primary-100 to-primary-300 bg-clip-text text-transparent"
        >
          Project Insights & Updates
        </Text>
        <Text
          variant="paragraph"
          as="p"
          color="muted"
          className="text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Deep dives into my Unity projects, development challenges, and the
          creative process behind building immersive           experiences.
        </Text>
      </section>

      <Suspense
        fallback={
          <div className="min-h-[400px] animate-pulse bg-primary-900/20 rounded-2xl" />
        }
      >
        <BlogPostsGrid posts={sortedPosts} />
      </Suspense>
    </div>
  );
}
