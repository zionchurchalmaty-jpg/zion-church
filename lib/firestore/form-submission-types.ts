import type { Timestamp } from "firebase/firestore";

export type FormType = "contact" | "newsletter";

export interface ContactInterests {
  planningToVisit: boolean;
  eslClasses: boolean;
  prayerRequest: boolean;
}

interface FormSubmissionBase {
  id: string;
  formType: FormType;
  firstName: string;
  email: string;
  createdAt: Timestamp;
  recaptchaScore: number;
  ipAddress?: string;
  userAgent?: string;
}

export interface ContactSubmission extends FormSubmissionBase {
  formType: "contact";
  lastName: string;
  message?: string;
  interests: ContactInterests;
}

export interface NewsletterSubmission extends FormSubmissionBase {
  formType: "newsletter";
}

export type FormSubmission = ContactSubmission | NewsletterSubmission;

// Input types for API (without auto-generated fields like id, createdAt)
export interface ContactFormInput {
  formType: "contact";
  firstName: string;
  lastName: string;
  email: string;
  message?: string;
  interests: ContactInterests;
  recaptchaToken: string;
}

export interface NewsletterFormInput {
  formType: "newsletter";
  firstName: string;
  email: string;
  recaptchaToken: string;
}

export type FormInput = ContactFormInput | NewsletterFormInput;

// Types for creating submissions in Firestore (API route uses these)
export interface CreateContactSubmissionInput {
  formType: "contact";
  firstName: string;
  lastName: string;
  email: string;
  message?: string;
  interests: ContactInterests;
  recaptchaScore: number;
  ipAddress?: string;
  userAgent?: string;
}

export interface CreateNewsletterSubmissionInput {
  formType: "newsletter";
  firstName: string;
  email: string;
  recaptchaScore: number;
  ipAddress?: string;
  userAgent?: string;
}

export type CreateSubmissionInput =
  | CreateContactSubmissionInput
  | CreateNewsletterSubmissionInput;
