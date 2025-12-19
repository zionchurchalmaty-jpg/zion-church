import {
  CookieBanner,
  CookieConsentProvider,
  CookieSettingsModal,
} from "@/components/cookie-consent";
import { RecaptchaProvider } from "@/components/recaptcha-provider";
import { routing, type Locale } from "@/i18n/routing";
import { GA_TRACKING_ID } from "@/lib/gtag";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import type React from "react";
import { Toaster } from "sonner";
import { HtmlLangUpdater } from "@/components/html-lang-updater";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
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
    alternates: {
      canonical: locale === "en" ? "/" : "/ru",
      languages: {
        en: "/",
        ru: "/ru",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Load messages for client components
  const messages = await getMessages();

  return (
    <>
      {/* Update HTML lang attribute client-side */}
      <HtmlLangUpdater locale={locale} />

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
      <NextIntlClientProvider messages={messages}>
        <CookieConsentProvider>
          <RecaptchaProvider>
            {children}
            <Toaster richColors position="top-center" />
          </RecaptchaProvider>
          <CookieBanner />
          <CookieSettingsModal />
        </CookieConsentProvider>
      </NextIntlClientProvider>
    </>
  );
}
