import {
  CookieBanner,
  CookieConsentProvider,
  CookieSettingsModal,
} from "@/components/cookie-consent";
import { GA_TRACKING_ID } from "@/lib/gtag";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import type React from "react";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
});

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Good News Bible Church | Bilingual Church in Ashburn, VA",
  description:
    "A bilingual Russian-English Bible church in Ashburn, Virginia serving the Slavic community. Join us Sundays at 1:30 PM for worship, fellowship, and spiritual growth.",
  keywords: [
    "church",
    "Ashburn VA",
    "Russian church",
    "bilingual church",
    "Slavic community",
    "Bible church",
    "Northern Virginia",
  ],
  icons: {
    icon: "/icon_only.png",
    apple: "/icon_only.png",
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
      className={`${inter.variable} ${cormorantGaramond.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className={`font-sans antialiased`}>
        {/* Initialize gtag consent BEFORE loading GA4 script */}
        <Script id="gtag-consent-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'analytics_storage': 'granted',
              'ad_storage': 'granted',
              'ad_user_data': 'granted',
              'ad_personalization': 'granted'
            });
          `}
        </Script>
        {/* Load GA4 script - Consent Mode controls data collection */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', { debug_mode: ${
            process.env.NODE_ENV === "development" ? "true" : "false"
          } });
          `}
        </Script>
        <CookieConsentProvider>
          {children}
          <CookieBanner />
          <CookieSettingsModal />
        </CookieConsentProvider>
        <Analytics />
      </body>
    </html>
  );
}
