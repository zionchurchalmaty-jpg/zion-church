"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { event } from "@/lib/gtag";
import {
  contactFormClientSchema,
  type ContactFormClientData,
} from "@/lib/validations/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PenTool, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

const COURSE_KEYS = ["korean", "kazakh", "english"] as const;

const inputClasses =
  "flex h-12 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange/20 focus-visible:border-primary-orange disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 shadow-sm";

export function CourseRequestForm() {
  const t = useTranslations("courseForm");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ContactFormClientData>({
    resolver: zodResolver(contactFormClientSchema),
    defaultValues: {
      formType: "contact",
      firstName: "",
      lastName: "",
      email: "",
      message: COURSE_KEYS[0],
      interests: {
        planningToVisit: false,
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
      const token = await executeRecaptcha("course_sidebar_form");
      const response = await fetch("/api/form-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptchaToken: token }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(t("successMessage"));
        event("course_request_submit", { course: data.message });
        reset({
          message: COURSE_KEYS[0],
          firstName: "",
          lastName: "",
          email: "",
        });
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
    <div className="bg-white rounded-xl border border-stone-100 shadow-lg shadow-stone-200/50 overflow-hidden">
      <div className="p-5 sm:p-6 pb-5 border-b border-stone-100 bg-stone-50/50">
        <div className="flex items-start gap-4 mb-2">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-100/50 text-primary-orange rounded-full shrink-0 mt-1">
            <PenTool className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-navy leading-tight">
              {t("title")}
            </h3>
            <p className="text-stone-500 text-sm mt-1.5 leading-snug">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700 ml-1">
                {t("labels.firstName")}
              </label>
              <input
                type="text"
                {...register("firstName")}
                className={inputClasses}
                placeholder={t("placeholders.firstName")}
              />
              {errors.firstName && (
                <p className="text-xs text-red-500 pl-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700 ml-1">
                {t("labels.lastName")}
              </label>
              <input
                type="text"
                {...register("lastName")}
                className={inputClasses}
                placeholder={t("placeholders.lastName")}
              />
              {errors.lastName && (
                <p className="text-xs text-red-500 pl-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-700 ml-1">
              {t("labels.email")}
            </label>
            <input
              type="email"
              {...register("email")}
              className={inputClasses}
              placeholder="example@gmail.com"
            />
            {errors.email && (
              <p className="text-xs text-red-500 pl-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-700 ml-1">
              {t("labels.selectCourse")}
            </label>

            <Controller
              control={control}
              name="message"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full h-12 text-base bg-white border-stone-200 focus:ring-primary-orange/20">
                    <SelectValue placeholder={t("placeholders.selectCourse")} />
                  </SelectTrigger>
                  <SelectContent>
                    {COURSE_KEYS.map((key) => (
                      <SelectItem
                        key={key}
                        value={key}
                        className="cursor-pointer py-3 text-base"
                      >
                        {t(`courses.${key}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary-orange hover:bg-orange-600 text-white font-bold h-14 text-lg rounded-xl shadow-md shadow-orange-200 transition-all mt-4 active:scale-[0.98]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {t("buttons.sending")}
              </>
            ) : (
              <>
                {t("buttons.submit")}
                <Send className="ml-2 h-5 w-5" />
              </>
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
      </div>
    </div>
  );
}
