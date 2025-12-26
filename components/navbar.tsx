"use client";

import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function Navbar() {
  const t = useTranslations("navbar");
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(!isHomePage);

  const navLinks = [
    { label: t("church-history"), href: "/#church-history" },
    { label: t("mission"), href: "/#mission" },
    { label: t("faith-foundation"), href: "/#faith-foundation" },
    { label: t("sermons"), href: "/#sermons" },
    { label: t("contact"), href: "/#contact" },
  ];

  useEffect(() => {
    // On non-home pages, always show scrolled styles
    if (!isHomePage) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Церкось Сион"
              className="h-14 md:h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-gray-700 hover:text-primary"
                    : "text-white hover:text-white/80"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Button size="sm" asChild>
              <a
                href="https://goodnewsbible.churchcenter.com/giving"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("give")}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2"
          >
            {mobileMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-gray-700 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button size="sm" className="w-full" asChild>
                <a
                  href="https://goodnewsbible.churchcenter.com/giving"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("give")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
