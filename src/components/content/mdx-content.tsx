import React from "react";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

interface MDXImgProps extends React.ComponentPropsWithoutRef<"img"> {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

interface MDXPreProps extends React.ComponentPropsWithoutRef<"pre"> {
  children?: React.ReactNode;
}

interface MDXCodeProps extends React.ComponentPropsWithoutRef<"code"> {
  children?: React.ReactNode;
}

const components = {
  img: ({ src, alt, width = 800, height = 600, priority }: MDXImgProps) => (
    <Image
      src={src}
      alt={alt || "Image"}
      width={width}
      height={height}
      sizes="(max-width: 768px) 100vw, 800px"
      className="rounded-lg shadow-lg my-8"
      priority={priority === true}
    />
  ),
  pre: ({ children, ...props }: MDXPreProps) => {
    const child = React.isValidElement(children) ? children : null;
    const childProps = child?.props as { className?: string; children?: string } | undefined;
    const childClassName = childProps?.className;
    const match = childClassName ? /language-(\w+)/.exec(childClassName) : null;
    const language = match ? match[1] : "";

    if (language && childProps?.children != null) {
      return (
        <SyntaxHighlighter
          style={tomorrow}
          language={language}
          PreTag="div"
          className="rounded-lg my-8 custom-syntax-theme"
        >
          {String(childProps.children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      );
    }

    return (
      <pre
        className="relative bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-8"
        {...props}
      >
        {children}
      </pre>
    );
  },
  code: ({ children, className, ...props }: MDXCodeProps) => {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "";

    if (language) {
      return (
        <SyntaxHighlighter
          style={tomorrow}
          language={language}
          PreTag="div"
          className="rounded-lg my-8 custom-syntax-theme"
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      );
    }

    return (
      <code
        className="bg-primary-900/30 text-primary-300 px-2 py-1 rounded text-sm"
        {...props}
      >
        {children}
      </code>
    );
  },
};

export const MDXContent = ({ source }: { source: string }) => {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
          ],
        },
      }}
    />
  );
};
