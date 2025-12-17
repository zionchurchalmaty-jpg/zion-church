"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import type { ReactNode } from "react";

interface RecaptchaProviderProps {
  children: ReactNode;
}

export function RecaptchaProvider({ children }: RecaptchaProviderProps) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // If no site key is configured, render children without reCAPTCHA
  // This allows the app to work in development without reCAPTCHA
  if (!siteKey) {
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head",
      }}
      container={{
        parameters: {
          badge: "inline",
          theme: "light",
        },
        element: "recaptcha-badge-container",
      }}
    >
      {/* Hidden container for reCAPTCHA badge */}
      <div id="recaptcha-badge-container" className="hidden" />
      {children}
    </GoogleReCaptchaProvider>
  );
}
