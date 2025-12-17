"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "sonner";
import { Facebook, Instagram, Loader2, Mail, Youtube } from "lucide-react";
import { event } from "@/lib/gtag";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  newsletterFormClientSchema,
  type NewsletterFormClientData,
} from "@/lib/validations/form-schemas";

export function StayConnectedSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormClientData>({
    resolver: zodResolver(newsletterFormClientSchema),
    defaultValues: {
      formType: "newsletter",
      firstName: "",
      email: "",
    },
  });

  async function onSubmit(data: NewsletterFormClientData) {
    setIsSubmitting(true);

    try {
      if (!executeRecaptcha) {
        toast.error("reCAPTCHA not available. Please refresh and try again.");
        return;
      }

      const token = await executeRecaptcha("newsletter_subscribe");

      const response = await fetch("/api/form-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptchaToken: token }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        event("newsletter_subscribe", { location: "stay_connected_section" });
        reset();
      } else {
        toast.error(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Stay Connected
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-navy mb-4 text-balance">
            Join Our Community
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow us on social media and subscribe to our newsletter for
            updates, encouragement, and event announcements.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Social Media */}
          <div className="space-y-6">
            {/* Instagram Card */}
            <Card className="bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <CardContent className="py-8">
                <div className="flex items-start gap-6">
                  <div className="size-16 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Instagram className="size-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl mb-1 text-navy">
                      @goodnewsbibleorg
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Follow us for daily encouragement, event photos, and
                      community highlights
                    </p>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <a
                        href="https://www.instagram.com/goodnewsbibleorg/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Follow on Instagram
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Youth Group Instagram Card */}
            <Card className="bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <CardContent className="py-8">
                <div className="flex items-start gap-6">
                  <div className="size-16 rounded-xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Instagram className="size-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl mb-1 text-navy">
                      @good_news.youth
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Follow our Youth Group for updates on youth events,
                      activities, and community
                    </p>
                    <Button
                      asChild
                      className="bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                    >
                      <a
                        href="https://www.instagram.com/good_news.youth/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Follow Youth Group
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Facebook Card */}
            <Card className="bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <CardContent className="py-8">
                <div className="flex items-start gap-6">
                  <div className="size-16 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Facebook className="size-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl mb-1 text-navy">
                      Good News Bible Church
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Join our Facebook community for events, livestreams, and
                      discussions
                    </p>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                      <a
                        href="https://www.facebook.com/goodnewsbibleorg"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Like on Facebook
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* YouTube channel card */}
            <Card className="bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <CardContent className="py-8">
                <div className="flex items-start gap-6">
                  <div className="size-16 rounded-xl bg-red-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Youtube className="size-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl mb-1 text-navy">
                      Good News Bible Church YT
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Watch sermons, worship sessions, and teachings on our
                      YouTube channel
                    </p>
                    <Button asChild className="bg-red-600 hover:bg-red-700">
                      <a
                        href="https://www.youtube.com/@GoodNewsBibleChurchYT"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Subscribe on YouTube
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Newsletter */}
          <Card className="bg-white border-2 border-primary/20">
            <CardContent className="py-8">
              <div className="text-center mb-6">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="size-8 text-primary" />
                </div>
                <h3 className="font-serif font-semibold text-2xl mb-2 text-navy">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Get weekly updates, sermon highlights, and event
                  announcements delivered to your inbox.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label
                    htmlFor="newsletterFirstName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="newsletterFirstName"
                    {...register("firstName")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="newsletterEmail"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="newsletterEmail"
                    {...register("email")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full h-12"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  We respect your privacy. Unsubscribe anytime.
                  <br />
                  This site is protected by reCAPTCHA and the Google{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-gray-700"
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-gray-700"
                  >
                    Terms of Service
                  </a>{" "}
                  apply.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
