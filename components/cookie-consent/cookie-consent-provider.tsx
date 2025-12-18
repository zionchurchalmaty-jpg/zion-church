"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { logger } from "@/lib/logger";
import type { CookieConsent, ConsentState } from "@/lib/cookies/consent";
import {
  createAcceptAllConsent,
  createConsent,
  createRejectNonEssentialConsent,
} from "@/lib/cookies/consent";
import { getStoredConsent, setStoredConsent } from "@/lib/cookies/storage";
import { updateGtagConsent } from "@/lib/cookies/gtag-consent";

/**
 * Context value for cookie consent management.
 */
interface CookieConsentContextValue extends ConsentState {
  /** Accept all cookie categories */
  acceptAll: () => void;
  /** Reject all non-essential cookies */
  rejectNonEssential: () => void;
  /** Update consent with specific preferences */
  updateConsent: (
    preferences: Partial<Pick<CookieConsent, "analytics" | "advertising">>
  ) => void;
  /** Open the settings modal */
  openSettings: () => void;
  /** Close the settings modal */
  closeSettings: () => void;
  /** Check if a specific consent category is granted */
  hasConsent: (category: "analytics" | "advertising") => boolean;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null
);

/**
 * Provider component for cookie consent management.
 * Handles consent state, persistence, and GA4 consent mode updates.
 */
export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConsentState>({
    consent: null,
    isLoaded: false,
    showBanner: false,
    showSettings: false,
  });

  // Load consent from storage on mount
  useEffect(() => {
    const storedConsent = getStoredConsent();

    if (storedConsent) {
      // User has previously consented - update GA4 consent
      updateGtagConsent(storedConsent.analytics, storedConsent.advertising);
      setState({
        consent: storedConsent,
        isLoaded: true,
        showBanner: false,
        showSettings: false,
      });
      logger.debug("Loaded existing consent from storage", {
        analytics: storedConsent.analytics,
        advertising: storedConsent.advertising,
      });
    } else {
      // No consent stored - don't auto-show banner, user can access via footer
      setState((prev) => ({
        ...prev,
        isLoaded: true,
        showBanner: false,
      }));
      logger.debug("No stored consent found");
    }
  }, []);

  // Listen for custom event to open settings (for footer link)
  useEffect(() => {
    const handleOpenSettings = () => {
      setState((prev) => ({ ...prev, showSettings: true }));
    };

    window.addEventListener("open-cookie-settings", handleOpenSettings);
    return () => {
      window.removeEventListener("open-cookie-settings", handleOpenSettings);
    };
  }, []);

  const saveConsent = useCallback((consent: CookieConsent) => {
    setStoredConsent(consent);
    updateGtagConsent(consent.analytics, consent.advertising);
    setState({
      consent,
      isLoaded: true,
      showBanner: false,
      showSettings: false,
    });
  }, []);

  const acceptAll = useCallback(() => {
    const consent = createAcceptAllConsent();
    saveConsent(consent);
    logger.info("User accepted all cookies");
  }, [saveConsent]);

  const rejectNonEssential = useCallback(() => {
    const consent = createRejectNonEssentialConsent();
    saveConsent(consent);
    logger.info("User rejected non-essential cookies");
  }, [saveConsent]);

  const updateConsent = useCallback(
    (
      preferences: Partial<Pick<CookieConsent, "analytics" | "advertising">>
    ) => {
      const consent = createConsent({
        analytics: preferences.analytics ?? state.consent?.analytics ?? false,
        advertising:
          preferences.advertising ?? state.consent?.advertising ?? false,
      });
      saveConsent(consent);
      logger.info("User updated cookie preferences", {
        analytics: consent.analytics,
        advertising: consent.advertising,
      });
    },
    [saveConsent, state.consent]
  );

  const openSettings = useCallback(() => {
    setState((prev) => ({ ...prev, showSettings: true }));
  }, []);

  const closeSettings = useCallback(() => {
    setState((prev) => ({ ...prev, showSettings: false }));
  }, []);

  const hasConsent = useCallback(
    (category: "analytics" | "advertising"): boolean => {
      return state.consent?.[category] ?? false;
    },
    [state.consent]
  );

  const value: CookieConsentContextValue = {
    ...state,
    acceptAll,
    rejectNonEssential,
    updateConsent,
    openSettings,
    closeSettings,
    hasConsent,
  };

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

/**
 * Hook to access cookie consent state and actions.
 * Must be used within a CookieConsentProvider.
 *
 * @example
 * ```tsx
 * const { hasConsent, acceptAll, openSettings } = useCookieConsent()
 *
 * if (hasConsent('analytics')) {
 *   // Track event
 * }
 * ```
 */
export function useCookieConsent(): CookieConsentContextValue {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider"
    );
  }

  return context;
}
