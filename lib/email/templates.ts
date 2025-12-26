/**
 * Email templates for form submissions
 */

interface ContactNotificationData {
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
  submittedAt: string;
}

interface NewsletterNotificationData {
  firstName: string;
  email: string;
  submittedAt: string;
}

interface ContactConfirmationData {
  firstName: string;
  interests: {
    planningToVisit: boolean;
    eslClasses: boolean;
    prayerRequest: boolean;
  };
}

interface NewsletterConfirmationData {
  firstName: string;
}

const baseStyles = `
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
  .header { background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
  .header h1 { margin: 0; font-size: 24px; }
  .content { background: #ffffff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; }
  .footer { background: #f8f8f8; padding: 20px; text-align: center; font-size: 12px; color: #666; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 8px 8px; }
  .label { font-weight: 600; color: #1e3a5f; }
  .message-box { background: #f8f8f8; padding: 15px; border-radius: 4px; margin: 15px 0; border-left: 4px solid #ea5808; }
  .interests { margin: 15px 0; }
  .interest-tag { display: inline-block; background: #ea5808; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; margin: 2px 4px 2px 0; }
  .meta { font-size: 12px; color: #888; margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; }
  .cta { background: #ea5808; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 10px 0; }
`;

function getInterestLabels(
  interests: ContactNotificationData["interests"]
): string[] {
  const labels: string[] = [];
  if (interests.planningToVisit) labels.push("Planning to Visit");
  if (interests.eslClasses) labels.push("ESL Classes Interest");
  if (interests.prayerRequest) labels.push("Prayer Request");
  return labels;
}

export function contactNotificationTemplate(data: ContactNotificationData): {
  subject: string;
  html: string;
} {
  const interestLabels = getInterestLabels(data.interests);
  const interestText =
    interestLabels.length > 0 ? interestLabels.join(", ") : "General Inquiry";

  const interestTags = interestLabels
    .map((label) => `<span class="interest-tag">${label}</span>`)
    .join("");

  const subject = `New Contact Form: ${interestText} - ${data.firstName} ${data.lastName}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>${baseStyles}</style>
</head>
<body>
  <div class="header">
    <h1>New Contact Form Submission</h1>
  </div>
  <div class="content">
    <p><span class="label">Name:</span> ${data.firstName} ${data.lastName}</p>
    <p><span class="label">Email:</span> <a href="mailto:${data.email}">${
    data.email
  }</a></p>

    ${
      interestLabels.length > 0
        ? `
    <div class="interests">
      <span class="label">Interests:</span><br>
      ${interestTags}
    </div>
    `
        : ""
    }

    ${
      data.message
        ? `
    <div>
      <span class="label">Message:</span>
      <div class="message-box">${data.message.replace(/\n/g, "<br>")}</div>
    </div>
    `
        : "<p><em>No message provided</em></p>"
    }

    <div class="meta">
      <p>Submitted: ${data.submittedAt}</p>
      <p>reCAPTCHA Score: ${data.recaptchaScore.toFixed(
        2
      )} (1.0 = likely human)</p>
    </div>
  </div>
  <div class="footer">
    <p>Церкось Сион - Contact Form Notification</p>
  </div>
</body>
</html>`;

  return { subject, html };
}

export function newsletterNotificationTemplate(
  data: NewsletterNotificationData
): {
  subject: string;
  html: string;
} {
  const subject = `New Newsletter Subscriber: ${data.firstName}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>${baseStyles}</style>
</head>
<body>
  <div class="header">
    <h1>New Newsletter Subscriber</h1>
  </div>
  <div class="content">
    <p><span class="label">Name:</span> ${data.firstName}</p>
    <p><span class="label">Email:</span> <a href="mailto:${data.email}">${data.email}</a></p>

    <div class="meta">
      <p>Subscribed: ${data.submittedAt}</p>
    </div>
  </div>
  <div class="footer">
    <p>Церкось Сион - Newsletter Subscription Notification</p>
  </div>
</body>
</html>`;

  return { subject, html };
}

export function contactConfirmationTemplate(data: ContactConfirmationData): {
  subject: string;
  html: string;
} {
  const subject = "Thank you for contacting Церкось Сион";

  const visitMessage = data.interests.planningToVisit
    ? `<p style="background: #fff8f0; padding: 15px; border-radius: 4px; border-left: 4px solid #ea5808;">
        <strong>We're excited to meet you!</strong><br>
        Join us this Sunday at <strong>1:30 PM</strong> for our worship service.<br>
        <a href="https://goodnewsbible.org/#location" style="color: #ea5808;">Get directions</a>
       </p>`
    : "";

  const prayerMessage = data.interests.prayerRequest
    ? `<p><em>Your prayer request has been received. Our prayer team will be lifting you up in prayer.</em></p>`
    : "";

  const eslMessage = data.interests.eslClasses
    ? `<p><em>We've noted your interest in our ESL classes. Someone will reach out with more information soon.</em></p>`
    : "";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>${baseStyles}</style>
</head>
<body>
  <div class="header">
    <h1>Thank You for Reaching Out</h1>
  </div>
  <div class="content">
    <p>Dear ${data.firstName},</p>

    <p>Thank you for contacting Церкось Сион! We have received your message and will get back to you as soon as possible.</p>

    ${visitMessage}
    ${prayerMessage}
    ${eslMessage}

    <p>If you have any urgent questions, feel free to reach out to us directly.</p>

    <p>Blessings,<br>
    <strong>Церкось Сион</strong></p>
  </div>
  <div class="footer">
    <p>Церкось Сион | Ashburn, VA</p>
    <p><a href="https://goodnewsbible.org" style="color: #ea5808;">goodnewsbible.org</a></p>
  </div>
</body>
</html>`;

  return { subject, html };
}

export function newsletterConfirmationTemplate(
  data: NewsletterConfirmationData
): {
  subject: string;
  html: string;
} {
  const subject = "Welcome to Церкось Сион Newsletter";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>${baseStyles}</style>
</head>
<body>
  <div class="header">
    <h1>Welcome to Our Newsletter!</h1>
  </div>
  <div class="content">
    <p>Dear ${data.firstName},</p>

    <p>Thank you for subscribing to the Церкось Сион newsletter!</p>

    <p>You'll receive updates about:</p>
    <ul>
      <li>Upcoming church events and activities</li>
      <li>Sermon highlights and devotionals</li>
      <li>Community news and announcements</li>
    </ul>

    <p>We're glad to have you as part of our community!</p>

    <p>Blessings,<br>
    <strong>Церкось Сион</strong></p>
  </div>
  <div class="footer">
    <p>Церкось Сион | Ashburn, VA</p>
    <p><a href="https://goodnewsbible.org" style="color: #ea5808;">goodnewsbible.org</a></p>
    <p style="font-size: 11px; color: #999;">You're receiving this because you subscribed to our newsletter. You can unsubscribe anytime.</p>
  </div>
</body>
</html>`;

  return { subject, html };
}
