"use client";

import { Link } from "@/i18n/navigation";
import { Instagram } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-[rgb(var(--secondary-navy))] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Zion Church Icon"
                className="h-10 w-auto"
              />
              <div className="font-serif font-semibold text-lg">
                {t("churchName")}
              </div>
            </div>
            <p className="font-serif text-white/80 italic">{t("motto")}</p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/zionchurch.kz/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Instagram className="size-5" />
              </a>
              {/* <a
                href="https://www.facebook.com/goodnewsbibleorg"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Facebook className="size-5" />
              </a>
              <a
                href="https://www.youtube.com/@GoodNewsBibleChurchYT"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Youtube className="size-5" />
              </a> */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link
                  href="/#about"
                  className="hover:text-primary transition-colors"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#what-to-expect"
                  className="hover:text-primary transition-colors"
                >
                  {t("visit")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#groups"
                  className="hover:text-primary transition-colors"
                >
                  {t("groups")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-primary transition-colors"
                >
                  {t("blog")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="hover:text-primary transition-colors"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t("resources")}</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link
                  href="/#calendar"
                  className="hover:text-primary transition-colors"
                >
                  {t("eventsCalendar")}
                </Link>
              </li>
              <li>
                <a
                  href="https://goodnewsbible.churchcenter.com/giving"
                  className="hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("giveOnline")}
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@GoodNewsBibleChurchYT"
                  className="hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("watchOnline")}
                </a>
              </li>
              <li>
                <a
                  href="https://goodnewsbible.churchcenter.com/home"
                  className="hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("churchApp")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t("address")}</h3>
            <ul className="space-y-3 text-white/80 text-sm">
              <li>{t("addressLine1")}</li>
              <li>{t("addressLine2")}</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <p>{t("copyright")}</p>
          <div className="flex items-center gap-4">
            <Link
              href="/legal/privacy-policy"
              className="hover:text-primary transition-colors"
            >
              {t("privacyPolicy")}
            </Link>
            {/* <span>·</span>
            <Link
              href="/legal/terms-of-service"
              className="hover:text-primary transition-colors"
            >
              {t("termsOfService")}
            </Link> */}
            <span>·</span>
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-cookie-settings"))
              }
              className="hover:text-primary transition-colors"
            >
              {t("cookieSettings")}
            </button>
          </div>
          <p>{t("serviceInfo")}</p>
        </div>
      </div>
    </footer>
  );
}
