"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { event } from "@/lib/gtag"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const trackNavClick = (item: string) => {
    event("nav_click", { nav_item: item, location: "navbar" })
  }

  const handleMobileMenuToggle = () => {
    const newState = !isOpen
    setIsOpen(newState)
    event("mobile_menu_toggle", { action: newState ? "open" : "close" })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center" onClick={() => trackNavClick("logo")}>
            <Image
              src="/proagentme-logo-lightmode.svg"
              alt="ProAgent Me"
              width={225}
              height={50}
              className="h-[50px] w-auto dark:hidden"
              priority
            />
            <Image
              src="/proagentme-logo-darkmode.svg"
              alt="ProAgent Me"
              width={225}
              height={50}
              className="h-[50px] w-auto hidden dark:block"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#how-it-works"
              className="text-brand-text hover:text-brand-primary transition-colors"
              onClick={() => trackNavClick("how_it_works")}
            >
              How It Works
            </Link>
            <Link
              href="/#verticals"
              className="text-brand-text hover:text-brand-primary transition-colors"
              onClick={() => trackNavClick("agents")}
            >
              Agents
            </Link>
            <Link
              href="/#faq"
              className="text-brand-text hover:text-brand-primary transition-colors"
              onClick={() => trackNavClick("faq")}
            >
              FAQ
            </Link>
            <Link
              href="/blog"
              className="text-brand-text hover:text-brand-primary transition-colors"
              onClick={() => trackNavClick("blog")}
            >
              Blog
            </Link>
            <ThemeToggle />
            <Button asChild className="bg-brand-cta hover:bg-brand-cta/90 text-white">
              <Link href="/#waitlist" onClick={() => event("cta_click", { cta_name: "join_waitlist", location: "navbar" })}>
                Join Waitlist
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button className="p-2 text-foreground" onClick={handleMobileMenuToggle} aria-label="Toggle menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/#how-it-works"
                className="text-brand-text hover:text-brand-primary transition-colors"
                onClick={() => {
                  setIsOpen(false)
                  trackNavClick("how_it_works_mobile")
                }}
              >
                How It Works
              </Link>
              <Link
                href="/#verticals"
                className="text-brand-text hover:text-brand-primary transition-colors"
                onClick={() => {
                  setIsOpen(false)
                  trackNavClick("agents_mobile")
                }}
              >
                Agents
              </Link>
              <Link
                href="/#faq"
                className="text-brand-text hover:text-brand-primary transition-colors"
                onClick={() => {
                  setIsOpen(false)
                  trackNavClick("faq_mobile")
                }}
              >
                FAQ
              </Link>
              <Link
                href="/blog"
                className="text-brand-text hover:text-brand-primary transition-colors"
                onClick={() => {
                  setIsOpen(false)
                  trackNavClick("blog_mobile")
                }}
              >
                Blog
              </Link>
              <Button asChild className="bg-brand-cta hover:bg-brand-cta/90 text-white w-full">
                <Link
                  href="/#waitlist"
                  onClick={() => {
                    setIsOpen(false)
                    event("cta_click", { cta_name: "join_waitlist", location: "navbar_mobile" })
                  }}
                >
                  Join Waitlist
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
