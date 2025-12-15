/**
 * Cookie Consent Storage Utilities
 *
 * Handles persistence of cookie consent preferences in localStorage.
 */

import { logger } from "@/lib/logger";
import type { CookieConsent } from "./consent";
import { DEFAULT_CONSENT } from "./consent";

const CONSENT_KEY = "proagentme_cookie_consent";

/**
 * Retrieve stored consent preferences from localStorage.
 * Returns null if no consent stored or if stored version is outdated.
 */
export function getStoredConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;

    const consent = JSON.parse(stored) as CookieConsent;

    // Validate required fields exist
    if (
      typeof consent.essential !== "boolean" ||
      typeof consent.analytics !== "boolean" ||
      typeof consent.advertising !== "boolean" ||
      typeof consent.timestamp !== "number" ||
      typeof consent.version !== "string"
    ) {
      logger.warn("Invalid consent structure in storage, clearing");
      clearStoredConsent();
      return null;
    }

    // Check version - prompt re-consent if version changes
    if (consent.version !== DEFAULT_CONSENT.version) {
      logger.info("Consent version mismatch, clearing for re-consent", {
        storedVersion: consent.version,
        currentVersion: DEFAULT_CONSENT.version,
      });
      clearStoredConsent();
      return null;
    }

    return consent;
  } catch (error) {
    logger.error("Failed to parse stored consent", { error });
    clearStoredConsent();
    return null;
  }
}

/**
 * Store consent preferences in localStorage.
 */
export function setStoredConsent(consent: CookieConsent): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    logger.debug("Consent stored successfully", {
      analytics: consent.analytics,
      advertising: consent.advertising,
    });
  } catch (error) {
    logger.error("Failed to store consent", { error });
  }
}

/**
 * Clear stored consent preferences.
 */
export function clearStoredConsent(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch (error) {
    logger.error("Failed to clear stored consent", { error });
  }
}
