import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - ProAgentMe",
  description:
    "Privacy Policy for ProAgentMe.com - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <h1>Privacy Policy</h1>

          <p className="text-lg text-muted-foreground">
            <strong>ProAgentMe.com</strong>
          </p>
          <p className="text-muted-foreground italic">
            A product of Telos Technologies LLC
          </p>

          <p>
            <strong>Effective Date:</strong> December 9, 2025
            <br />
            <strong>Last Updated:</strong> December 9, 2025
          </p>

          <hr />

          <h2>Introduction</h2>

          <p>
            Welcome to ProAgentMe.com (&quot;ProAgentMe,&quot;
            &quot;Platform,&quot; &quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;), a product owned and operated by Telos Technologies
            LLC, a Virginia limited liability company (&quot;Company&quot;).
            This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website proagentme.com
            and use our services.
          </p>

          <p>
            We are committed to protecting your privacy and handling your data
            with transparency and care. Please read this Privacy Policy
            carefully. By accessing or using ProAgentMe, you acknowledge that
            you have read, understood, and agree to be bound by this Privacy
            Policy. If you do not agree with the terms of this Privacy Policy,
            please do not access or use our Platform.
          </p>

          <hr />

          <h2>Table of Contents</h2>

          <ol>
            <li>
              <a href="#definitions">Definitions</a>
            </li>
            <li>
              <a href="#information-we-collect">Information We Collect</a>
            </li>
            <li>
              <a href="#how-we-use-your-information">
                How We Use Your Information
              </a>
            </li>
            <li>
              <a href="#creator-content-protection">
                Creator Content and Training Data Protection
              </a>
            </li>
            <li>
              <a href="#information-sharing">
                Information Sharing and Disclosure
              </a>
            </li>
            <li>
              <a href="#data-retention">Data Retention</a>
            </li>
            <li>
              <a href="#data-security">Data Security</a>
            </li>
            <li>
              <a href="#your-privacy-rights">Your Privacy Rights</a>
            </li>
            <li>
              <a href="#international-data-transfers">
                International Data Transfers
              </a>
            </li>
            <li>
              <a href="#childrens-privacy">Children&apos;s Privacy</a>
            </li>
            <li>
              <a href="#third-party-services">Third-Party Services</a>
            </li>
            <li>
              <a href="#cookies">Cookies and Tracking Technologies</a>
            </li>
            <li>
              <a href="#do-not-track">Do Not Track Signals</a>
            </li>
            <li>
              <a href="#california-privacy-rights">California Privacy Rights</a>
            </li>
            <li>
              <a href="#european-privacy-rights">
                European Privacy Rights (GDPR)
              </a>
            </li>
            <li>
              <a href="#changes">Changes to This Privacy Policy</a>
            </li>
            <li>
              <a href="#contact-us">Contact Us</a>
            </li>
          </ol>

          <hr />

          <h2 id="definitions">1. Definitions</h2>

          <p>For the purposes of this Privacy Policy:</p>

          <ul>
            <li>
              <strong>&quot;Account&quot;</strong> means a unique account
              created for you to access our Platform.
            </li>
            <li>
              <strong>&quot;Agent&quot;</strong> means an AI-powered digital
              assistant created by a Creator on the Platform.
            </li>
            <li>
              <strong>&quot;Client&quot;</strong> means any user who hires,
              accesses, or interacts with Agents on the Platform.
            </li>
            <li>
              <strong>&quot;Creator&quot;</strong> means any user who creates,
              trains, and publishes Agents on the Platform.
            </li>
            <li>
              <strong>&quot;Creator Content&quot;</strong> or{" "}
              <strong>&quot;Training Materials&quot;</strong> means any
              documents, text, audio, video, images, frameworks, methodologies,
              prompts, instructions, or other materials uploaded by Creators to
              train their Agents.
            </li>
            <li>
              <strong>&quot;Conversation Data&quot;</strong> means the content
              of interactions between Clients and Agents.
            </li>
            <li>
              <strong>&quot;Personal Data&quot;</strong> means any information
              that identifies or can be used to identify an individual.
            </li>
            <li>
              <strong>&quot;Platform&quot;</strong> means the ProAgentMe.com
              website, applications, and all related services.
            </li>
            <li>
              <strong>&quot;User&quot;</strong> means any individual who
              accesses or uses the Platform, including Creators and Clients.
            </li>
          </ul>

          <hr />

          <h2 id="information-we-collect">2. Information We Collect</h2>

          <h3>2.1 Information You Provide Directly</h3>

          <p>
            <strong>Account Information:</strong>
          </p>
          <ul>
            <li>Full name</li>
            <li>Email address</li>
            <li>Password (encrypted)</li>
            <li>Phone number (optional)</li>
            <li>Profile photo (optional)</li>
            <li>Professional title and expertise areas</li>
            <li>Company or organization name (optional)</li>
            <li>Billing address</li>
            <li>
              Payment information (processed by third-party payment processors)
            </li>
          </ul>

          <p>
            <strong>Creator-Specific Information:</strong>
          </p>
          <ul>
            <li>Professional background and credentials</li>
            <li>Areas of expertise</li>
            <li>Pricing preferences</li>
            <li>
              Payout information (bank account or payment service details)
            </li>
            <li>
              Training Materials and Creator Content (see Section 4 for special
              protections)
            </li>
            <li>Agent configuration settings and prompts</li>
          </ul>

          <p>
            <strong>Client-Specific Information:</strong>
          </p>
          <ul>
            <li>Company information</li>
            <li>Project requirements and needs</li>
            <li>Feedback and reviews</li>
          </ul>

          <p>
            <strong>Communications:</strong>
          </p>
          <ul>
            <li>Customer support inquiries</li>
            <li>Emails and messages sent through the Platform</li>
            <li>Survey responses</li>
            <li>Feedback and testimonials</li>
          </ul>

          <h3>2.2 Information Collected Automatically</h3>

          <p>
            <strong>Device and Usage Information:</strong>
          </p>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Device identifiers</li>
            <li>Pages visited and features used</li>
            <li>Time and date of visits</li>
            <li>Referring URLs</li>
            <li>Click patterns and navigation paths</li>
          </ul>

          <p>
            <strong>Conversation and Interaction Data:</strong>
          </p>
          <ul>
            <li>Interactions between Clients and Agents</li>
            <li>Human escalation requests and outcomes</li>
            <li>Usage patterns and frequency</li>
            <li>Task completion data</li>
          </ul>

          <p>
            <strong>Log Data:</strong>
          </p>
          <ul>
            <li>Server logs</li>
            <li>Error reports</li>
            <li>Performance data</li>
          </ul>

          <h3>2.3 Information from Third Parties</h3>

          <ul>
            <li>
              Payment processors (transaction confirmations, not full payment
              details)
            </li>
            <li>Identity verification services (if applicable)</li>
            <li>Social media platforms (if you choose to link accounts)</li>
            <li>Analytics providers</li>
            <li>Marketing partners (with your consent)</li>
          </ul>

          <hr />

          <h2 id="how-we-use-your-information">
            3. How We Use Your Information
          </h2>

          <h3>3.1 To Provide and Maintain the Platform</h3>

          <ul>
            <li>Create and manage your Account</li>
            <li>Process transactions and send related information</li>
            <li>Enable Creators to build, train, and deploy Agents</li>
            <li>Enable Clients to discover, hire, and interact with Agents</li>
            <li>Facilitate human escalation from Agents to Creators</li>
            <li>Process payments and payouts</li>
            <li>Provide customer support</li>
          </ul>

          <h3>3.2 To Improve and Personalize the Platform</h3>

          <ul>
            <li>Analyze usage patterns to improve features</li>
            <li>Personalize your experience and recommendations</li>
            <li>Develop new products, services, and features</li>
            <li>Conduct research and analytics</li>
            <li>Monitor and analyze trends</li>
          </ul>

          <h3>3.3 To Communicate With You</h3>

          <ul>
            <li>
              Send administrative information (updates, security alerts, support
              messages)
            </li>
            <li>Respond to inquiries and provide support</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Notify you of changes to our services or policies</li>
          </ul>

          <h3>3.4 To Ensure Safety and Security</h3>

          <ul>
            <li>Detect, prevent, and address fraud and abuse</li>
            <li>Enforce our Terms of Service</li>
            <li>Protect the rights, property, and safety of our Users</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h3>3.5 To Process Payments</h3>

          <ul>
            <li>Facilitate payments from Clients to the Platform</li>
            <li>Process payouts to Creators</li>
            <li>Manage billing and invoicing</li>
            <li>Handle refunds and disputes</li>
          </ul>

          <hr />

          <h2 id="creator-content-protection">
            4. Creator Content and Training Data Protection
          </h2>

          <p className="text-lg font-semibold">
            THIS SECTION CONTAINS OUR MOST IMPORTANT PRIVACY COMMITMENTS TO
            CREATORS.
          </p>

          <h3>4.1 Our Creator Privacy Promise</h3>

          <p>
            We understand that your Training Materials and Creator Content
            represent your valuable intellectual property, professional
            expertise, and competitive advantage. We make the following binding
            commitments:
          </p>

          <h4>We Will NEVER:</h4>

          <ol>
            <li>
              <strong>Share your Training Materials with third parties.</strong>{" "}
              Your documents, frameworks, methodologies, prompts, and other
              content uploaded to train your Agent will never be shared with any
              third party, including other Users, partners, advertisers, or data
              brokers.
            </li>
            <li>
              <strong>
                Use your Training Materials to train our own AI models.
              </strong>{" "}
              Your content will never be used to train, fine-tune, improve, or
              develop any AI models owned or operated by Telos Technologies LLC,
              ProAgentMe, or any affiliated entity.
            </li>
            <li>
              <strong>
                Use your Training Materials to train other Creators&apos;
                Agents.
              </strong>{" "}
              Your content is exclusively used to power YOUR Agent and will
              never be used to benefit other Creators or their Agents.
            </li>
            <li>
              <strong>
                Sell, license, or monetize your Training Materials.
              </strong>{" "}
              Your intellectual property belongs to you. We will never sell,
              license, rent, or otherwise monetize your content beyond its use
              in powering your Agent.
            </li>
            <li>
              <strong>
                Access your Training Materials except as necessary for technical
                operations.
              </strong>{" "}
              We will only access your content for: (a) providing the service,
              (b) troubleshooting technical issues at your request, (c) ensuring
              compliance with our Terms of Service, or (d) responding to valid
              legal requirements.
            </li>
          </ol>

          <h4>We Will ALWAYS:</h4>

          <ol>
            <li>
              <strong>
                Treat your Training Materials as confidential information
              </strong>{" "}
              subject to the highest standards of data protection.
            </li>
            <li>
              <strong>Store your Training Materials securely</strong> using
              industry-standard encryption at rest and in transit.
            </li>
            <li>
              <strong>Delete your Training Materials upon request</strong> or
              upon termination of your Account, subject to our data retention
              requirements and legal obligations.
            </li>
            <li>
              <strong>Notify you</strong> if we receive any legal request for
              access to your Training Materials, unless prohibited by law.
            </li>
            <li>
              <strong>Maintain technical and organizational measures</strong> to
              prevent unauthorized access to your content.
            </li>
          </ol>

          <h3>4.2 Conversation Data</h3>

          <p>
            <strong>For Creators:</strong>
          </p>
          <ul>
            <li>
              You may access transcripts and analytics of conversations between
              Clients and your Agent.
            </li>
            <li>
              You control the retention period for conversation data associated
              with your Agent.
            </li>
            <li>You may anonymize or delete conversation data at any time.</li>
          </ul>

          <p>
            <strong>For Clients:</strong>
          </p>
          <ul>
            <li>
              Your conversations with Agents may be visible to the Creator who
              built that Agent.
            </li>
            <li>
              When you interact with an Agent, you consent to the Creator&apos;s
              access to conversation data.
            </li>
            <li>You may request deletion of your conversation history.</li>
          </ul>

          <h3>4.3 Human Escalation Data</h3>

          <p>When a Client requests human escalation to a Creator:</p>
          <ul>
            <li>
              The Creator receives relevant conversation context to provide
              assistance.
            </li>
            <li>Both parties consent to direct communication.</li>
            <li>
              Escalation data is subject to the same protections as other
              conversation data.
            </li>
          </ul>

          <h3>4.4 Technical Processing</h3>

          <p>
            To provide our service, we must technically process your Training
            Materials to:
          </p>
          <ul>
            <li>
              Generate vector embeddings for retrieval-augmented generation
              (RAG)
            </li>
            <li>Store content in secure databases</li>
            <li>Enable your Agent to respond to Client queries</li>
          </ul>

          <p>
            This technical processing is solely for the purpose of powering YOUR
            Agent and does not constitute &quot;use&quot; of your content for
            any other purpose.
          </p>

          <hr />

          <h2 id="information-sharing">
            5. Information Sharing and Disclosure
          </h2>

          <h3>5.1 We Do NOT Sell Your Personal Information</h3>

          <p>
            We do not sell, rent, or trade your Personal Data to third parties
            for their marketing purposes.
          </p>

          <h3>5.2 Service Providers</h3>

          <p>
            We may share information with third-party service providers who
            perform services on our behalf, including:
          </p>

          <ul>
            <li>
              <strong>Payment Processors:</strong> Stripe, PayPal, or similar
              services to process payments
            </li>
            <li>
              <strong>Cloud Hosting:</strong> Amazon Web Services, Google Cloud
              Platform, or similar services
            </li>
            <li>
              <strong>AI Infrastructure:</strong> OpenAI, Anthropic, Google, or
              similar services to power Agent responses
            </li>
            <li>
              <strong>Analytics:</strong> Services that help us understand
              Platform usage
            </li>
            <li>
              <strong>Customer Support:</strong> Tools to help us respond to
              inquiries
            </li>
            <li>
              <strong>Email Services:</strong> To send transactional and
              marketing emails
            </li>
          </ul>

          <p>
            All service providers are contractually obligated to use your
            information only for the purposes of providing services to us and
            must maintain confidentiality.
          </p>

          <p>
            <strong>Important Note on AI Infrastructure Providers:</strong>
          </p>
          <p>
            When your Agent generates responses, queries may be sent to
            third-party AI providers (such as OpenAI or Anthropic). However:
          </p>
          <ul>
            <li>We do NOT send your Training Materials to these providers</li>
            <li>
              We only send the specific query and relevant context needed to
              generate a response
            </li>
            <li>
              We have agreements with these providers prohibiting them from
              using query data to train their models
            </li>
            <li>
              Your Training Materials remain stored securely on our
              infrastructure
            </li>
          </ul>

          <h3>5.3 Legal Requirements</h3>

          <p>
            We may disclose your information if required to do so by law or in
            response to:
          </p>
          <ul>
            <li>Court orders, subpoenas, or legal process</li>
            <li>Requests from government authorities</li>
            <li>To protect our legal rights or defend against legal claims</li>
            <li>To prevent fraud or illegal activity</li>
            <li>To protect the safety of Users or the public</li>
          </ul>

          <p>
            If we receive a legal request for Creator Training Materials, we
            will notify the affected Creator before disclosure unless prohibited
            by law.
          </p>

          <h3>5.4 Business Transfers</h3>

          <p>
            If Telos Technologies LLC is involved in a merger, acquisition, sale
            of assets, or bankruptcy, your information may be transferred as
            part of that transaction. We will notify you of any such change and
            any choices you may have.
          </p>

          <h3>5.5 With Your Consent</h3>

          <p>
            We may share your information with third parties when you have given
            us explicit consent to do so.
          </p>

          <h3>5.6 Aggregated or De-identified Data</h3>

          <p>
            We may share aggregated or de-identified information that cannot
            reasonably be used to identify you for research, marketing,
            analytics, and other purposes.
          </p>

          <hr />

          <h2 id="data-retention">6. Data Retention</h2>

          <h3>6.1 General Retention Periods</h3>

          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Data Type</th>
                  <th>Retention Period</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Account Information</td>
                  <td>Duration of account + 3 years</td>
                </tr>
                <tr>
                  <td>Creator Training Materials</td>
                  <td>Duration of account + 30 days after deletion request</td>
                </tr>
                <tr>
                  <td>Conversation Data</td>
                  <td>As configured by Creator, or 2 years default</td>
                </tr>
                <tr>
                  <td>Payment Records</td>
                  <td>7 years (legal requirement)</td>
                </tr>
                <tr>
                  <td>Server Logs</td>
                  <td>90 days</td>
                </tr>
                <tr>
                  <td>Analytics Data</td>
                  <td>2 years (aggregated indefinitely)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>6.2 Creator Content Deletion</h3>

          <p>Upon Account termination or deletion request:</p>
          <ul>
            <li>Training Materials will be deleted within 30 days</li>
            <li>Vector embeddings will be purged from all systems</li>
            <li>Backup copies will be deleted within 90 days</li>
            <li>
              We may retain anonymized, aggregated data that cannot identify you
            </li>
          </ul>

          <h3>6.3 Legal Holds</h3>

          <p>We may retain information longer if required for:</p>
          <ul>
            <li>Ongoing legal proceedings</li>
            <li>Regulatory investigations</li>
            <li>Compliance with legal obligations</li>
            <li>Enforcement of our Terms of Service</li>
          </ul>

          <hr />

          <h2 id="data-security">7. Data Security</h2>

          <h3>7.1 Security Measures</h3>

          <p>
            We implement industry-standard security measures to protect your
            information:
          </p>

          <p>
            <strong>Technical Safeguards:</strong>
          </p>
          <ul>
            <li>Encryption of data in transit (TLS 1.3)</li>
            <li>Encryption of data at rest (AES-256)</li>
            <li>Secure password hashing (bcrypt)</li>
            <li>Regular security audits and penetration testing</li>
            <li>Intrusion detection and prevention systems</li>
            <li>Firewall protection</li>
            <li>Access logging and monitoring</li>
          </ul>

          <p>
            <strong>Organizational Safeguards:</strong>
          </p>
          <ul>
            <li>Role-based access controls</li>
            <li>Employee security training</li>
            <li>Background checks for personnel with data access</li>
            <li>Confidentiality agreements</li>
            <li>Incident response procedures</li>
            <li>Regular security reviews</li>
          </ul>

          <h3>7.2 Data Breach Notification</h3>

          <p>
            In the event of a data breach that affects your Personal Data, we
            will:
          </p>
          <ul>
            <li>Notify affected Users within 72 hours of discovery</li>
            <li>Notify relevant regulatory authorities as required by law</li>
            <li>Take immediate steps to mitigate the breach</li>
            <li>
              Provide information about steps you can take to protect yourself
            </li>
          </ul>

          <h3>7.3 Your Responsibilities</h3>

          <p>You are responsible for:</p>
          <ul>
            <li>Maintaining the confidentiality of your Account credentials</li>
            <li>Using strong, unique passwords</li>
            <li>Notifying us immediately of any unauthorized access</li>
            <li>
              Ensuring the security of devices you use to access the Platform
            </li>
          </ul>

          <hr />

          <h2 id="your-privacy-rights">8. Your Privacy Rights</h2>

          <h3>8.1 Access and Portability</h3>

          <p>You have the right to:</p>
          <ul>
            <li>Access the Personal Data we hold about you</li>
            <li>Receive a copy of your data in a portable format</li>
            <li>Request information about how your data is processed</li>
          </ul>

          <h3>8.2 Correction</h3>

          <p>You have the right to:</p>
          <ul>
            <li>Correct inaccurate Personal Data</li>
            <li>Complete incomplete Personal Data</li>
          </ul>

          <h3>8.3 Deletion</h3>

          <p>
            You have the right to request deletion of your Personal Data,
            subject to:
          </p>
          <ul>
            <li>Legal retention requirements</li>
            <li>Ongoing contractual obligations</li>
            <li>
              Legitimate business interests (fraud prevention, legal claims)
            </li>
          </ul>

          <h3>8.4 Restriction and Objection</h3>

          <p>You have the right to:</p>
          <ul>
            <li>
              Restrict processing of your Personal Data in certain circumstances
            </li>
            <li>Object to processing based on legitimate interests</li>
            <li>Object to direct marketing</li>
          </ul>

          <h3>8.5 Withdrawal of Consent</h3>

          <p>
            Where processing is based on consent, you may withdraw consent at
            any time without affecting the lawfulness of prior processing.
          </p>

          <h3>8.6 Exercising Your Rights</h3>

          <p>To exercise any of these rights, contact us at:</p>
          <ul>
            <li>
              Email:{" "}
              <a href="mailto:privacy@proagentme.com">privacy@proagentme.com</a>
            </li>
            <li>Mail: Telos Technologies LLC, Berryville, Virginia, USA</li>
          </ul>

          <p>
            We will respond to requests within 30 days (or as required by
            applicable law).
          </p>

          <hr />

          <h2 id="international-data-transfers">
            9. International Data Transfers
          </h2>

          <h3>9.1 Data Location</h3>

          <p>
            Our Platform is operated from the United States. If you access the
            Platform from outside the United States, your information may be
            transferred to, stored, and processed in the United States or other
            countries where our service providers operate.
          </p>

          <h3>9.2 Transfer Safeguards</h3>

          <p>
            For transfers of Personal Data from the European Economic Area
            (EEA), United Kingdom, or Switzerland, we rely on:
          </p>
          <ul>
            <li>
              Standard Contractual Clauses approved by the European Commission
            </li>
            <li>Other legally recognized transfer mechanisms</li>
            <li>Consent (where applicable)</li>
          </ul>

          <h3>9.3 Privacy Shield</h3>

          <p>
            While the EU-US Privacy Shield is no longer valid for data
            transfers, we continue to adhere to its principles as a matter of
            best practice.
          </p>

          <hr />

          <h2 id="childrens-privacy">10. Children&apos;s Privacy</h2>

          <p>
            ProAgentMe is not intended for children under the age of 18. We do
            not knowingly collect Personal Data from children under 18. If you
            are a parent or guardian and believe your child has provided us with
            Personal Data, please contact us immediately at{" "}
            <a href="mailto:privacy@proagentme.com">privacy@proagentme.com</a>.
            If we discover that we have collected Personal Data from a child
            under 18, we will delete that information promptly.
          </p>

          <hr />

          <h2 id="third-party-services">11. Third-Party Services</h2>

          <h3>11.1 Third-Party Links</h3>

          <p>
            Our Platform may contain links to third-party websites or services.
            We are not responsible for the privacy practices of these third
            parties. We encourage you to read their privacy policies before
            providing any information.
          </p>

          <h3>11.2 Third-Party Integrations</h3>

          <p>
            If you choose to integrate third-party services with your Account
            (such as social media or productivity tools), those services may
            receive information from or send information to our Platform in
            accordance with their own privacy policies.
          </p>

          <h3>11.3 AI Infrastructure Providers</h3>

          <p>
            Our Agents are powered by third-party AI infrastructure providers.
            While we have contractual protections in place:
          </p>
          <ul>
            <li>
              We recommend not sharing highly sensitive personal information in
              conversations with Agents
            </li>
            <li>AI responses are generated by third-party models</li>
            <li>
              We do not control the training data or behavior of underlying AI
              models
            </li>
          </ul>

          <hr />

          <h2 id="cookies">12. Cookies and Tracking Technologies</h2>

          <h3>12.1 Types of Cookies We Use</h3>

          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Cookie Type</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Essential</td>
                  <td>Required for Platform functionality</td>
                  <td>Session</td>
                </tr>
                <tr>
                  <td>Authentication</td>
                  <td>Keep you logged in</td>
                  <td>30 days</td>
                </tr>
                <tr>
                  <td>Preferences</td>
                  <td>Remember your settings</td>
                  <td>1 year</td>
                </tr>
                <tr>
                  <td>Analytics</td>
                  <td>Understand usage patterns</td>
                  <td>2 years</td>
                </tr>
                <tr>
                  <td>Marketing</td>
                  <td>Deliver relevant advertisements (with consent)</td>
                  <td>1 year</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>12.2 Managing Cookies</h3>

          <p>You can manage cookies through:</p>
          <ul>
            <li>Your browser settings</li>
            <li>Our cookie consent banner</li>
            <li>Opt-out links for specific providers</li>
          </ul>

          <p>
            Note that disabling certain cookies may affect Platform
            functionality.
          </p>

          <h3>12.3 Other Tracking Technologies</h3>

          <p>We may use:</p>
          <ul>
            <li>Pixel tags (web beacons)</li>
            <li>Local storage</li>
            <li>Session storage</li>
            <li>Device fingerprinting (for fraud prevention only)</li>
          </ul>

          <hr />

          <h2 id="do-not-track">13. Do Not Track Signals</h2>

          <p>
            Some browsers offer a &quot;Do Not Track&quot; (DNT) setting. There
            is no industry standard for responding to DNT signals. Currently,
            our Platform does not respond to DNT signals. However, you can
            manage tracking through your cookie preferences.
          </p>

          <hr />

          <h2 id="california-privacy-rights">14. California Privacy Rights</h2>

          <h3>14.1 California Consumer Privacy Act (CCPA)</h3>

          <p>
            If you are a California resident, you have the following rights
            under the CCPA:
          </p>

          <p>
            <strong>Right to Know:</strong>
          </p>
          <ul>
            <li>Categories of Personal Data collected</li>
            <li>Sources of Personal Data</li>
            <li>Purposes for collection</li>
            <li>Categories of third parties with whom we share data</li>
            <li>Specific pieces of Personal Data collected</li>
          </ul>

          <p>
            <strong>Right to Delete:</strong>
          </p>
          <ul>
            <li>
              Request deletion of your Personal Data, subject to exceptions
            </li>
          </ul>

          <p>
            <strong>Right to Opt-Out:</strong>
          </p>
          <ul>
            <li>We do not sell Personal Data, so this right does not apply</li>
          </ul>

          <p>
            <strong>Right to Non-Discrimination:</strong>
          </p>
          <ul>
            <li>
              We will not discriminate against you for exercising your rights
            </li>
          </ul>

          <h3>14.2 California Shine the Light Law</h3>

          <p>
            California residents may request information about disclosure of
            Personal Data to third parties for direct marketing purposes. As we
            do not share Personal Data for third-party marketing, this does not
            apply.
          </p>

          <h3>14.3 Exercising CCPA Rights</h3>

          <p>To exercise your CCPA rights:</p>
          <ul>
            <li>
              Email:{" "}
              <a href="mailto:privacy@proagentme.com">privacy@proagentme.com</a>
            </li>
            <li>Include &quot;CCPA Request&quot; in the subject line</li>
            <li>We will verify your identity before processing requests</li>
          </ul>

          <hr />

          <h2 id="european-privacy-rights">
            15. European Privacy Rights (GDPR)
          </h2>

          <h3>15.1 Legal Basis for Processing</h3>

          <p>
            If you are in the EEA, UK, or Switzerland, we process your Personal
            Data based on:
          </p>

          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Purpose</th>
                  <th>Legal Basis</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Providing services</td>
                  <td>Contract performance</td>
                </tr>
                <tr>
                  <td>Account management</td>
                  <td>Contract performance</td>
                </tr>
                <tr>
                  <td>Payment processing</td>
                  <td>Contract performance</td>
                </tr>
                <tr>
                  <td>Customer support</td>
                  <td>Legitimate interests</td>
                </tr>
                <tr>
                  <td>Security and fraud prevention</td>
                  <td>Legitimate interests</td>
                </tr>
                <tr>
                  <td>Analytics and improvement</td>
                  <td>Legitimate interests</td>
                </tr>
                <tr>
                  <td>Marketing</td>
                  <td>Consent</td>
                </tr>
                <tr>
                  <td>Legal compliance</td>
                  <td>Legal obligation</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>15.2 Additional Rights</h3>

          <p>In addition to rights in Section 8, you have the right to:</p>
          <ul>
            <li>Lodge a complaint with your local data protection authority</li>
            <li>
              Receive information about automated decision-making (if
              applicable)
            </li>
          </ul>

          <h3>15.3 Data Protection Officer</h3>

          <p>For GDPR-related inquiries, contact:</p>
          <ul>
            <li>
              Email: <a href="mailto:dpo@proagentme.com">dpo@proagentme.com</a>
            </li>
          </ul>

          <h3>15.4 Supervisory Authority</h3>

          <p>
            You have the right to lodge a complaint with your local supervisory
            authority if you believe we have violated your privacy rights.
          </p>

          <hr />

          <h2 id="changes">16. Changes to This Privacy Policy</h2>

          <h3>16.1 Notification of Changes</h3>

          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of material changes by:
          </p>
          <ul>
            <li>Posting a notice on our Platform</li>
            <li>Sending an email to registered Users</li>
            <li>Updating the &quot;Last Updated&quot; date</li>
          </ul>

          <h3>16.2 Your Continued Use</h3>

          <p>
            Your continued use of the Platform after changes become effective
            constitutes acceptance of the revised Privacy Policy.
          </p>

          <h3>16.3 Review Regularly</h3>

          <p>
            We encourage you to review this Privacy Policy periodically to stay
            informed about our data practices.
          </p>

          <hr />

          <h2 id="contact-us">17. Contact Us</h2>

          <p>
            If you have questions, concerns, or requests regarding this Privacy
            Policy or our privacy practices, please contact us:
          </p>

          <p>
            <strong>Telos Technologies LLC</strong>
            <br />
            (d/b/a ProAgentMe)
          </p>

          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:privacy@proagentme.com">privacy@proagentme.com</a>
            </li>
            <li>
              <strong>General Inquiries:</strong>{" "}
              <a href="mailto:support@proagentme.com">support@proagentme.com</a>
            </li>
            <li>
              <strong>Data Protection Officer:</strong>{" "}
              <a href="mailto:dpo@proagentme.com">dpo@proagentme.com</a>
            </li>
            <li>
              <strong>Mail:</strong> Telos Technologies LLC, Berryville,
              Virginia, USA
            </li>
          </ul>

          <p>We will respond to your inquiry within 30 days.</p>

          <hr />

          <h2>Summary of Key Points</h2>

          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Our Commitment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Creator Training Materials</td>
                  <td>Never shared, never used to train our AI</td>
                </tr>
                <tr>
                  <td>Selling Data</td>
                  <td>We never sell your Personal Data</td>
                </tr>
                <tr>
                  <td>Data Security</td>
                  <td>Industry-standard encryption and security</td>
                </tr>
                <tr>
                  <td>Your Rights</td>
                  <td>Access, correct, delete, and port your data</td>
                </tr>
                <tr>
                  <td>Children</td>
                  <td>Not intended for users under 18</td>
                </tr>
                <tr>
                  <td>Changes</td>
                  <td>We&apos;ll notify you of material changes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr />

          <p className="text-center font-semibold">
            By using ProAgentMe, you acknowledge that you have read and
            understood this Privacy Policy.
          </p>

          <hr />

          <p className="text-center text-sm text-muted-foreground">
            &copy; 2025 Telos Technologies LLC. All rights reserved.
            <br />
            ProAgentMe is a trademark of Telos Technologies LLC.
          </p>
        </article>
      </div>
      <Footer />
    </main>
  );
}
