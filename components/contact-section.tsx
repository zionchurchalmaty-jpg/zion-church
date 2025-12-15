import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-[rgb(var(--secondary-navy))] to-[rgb(var(--secondary-navy-light))] relative overflow-hidden"
    >
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/10 to-transparent blur-3xl" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Get in Touch
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-white mb-4 text-balance">
            We'd Love to Meet You
          </h2>
          <p className="text-lg text-white/80">
            Planning to visit or have a question? Drop us a message.
          </p>
        </div>

        {/* Form */}
        <Card className="bg-white">
          <CardContent className="py-8">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contactFirstName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="contactFirstName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contactEmail"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  I'm interested in:
                </p>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="size-4 text-primary rounded border-gray-300 focus:ring-primary"
                  />
                  <span className="text-gray-700">
                    I'm planning to visit this Sunday
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="size-4 text-primary rounded border-gray-300 focus:ring-primary"
                  />
                  <span className="text-gray-700">
                    I'd like to learn about ESL classes
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="size-4 text-primary rounded border-gray-300 focus:ring-primary"
                  />
                  <span className="text-gray-700">
                    I have a prayer request
                  </span>
                </label>
              </div>

              <Button type="submit" className="w-full h-12">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
