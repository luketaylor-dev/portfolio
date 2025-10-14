import { Metadata } from "next";
import { generateMetadata as generatePageMetadata } from "@/lib/metadata";
import { allBlogPosts } from "contentlayer/generated";
import { BlogCard } from "@/components/content";
import { Breadcrumbs } from "@/components/ui";

export const revalidate = 3600;
export const dynamic = "force-static";

const PAGE_SIZE = 9;

export async function generateStaticParams() {
  const totalPages = Math.max(1, Math.ceil(allBlogPosts.length / PAGE_SIZE));
  return Array.from({ length: totalPages - 1 }).map((_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { page: string };
}): Promise<Metadata> {
  const pageNum = Number(params.page) || 1;
  return generatePageMetadata(
    `Blog - Page ${pageNum} — Luke Taylor`,
    `Unity development insights (page ${pageNum}) including EEG/VR and project updates.`,
    `/blog/page/${pageNum}`
  );
}

export default function BlogPaged({ params }: { params: { page: string } }) {
  const pageNum = Math.max(1, Number(params.page) || 1);
  const sorted = allBlogPosts
    ? allBlogPosts.sort((a, b) => +new Date(b.date) - +new Date(a.date))
    : [];
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(pageNum, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pagePosts = sorted.slice(start, start + PAGE_SIZE);

  return (
    <div className="space-y-12">
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: `Page ${currentPage}` },
        ]}
        className="mb-8"
      />

      <section className="space-y-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pagePosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <nav
          className="flex items-center justify-center gap-2"
          aria-label="Blog pagination"
        >
          <a
            href={
              currentPage > 1
                ? currentPage - 1 === 1
                  ? "/blog"
                  : `/blog/page/${currentPage - 1}`
                : "#"
            }
            aria-disabled={currentPage === 1}
            className={`px-3 py-2 rounded-lg border border-purple-700/40 text-sm ${
              currentPage === 1
                ? "opacity-50 pointer-events-none"
                : "hover:bg-purple-600/10"
            }`}
          >
            Previous
          </a>
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            const isActive = page === currentPage;
            const href = page === 1 ? "/blog" : `/blog/page/${page}`;
            return (
              <a
                key={page}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`px-3 py-2 rounded-lg border border-purple-700/40 text-sm ${
                  isActive
                    ? "bg-purple-600/20 text-purple-200"
                    : "hover:bg-purple-600/10"
                }`}
              >
                {page}
              </a>
            );
          })}
          <a
            href={
              currentPage < totalPages ? `/blog/page/${currentPage + 1}` : "#"
            }
            aria-disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-lg border border-purple-700/40 text-sm ${
              currentPage === totalPages
                ? "opacity-50 pointer-events-none"
                : "hover:bg-purple-600/10"
            }`}
          >
            Next
          </a>
        </nav>
      </section>
    </div>
  );
}
