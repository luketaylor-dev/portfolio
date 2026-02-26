import "../styles/globals.css";
import { ReactNode, Suspense } from "react";
import Link from "next/link";
import { navItems, socialLinks, footerLinks, contactEmail } from "@/lib/navigation";
import { MobileNavEnhanced, PageGradientClient } from "@/components/layout";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { StructuredData } from "@/components/seo";
import { PerformanceMonitor } from "@/components/performance";

import { defaultMetadata } from "@/lib/metadata";
import { ResumeDownload } from "@/components/content";
import { Text } from "@/components/atoms";
import InteractiveText from "@/components/interactive-text";
import { ErrorBoundary } from "@/components/feedback";
import { InteractiveButton } from "@/components/ui";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

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
    <html lang="en" className={`${dmSans.variable} ${dmSans.className} scroll-smooth`}>
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

        <link
          rel="alternate"
          type="application/rss+xml"
          href="https://www.dibza.co.uk/feed.xml"
          title="Luke Taylor - Blog"
        />

        {/* Structured data */}
        <StructuredData />
      </head>
      <body className="bg-neutral-950 text-white min-h-screen antialiased">
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
        >
          Skip to main content
        </a>

        {/* Background gradient — varies by page (client-only to avoid hydration mismatch) */}
        <PageGradientClient />

        <header className="sticky top-0 z-[60] backdrop-blur-md bg-neutral-950/80 border-b border-primary-800/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              {/* Logo */}
              <div className="flex items-center gap-4">
                <Link href="/" className="group flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 p-2 shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 group-hover:scale-110 transition-all duration-300">
                    <span className="text-white font-bold text-lg">LT</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xl text-white group-hover:text-primary-300 transition-colors">
                      Luke Taylor
                    </span>
                    <span className="text-xs text-primary-300 opacity-80">
                      From Brainwaves to Gameplay
                    </span>
                  </div>
                </Link>
                <span
                  className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-600/20 text-primary-300 border border-primary-500/30"
                  aria-label="Availability status"
                >
                  Currently Available
                </span>
              </div>

              {/* Desktop Navigation */}
              <nav
                className="hidden md:flex items-center gap-8"
                role="navigation"
                aria-label="Main navigation"
              >
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      prefetch={item.prefetch ?? false}
                      className="flex items-center gap-2 group hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-lg p-2 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                      aria-label={item.ariaLabel ?? item.label}
                    >
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <InteractiveText variant="link">{item.label}</InteractiveText>
                    </Link>
                  );
                })}
                <ResumeDownload variant="secondary" size="sm" />
              </nav>

              {/* Mobile Navigation */}
              <MobileNavEnhanced />
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

        <footer className="relative z-10 border-t border-primary-800/30 mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 p-3">
                    <span className="text-white font-bold text-lg">LT</span>
                  </div>
                  <span className="font-bold text-xl text-white">
                    Luke Taylor
                  </span>
                </div>
                <Text variant="paragraph" as="p" color="secondary" className="max-w-xs">
                  Unity Developer crafting immersive experiences in VR, EEG
                  visualization, and game development.
                </Text>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <Text variant="heading4" as="h3">Quick Links</Text>
                <div className="space-y-2">
                  {footerLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      prefetch={false}
                      className="block text-neutral-400 hover:text-primary-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <Text variant="heading4" as="h3">Connect</Text>
                <div className="space-y-2">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-neutral-400 hover:text-primary-300 transition-colors"
                        aria-label={link.ariaLabel ?? link.label}
                      >
                        <Icon className="w-4 h-4" />
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <Text variant="heading4" as="h3">Let&apos;s Connect</Text>
                <Text variant="paragraph" as="p" color="secondary">
                  Ready to build something amazing together? Let&apos;s discuss your
                  next Unity project.
                </Text>
                <a
                  href={`mailto:${contactEmail}`}
                  className="block text-primary-300 hover:text-primary-200 transition-colors text-sm"
                  aria-label={`Email Luke Taylor at ${contactEmail}`}
                >
                  {contactEmail}
                </a>
                <InteractiveButton href="/contact" variant="primary" size="md">
                  Start a Project
                </InteractiveButton>
              </div>
            </div>

            <div className="border-t border-primary-800/30 mt-8 pt-8 text-center">
              <Text as="p" variant="small" color="secondary">
                © {new Date().getFullYear()} Luke Taylor. All rights reserved.
                Built with Next.js, React, and a lot of purple.
              </Text>
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
