"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Visit", href: "/#what-to-expect" },
  { label: "Ministries", href: "/#ministries" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [language, setLanguage] = useState<"en" | "ru">("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(!isHomePage);

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
              src="/GNBC_logo.png"
              alt="Good News Bible Church"
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

            {/* Language Toggle */}
            <div
              className={`flex items-center gap-1 rounded-full p-1 transition-colors ${
                scrolled ? "bg-gray-100" : "bg-white/20"
              }`}
            >
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  language === "en"
                    ? "bg-primary text-white"
                    : scrolled
                    ? "text-gray-600"
                    : "text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("ru")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  language === "ru"
                    ? "bg-primary text-white"
                    : scrolled
                    ? "text-gray-600"
                    : "text-white"
                }`}
              >
                RU
              </button>
            </div>

            <Button size="sm" asChild>
              <a href="https://goodnewsbible.churchcenter.com/giving" target="_blank" rel="noopener noreferrer">Give</a>
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
            <div className="flex items-center gap-2 pt-2">
              <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    language === "en"
                      ? "bg-primary text-white"
                      : "text-gray-600"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("ru")}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    language === "ru"
                      ? "bg-primary text-white"
                      : "text-gray-600"
                  }`}
                >
                  RU
                </button>
              </div>
              <Button size="sm" className="flex-1" asChild>
                <a href="https://goodnewsbible.churchcenter.com/giving" target="_blank" rel="noopener noreferrer">Give</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
