"use client";

import { useState } from "react";
import { UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

interface LockedContentClientProps {
  content: string;
  previewContent?: string;
  isLocked: boolean;
  correctPassword?: string;
}

export function LockedContentClient({
  content,
  previewContent,
  isLocked,
  correctPassword,
}: LockedContentClientProps) {
  const [passwordInput, setPasswordInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const t = useTranslations("blog.lockedContent");

  if (!isLocked) {
    return (
      <div
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === correctPassword) {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="space-y-12">
      {isUnlocked ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div
            className="prose prose-neutral max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      ) : (
        <div className="animate-in fade-in duration-500">
          {previewContent && (
            <div className="prose prose-neutral max-w-none opacity-80 border-b border-dashed border-gray-300 pb-12 mb-12">
              <div dangerouslySetInnerHTML={{ __html: previewContent }} />
            </div>
          )}

          <div className="bg-white border-2 border-navy/5 rounded-[2rem] p-8 md:p-14 text-center shadow-sm max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-navy text-white rounded-full flex items-center justify-center mx-auto mb-8">
              <UserCheck className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4 text-navy">
              {t("title")}
            </h3>

            <p className="text-muted-foreground mb-10 max-w-sm mx-auto leading-relaxed">
              {t("desc")}
            </p>

            <div className="max-w-xs mx-auto">
              <form onSubmit={handleUnlock} className="space-y-4">
                <Input
                  type="password"
                  placeholder={t("placeholder")}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="text-center h-12 rounded-xl border-gray-200 focus:border-navy"
                />
                {error && (
                  <p className="text-red-500 text-xs font-semibold">
                    {t("error")}
                  </p>
                )}
                <Button
                  type="submit"
                  className="w-full h-12 bg-navy hover:bg-navy/90 text-white rounded-xl font-bold transition-all"
                >
                  {t("unlockBtn")}
                </Button>
              </form>
              <p className="mt-8 text-sm text-muted-foreground leading-relaxed italic">
                {t("contact")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
