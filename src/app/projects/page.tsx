import Link from "next/link";
import { allProjects } from "contentlayer/generated";

export default function ProjectsPage() {
  const projects = allProjects.sort(
    (a, b) => +new Date(b.date) - +new Date(a.date)
  );
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <article
            key={p.slug}
            className="rounded-2xl border border-neutral-800 p-4 hover:border-neutral-700 transition"
          >
            <h2 className="font-semibold">
              <Link href={p.url}>{p.title}</Link>
            </h2>
            <p className="text-sm text-neutral-400">{p.description}</p>
            <div className="mt-3 text-xs text-neutral-500">
              {p.tags?.join(" • ")}
            </div>
          </article>
        ))}
        {projects.length === 0 && (
          <p className="text-neutral-400">
            Add some MDX files under <code>/content/projects</code>.
          </p>
        )}
      </div>
    </div>
  );
}
