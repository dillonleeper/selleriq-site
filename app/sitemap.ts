import type { MetadataRoute } from "next";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://selleriq-site.vercel.app";
export default function sitemap(): MetadataRoute.Sitemap { return ["", "/privacy", "/terms"].map((path, index) => ({ url: `${siteUrl}${path}`, changeFrequency: index === 0 ? "weekly" as const : "yearly" as const, priority: index === 0 ? 1 : 0.3 })); }
