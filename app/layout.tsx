import {
  CookieBanner,
  CookieConsentProvider,
  CookieSettingsModal,
} from "@/components/cookie-consent";
import { RecaptchaProvider } from "@/components/recaptcha-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { GA_TRACKING_ID } from "@/lib/gtag";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import type React from "react";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProAgent Me - Turn Your Expertise Into AI Income",
  description:
    "The marketplace where experts create AI agents and earn while they sleep. Stop worrying about AI stealing your job. Use it to earn more.",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
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
          <RecaptchaProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <CookieBanner />
              <CookieSettingsModal />
            </ThemeProvider>
          </RecaptchaProvider>
        </CookieConsentProvider>
        <Analytics />
      </body>
    </html>
  );
}
