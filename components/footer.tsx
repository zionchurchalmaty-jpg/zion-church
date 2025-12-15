import { Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[rgb(var(--secondary-navy))] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/icon_only.png" alt="GNBC Icon" className="size-10" />
              <div className="font-serif font-semibold text-lg">
                Good News Bible Church
              </div>
            </div>
            <p className="font-serif text-white/80">
              Bring God's Joy to All People
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/goodnewsbibleorg/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Instagram className="size-5" />
              </a>
              <a
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
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <a
                  href="#about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#visit"
                  className="hover:text-primary transition-colors"
                >
                  Plan a Visit
                </a>
              </li>
              <li>
                <a
                  href="#ministries"
                  className="hover:text-primary transition-colors"
                >
                  Ministries
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="hover:text-primary transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Watch Online
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Home Groups
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Events Calendar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Give Online
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Church App
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-white/80 text-sm">
              <li>20430 Ashburn Village Blvd</li>
              <li>Ashburn, VA 20147</li>
              <li>703-594-1088</li>
              <li>info@goodnewsbible.org</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <p>© 2025 Good News Bible Church. All rights reserved.</p>
          <p>Sundays at 1:30 PM · Ashburn, Virginia</p>
        </div>
      </div>
    </footer>
  );
}
