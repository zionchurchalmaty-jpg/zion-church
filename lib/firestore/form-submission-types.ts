import type { Timestamp } from "firebase/firestore";

export type FormType = "contact" | "newsletter" | "course-request";

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

export interface CourseRequestSubmission extends FormSubmissionBase {
  formType: "course-request";
  course: string;
  consent: boolean;
}

export type FormSubmission = 
  | ContactSubmission 
  | NewsletterSubmission 
  | CourseRequestSubmission;

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

export interface CourseRequestFormInput {
  formType: "course-request";
  firstName: string;
  email: string;
  course: string;
  consent: boolean;
  recaptchaToken?: string; 
}

export type FormInput = 
  | ContactFormInput 
  | NewsletterFormInput 
  | CourseRequestFormInput;

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

export interface CreateCourseRequestSubmissionInput {
  formType: "course-request";
  firstName: string;
  email: string;
  course: string;
  consent: boolean;
  recaptchaScore: number;
}

export type CreateSubmissionInput =
  | CreateContactSubmissionInput
  | CreateNewsletterSubmissionInput
  | CreateCourseRequestSubmissionInput;