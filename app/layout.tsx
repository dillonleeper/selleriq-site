import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SellerIQ — Amazon Seller Analytics",
  description:
    "SellerIQ gives mid-market Amazon sellers the analytics, inventory intelligence, and AI recommendations they need to grow — without the spreadsheet chaos.",
  keywords: [
    "Amazon seller analytics",
    "inventory intelligence",
    "advertising ROAS",
    "TACOS",
    "profitability",
    "Amazon FBA software",
  ],
  authors: [{ name: "SellerIQ" }],
  openGraph: {
    title: "SellerIQ — Amazon Seller Analytics",
    description:
      "Analytics, inventory intelligence, and AI recommendations for mid-market Amazon sellers.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SellerIQ — Amazon Seller Analytics",
    description:
      "Analytics, inventory intelligence, and AI recommendations for mid-market Amazon sellers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-slate-900">
        <a
          href="#main"
          className="sr-only rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
