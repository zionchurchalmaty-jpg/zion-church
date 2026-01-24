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
  if (interests.eslClasses) labels.push("Language Classes Interest");
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
    <p>Церковь Сион - Contact Form Notification</p>
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
    <p>Церковь Сион - Newsletter Subscription Notification</p>
  </div>
</body>
</html>`;

  return { subject, html };
}

export function contactConfirmationTemplate(data: ContactConfirmationData): {
  subject: string;
  html: string;
} {
  const subject = "Спасибо за обращение в церковь Сион";

  const visitMessage = data.interests.planningToVisit
    ? `<p style="background: #fff8f0; padding: 15px; border-radius: 4px; border-left: 4px solid #ea5808;">
        <strong>Мы рады познакомиться с вами!</strong><br>
        Присоединяйтесь к нам в это воскресенье в <strong>11:00</strong> на богослужение.<br>
        <a href="https://zion-church.kz/#location" style="color: #ea5808;">Как нас найти</a>
       </p>`
    : "";

  const prayerMessage = data.interests.prayerRequest
    ? `<p><em>Ваша молитвенная нужда получена. Наша молитвенная группа будет молиться за вас.</em></p>`
    : "";

  const eslMessage = data.interests.eslClasses
    ? `<p><em>Мы отметили ваш интерес к языковым курсам. Мы свяжемся с вами, когда появится информация о наборе групп.</em></p>`
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
    <h1>Спасибо за обращение</h1>
  </div>
  <div class="content">
    <p>Дорогой(ая) ${data.firstName},</p>

    <p>Спасибо за обращение в церковь «Сион»! Мы получили ваше сообщение и свяжемся с вами как можно скорее.</p>

    ${visitMessage}
    ${prayerMessage}
    ${eslMessage}

    <p>Если у вас возникнут срочные вопросы, пожалуйста, свяжитесь с нами напрямую.</p>

    <p>Благословений вам,<br>
    <strong>Церковь Сион</strong></p>
  </div>
  <div class="footer">
    <p>Церковь Сион | Алматы, Казахстан</p>
    <p><a href="https://zion-church.kz" style="color: #ea5808;">zion-church.kz</a></p>
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
  const subject = "Добро пожаловать в рассылку церкви Сион";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>${baseStyles}</style>
</head>
<body>
  <div class="header">
    <h1>Добро пожаловать!</h1>
  </div>
  <div class="content">
    <p>Дорогой(ая) ${data.firstName},</p>

    <p>Спасибо за подписку на новости церкви «Сион»!</p>

    <p>Вы будете получать обновления о:</p>
    <ul>
      <li>Предстоящих церковных мероприятиях</li>
      <li>Проповедях и духовных размышлениях</li>
      <li>Новостях общины и объявлениях</li>
    </ul>

    <p>Мы рады, что вы с нами!</p>

    <p>Благословений вам,<br>
    <strong>Церковь Сион</strong></p>
  </div>
  <div class="footer">
    <p>Церковь Сион | Алматы, Казахстан</p>
    <p><a href="https://www.zionchurch.kz/" style="color: #ea5808;">zionchurch.kz</a></p>
    <p style="font-size: 11px; color: #999;">Вы получили это письмо, так как подписались на нашу рассылку.</p>
  </div>
</body>
</html>`;

  return { subject, html };
}