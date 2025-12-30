"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { event } from "@/lib/gtag";
import {
  contactFormClientSchema,
  type ContactFormClientData,
} from "@/lib/validations/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function ContactSection() {
  const t = useTranslations("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormClientData>({
    resolver: zodResolver(contactFormClientSchema),
    defaultValues: {
      formType: "contact",
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      interests: {
        planningToVisit: false,
        // eslClasses: false,
        prayerRequest: false,
        newsletterSubscription: false,
      },
    },
  });

  async function onSubmit(data: ContactFormClientData) {
    setIsSubmitting(true);

    try {
      if (!executeRecaptcha) {
        toast.error(t("errors.recaptchaNotAvailable"));
        return;
      }

      const token = await executeRecaptcha("contact_form");

      const response = await fetch("/api/form-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptchaToken: token }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        event("contact_form_submit", {
          interests_visit: data.interests.planningToVisit,
          // interests_esl: data.interests.eslClasses,
          interests_prayer: data.interests.prayerRequest,
          interests_newsletter: data.interests.newsletterSubscription,
        });
        reset();
      } else {
        toast.error(result.error || t("errors.somethingWentWrong"));
      }
    } catch {
      toast.error(t("errors.failedToSubmit"));
    } finally {
      setIsSubmitting(false);
    }
  }

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
              {t("eyebrow")}
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-white mb-4 text-balance">
            {t("title")}
          </h2>
          <p className="text-lg text-white/80">{t("subtitle")}</p>
        </div>

        {/* Form */}
        <Card className="bg-white">
          <CardContent className="py-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contactFirstName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("form.firstName")} {t("form.required")}
                  </label>
                  <input
                    type="text"
                    id="contactFirstName"
                    {...register("firstName")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("form.lastName")} {t("form.required")}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contactEmail"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("form.email")} {t("form.required")}
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  {...register("email")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("form.message")}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register("message")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
                />
                {errors.message && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {t("form.interestedIn")}
                </p>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("interests.planningToVisit")}
                    className="size-4 text-primary rounded border-gray-300 focus:ring-primary"
                  />
                  <span className="text-gray-700">
                    {t("form.planningToVisit")}
                  </span>
                </label>
                {/* <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("interests.eslClasses")}
                    className="size-4 text-primary rounded border-gray-300 focus:ring-primary"
                  />
                  <span className="text-gray-700">{t("form.eslClasses")}</span>
                </label> */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("interests.prayerRequest")}
                    className="size-4 text-primary rounded border-gray-300 focus:ring-primary"
                  />
                  <span className="text-gray-700">
                    {t("form.prayerRequest")}
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("interests.newsletterSubscription")}
                    className="size-4 text-primary rounded border-gray-300 focus:ring-primary"
                  />
                  <span className="text-gray-700">{t("form.newsletter")}</span>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full h-12"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("form.sending")}
                  </>
                ) : (
                  t("form.submit")
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                {t("recaptchaNotice")}{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-700"
                >
                  {t("privacyPolicy")}
                </a>{" "}
                {t("and")}{" "}
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-700"
                >
                  {t("termsOfService")}
                </a>{" "}
                {t("apply")}
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
