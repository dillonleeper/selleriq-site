import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "./landing.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://selleriq-site.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "SellerIQ | Amazon performance, profit, and inventory", template: "%s | SellerIQ" },
  description: "See why revenue and margin moved, identify the SKUs responsible, and plan the next inventory decision across Amazon US and Canada.",
  keywords: ["Amazon seller analytics", "Amazon profitability", "FBA replenishment", "Amazon inventory planning", "SellerIQ"],
  authors: [{ name: "Merkury Innovations" }], creator: "Merkury Innovations",
  alternates: { canonical: "/" },
  openGraph: { title: "SellerIQ | See what changed. Decide what to do next.", description: "Find the SKUs driving revenue, margin, and inventory risk across Amazon US and Canada.", url: "/", siteName: "SellerIQ", images: [{ url: "/og.png", width: 1200, height: 630, alt: "SellerIQ dashboard with the headline Know what changed. See what to do next." }], type: "website" },
  twitter: { card: "summary_large_image", title: "SellerIQ | See what changed. Decide what to do next.", description: "Find the SKUs driving revenue, margin, and inventory risk across Amazon US and Canada.", images: ["/og.png"] },
};

export const viewport: Viewport = { themeColor: "#ffffff", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a href="#main" className="skip-link">Skip to content</a>{children}<Analytics /><SpeedInsights /></body></html>;
}
