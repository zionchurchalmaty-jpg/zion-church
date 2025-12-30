/**
 * Google Analytics 4 (GA4) Tracking Utilities
 *
 * This module provides utilities for tracking page views and custom events
 * using Google Analytics 4 via gtag.js.
 *
 * @example Basic Usage
 * ```tsx
 * import { event, pageview } from "@/lib/gtag"
 *
 * // Track a custom event
 * event("button_click", { button_name: "signup" })
 *
 * // Track a page view (usually handled automatically)
 * pageview("/dashboard")
 * ```
 *
 * @example Tracking User Actions
 * ```tsx
 * // Track sign up
 * event("sign_up", { method: "email" })
 *
 * // Track agent creation
 * event("agent_created", {
 *   agent_id: "abc123",
 *   category: "legal",
 *   price_per_query: 0.50
 * })
 *
 * // Track chat interaction
 * event("chat_message_sent", {
 *   agent_id: "abc123",
 *   message_length: 150
 * })
 *
 * // Track purchase
 * event("purchase", {
 *   transaction_id: "T12345",
 *   value: 29.99,
 *   currency: "USD",
 *   items: [{ item_name: "Credit Pack", quantity: 1 }]
 * })
 * ```
 *
 * @example Tracking in React Components
 * ```tsx
 * "use client"
 * import { event } from "@/lib/gtag"
 *
 * function SignUpButton() {
 *   const handleClick = () => {
 *     event("cta_click", { cta_name: "hero_signup", page: "/" })
 *     // ... rest of handler
 *   }
 *   return <button onClick={handleClick}>Sign Up</button>
 * }
 * ```
 */

export const GA_TRACKING_ID = "G-FLHBM56377";

declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "consent",
      targetId: string | Date | "default" | "update",
      params?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

/**
 * Track a page view in Google Analytics.
 *
 * Note: Next.js App Router handles page views automatically in most cases.
 * Use this for manual tracking when needed (e.g., virtual page views in SPAs).
 *
 * @param url - The URL path to track (e.g., "/dashboard", "/agents/123")
 *
 * @example
 * ```tsx
 * // Track after client-side navigation
 * pageview("/dashboard/settings")
 * ```
 */
export const pageview = (url: string) => {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

/**
 * Track a custom event in Google Analytics.
 * Events will be queued by Consent Mode if analytics consent not yet granted.
 *
 * @param action - The event name (e.g., "sign_up", "purchase", "button_click")
 * @param params - Additional parameters to send with the event
 *
 * @example
 * ```tsx
 * // Simple event
 * event("newsletter_subscribe", { location: "footer" })
 *
 * // Event with multiple parameters
 * event("agent_query", {
 *   agent_id: "abc123",
 *   query_length: 50,
 *   response_time_ms: 1200,
 *   credits_used: 1
 * })
 * ```
 *
 * @see https://developers.google.com/analytics/devguides/collection/ga4/events
 */
export const event = (action: string, params: Record<string, unknown>) => {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", action, params);
};
