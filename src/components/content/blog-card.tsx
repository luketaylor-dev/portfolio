"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { formatDate } from "@/lib/blog-utils";
import { Card } from "@/components/ui";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  image?: string | undefined;
  date: string;
  readingTime?: string | undefined;
}

interface BlogCardProps {
  post: BlogPost;
  className?: string;
  priority?: boolean;
}

export default function BlogCard({
  post,
  className = "",
  priority = false,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card
        variant="default"
        hover={true}
        className={`group cursor-pointer h-full flex flex-col ${className}`}
      >
        <div className="space-y-4 flex flex-col h-full">
          {/* Blog Image */}
          <div className="aspect-video bg-gradient-to-br from-neutral-800 to-purple-800/20 overflow-hidden rounded-xl relative group-hover:shadow-2xl group-hover:shadow-purple-500/20 transition-all duration-500">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={225}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-500 ease-out"
                priority={priority}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-purple-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-purple-300 font-medium">
                    Blog Post
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Blog Content */}
          <div className="space-y-3 flex flex-col flex-grow">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300 group-hover:scale-105 transform origin-left">
                {post.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors duration-300 flex-grow">
                {post.description}
              </p>
            </div>

            {/* Blog Meta */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-4 text-sm text-neutral-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
                {post.readingTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readingTime}</span>
                  </div>
                )}
              </div>
              <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 ease-out" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
