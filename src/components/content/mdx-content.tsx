"use client";
import * as React from "react";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const components = {
  img: ({ src, alt, width = 800, height = 600, priority, ...props }: any) => (
    <Image
      src={src}
      alt={alt || "Image"}
      width={width}
      height={height}
      sizes="(max-width: 768px) 100vw, 800px"
      className="rounded-lg shadow-lg my-8"
      priority={priority}
      {...props}
    />
  ),
  pre: ({ children, ...props }: any) => {
    // Check if this is a code block with syntax highlighting
    if (children && children.props && children.props.className) {
      const match = /language-(\w+)/.exec(children.props.className);
      const language = match ? match[1] : "";

      if (language) {
        return (
          <SyntaxHighlighter
            style={tomorrow}
            language={language}
            PreTag="div"
            className="rounded-lg my-8 custom-syntax-theme"
            {...props}
          >
            {String(children.props.children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        );
      }
    }

    // Fallback for regular pre blocks
    return (
      <pre
        className="relative bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-8"
        {...props}
      >
        {children}
      </pre>
    );
  },
  code: ({ children, className, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "";

    if (language) {
      return (
        <SyntaxHighlighter
          style={tomorrow}
          language={language}
          PreTag="div"
          className="rounded-lg my-8 custom-syntax-theme"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      );
    }

    return (
      <code
        className="bg-purple-900/30 text-purple-300 px-2 py-1 rounded text-sm"
        {...props}
      >
        {children}
      </code>
    );
  },
};

export const MDXContent = ({ code }: { code: string }) => {
  const Component = useMDXComponent(code);

  return (
    <div className="prose">
      <Component components={components} />
    </div>
  );
};
