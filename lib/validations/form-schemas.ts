import { z } from "zod";

export const contactInterestsSchema = z.object({
  planningToVisit: z.boolean().default(false),
  eslClasses: z.boolean().default(false),
  prayerRequest: z.boolean().default(false),
});

export const contactFormSchema = z.object({
  formType: z.literal("contact"),
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().max(2000, "Message is too long").optional(),
  interests: contactInterestsSchema,
  recaptchaToken: z.string().min(1, "reCAPTCHA verification failed"),
});

export const newsletterFormSchema = z.object({
  formType: z.literal("newsletter"),
  firstName: z.string().min(1, "First name is required").max(100),
  email: z.string().email("Please enter a valid email address"),
  recaptchaToken: z.string().min(1, "reCAPTCHA verification failed"),
});

export const formSubmissionSchema = z.discriminatedUnion("formType", [
  contactFormSchema,
  newsletterFormSchema,
]);

// Client-side schemas (without recaptchaToken - added at submission time)
export const contactFormClientSchema = contactFormSchema.omit({
  recaptchaToken: true,
});

export const newsletterFormClientSchema = newsletterFormSchema.omit({
  recaptchaToken: true,
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterFormData = z.infer<typeof newsletterFormSchema>;
export type FormSubmissionData = z.infer<typeof formSubmissionSchema>;
export type ContactFormClientData = z.infer<typeof contactFormClientSchema>;
export type NewsletterFormClientData = z.infer<typeof newsletterFormClientSchema>;
