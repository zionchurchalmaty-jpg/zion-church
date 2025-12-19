import { Clock, MapPin, Phone } from "lucide-react";

export function LocationSection() {
  return (
    <section id="location" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Info */}
          <div>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-primary" />
                <span className="text-sm font-semibold text-navy uppercase tracking-wider">
                  Visit Us
                </span>
                <div className="h-px w-12 bg-primary" />
              </div>
              <h2 className="font-serif font-bold text-4xl md:text-5xl text-navy mb-4 text-balance">
                Find Us
              </h2>
              <p className="text-lg text-gray-700">
                We'd love to see you this Sunday
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-navy mb-1">
                    Address
                  </h3>
                  <p className="text-gray-700">20430 Ashburn Village Blvd</p>
                  <p className="text-gray-700">Ashburn, VA 20147</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-navy mb-1">
                    Service Times
                  </h3>
                  <p className="text-gray-700">Sunday Worship: 1:30 PM</p>
                  <p className="text-gray-700">
                    Thursday Prayer Meeting: 6:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-navy mb-1">
                    Contact
                  </h3>
                  <p className="text-gray-700">Phone: 703-594-1088</p>
                  <p className="text-gray-700">Email: info@goodnewsbible.org</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3101.234567890123!2d-77.481234!3d39.043210!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDAyJzM1LjYiTiA3N8KwMjgnNTIuNCJX!5e0!3m2!1sen!2sus!4v1234567890123"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
