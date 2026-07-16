/**
 * Centralised site URL. Set SITE_URL in environment to change the domain.
 * Fallback ensures builds work when env is unset (e.g. local dev).
 */
export const siteUrl = (
  process.env.SITE_URL || "https://luke-taylor.dev"
).replace(/\/+$/, "");
