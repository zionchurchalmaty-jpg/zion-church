/**
 * Email configuration
 *
 * Environment variables (keep in .env):
 * - RESEND_API_KEY: Resend API key
 * - EMAIL_FROM: Sender email address (must be verified in Resend)
 *
 * Recipients are configured below as arrays.
 * Add or remove email addresses as needed.
 */

export const emailConfig = {
  apiKey: process.env.RESEND_API_KEY || "",
  from: process.env.EMAIL_FROM || "noreply@goodnewsbible.org",

  /**
   * Email recipients configuration
   * Each category supports multiple email addresses
   */
  recipients: {
    /** Default recipients for general inquiries (when no specific interest is selected) */
    default: ["contact@goodnewsbible.org"],

    /** Recipients for "I'm planning to visit" interest */
    visit: ["contact@goodnewsbible.org"],

    /** Recipients for "ESL classes" interest */
    esl: ["esl@goodnewsbible.org"],

    /** Recipients for "Prayer request" interest */
    prayer: ["contact@goodnewsbible.org"],

    /** Recipients for newsletter subscription notifications */
    newsletter: ["contact@goodnewsbible.org"],
  },

  isConfigured(): boolean {
    return Boolean(this.apiKey && this.from);
  },

  getRecipientsForInterests(interests: {
    planningToVisit: boolean;
    eslClasses: boolean;
    prayerRequest: boolean;
  }): string[] {
    const recipients = new Set<string>();

    if (interests.planningToVisit && this.recipients.visit.length > 0) {
      this.recipients.visit.forEach((r) => recipients.add(r));
    }

    if (interests.eslClasses && this.recipients.esl.length > 0) {
      this.recipients.esl.forEach((r) => recipients.add(r));
    }

    if (interests.prayerRequest && this.recipients.prayer.length > 0) {
      this.recipients.prayer.forEach((r) => recipients.add(r));
    }

    // If no specific interests or no specific recipients configured, use default
    if (recipients.size === 0) {
      this.recipients.default.forEach((r) => recipients.add(r));
    }

    return Array.from(recipients);
  },
};

export type EmailConfig = typeof emailConfig;
