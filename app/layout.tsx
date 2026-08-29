import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import { SITE_URL, siteSettings } from "@/content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Paper Brick Architects — Architecture & Interior Design, Thoothukudi",
    template: "%s — Paper Brick Architects",
  },
  description: "Paper Brick Architects is an architecture and interior design practice in Thoothukudi, Tamil Nadu.",
  applicationName: siteSettings.brandName,
  icons: { icon: "/media/brand/logo-light.svg", shortcut: "/media/brand/logo-light.svg" },
  openGraph: {
    type: "website",
    siteName: siteSettings.brandName,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteSettings.brandName,
    url: SITE_URL,
    telephone: siteSettings.phoneHref,
    email: siteSettings.email,
    areaServed: "Tamil Nadu",
  };

  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
