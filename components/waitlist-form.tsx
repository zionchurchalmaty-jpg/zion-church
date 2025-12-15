"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUtmParams, utmParamsToFields } from "@/hooks/use-utm-params";
import { event } from "@/lib/gtag";
import { getHubspotCookie, submitHubSpotForm } from "@/lib/hubspot";
import { logger } from "@/lib/logger";

// Zod schemas for form validation
const creatorFormSchema = z.object({
  firstname: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  waitlist_creator_expertise: z
    .string()
    .min(1, "Please describe your area of expertise"),
});

const clientFormSchema = z.object({
  firstname: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  waitlist_client_help_needed: z
    .string()
    .min(1, "Please describe what help you need"),
  waitlist_client_paid_early_access: z.boolean().optional(),
});

type CreatorFormValues = z.infer<typeof creatorFormSchema>;
type ClientFormValues = z.infer<typeof clientFormSchema>;

interface WaitlistFormProps {
  variant: "creator" | "client";
}

export function WaitlistForm({ variant }: WaitlistFormProps) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { executeRecaptcha } = useGoogleReCaptcha();
  const utmParams = useUtmParams();

  const isCreator = variant === "creator";
  const schema = isCreator ? creatorFormSchema : clientFormSchema;

  const form = useForm<CreatorFormValues | ClientFormValues>({
    resolver: zodResolver(schema),
    defaultValues: isCreator
      ? { firstname: "", email: "", waitlist_creator_expertise: "" }
      : {
          firstname: "",
          email: "",
          company: "",
          waitlist_client_help_needed: "",
          waitlist_client_paid_early_access: false,
        },
  });

  const onSubmit = async (values: CreatorFormValues | ClientFormValues) => {
    setStatus("loading");
    setErrorMessage("");

    // Track form submission start
    event("waitlist_form_submit_start", { variant });

    try {
      // Execute reCAPTCHA
      if (!executeRecaptcha) {
        throw new Error("reCAPTCHA not loaded");
      }

      const recaptchaToken = await executeRecaptcha("waitlist_submit");

      if (!recaptchaToken) {
        throw new Error("Failed to get reCAPTCHA token");
      }

      // Build form fields
      const fields = Object.entries(values)
        .filter(([, value]) => value !== undefined && value !== "")
        .map(([name, value]) => ({ name, value: String(value) }));

      // Add UTM parameters as hidden fields
      const utmFields = utmParamsToFields(utmParams);
      fields.push(...utmFields);

      // Get HubSpot tracking cookie
      const hutk = getHubspotCookie();

      // Determine form ID based on variant
      const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || "244567465";
      const formId = isCreator
        ? process.env.NEXT_PUBLIC_HUBSPOT_CREATOR_FORM_ID ||
          "d1905204-1592-4e4c-b944-51005b6991c9"
        : process.env.NEXT_PUBLIC_HUBSPOT_CLIENT_FORM_ID ||
          "d06c71a9-3a95-424e-9b32-99d7f1e84c81";

      // Submit to HubSpot
      await submitHubSpotForm({
        portalId,
        formId,
        fields,
        context: {
          hutk,
          pageUri: window.location.href,
          pageName: document.title,
        },
      });

      setStatus("success");

      console.log("waitlist_form_submit_success =====>", { variant });

      event("waitlist_form_submit_success", { variant });

      if (
        !isCreator &&
        "waitlist_client_paid_early_access" in values &&
        values.waitlist_client_paid_early_access
      ) {
        event("waitlist_form_submit_success_paid_early_access", { variant });
      }
      form.reset();
    } catch (error) {
      logger.error("Waitlist form submission failed", { error, variant });
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
      event("waitlist_form_submit_error", {
        variant,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  // Track when user starts filling the form
  const handleFormFocus = () => {
    if (status === "idle") {
      event("waitlist_form_start", { variant });
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">You're on the list!</h3>
        <p className="text-muted-foreground">
          We'll be in touch soon with early access details.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onFocus={handleFormFocus}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isCreator ? (
          <FormField
            control={form.control}
            name="waitlist_creator_expertise"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area of Expertise</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What's your professional expertise? (e.g., Marketing, Legal, Finance...)"
                    className="resize-none"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <>
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Company{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="waitlist_client_help_needed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What help do you need?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What kind of expert assistance are you looking for?"
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="waitlist_client_paid_early_access"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="cursor-pointer">
                    <FormLabel className="text-base font-semibold leading-snug cursor-pointer">
                      Want early access? We're offering founding clients a pilot
                      program at $29/month for unlimited agent access. Reserve
                      your spot.
                    </FormLabel>
                    <p className="text-sm text-muted-foreground mt-1">
                      6-month pilot program.{" "}
                      <a
                        href="/legal/terms-of-service#founding-client-pilot"
                        className="underline hover:text-foreground"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms apply
                      </a>
                      .
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </>
        )}

        {status === "error" && (
          <div className="flex items-center gap-2 text-destructive text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>
              {errorMessage || "Something went wrong. Please try again."}
            </span>
          </div>
        )}

        <Button
          type="submit"
          className={`w-full ${
            isCreator
              ? "bg-brand-primary hover:bg-brand-primary/90"
              : "bg-brand-cta hover:bg-brand-cta/90"
          }`}
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Joining waitlist...
            </>
          ) : (
            "Join the Waitlist"
          )}
        </Button>
      </form>
    </Form>
  );
}
