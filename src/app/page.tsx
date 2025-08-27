import Link from "next/link";
import { allProjects } from "contentlayer/generated";

export default function HomePage() {
  const featured = allProjects.filter((p) => p.featured).slice(0, 3);
  const recent = allProjects
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 6);

  return (
    <div className="space-y-12">
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Unity Developer for VR, EEG & Free‑to‑Play
        </h1>
        <p className="text-neutral-300 max-w-2xl mx-auto">
          I build immersive Unity projects — from EEG‑driven visualisations and
          multiplayer VR to high‑revenue free‑to‑play poker & casino games.
        </p>
        <div className="flex justify-center gap-4">
          <Link className="rounded-xl bg-white/10 px-4 py-2" href="/projects">
            View Projects
          </Link>
          <Link
            className="rounded-xl border border-white/20 px-4 py-2"
            href="/contact"
          >
            Work with me
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Featured</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((p) => (
            <article
              key={p.slug}
              className="rounded-2xl border border-neutral-800 p-4 hover:border-neutral-700 transition"
            >
              <h3 className="font-semibold">
                <Link href={p.url}>{p.title}</Link>
              </h3>
              <p className="text-sm text-neutral-400">{p.description}</p>
              <div className="mt-3 text-xs text-neutral-500">
                {p.tags?.join(" • ")}
              </div>
            </article>
          ))}
          {featured.length === 0 && (
            <p className="text-neutral-400">
              Add <code>featured: true</code> to a project in{" "}
              <code>/content/projects</code>.
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Recent</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {recent.map((p) => (
            <article
              key={p.slug}
              className="rounded-2xl border border-neutral-800 p-4 hover:border-neutral-700 transition"
            >
              <h3 className="font-semibold">
                <Link href={p.url}>{p.title}</Link>
              </h3>
              <p className="text-sm text-neutral-400">{p.description}</p>
            </article>
          ))}
          {recent.length === 0 && (
            <p className="text-neutral-400">
              No projects yet — create one in <code>/content/projects</code>.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
