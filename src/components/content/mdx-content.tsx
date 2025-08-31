"use client";
import * as React from "react";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";

const components = {
  img: ({ src, alt, width = 800, height = 600, ...props }: any) => (
    <div className="my-8">
      <Image
        src={src}
        alt={alt || "Image"}
        width={width}
        height={height}
        className="rounded-lg shadow-lg"
        {...props}
      />
    </div>
  ),
};

export function MDXContent({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return (
    <div className="prose">
      <Component components={components} />
    </div>
  );
}
