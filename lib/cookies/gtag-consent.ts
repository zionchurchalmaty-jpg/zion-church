/**
 * Google Analytics 4 Consent Mode v2 Integration
 *
 * Manages GA4 consent state using Google's Consent Mode v2 API.
 * @see https://developers.google.com/tag-platform/security/guides/consent
 */

import { logger } from "@/lib/logger";
import { GA_TRACKING_ID } from "@/lib/gtag";

/**
 * GA4 Consent Mode parameters
 */
export type GtagConsentParams = {
  analytics_storage: "granted" | "denied";
  ad_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
  [key: string]: "granted" | "denied";
};

// Extend Window interface for gtag consent command
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "consent",
      target: string | Date | "default" | "update",
      params?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

/**
 * Get the inline script content for initializing gtag with default denied consent.
 * This MUST be rendered BEFORE the GA4 script loads.
 *
 * @returns Inline script content for gtag consent initialization
 */
export function getConsentInitScript(): string {
  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'wait_for_update': 500
    });
    gtag('js', new Date());
    gtag('config', '${GA_TRACKING_ID}');
  `;
}

/**
 * Update GA4 consent state when user makes a choice.
 * Call this after user interacts with the consent banner.
 *
 * @param analytics - Whether analytics consent is granted
 * @param advertising - Whether advertising consent is granted
 */
export function updateGtagConsent(
  analytics: boolean,
  advertising: boolean
): void {
  if (typeof window === "undefined" || !window.gtag) {
    logger.warn("gtag not available, cannot update consent");
    return;
  }

  const consentParams: GtagConsentParams = {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: advertising ? "granted" : "denied",
    ad_user_data: advertising ? "granted" : "denied",
    ad_personalization: advertising ? "granted" : "denied",
  };

  window.gtag("consent", "update", consentParams);

  logger.info("GA4 consent updated", {
    analytics_storage: consentParams.analytics_storage,
    ad_storage: consentParams.ad_storage,
  });
}

/**
 * Check if analytics consent has been granted.
 * Useful for conditional event tracking.
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const consent = localStorage.getItem("proagentme_cookie_consent");
    if (!consent) return false;
    const parsed = JSON.parse(consent);
    return parsed.analytics === true;
  } catch {
    return false;
  }
}
