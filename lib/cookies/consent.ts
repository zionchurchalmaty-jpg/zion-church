/**
 * Cookie Consent Type Definitions
 *
 * Defines the consent categories and state structure for GDPR/CCPA compliance.
 */

/**
 * Consent categories supported by the application.
 * - essential: Required for site functionality, cannot be disabled
 * - analytics: Maps to GA4 analytics_storage
 * - advertising: Maps to GA4 ad_storage, ad_user_data, ad_personalization
 */
export type ConsentCategory = "essential" | "analytics" | "advertising";

/**
 * User's cookie consent preferences.
 */
export interface CookieConsent {
  /** Essential cookies - always true, cannot be disabled */
  essential: true;
  /** Analytics cookies (GA4 analytics_storage) */
  analytics: boolean;
  /** Advertising cookies (GA4 ad_storage, ad_user_data, ad_personalization) */
  advertising: boolean;
  /** Timestamp when consent was given (Unix ms) */
  timestamp: number;
  /** Consent version for tracking changes to consent requirements */
  version: string;
}

/**
 * State of the cookie consent UI and stored preferences.
 */
export interface ConsentState {
  /** Current consent preferences, null if not yet set */
  consent: CookieConsent | null;
  /** Whether consent has been loaded from storage */
  isLoaded: boolean;
  /** Whether to show the consent banner */
  showBanner: boolean;
  /** Whether to show the settings modal */
  showSettings: boolean;
}

/**
 * Default consent state with all cookies granted.
 * Note: Set to granted by default since site is not yet operating in EU regions.
 * Change to false when expanding to GDPR-regulated regions.
 */
export const DEFAULT_CONSENT: Omit<CookieConsent, "timestamp"> = {
  essential: true,
  analytics: true,
  advertising: true,
  version: "1.0",
};

/**
 * Create a full consent object with current timestamp.
 */
export function createConsent(
  preferences: Partial<Pick<CookieConsent, "analytics" | "advertising">>
): CookieConsent {
  return {
    essential: true,
    analytics: preferences.analytics ?? false,
    advertising: preferences.advertising ?? false,
    timestamp: Date.now(),
    version: DEFAULT_CONSENT.version,
  };
}

/**
 * Create consent with all non-essential cookies accepted.
 */
export function createAcceptAllConsent(): CookieConsent {
  return createConsent({ analytics: true, advertising: true });
}

/**
 * Create consent with all non-essential cookies rejected.
 */
export function createRejectNonEssentialConsent(): CookieConsent {
  return createConsent({ analytics: false, advertising: false });
}

/**
 * Check if defaults have all cookies granted.
 */
export function areDefaultsAllGranted(): boolean {
  return DEFAULT_CONSENT.analytics && DEFAULT_CONSENT.advertising;
}
