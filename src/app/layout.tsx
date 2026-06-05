import type { Metadata } from "next";
import localFont from "next/font/local";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://apurvpatil.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Apurv Patil — Operator. Builder. Investor.",
    template: "%s | Apurv Patil",
  },
  description:
    "Building at the intersection of finance and software. Ex-JPMorgan product, now building tools that give investors the edge previously reserved for quant desks.",
  keywords: [
    "Apurv Patil",
    "fintech",
    "software engineer",
    "product manager",
    "investor",
    "JPMorgan",
    "options",
    "DCF",
    "NSE",
  ],
  authors: [{ name: "Apurv Patil", url: siteUrl }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Apurv Patil",
    title: "Apurv Patil — Operator. Builder. Investor.",
    description:
      "Building at the intersection of finance and software. Ex-JPMorgan product, now building tools that give investors the edge previously reserved for quant desks.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apurv Patil — Operator. Builder. Investor.",
    description:
      "Building at the intersection of finance and software. Ex-JPMorgan product, now building tools that give investors the edge previously reserved for quant desks.",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
