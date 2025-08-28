/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.dibza.co.uk",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/private/"],
      },
    ],
    additionalSitemaps: ["https://www.dibza.co.uk/sitemap.xml"],
  },
  exclude: ["/admin/*", "/private/*"],
  changefreq: "weekly",
  priority: 0.7,
};
