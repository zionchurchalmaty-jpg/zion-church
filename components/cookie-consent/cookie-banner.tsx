"use client";

import { Link } from "@/i18n/navigation";
import { useCookieConsent } from "./cookie-consent-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { event } from "@/lib/gtag";
import { useTranslations } from "next-intl";

/**
 * Cookie consent banner component.
 * Displays at the bottom of the screen when user has not yet consented.
 */
export function CookieBanner() {
  const t = useTranslations("cookie.banner");
  const { showBanner, isLoaded, acceptAll, openSettings } = useCookieConsent();

  // Don't render until we've checked localStorage
  if (!isLoaded || !showBanner) return null;

  const handleAcceptAll = () => {
    acceptAll();
    event("cookie_consent", { action: "accept_all" });
  };

  const handleOpenSettings = () => {
    openSettings();
    event("cookie_consent", { action: "open_settings" });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <Card className="mx-auto max-w-4xl shadow-lg border-border bg-background/95 backdrop-blur-sm">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">
                {t("title")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("description")}{" "}
                <Link
                  href="/legal/privacy-policy#cookies"
                  className="underline hover:text-foreground"
                >
                  {t("learnMore")}
                </Link>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
              <Button variant="outline" size="sm" onClick={handleOpenSettings}>
                {t("customize")}
              </Button>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleAcceptAll}
              >
                {t("acceptAll")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
