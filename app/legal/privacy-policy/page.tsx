import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - Good News Bible Church",
  description:
    "Privacy Policy for Good News Bible Church website and services.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back to Home
        </Link>

        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <h1 className="font-serif text-navy">Privacy Policy</h1>

          <p className="text-lg text-muted-foreground">
            <strong>Good News Bible Church</strong>
          </p>

          <p>
            <em>Effective Date: December 15, 2025</em>
          </p>

          <hr />

          <h2>1. Introduction</h2>

          <p>
            Good News Bible Church (&ldquo;GNBC,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), located at 20430 Ashburn Village Blvd, Ashburn, VA 20147, is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website{" "}
            <a href="https://www.goodnewsbible.org" target="_blank" rel="noopener noreferrer">www.goodnewsbible.org</a>, our church management platform at{" "}
            <a href="https://goodnewsbible.churchcenter.com" target="_blank" rel="noopener noreferrer">goodnewsbible.churchcenter.com</a>, or use our mobile application (collectively, the &ldquo;Services&rdquo;).
          </p>

          <p>
            By using our Services, you agree to the collection and use of information in accordance with this policy. If you do not agree with this policy, please do not access or use our Services.
          </p>

          <h2>2. Information We Collect</h2>

          <h3>2.1 Personal Information You Provide</h3>

          <p>We may collect personal information that you voluntarily provide when you:</p>

          <ul>
            <li>Register as a church member or visitor</li>
            <li>Sign up for our newsletter or email communications</li>
            <li>Make a donation or financial contribution</li>
            <li>Register for events, programs, or ministries</li>
            <li>Submit prayer requests or counseling inquiries</li>
            <li>Contact us through forms or email</li>
            <li>Participate in surveys or church programs</li>
          </ul>

          <p>
            This information may include your name, email address, phone number, mailing address, family information, date of birth, profile photos, and any other information you choose to provide.
          </p>

          <h3>2.2 Financial Information</h3>

          <p>
            When you make donations or payments, your financial information (such as credit card numbers and bank account details) is processed directly by our third-party payment processor, Stripe. We do not store your complete payment card information on our servers. Please review Stripe&apos;s privacy policy for information about how they handle your data.
          </p>

          <h3>2.3 Automatically Collected Information</h3>

          <p>When you access our Services, we may automatically collect certain information, including:</p>

          <ul>
            <li>Device information (browser type, operating system, device identifiers)</li>
            <li>Usage data (pages visited, time spent, clicks, referring URLs)</li>
            <li>IP address and approximate geographic location</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h3>2.4 Information from Children</h3>

          <p>
            Our Services are not intended for children under 13. We do not knowingly collect personal information from children under 13 without parental consent. Parents may provide information about their children when registering for Sunday School, youth programs, or other children&apos;s ministries. If you believe we have collected information from a child under 13 without proper consent, please contact us immediately.
          </p>

          <h2>3. How We Use Your Information</h2>

          <p>We use the information we collect for the following purposes:</p>

          <ul>
            <li>To facilitate church membership, ministry participation, and spiritual care</li>
            <li>To process donations and provide tax receipts</li>
            <li>To send newsletters, announcements, and ministry communications</li>
            <li>To coordinate events, home groups, and programs</li>
            <li>To respond to prayer requests and pastoral care needs</li>
            <li>To maintain our church directory (with your consent)</li>
            <li>To improve our website, services, and user experience</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2>4. Information Sharing and Disclosure</h2>

          <p>We may share your information in the following circumstances:</p>

          <h3>4.1 Service Providers</h3>

          <p>
            We use third-party services to operate our ministry, including Planning Center (church management), Stripe (payment processing), Google (analytics and advertising), YouTube (video hosting), and social media platforms. These providers have access to your information only as necessary to perform their services.
          </p>

          <h3>4.2 Church Leadership and Ministries</h3>

          <p>
            Information may be shared with pastors, deacons, and ministry leaders as necessary for pastoral care, ministry coordination, and church operations. Prayer requests may be shared with prayer team members unless you request confidentiality.
          </p>

          <h3>4.3 Church Directory</h3>

          <p>
            With your consent, basic contact information may be included in our church directory, accessible only to registered church members.
          </p>

          <h3>4.4 Legal Requirements</h3>

          <p>
            We may disclose information when required by law, court order, or to protect the rights, safety, or property of GNBC, our members, or others.
          </p>

          <h2>5. Data Security</h2>

          <p>
            We implement reasonable administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
          </p>

          <h2>6. Cookies and Tracking Technologies</h2>

          <p>
            Our website uses cookies and similar technologies to enhance your experience, analyze usage patterns, and deliver targeted advertising through Google Ads. You can control cookie settings through your browser preferences. Please note that disabling cookies may affect the functionality of certain features.
          </p>

          <h2>7. Your Rights and Choices</h2>

          <p>You have the right to:</p>

          <ul>
            <li>Access, update, or correct your personal information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt out of marketing communications at any time</li>
            <li>Request removal from the church directory</li>
            <li>Withdraw consent for data processing where applicable</li>
          </ul>

          <p>To exercise these rights, please contact us using the information provided below.</p>

          <h2>8. Data Retention</h2>

          <p>
            We retain personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Donation records are retained as required by tax regulations.
          </p>

          <h2>9. Third-Party Links</h2>

          <p>
            Our Services may contain links to third-party websites, including social media platforms (Facebook, Instagram, YouTube, X). We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
          </p>

          <h2>10. Changes to This Privacy Policy</h2>

          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically. Your continued use of our Services after changes constitutes acceptance of the updated policy.
          </p>

          <h2>11. Contact Us</h2>

          <p>If you have questions about this Privacy Policy or our privacy practices, please contact us:</p>

          <p>
            <strong>Good News Bible Church</strong>
            <br />
            20430 Ashburn Village Blvd
            <br />
            Ashburn, VA 20147
            <br />
            Phone: 703-594-1088
            <br />
            Website:{" "}
            <a href="https://www.goodnewsbible.org" target="_blank" rel="noopener noreferrer">www.goodnewsbible.org</a>
          </p>
        </article>
      </div>
    </main>
  );
}
