import { Resend } from "resend";
import { emailConfig } from "./config";
import {
  contactNotificationTemplate,
  contactConfirmationTemplate,
  newsletterNotificationTemplate,
  newsletterConfirmationTemplate,
} from "./templates";

let resend: Resend | null = null;

function getResendClient(): Resend | null {
  if (!emailConfig.isConfigured()) {
    console.warn("Email not configured: RESEND_API_KEY or EMAIL_FROM missing");
    return null;
  }

  if (!resend) {
    resend = new Resend(emailConfig.apiKey);
  }

  return resend;
}

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
}

async function sendEmail({ to, subject, html }: SendEmailParams): Promise<boolean> {
  const client = getResendClient();
  if (!client) {
    console.log("Skipping email send - not configured");
    return false;
  }

  try {
    const { error } = await client.emails.send({
      from: emailConfig.from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    if (error) {
      console.error("Failed to send email:", error);
      return false;
    }

    console.log(`Email sent successfully to ${Array.isArray(to) ? to.join(", ") : to}`);
    return true;
  } catch (err) {
    console.error("Error sending email:", err);
    return false;
  }
}

interface ContactSubmissionData {
  firstName: string;
  lastName: string;
  email: string;
  message?: string;
  interests: {
    planningToVisit: boolean;
    eslClasses: boolean;
    prayerRequest: boolean;
  };
  recaptchaScore: number;
}

interface NewsletterSubmissionData {
  firstName: string;
  email: string;
}

/**
 * Send notification email(s) to staff about a contact form submission
 * Routes to different recipients based on interests selected
 */
export async function sendContactNotification(
  data: ContactSubmissionData
): Promise<boolean> {
  const recipients = emailConfig.getRecipientsForInterests(data.interests);

  if (recipients.length === 0) {
    console.warn("No recipients configured for contact notifications");
    return false;
  }

  const { subject, html } = contactNotificationTemplate({
    ...data,
    submittedAt: new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
      dateStyle: "full",
      timeStyle: "short",
    }),
  });

  return sendEmail({ to: recipients, subject, html });
}

/**
 * Send confirmation email to the person who submitted the contact form
 */
export async function sendContactConfirmation(
  data: ContactSubmissionData
): Promise<boolean> {
  const { subject, html } = contactConfirmationTemplate({
    firstName: data.firstName,
    interests: data.interests,
  });

  return sendEmail({ to: data.email, subject, html });
}

/**
 * Send notification email to staff about a new newsletter subscription
 */
export async function sendNewsletterNotification(
  data: NewsletterSubmissionData
): Promise<boolean> {
  const recipients = emailConfig.recipients.newsletter;

  if (recipients.length === 0) {
    console.warn("No recipients configured for newsletter notifications");
    return false;
  }

  const { subject, html } = newsletterNotificationTemplate({
    ...data,
    submittedAt: new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
      dateStyle: "full",
      timeStyle: "short",
    }),
  });

  return sendEmail({ to: recipients, subject, html });
}

/**
 * Send welcome email to new newsletter subscriber
 */
export async function sendNewsletterConfirmation(
  data: NewsletterSubmissionData
): Promise<boolean> {
  const { subject, html } = newsletterConfirmationTemplate({
    firstName: data.firstName,
  });

  return sendEmail({ to: data.email, subject, html });
}

/**
 * Send all emails for a contact form submission
 */
export async function handleContactSubmissionEmails(
  data: ContactSubmissionData
): Promise<void> {
  // Send in parallel, don't wait for one to complete before starting the other
  await Promise.all([
    sendContactNotification(data),
    sendContactConfirmation(data),
  ]);
}

/**
 * Send all emails for a newsletter subscription
 */
export async function handleNewsletterSubmissionEmails(
  data: NewsletterSubmissionData
): Promise<void> {
  await Promise.all([
    sendNewsletterNotification(data),
    sendNewsletterConfirmation(data),
  ]);
}
