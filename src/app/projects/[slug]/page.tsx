import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { MDXContent } from "@/components/mdx-content";

export const generateStaticParams = () =>
  allProjects.map((p) => ({ slug: p.slug }));

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = allProjects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <article className="prose max-w-none">
      <h1>{project.title}</h1>
      <p className="text-neutral-400 !mt-0">{project.description}</p>
      <MDXContent code={project.body.code} />
    </article>
  );
}
