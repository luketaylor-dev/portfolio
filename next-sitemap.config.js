/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://luke-taylor.dev",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/private/"],
      },
    ],
  },
  exclude: [
    "/admin/*",
    "/private/*",
    "/robots.txt",
    "/feed.xml",
    "/llms.txt",
    "/og",
    "/api/*",
  ],
  changefreq: "weekly",
  priority: 0.7,
};
