import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import "./landing.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://selleriq-site.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "SellerIQ — Decision-ready Amazon analytics", template: "%s | SellerIQ" },
  description: "See what changed across sales, profitability, traffic, Buy Box, and inventory—and where to act next. Join the SellerIQ private beta.",
  keywords: ["Amazon seller analytics", "Amazon profitability", "FBA replenishment", "Amazon inventory planning", "SellerIQ"],
  authors: [{ name: "Merkury Innovations" }], creator: "Merkury Innovations",
  alternates: { canonical: "/" },
  openGraph: { title: "SellerIQ — Know what changed and what to do next", description: "Decision-ready sales, profitability, traffic, Buy Box, and inventory analytics for Amazon operators.", url: "/", siteName: "SellerIQ", images: [{ url: "/og.png", width: 1200, height: 630, alt: "SellerIQ — Know what changed and what to do next" }], type: "website" },
  twitter: { card: "summary_large_image", title: "SellerIQ — Know what changed and what to do next", description: "Decision-ready Amazon analytics for serious operators.", images: ["/og.png"] },
};

export const viewport: Viewport = { themeColor: "#ffffff", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a href="#main" className="skip-link">Skip to content</a>{children}<Analytics /><SpeedInsights /></body></html>;
}
