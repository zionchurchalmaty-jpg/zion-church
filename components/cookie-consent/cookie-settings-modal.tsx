"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { event } from "@/lib/gtag";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useCookieConsent } from "./cookie-consent-provider";

interface CategoryConfig {
  id: "essential" | "analytics" | "advertising";
  nameKey: string;
  descriptionKey: string;
  required: boolean;
  defaultValue: boolean;
}

const COOKIE_CATEGORIES: CategoryConfig[] = [
  {
    id: "essential",
    nameKey: "categories.essential.name",
    descriptionKey: "categories.essential.description",
    required: true,
    defaultValue: true,
  },
  {
    id: "analytics",
    nameKey: "categories.analytics.name",
    descriptionKey: "categories.analytics.description",
    required: false,
    defaultValue: true,
  },
  {
    id: "advertising",
    nameKey: "categories.advertising.name",
    descriptionKey: "categories.advertising.description",
    required: false,
    defaultValue: true,
  },
];

/**
 * Cookie settings modal component.
 * Allows granular control over cookie preferences.
 */
export function CookieSettingsModal() {
  const t = useTranslations("cookie.modal");
  const { showSettings, closeSettings, consent, updateConsent, acceptAll } =
    useCookieConsent();

  const [localPreferences, setLocalPreferences] = useState({
    analytics: consent?.analytics ?? true,
    advertising: consent?.advertising ?? true,
  });

  // Sync with actual consent when modal opens or consent changes
  useEffect(() => {
    if (showSettings) {
      setLocalPreferences({
        analytics: consent?.analytics ?? true,
        advertising: consent?.advertising ?? true,
      });
    }
  }, [showSettings, consent]);

  const handleSave = () => {
    updateConsent(localPreferences);
    closeSettings();
    event("cookie_consent", {
      action: "save_preferences",
      analytics: localPreferences.analytics,
      advertising: localPreferences.advertising,
    });
  };

  const handleAcceptAll = () => {
    acceptAll();
    closeSettings();
    event("cookie_consent", { action: "accept_all_from_settings" });
  };

  const handleRejectAll = () => {
    updateConsent({ analytics: false, advertising: false });
    closeSettings();
    event("cookie_consent", { action: "reject_all_from_settings" });
  };

  return (
    <Dialog
      open={showSettings}
      onOpenChange={(open) => !open && closeSettings()}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {COOKIE_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="flex items-start justify-between gap-4 p-4 rounded-lg border"
            >
              <div className="flex-1">
                <div className="font-medium">{t(category.nameKey)}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {t(category.descriptionKey)}
                </div>
              </div>
              <Switch
                checked={
                  category.id === "essential"
                    ? true
                    : localPreferences[category.id as keyof typeof localPreferences]
                }
                disabled={category.required}
                onCheckedChange={(checked) => {
                  if (!category.required) {
                    setLocalPreferences((prev) => ({
                      ...prev,
                      [category.id]: checked,
                    }));
                  }
                }}
                aria-label={`Toggle ${t(category.nameKey)}`}
              />
            </div>
          ))}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleRejectAll}
            className="sm:mr-auto"
          >
            {t("rejectAll")}
          </Button>
          <Button variant="outline" onClick={handleSave}>
            {t("savePreferences")}
          </Button>
          <Button
            className="bg-brand-primary hover:bg-brand-primary/90"
            onClick={handleAcceptAll}
          >
            {t("acceptAll")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
