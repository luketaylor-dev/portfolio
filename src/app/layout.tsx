import "../styles/globals.css";
import Image from "next/image";
import { ReactNode, Suspense } from "react";
import Link from "next/link";
import {
  socialLinks,
  primaryFooterLinks,
  seoFooterLinks,
  contactEmail,
} from "@/lib/navigation";
import { ScrollAwareHeader } from "@/components/layout";
import { StructuredData } from "@/components/seo";
import { PerformanceMonitor } from "@/components/performance";

import { defaultMetadata } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";
import { Text } from "@/components/atoms";
import { ErrorBoundary } from "@/components/feedback";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata = {
  ...defaultMetadata,
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "/icons/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon.png", sizes: "1024x1024", type: "image/png" },
    ],
    shortcut: "/icons/favicon.ico",
    apple: "/icons/favicon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#0f0f0f",
};

const CURRENT_YEAR = new Date().getFullYear();

const umamiWebsiteId = process.env.UMAMI_WEBSITE_ID?.trim();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmSans.className} scroll-smooth`}
    >
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          href={`${siteUrl}/feed.xml`}
          title="Luke Taylor - Blog"
        />

        <StructuredData />

        {umamiWebsiteId ? (
          <script
            defer
            src="https://analytics.luke-taylor.dev/script.js"
            data-website-id={umamiWebsiteId}
          />
        ) : null}
      </head>
      <body className="bg-[#0f0f0f] text-white min-h-screen antialiased">
        {/* Skip to content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary-500 text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
        >
          Skip to main content
        </a>

        <ScrollAwareHeader>
          <main
            id="main-content"
            className="relative z-10 container mx-auto px-4 pt-0 pb-10"
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
        </ScrollAwareHeader>

        <footer className="border-t border-neutral-800 mt-20">
          <div className="container mx-auto px-4 py-12 space-y-8">
            {/* Primary row */}
            <div className="flex flex-wrap items-center justify-between gap-6">
              {/* Brand */}
              <div className="flex items-center gap-3">
                <Image src="/icons/favicon.png" alt="Luke Taylor logo" width={36} height={36} className="rounded-lg" />
                <span className="font-bold text-base text-white">
                  Luke Taylor
                </span>
              </div>

              {/* Primary nav links */}
              <nav className="flex flex-wrap gap-6" aria-label="Footer navigation">
                {primaryFooterLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={false}
                    className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Social + Resume */}
              <div className="flex items-center gap-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                      aria-label={link.ariaLabel ?? link.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  {contactEmail}
                </a>
              </div>
            </div>

            {/* Bottom row */}
            <div className="border-t border-neutral-800 pt-6 flex flex-wrap items-center justify-between gap-4">
              <Text as="p" variant="small" color="secondary">
                © {CURRENT_YEAR} Luke Taylor. All rights reserved.
                Built with Next.js and React.
              </Text>
              {/* SEO secondary links */}
              <div className="flex gap-4">
                {seoFooterLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={false}
                    className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </footer>

        <PerformanceMonitor />
      </body>
    </html>
  );
}
