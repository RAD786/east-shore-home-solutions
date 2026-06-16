import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCallBar from "@/components/MobileCallBar";
import { siteConfig } from "@/lib/siteConfig";
import { SITE_URL } from "@/lib/seo";
import { localBusinessSchema, jsonLd } from "@/lib/schema";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${siteConfig.businessName} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.businessName,
  authors: [{ name: siteConfig.businessName }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: siteConfig.businessName,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* Site-wide LocalBusiness structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(localBusinessSchema()) }}
        />
        <TopBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
