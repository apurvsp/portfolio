import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-bricolage",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plexmono",
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
    <html
      lang="en"
      className={`${bricolage.variable} ${manrope.variable} ${plexMono.variable}`}
    >
      <body className="antialiased font-sans bg-void text-ivory grain">
        {children}
      </body>
    </html>
  );
}
