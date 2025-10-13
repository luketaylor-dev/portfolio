import "../styles/globals.css";
import { ReactNode, Suspense } from "react";
import Link from "next/link";
import { Home, FolderOpen, User, Mail, FileText } from "lucide-react";
import { MobileNav } from "@/components/layout";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { StructuredData } from "@/components/seo";
import { PerformanceMonitor } from "@/components/performance";

import { defaultMetadata } from "@/lib/metadata";
import { ResumeDownload } from "@/components/content";
import InteractiveText from "@/components/interactive-text";
import { ErrorBoundary } from "@/components/feedback";
import { InteractiveButton } from "@/components/ui";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  ...defaultMetadata,
  metadataBase: new URL("https://www.dibza.co.uk"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon.png", sizes: "1024x1024", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icons/favicon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} scroll-smooth`}>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link
          rel="icon"
          href="/favicon-16x16.png"
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          sizes="32x32"
          type="image/png"
        />
        <link rel="icon" href="/icons/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/favicon.png" />

        {/* Structured data */}
        <StructuredData />
      </head>
      <body className="bg-neutral-950 text-white min-h-screen antialiased">
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
        >
          Skip to main content
        </a>

        {/* Background gradient for all pages */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-950/20 via-neutral-950 to-purple-900/20 pointer-events-none"></div>

        <header className="sticky top-0 z-[60] backdrop-blur-md bg-neutral-950/80 border-b border-purple-800/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              {/* Logo */}
              <Link href="/" className="group flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-2 shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 group-hover:scale-110 transition-all duration-300">
                  <span className="text-white font-bold text-lg">LT</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-white group-hover:text-purple-300 transition-colors">
                    Luke Taylor
                  </span>
                  <span className="text-xs text-purple-300 opacity-80">
                    From Brainwaves to Gameplay
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav
                className="hidden md:flex items-center gap-8"
                role="navigation"
                aria-label="Main navigation"
              >
                <Link
                  href="/"
                  className="flex items-center gap-2 group hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-lg p-2 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                  aria-label="Go to homepage"
                >
                  <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <InteractiveText variant="link">Home</InteractiveText>
                </Link>
                <Link
                  href="/projects"
                  prefetch={true}
                  className="flex items-center gap-2 group hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-lg p-2 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                  aria-label="View all projects"
                >
                  <FolderOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <InteractiveText variant="link">Projects</InteractiveText>
                </Link>
                <Link
                  href="/blog"
                  prefetch={false}
                  className="flex items-center gap-2 group hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-lg p-2 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                  aria-label="Read blog posts"
                >
                  <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <InteractiveText variant="link">Blog</InteractiveText>
                </Link>
                <Link
                  href="/about"
                  prefetch={false}
                  className="flex items-center gap-2 group hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-lg p-2 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                  aria-label="Learn more about Luke Taylor"
                >
                  <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <InteractiveText variant="link">About</InteractiveText>
                </Link>
                <Link
                  href="/contact"
                  prefetch={false}
                  className="flex items-center gap-2 group hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-lg p-2 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                  aria-label="Get in touch with Luke Taylor"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <InteractiveText variant="link">Contact</InteractiveText>
                </Link>
                <ResumeDownload variant="secondary" size="sm" />
              </nav>

              {/* Mobile Navigation */}
              <MobileNav />
            </div>
          </div>
        </header>

        <main
          id="main-content"
          className="relative z-10 container mx-auto px-4 py-10"
        >
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                Loading...
              </div>
            }
          >
            <ErrorBoundary>{children}</ErrorBoundary>
          </Suspense>
        </main>

        <footer className="relative z-10 border-t border-purple-800/30 mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-3">
                    <span className="text-white font-bold text-lg">LT</span>
                  </div>
                  <span className="font-bold text-xl text-white">
                    Luke Taylor
                  </span>
                </div>
                <p className="text-neutral-400 max-w-xs">
                  Unity Developer crafting immersive experiences in VR, EEG
                  visualization, and game development.
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="font-semibold text-white">Quick Links</h3>
                <div className="space-y-2">
                  <Link
                    href="/projects"
                    prefetch={false}
                    className="block text-neutral-400 hover:text-purple-300 transition-colors"
                  >
                    View Projects
                  </Link>
                  <Link
                    href="/blog"
                    prefetch={false}
                    className="block text-neutral-400 hover:text-purple-300 transition-colors"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/about"
                    prefetch={false}
                    className="block text-neutral-400 hover:text-purple-300 transition-colors"
                  >
                    About Me
                  </Link>
                  <Link
                    href="/contact"
                    prefetch={false}
                    className="block text-neutral-400 hover:text-purple-300 transition-colors"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="font-semibold text-white">Connect</h3>
                <div className="space-y-2">
                  <a
                    href="https://www.linkedin.com/in/luke-taylor-ab5080166/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-neutral-400 hover:text-purple-300 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/luketaylor-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-neutral-400 hover:text-purple-300 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-white">Let's Connect</h3>
                <p className="text-neutral-400">
                  Ready to build something amazing together? Let's discuss your
                  next Unity project.
                </p>
                <InteractiveButton href="/contact" variant="primary" size="md">
                  Start a Project
                </InteractiveButton>
              </div>
            </div>

            <div className="border-t border-purple-800/30 mt-8 pt-8 text-center">
              <p className="text-sm text-neutral-500">
                © {new Date().getFullYear()} Luke Taylor. All rights reserved.
                Built with Next.js, React, and a lot of purple.
              </p>
            </div>
          </div>
        </footer>
        <Analytics />
        <SpeedInsights />
        <PerformanceMonitor />
      </body>
    </html>
  );
}
