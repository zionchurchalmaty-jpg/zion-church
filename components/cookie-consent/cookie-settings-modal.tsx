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
import { useEffect, useState } from "react";
import { useCookieConsent } from "./cookie-consent-provider";

interface CategoryConfig {
  id: "essential" | "analytics" | "advertising";
  name: string;
  description: string;
  required: boolean;
  defaultValue: boolean;
}

const COOKIE_CATEGORIES: CategoryConfig[] = [
  {
    id: "essential",
    name: "Essential Cookies",
    description:
      "Required for the website to function properly. These cookies enable basic features like page navigation, secure areas access, and authentication. Cannot be disabled.",
    required: true,
    defaultValue: true,
  },
  {
    id: "analytics",
    name: "Analytics Cookies",
    description:
      "Help us understand how visitors interact with our website by collecting anonymous information. This data helps us improve our services and user experience.",
    required: false,
    defaultValue: true,
  },
  {
    id: "advertising",
    name: "Advertising Cookies",
    description:
      "Used for advertising measurement and personalization across platforms. These cookies help us show you relevant content and measure the effectiveness of our marketing campaigns.",
    required: false,
    defaultValue: true,
  },
];

/**
 * Cookie settings modal component.
 * Allows granular control over cookie preferences.
 */
export function CookieSettingsModal() {
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
          <DialogTitle>Cookie Preferences</DialogTitle>
          <DialogDescription>
            Manage your cookie preferences. Essential cookies are always enabled
            as they are required for the website to function properly.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {COOKIE_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="flex items-start justify-between gap-4 p-4 rounded-lg border"
            >
              <div className="flex-1">
                <div className="font-medium">{category.name}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {category.description}
                </div>
              </div>
              <Switch
                checked={
                  localPreferences[category.id as keyof typeof localPreferences]
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
                aria-label={`Toggle ${category.name}`}
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
            Reject All
          </Button>
          <Button variant="outline" onClick={handleSave}>
            Save Preferences
          </Button>
          <Button
            className="bg-brand-primary hover:bg-brand-primary/90"
            onClick={handleAcceptAll}
          >
            Accept All
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
