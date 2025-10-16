import { withContentlayer } from "next-contentlayer";

const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  productionBrowserSourceMaps: true,
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
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
      {
        source: "/sitemap-:path*.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate", // 1 hour
          },
        ],
      },
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
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
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

export default withContentlayer(nextConfig);
