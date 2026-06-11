import type { Metadata } from "next";
import localFont from "next/font/local";
import { EB_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.apurvpatil.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Apurv Patil — Product · Finance · Manufacturing",
    template: "%s | Apurv Patil",
  },
  description:
    "Operator at the intersection of product, finance, and manufacturing. Ventures in fiberglass doors, precision manufacturing, and AI-native content.",
  keywords: [
    "Apurv Patil",
    "finance",
    "manufacturing",
    "M&A",
    "private equity",
    "India",
    "Patson Doors",
    "Polychem",
  ],
  authors: [{ name: "Apurv Patil", url: siteUrl }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Apurv Patil",
    title: "Apurv Patil — Product · Finance · Manufacturing",
    description:
      "Operator at the intersection of product, finance, and manufacturing.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apurv Patil — Product · Finance · Manufacturing",
    description:
      "Operator at the intersection of product, finance, and manufacturing.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${garamond.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased font-sans bg-bg text-text grain">{children}</body>
    </html>
  );
}
