import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "date", required: true },
    featured: { type: "boolean", required: false },
    tags: { type: "list", of: { type: "string" }, required: false },
    cover: { type: "string", required: false },
    video: { type: "string", required: false },
    url: { type: "string", required: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (project) => project._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
  },
}));

export const BlogPost = defineDocumentType(() => ({
  name: "BlogPost",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "date", required: true },
    featured: { type: "boolean", required: false },
    tags: { type: "list", of: { type: "string" }, required: false },
    image: { type: "string", required: false },
    readingTime: { type: "string", required: false },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => post._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Project, BlogPost],
  disableImportAliasWarning: true,
  mdx: {
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
  },
});
