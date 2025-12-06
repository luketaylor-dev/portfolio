const nextConfig = {
  // Turbopack configuration for Next.js 16
  turbopack: {},
  // experimental: {
  //   mdxRs: true, // Disabled for next-mdx-remote compatibility
  // },
  // Disable source maps in development to suppress warnings
  productionBrowserSourceMaps: true,
  // Note: Source map warnings in dev are harmless - they don't affect functionality
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [512, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  // Optimize for international performance
  async headers() {
    return [
      // Ensure sitemap and robots.txt are always fresh
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate", // 1 hour
          },
        ],
      },
      // Temporarily removed sitemap-* pattern for Next.js 16 compatibility
      // {
      //   source: "/sitemap-:path*.xml",
      //   headers: [
      //     {
      //       key: "Cache-Control",
      //       value: "public, max-age=3600, must-revalidate", // 1 hour
      //     },
      //   ],
      // },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate", // 1 hour
          },
        ],
      },
      // Default security headers for all routes (no aggressive HTML caching)
      {
        source: "/",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; base-uri 'self'; img-src 'self' data: blob: https:; media-src 'self' data: blob: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://vitals.vercel-insights.com https://va.vercel-scripts.com; worker-src 'self' blob:; style-src 'self' 'unsafe-inline'; font-src 'self' data: https:; connect-src 'self' https:; frame-ancestors 'none'",
          },
        ],
      },
      // Long-term caching for Next.js build assets
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Long-term caching for Next Image optimizer responses
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  // Bundle analyzer (uncomment to analyze bundle)
  // ...(process.env.ANALYZE === 'true' && {
  //   webpack: (config) => {
  //     config.plugins.push(
  //       require('@next/bundle-analyzer')({
  //         enabled: true,
  //       })(config)
  //     );
  //     return config;
  //   },
  // }),
};

export default nextConfig;
