import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - ProAgentMe",
  description:
    "Terms of Service for ProAgentMe.com - Read our terms and conditions for using the platform.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <h1>Terms of Service</h1>

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

          <h2>Agreement to Terms</h2>

          <p>
            Welcome to ProAgentMe.com (&quot;ProAgentMe,&quot;
            &quot;Platform,&quot; &quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;), a product owned and operated by Telos Technologies
            LLC, a Virginia limited liability company (&quot;Company&quot;).
          </p>

          <p>
            These Terms of Service (&quot;Terms&quot;) constitute a legally
            binding agreement between you (&quot;User,&quot; &quot;you,&quot; or
            &quot;your&quot;) and Telos Technologies LLC governing your access
            to and use of the ProAgentMe platform, including any content,
            functionality, and services offered.
          </p>

          <p className="font-semibold">
            PLEASE READ THESE TERMS CAREFULLY BEFORE USING THE PLATFORM.
          </p>

          <p>
            By accessing or using ProAgentMe, you agree to be bound by these
            Terms and our Privacy Policy. If you do not agree to these Terms,
            you must not access or use the Platform.
          </p>

          <hr />

          <h2>Table of Contents</h2>

          <ol>
            <li>
              <a href="#definitions">Definitions</a>
            </li>
            <li>
              <a href="#eligibility">Eligibility</a>
            </li>
            <li>
              <a href="#account-registration">Account Registration</a>
            </li>
            <li>
              <a href="#platform-description">Platform Description</a>
            </li>
            <li>
              <a href="#creator-terms">Creator Terms</a>
            </li>
            <li>
              <a href="#client-terms">Client Terms</a>
            </li>
            <li>
              <a href="#founding-client-pilot">Founding Client Pilot Program</a>
            </li>
            <li>
              <a href="#intellectual-property">Intellectual Property Rights</a>
            </li>
            <li>
              <a href="#creator-content-protection">
                Creator Content and Data Protection
              </a>
            </li>
            <li>
              <a href="#fees-payments">Fees, Payments, and Payouts</a>
            </li>
            <li>
              <a href="#human-escalation">Human Escalation</a>
            </li>
            <li>
              <a href="#acceptable-use">Acceptable Use Policy</a>
            </li>
            <li>
              <a href="#prohibited-content">Prohibited Content and Conduct</a>
            </li>
            <li>
              <a href="#user-generated-content">User-Generated Content</a>
            </li>
            <li>
              <a href="#third-party-services">
                Third-Party Services and AI Providers
              </a>
            </li>
            <li>
              <a href="#disclaimers">Disclaimers</a>
            </li>
            <li>
              <a href="#limitation-of-liability">Limitation of Liability</a>
            </li>
            <li>
              <a href="#indemnification">Indemnification</a>
            </li>
            <li>
              <a href="#dispute-resolution">
                Dispute Resolution and Arbitration
              </a>
            </li>
            <li>
              <a href="#termination">Termination</a>
            </li>
            <li>
              <a href="#modifications">Modifications to Terms</a>
            </li>
            <li>
              <a href="#general-provisions">General Provisions</a>
            </li>
            <li>
              <a href="#contact-information">Contact Information</a>
            </li>
          </ol>

          <hr />

          <h2 id="definitions">1. Definitions</h2>

          <p>For the purposes of these Terms:</p>

          <ul>
            <li>
              <strong>&quot;Account&quot;</strong> means a registered user
              account on the Platform.
            </li>
            <li>
              <strong>&quot;Agent&quot;</strong> means an AI-powered digital
              assistant created by a Creator using the Platform&apos;s tools and
              infrastructure.
            </li>
            <li>
              <strong>&quot;Agent Content&quot;</strong> means responses,
              outputs, and communications generated by an Agent.
            </li>
            <li>
              <strong>&quot;Client&quot;</strong> means a User who hires,
              subscribes to, or interacts with Agents on the Platform.
            </li>
            <li>
              <strong>&quot;Creator&quot;</strong> means a User who creates,
              trains, maintains, and publishes Agents on the Platform.
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
              <strong>&quot;Fees&quot;</strong> means all charges, commissions,
              and payments associated with using the Platform.
            </li>
            <li>
              <strong>&quot;Human Escalation&quot;</strong> means the process by
              which a Client requests direct assistance from the Creator behind
              an Agent.
            </li>
            <li>
              <strong>&quot;Intellectual Property&quot;</strong> means patents,
              copyrights, trademarks, trade secrets, and other proprietary
              rights.
            </li>
            <li>
              <strong>&quot;Platform&quot;</strong> means the ProAgentMe.com
              website, applications, APIs, and all related services.
            </li>
            <li>
              <strong>&quot;Services&quot;</strong> means all services provided
              through the Platform.
            </li>
            <li>
              <strong>&quot;User&quot;</strong> means any individual or entity
              that accesses or uses the Platform.
            </li>
          </ul>

          <hr />

          <h2 id="eligibility">2. Eligibility</h2>

          <h3>2.1 Age Requirement</h3>

          <p>
            You must be at least 18 years old to use the Platform. By using the
            Platform, you represent and warrant that you are at least 18 years
            of age.
          </p>

          <h3>2.2 Legal Capacity</h3>

          <p>
            You must have the legal capacity to enter into binding contracts. If
            you are using the Platform on behalf of an organization, you
            represent and warrant that you have authority to bind that
            organization to these Terms.
          </p>

          <h3>2.3 Geographic Restrictions</h3>

          <p>
            The Platform is operated from the United States. We make no claims
            that the Platform is accessible or appropriate for use in all
            locations. Users are responsible for compliance with local laws.
          </p>

          <h3>2.4 Account Restrictions</h3>

          <p>You may not use the Platform if:</p>
          <ul>
            <li>
              You have been previously banned or removed from the Platform
            </li>
            <li>
              You are prohibited by applicable law from using the services
            </li>
            <li>
              You are located in a country subject to U.S. government sanctions
            </li>
          </ul>

          <hr />

          <h2 id="account-registration">3. Account Registration</h2>

          <h3>3.1 Account Creation</h3>

          <p>
            To access certain features of the Platform, you must create an
            Account by providing accurate, current, and complete information.
          </p>

          <h3>3.2 Account Types</h3>

          <ul>
            <li>
              <strong>Creator Account:</strong> Enables you to create, train,
              and publish Agents
            </li>
            <li>
              <strong>Client Account:</strong> Enables you to discover, hire,
              and interact with Agents
            </li>
            <li>
              <strong>Combined Account:</strong> Users may operate as both
              Creators and Clients
            </li>
          </ul>

          <h3>3.3 Account Security</h3>

          <p>You are responsible for:</p>
          <ul>
            <li>Maintaining the confidentiality of your Account credentials</li>
            <li>All activities that occur under your Account</li>
            <li>
              Notifying us immediately of any unauthorized access or security
              breach
            </li>
          </ul>

          <h3>3.4 Account Information</h3>

          <p>You agree to:</p>
          <ul>
            <li>Provide accurate and truthful information</li>
            <li>Update your information to keep it current</li>
            <li>
              Not create accounts using false identities or on behalf of others
              without authorization
            </li>
          </ul>

          <h3>3.5 One Account Per Person</h3>

          <p>
            Unless otherwise authorized, you may maintain only one Account.
            Multiple accounts may be subject to termination.
          </p>

          <hr />

          <h2 id="platform-description">4. Platform Description</h2>

          <h3>4.1 Marketplace Services</h3>

          <p>ProAgentMe is a marketplace platform that:</p>
          <ul>
            <li>
              Enables Creators to build, train, and deploy AI Agents based on
              their expertise
            </li>
            <li>Enables Clients to discover, hire, and interact with Agents</li>
            <li>Facilitates transactions between Creators and Clients</li>
            <li>Provides infrastructure for Agent creation and deployment</li>
            <li>Enables human escalation from Agents to Creators</li>
          </ul>

          <h3>4.2 Platform Role</h3>

          <p>ProAgentMe acts as a marketplace facilitator, not as:</p>
          <ul>
            <li>An employer of Creators</li>
            <li>A provider of professional services</li>
            <li>A guarantor of Agent quality or accuracy</li>
            <li>A party to agreements between Creators and Clients</li>
          </ul>

          <h3>4.3 No Professional Advice</h3>

          <p>
            Agent Content does not constitute professional advice. Users should
            consult qualified professionals for legal, medical, financial, or
            other professional matters.
          </p>

          <hr />

          <h2 id="creator-terms">5. Creator Terms</h2>

          <h3>5.1 Creator Responsibilities</h3>

          <p>As a Creator, you agree to:</p>

          <p>
            <strong>Content and Quality:</strong>
          </p>
          <ul>
            <li>
              Provide accurate, truthful information in your profile and Agent
              training
            </li>
            <li>Maintain the quality and accuracy of your Agent</li>
            <li>Regularly review and update your Training Materials</li>
            <li>Respond to Client feedback and complaints</li>
            <li>
              Not misrepresent your qualifications, credentials, or expertise
            </li>
          </ul>

          <p>
            <strong>Compliance:</strong>
          </p>
          <ul>
            <li>Comply with all applicable laws and regulations</li>
            <li>
              Not create Agents that provide advice requiring professional
              licensure unless you hold such licensure
            </li>
            <li>
              Ensure your Agent does not generate harmful, illegal, or
              inappropriate content
            </li>
            <li>
              Implement appropriate safeguards and limitations for your Agent
            </li>
          </ul>

          <p>
            <strong>Availability:</strong>
          </p>
          <ul>
            <li>Be available for human escalation requests (if enabled)</li>
            <li>Respond to escalation requests within reasonable timeframes</li>
            <li>Maintain accurate availability settings</li>
          </ul>

          <h3>5.2 Creator Representations and Warranties</h3>

          <p>As a Creator, you represent and warrant that:</p>
          <ul>
            <li>You own or have the right to use all Training Materials</li>
            <li>
              Your Training Materials do not infringe any third-party rights
            </li>
            <li>
              Your Agent will not generate content that violates these Terms
            </li>
            <li>You have the qualifications you claim in your profile</li>
            <li>
              You will comply with all applicable professional and ethical
              standards
            </li>
          </ul>

          <h3>5.3 Agent Configuration</h3>

          <p>Creators are responsible for:</p>
          <ul>
            <li>Setting appropriate pricing for their Agents</li>
            <li>Configuring Agent behavior and limitations</li>
            <li>Defining the scope of topics their Agent will address</li>
            <li>Setting escalation triggers and thresholds</li>
            <li>Monitoring Agent performance and outputs</li>
          </ul>

          <h3>5.4 Creator Independence</h3>

          <p>
            Creators are independent contractors, not employees of Telos
            Technologies LLC. Nothing in these Terms creates an employment,
            partnership, or agency relationship.
          </p>

          <hr />

          <h2 id="client-terms">6. Client Terms</h2>

          <h3>6.1 Client Responsibilities</h3>

          <p>As a Client, you agree to:</p>
          <ul>
            <li>Use Agents for lawful purposes only</li>
            <li>Not attempt to manipulate, exploit, or abuse Agents</li>
            <li>Provide accurate information when interacting with Agents</li>
            <li>Respect the limitations of AI-generated content</li>
            <li>Pay all applicable Fees for services used</li>
          </ul>

          <h3>6.2 Client Acknowledgments</h3>

          <p>As a Client, you acknowledge and understand that:</p>

          <p>
            <strong>AI Limitations:</strong>
          </p>
          <ul>
            <li>
              Agents are AI-powered and may produce inaccurate, incomplete, or
              inappropriate responses
            </li>
            <li>Agent Content is not a substitute for professional advice</li>
            <li>Agents may not always understand context or nuance</li>
            <li>You should verify important information independently</li>
          </ul>

          <p>
            <strong>Creator Relationship:</strong>
          </p>
          <ul>
            <li>
              Your primary relationship for Agent services is with the Creator
            </li>
            <li>
              ProAgentMe is a facilitator, not a party to Creator-Client
              agreements
            </li>
            <li>
              Quality and availability of Agents depends on individual Creators
            </li>
          </ul>

          <h3>6.3 Client Use Restrictions</h3>

          <p>You may not:</p>
          <ul>
            <li>
              Use Agents to generate illegal, harmful, or inappropriate content
            </li>
            <li>
              Attempt to extract Training Materials or reverse-engineer Agents
            </li>
            <li>Share access to Agents in violation of licensing terms</li>
            <li>Use Agents for competitive intelligence against Creators</li>
            <li>Abuse the human escalation feature</li>
          </ul>

          <hr />

          <h2 id="founding-client-pilot">7. Founding Client Pilot Program</h2>

          <h3>7.1 Program Overview</h3>

          <p>
            The Founding Client Pilot Program (&quot;Pilot Program&quot;) is a
            limited-time early access offering for select clients who join the
            ProAgentMe waitlist and opt into the program.
          </p>

          <h3>7.2 Pricing and Duration</h3>

          <ul>
            <li>
              <strong>Monthly Fee:</strong> $29 per month
            </li>
            <li>
              <strong>Program Duration:</strong> 6 months from your enrollment
              date
            </li>
            <li>
              <strong>Usage Limit:</strong> Total platform usage value cannot
              exceed $29 per month
            </li>
          </ul>

          <h3>7.3 Usage Limitations</h3>

          <p>
            While the Pilot Program provides access to multiple AI agents, your
            monthly usage is capped at $29 worth of agent interactions, as
            calculated by our standard pricing metrics. Once you reach the $29
            usage limit in any given month:
          </p>
          <ul>
            <li>
              You will be notified when approaching and upon reaching your limit
            </li>
            <li>
              Additional usage beyond the limit will not be available until the
              next billing cycle
            </li>
            <li>
              You may upgrade to a standard plan at any time for unlimited
              access
            </li>
          </ul>

          <h3>7.4 Program Termination</h3>

          <p>The Pilot Program will automatically end after 6 months. Upon termination:</p>
          <ul>
            <li>
              You will be notified 30 days before the program ends
            </li>
            <li>
              You may transition to a standard subscription plan
            </li>
            <li>
              If you do not select a plan, your account will revert to free tier
              access
            </li>
          </ul>

          <h3>7.5 Program Modifications</h3>

          <p>
            We reserve the right to modify or discontinue the Pilot Program at
            any time with 30 days&apos; notice. Enrolled participants will be
            honored for the remainder of their 6-month term.
          </p>

          <h3>7.6 Eligibility</h3>

          <p>
            The Pilot Program is available only to new clients who join the
            waitlist and opt into the program before the general platform
            launch. This offer cannot be combined with other promotions.
          </p>

          <hr />

          <h2 id="intellectual-property">8. Intellectual Property Rights</h2>

          <h3>8.1 Platform Intellectual Property</h3>

          <p>
            The Platform, including its design, features, functionality, code,
            and content (excluding User content), is owned by Telos Technologies
            LLC and protected by intellectual property laws.
          </p>

          <p>You may not:</p>
          <ul>
            <li>
              Copy, modify, or distribute Platform content without authorization
            </li>
            <li>Reverse engineer, decompile, or disassemble the Platform</li>
            <li>Remove any proprietary notices or labels</li>
            <li>
              Use the Platform&apos;s name, logo, or branding without permission
            </li>
          </ul>

          <h3>8.2 Creator Intellectual Property</h3>

          <p>
            <strong>Creator Ownership:</strong>
          </p>
          <ul>
            <li>Creators retain full ownership of their Training Materials</li>
            <li>
              Creators retain ownership of their original methodologies,
              frameworks, and expertise
            </li>
            <li>
              Creators grant ProAgentMe a limited license solely to provide the
              Services
            </li>
          </ul>

          <p>
            <strong>License to ProAgentMe:</strong>
          </p>
          <p>
            By uploading Training Materials, Creators grant Telos Technologies
            LLC a limited, non-exclusive, non-transferable license to:
          </p>
          <ul>
            <li>
              Process Training Materials to power the Creator&apos;s Agent
            </li>
            <li>Store Training Materials on our infrastructure</li>
            <li>
              Display Creator profiles and Agent descriptions on the Platform
            </li>
          </ul>

          <p>
            <strong>This license:</strong>
          </p>
          <ul>
            <li>
              Does NOT include the right to share Training Materials with third
              parties
            </li>
            <li>
              Does NOT include the right to use Training Materials for our own
              AI training
            </li>
            <li>Does NOT include the right to sublicense Training Materials</li>
            <li>
              Terminates upon deletion of the Creator&apos;s Account or Training
              Materials
            </li>
          </ul>

          <h3>8.3 Client Intellectual Property</h3>

          <p>Clients retain ownership of:</p>
          <ul>
            <li>Information and content they provide to Agents</li>
            <li>Work product they create based on Agent outputs</li>
            <li>Their proprietary business information</li>
          </ul>

          <h3>8.4 Agent Outputs</h3>

          <p>
            <strong>Ownership of Agent Outputs:</strong>
          </p>
          <ul>
            <li>
              Agent Content generated in response to Client queries is licensed
              to the Client for their use
            </li>
            <li>
              Creators do not retain ownership of specific outputs generated for
              Clients
            </li>
            <li>Clients may use Agent outputs for their business purposes</li>
          </ul>

          <p>
            <strong>Restrictions:</strong>
          </p>
          <ul>
            <li>
              Clients may not attribute Agent outputs to human professionals
              without disclosure
            </li>
            <li>
              Clients may not resell or redistribute Agent outputs as a
              commercial product
            </li>
            <li>Agent outputs may not be used to train competing AI systems</li>
          </ul>

          <h3>8.5 Feedback</h3>

          <p>
            Any feedback, suggestions, or ideas you provide about the Platform
            may be used by us without restriction or compensation.
          </p>

          <hr />

          <h2 id="creator-content-protection">
            9. Creator Content and Data Protection
          </h2>

          <h3>8.1 Our Sacred Commitment</h3>

          <p className="text-lg font-semibold">
            THIS SECTION CONTAINS BINDING COMMITMENTS REGARDING CREATOR CONTENT.
          </p>

          <p>
            We understand that Training Materials represent Creators&apos; most
            valuable intellectual property. We make the following legally
            binding commitments:
          </p>

          <h4>We Will NEVER:</h4>

          <ol>
            <li>
              <strong>Share Training Materials with any third party</strong> —
              Your content stays exclusively within systems that power YOUR
              Agent.
            </li>
            <li>
              <strong>Use Training Materials to train our own AI models</strong>{" "}
              — We will not use your content to develop, improve, or train any
              AI system owned by Telos Technologies LLC or ProAgentMe.
            </li>
            <li>
              <strong>Use Training Materials to benefit other Users</strong> —
              Your content will never be used to train, improve, or enhance
              other Creators&apos; Agents.
            </li>
            <li>
              <strong>Sell, license, or monetize Training Materials</strong> —
              We will never commercialize your intellectual property beyond
              providing the Services.
            </li>
            <li>
              <strong>Access Training Materials except as necessary</strong> —
              Access is limited to: (a) providing Services, (b) technical
              troubleshooting at your request, (c) enforcing these Terms, or (d)
              complying with valid legal requirements.
            </li>
          </ol>

          <h3>8.2 Technical Implementation</h3>

          <p>
            To provide Services, we must technically process your Training
            Materials to:
          </p>
          <ul>
            <li>Generate vector embeddings for retrieval</li>
            <li>Store content in encrypted databases</li>
            <li>Enable your Agent to respond to queries</li>
          </ul>

          <p>
            This processing is solely for providing YOUR Agent and does not
            constitute &quot;use&quot; of your content for any other purpose.
          </p>

          <h3>8.3 Data Security</h3>

          <p>We implement industry-standard security measures including:</p>
          <ul>
            <li>Encryption at rest (AES-256) and in transit (TLS 1.3)</li>
            <li>Access controls and authentication</li>
            <li>Regular security audits</li>
            <li>Intrusion detection systems</li>
          </ul>

          <h3>8.4 Data Deletion</h3>

          <p>Upon request or Account termination:</p>
          <ul>
            <li>Training Materials will be deleted within 30 days</li>
            <li>Vector embeddings will be purged</li>
            <li>Backup copies will be deleted within 90 days</li>
          </ul>

          <h3>8.5 Breach of Commitment</h3>

          <p>If we breach any commitment in this Section 8, you may:</p>
          <ul>
            <li>Terminate your Account immediately</li>
            <li>Receive a full refund of fees paid in the prior 12 months</li>
            <li>Pursue legal remedies for breach of contract</li>
          </ul>

          <hr />

          <h2 id="fees-payments">10. Fees, Payments, and Payouts</h2>

          <h3>9.1 Fee Structure</h3>

          <p>
            <strong>Platform Fees:</strong>
          </p>

          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Fee Type</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Transaction Fee (Agent usage)</td>
                  <td>20-25% of transaction value</td>
                </tr>
                <tr>
                  <td>Human Escalation Fee</td>
                  <td>10-15% of escalation fee</td>
                </tr>
                <tr>
                  <td>Premium Subscription (optional)</td>
                  <td>As published</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Fee rates may vary based on subscription tier and are subject to
            change with notice.
          </p>

          <h3>9.2 Creator Pricing</h3>

          <p>Creators set their own prices for:</p>
          <ul>
            <li>Per-task Agent usage</li>
            <li>Subscription access to Agents</li>
            <li>Human escalation hourly rates</li>
          </ul>

          <p>
            Creators are responsible for setting prices that comply with
            applicable laws.
          </p>

          <h3>9.3 Client Payments</h3>

          <p>Clients agree to:</p>
          <ul>
            <li>Pay all applicable Fees when due</li>
            <li>Provide accurate payment information</li>
            <li>Authorize charges to their payment method</li>
            <li>Pay any applicable taxes</li>
          </ul>

          <h3>9.4 Payment Processing</h3>

          <p>
            Payments are processed by third-party payment processors (such as
            Stripe). By using the Platform, you agree to be bound by the payment
            processor&apos;s terms of service.
          </p>

          <h3>9.5 Creator Payouts</h3>

          <ul>
            <li>
              Payouts are processed on a regular schedule (e.g., weekly or
              monthly)
            </li>
            <li>Minimum payout thresholds may apply</li>
            <li>
              Creators are responsible for providing accurate payout information
            </li>
            <li>Creators are responsible for any taxes owed on earnings</li>
          </ul>

          <h3>9.6 Refunds</h3>

          <p>
            <strong>Client Refunds:</strong>
          </p>
          <ul>
            <li>
              Refund requests must be submitted within 7 days of the transaction
            </li>
            <li>Refunds are evaluated on a case-by-case basis</li>
            <li>Platform fees may not be refundable</li>
          </ul>

          <p>
            <strong>Creator Impact:</strong>
          </p>
          <ul>
            <li>Refunds may be deducted from Creator payouts</li>
            <li>Excessive refund rates may result in Account review</li>
          </ul>

          <h3>9.7 Disputes</h3>

          <p>
            Payment disputes should be reported to{" "}
            <a href="mailto:support@proagentme.com">support@proagentme.com</a>{" "}
            within 30 days of the transaction.
          </p>

          <hr />

          <h2 id="human-escalation">11. Human Escalation</h2>

          <h3>10.1 Escalation Feature</h3>

          <p>
            The human escalation feature allows Clients to request direct
            assistance from the Creator behind an Agent.
          </p>

          <h3>10.2 Creator Obligations</h3>

          <p>Creators who enable escalation agree to:</p>
          <ul>
            <li>Be available during stated hours</li>
            <li>Respond to escalation requests in a timely manner</li>
            <li>Provide quality assistance consistent with their expertise</li>
            <li>Maintain professional conduct</li>
          </ul>

          <h3>10.3 Client Obligations</h3>

          <p>Clients using escalation agree to:</p>
          <ul>
            <li>Use escalation for legitimate needs</li>
            <li>Not abuse the escalation feature</li>
            <li>Pay applicable escalation fees</li>
            <li>Treat Creators with respect and professionalism</li>
          </ul>

          <h3>10.4 Escalation Fees</h3>

          <ul>
            <li>
              Human escalation is billed at the Creator&apos;s stated hourly
              rate
            </li>
            <li>Platform fees apply to escalation transactions</li>
            <li>Minimum session lengths may apply</li>
          </ul>

          <h3>10.5 Communication</h3>

          <p>Escalation communications may occur through:</p>
          <ul>
            <li>Platform messaging</li>
            <li>Video conferencing</li>
            <li>Other methods as agreed between Creator and Client</li>
          </ul>

          <h3>10.6 Recording</h3>

          <p>
            Unless otherwise agreed, escalation sessions may not be recorded
            without consent from both parties.
          </p>

          <hr />

          <h2 id="acceptable-use">12. Acceptable Use Policy</h2>

          <h3>11.1 General Standards</h3>

          <p>You agree to use the Platform in a manner that is:</p>
          <ul>
            <li>Legal and compliant with all applicable laws</li>
            <li>Respectful to other Users</li>
            <li>Consistent with the intended purpose of the Platform</li>
            <li>In accordance with these Terms</li>
          </ul>

          <h3>11.2 Permitted Uses</h3>

          <p>The Platform may be used for:</p>
          <ul>
            <li>Creating Agents based on your legitimate expertise</li>
            <li>Seeking assistance from Agents for lawful purposes</li>
            <li>Professional development and learning</li>
            <li>Business and commercial purposes (within guidelines)</li>
          </ul>

          <h3>11.3 System Integrity</h3>

          <p>You agree not to:</p>
          <ul>
            <li>Interfere with Platform operation or security</li>
            <li>Circumvent access controls or authentication</li>
            <li>Introduce malware, viruses, or malicious code</li>
            <li>Scrape, harvest, or collect data without authorization</li>
            <li>Use automated systems without permission</li>
            <li>Overload or stress test the Platform</li>
          </ul>

          <hr />

          <h2 id="prohibited-content">13. Prohibited Content and Conduct</h2>

          <h3>12.1 Prohibited Content</h3>

          <p>The following content is prohibited on the Platform:</p>

          <p>
            <strong>Illegal Content:</strong>
          </p>
          <ul>
            <li>Content that violates any law or regulation</li>
            <li>Content that infringes intellectual property rights</li>
            <li>Content that facilitates illegal activities</li>
          </ul>

          <p>
            <strong>Harmful Content:</strong>
          </p>
          <ul>
            <li>Content promoting violence, terrorism, or self-harm</li>
            <li>Child sexual abuse material (zero tolerance)</li>
            <li>Non-consensual intimate imagery</li>
            <li>Content promoting hate or discrimination</li>
          </ul>

          <p>
            <strong>Fraudulent Content:</strong>
          </p>
          <ul>
            <li>False or misleading information</li>
            <li>Impersonation of others</li>
            <li>Scams or deceptive schemes</li>
            <li>Fake credentials or qualifications</li>
          </ul>

          <p>
            <strong>Inappropriate Content:</strong>
          </p>
          <ul>
            <li>
              Explicit sexual content (unless specifically permitted in
              adult-only areas)
            </li>
            <li>Graphic violence</li>
            <li>Content designed to harass or bully</li>
          </ul>

          <h3>12.2 Prohibited Conduct</h3>

          <p>The following conduct is prohibited:</p>

          <p>
            <strong>For All Users:</strong>
          </p>
          <ul>
            <li>Harassment, bullying, or threatening behavior</li>
            <li>Discrimination based on protected characteristics</li>
            <li>Spamming or unsolicited marketing</li>
            <li>Attempting to circumvent Platform rules</li>
            <li>Creating false or misleading Accounts</li>
          </ul>

          <p>
            <strong>For Creators:</strong>
          </p>
          <ul>
            <li>Misrepresenting qualifications or expertise</li>
            <li>Creating Agents that provide unlicensed professional advice</li>
            <li>Plagiarizing others&apos; content or methodologies</li>
            <li>Manipulating reviews or ratings</li>
          </ul>

          <p>
            <strong>For Clients:</strong>
          </p>
          <ul>
            <li>Attempting to extract Training Materials from Agents</li>
            <li>Using Agents to generate harmful or illegal content</li>
            <li>Abusing refund policies</li>
            <li>Harassing Creators</li>
          </ul>

          <h3>12.3 Professional Services Restrictions</h3>

          <p>
            Creators must not create Agents that provide advice requiring
            professional licensure (legal, medical, financial, etc.) unless:
          </p>
          <ul>
            <li>The Creator holds appropriate licensure</li>
            <li>The Agent includes clear disclaimers</li>
            <li>The Agent operates within scope of practice</li>
            <li>Applicable professional rules permit such services</li>
          </ul>

          <h3>12.4 Reporting Violations</h3>

          <p>
            Users may report violations to:{" "}
            <a href="mailto:abuse@proagentme.com">abuse@proagentme.com</a>
          </p>

          <h3>12.5 Enforcement</h3>

          <p>We reserve the right to:</p>
          <ul>
            <li>Remove violating content</li>
            <li>Suspend or terminate Accounts</li>
            <li>Report illegal activity to authorities</li>
            <li>Take legal action for serious violations</li>
          </ul>

          <hr />

          <h2 id="user-generated-content">14. User-Generated Content</h2>

          <h3>13.1 Responsibility</h3>

          <p>
            Users are solely responsible for content they create, upload, or
            share on the Platform.
          </p>

          <h3>13.2 Content Standards</h3>

          <p>All user-generated content must comply with:</p>
          <ul>
            <li>These Terms of Service</li>
            <li>Our Acceptable Use Policy</li>
            <li>Applicable laws and regulations</li>
          </ul>

          <h3>13.3 Content Moderation</h3>

          <p>We reserve the right to:</p>
          <ul>
            <li>Review user content</li>
            <li>Remove content that violates our policies</li>
            <li>Suspend or terminate Users who repeatedly violate policies</li>
          </ul>

          <h3>13.4 No Obligation to Monitor</h3>

          <p>
            While we may monitor content, we have no obligation to do so and are
            not responsible for user-generated content.
          </p>

          <h3>13.5 DMCA Compliance</h3>

          <p>
            We comply with the Digital Millennium Copyright Act (DMCA). To
            report copyright infringement, contact:{" "}
            <a href="mailto:dmca@proagentme.com">dmca@proagentme.com</a>
          </p>

          <p>Include:</p>
          <ul>
            <li>Identification of the copyrighted work</li>
            <li>Identification of the infringing material</li>
            <li>Your contact information</li>
            <li>A statement of good faith belief</li>
            <li>A statement of accuracy under penalty of perjury</li>
            <li>Your physical or electronic signature</li>
          </ul>

          <hr />

          <h2 id="third-party-services">
            15. Third-Party Services and AI Providers
          </h2>

          <h3>14.1 AI Infrastructure</h3>

          <p>
            Agents are powered by third-party AI providers (such as OpenAI,
            Anthropic, or Google). We do not control these providers&apos;
            underlying models.
          </p>

          <h3>14.2 Limitations</h3>

          <p>Third-party AI models may:</p>
          <ul>
            <li>Produce unexpected or inaccurate outputs</li>
            <li>Have inherent biases or limitations</li>
            <li>Change behavior due to provider updates</li>
            <li>Experience outages or service interruptions</li>
          </ul>

          <h3>14.3 Data Handling</h3>

          <p>When interacting with Agents:</p>
          <ul>
            <li>Queries are processed through third-party AI providers</li>
            <li>
              We have agreements prohibiting providers from training on our data
            </li>
            <li>
              Training Materials are NOT sent to AI providers; only query
              context is sent
            </li>
          </ul>

          <h3>14.4 Other Third-Party Services</h3>

          <p>The Platform integrates with third-party services for:</p>
          <ul>
            <li>Payment processing</li>
            <li>Authentication</li>
            <li>Cloud hosting</li>
            <li>Analytics</li>
          </ul>

          <p>
            Your use of these services is subject to their respective terms.
          </p>

          <h3>14.5 Third-Party Links</h3>

          <p>
            The Platform may contain links to third-party websites. We are not
            responsible for third-party content or practices.
          </p>

          <hr />

          <h2 id="disclaimers">16. Disclaimers</h2>

          <h3>15.1 &quot;As Is&quot; Provision</h3>

          <p className="uppercase font-semibold">
            THE PLATFORM AND SERVICES ARE PROVIDED &quot;AS IS&quot; AND
            &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER
            EXPRESS OR IMPLIED.
          </p>

          <h3>15.2 No Warranty</h3>

          <p className="uppercase font-semibold">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, TELOS TECHNOLOGIES LLC
            DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
          </p>
          <ul className="uppercase">
            <li>IMPLIED WARRANTIES OF MERCHANTABILITY</li>
            <li>FITNESS FOR A PARTICULAR PURPOSE</li>
            <li>NON-INFRINGEMENT</li>
            <li>ACCURACY OR COMPLETENESS OF CONTENT</li>
            <li>UNINTERRUPTED OR ERROR-FREE SERVICE</li>
            <li>SECURITY OF THE PLATFORM</li>
          </ul>

          <h3>15.3 Agent Outputs</h3>

          <p className="uppercase font-semibold">WE DO NOT WARRANT THAT:</p>
          <ul className="uppercase">
            <li>Agent outputs will be accurate, complete, or reliable</li>
            <li>Agents will meet your requirements</li>
            <li>Agent Content constitutes professional advice</li>
            <li>Creators have verified qualifications</li>
          </ul>

          <h3>15.4 Third-Party Services</h3>

          <p className="uppercase font-semibold">
            WE MAKE NO WARRANTIES REGARDING THIRD-PARTY SERVICES, INCLUDING AI
            PROVIDERS.
          </p>

          <h3>15.5 User Responsibility</h3>

          <p className="uppercase font-semibold">
            YOU USE THE PLATFORM AND RELY ON AGENT OUTPUTS AT YOUR OWN RISK.
          </p>

          <hr />

          <h2 id="limitation-of-liability">17. Limitation of Liability</h2>

          <h3>16.1 Exclusion of Damages</h3>

          <p className="uppercase font-semibold">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, TELOS TECHNOLOGIES LLC SHALL
            NOT BE LIABLE FOR ANY:
          </p>
          <ul className="uppercase">
            <li>
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES
            </li>
            <li>LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITIES</li>
            <li>COST OF SUBSTITUTE SERVICES</li>
            <li>DAMAGES RESULTING FROM AGENT OUTPUTS</li>
            <li>DAMAGES RESULTING FROM UNAUTHORIZED ACCESS</li>
            <li>DAMAGES RESULTING FROM THIRD-PARTY ACTIONS</li>
          </ul>

          <h3>16.2 Liability Cap</h3>

          <p className="uppercase font-semibold">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY SHALL
            NOT EXCEED THE GREATER OF:
          </p>
          <ul className="uppercase">
            <li>
              THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM, OR
            </li>
            <li>ONE HUNDRED DOLLARS ($100)</li>
          </ul>

          <h3>16.3 Exceptions</h3>

          <p className="uppercase font-semibold">
            THE LIMITATIONS IN THIS SECTION DO NOT APPLY TO:
          </p>
          <ul className="uppercase">
            <li>
              LIABILITY ARISING FROM OUR BREACH OF SECTION 8 (CREATOR DATA
              PROTECTION)
            </li>
            <li>LIABILITY THAT CANNOT BE LIMITED BY LAW</li>
            <li>LIABILITY FOR FRAUD OR INTENTIONAL MISCONDUCT</li>
          </ul>

          <h3>16.4 Basis of Bargain</h3>

          <p className="uppercase font-semibold">
            THE DISCLAIMERS AND LIMITATIONS IN SECTIONS 15 AND 16 ARE A
            FUNDAMENTAL PART OF THESE TERMS AND REFLECT THE ALLOCATION OF RISK
            BETWEEN THE PARTIES.
          </p>

          <hr />

          <h2 id="indemnification">18. Indemnification</h2>

          <h3>17.1 Your Indemnification Obligations</h3>

          <p>
            You agree to indemnify, defend, and hold harmless Telos Technologies
            LLC, its officers, directors, employees, agents, and affiliates from
            any claims, damages, losses, liabilities, and expenses (including
            attorneys&apos; fees) arising from:
          </p>
          <ul>
            <li>Your use of the Platform</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any third-party rights</li>
            <li>Content you create, upload, or share</li>
            <li>Your interactions with other Users</li>
            <li>Your Agent (for Creators)</li>
            <li>Your use of Agent outputs (for Clients)</li>
          </ul>

          <h3>17.2 Creator-Specific Indemnification</h3>

          <p>
            Creators additionally agree to indemnify us for claims arising from:
          </p>
          <ul>
            <li>Training Materials that infringe third-party rights</li>
            <li>Misrepresentation of qualifications</li>
            <li>Agent outputs that cause harm</li>
            <li>Failure to provide appropriate disclaimers</li>
          </ul>

          <h3>17.3 Procedure</h3>

          <p>We will:</p>
          <ul>
            <li>Notify you promptly of any claim</li>
            <li>
              Allow you to control the defense (with our approval of counsel)
            </li>
            <li>Cooperate in the defense at your expense</li>
          </ul>

          <p>
            We may participate in the defense with our own counsel at our
            expense.
          </p>

          <hr />

          <h2 id="dispute-resolution">
            19. Dispute Resolution and Arbitration
          </h2>

          <h3>18.1 Informal Resolution</h3>

          <p>
            Before filing any formal dispute, you agree to contact us at{" "}
            <a href="mailto:legal@proagentme.com">legal@proagentme.com</a> and
            attempt to resolve the dispute informally for at least 30 days.
          </p>

          <h3>18.2 Binding Arbitration</h3>

          <p className="font-semibold">
            PLEASE READ CAREFULLY: THIS SECTION AFFECTS YOUR LEGAL RIGHTS.
          </p>

          <p>
            If informal resolution fails, any dispute arising from these Terms
            or the Platform shall be resolved by binding arbitration, except:
          </p>
          <ul>
            <li>Claims that may be brought in small claims court</li>
            <li>
              Claims for injunctive or equitable relief regarding intellectual
              property
            </li>
          </ul>

          <h3>18.3 Arbitration Rules</h3>

          <p>Arbitration will be conducted by:</p>
          <ul>
            <li>The American Arbitration Association (AAA)</li>
            <li>Under the AAA&apos;s Consumer Arbitration Rules</li>
            <li>By a single arbitrator</li>
          </ul>

          <h3>18.4 Location</h3>

          <p>Arbitration will take place in:</p>
          <ul>
            <li>Virginia, USA, or</li>
            <li>At your election, via telephone or video conference</li>
          </ul>

          <h3>18.5 Costs</h3>

          <ul>
            <li>Filing fees will be shared as provided by AAA rules</li>
            <li>
              Each party bears its own attorneys&apos; fees unless the
              arbitrator awards fees
            </li>
          </ul>

          <h3>18.6 Class Action Waiver</h3>

          <p className="font-semibold uppercase">
            YOU AGREE TO RESOLVE DISPUTES ONLY ON AN INDIVIDUAL BASIS AND WAIVE
            ANY RIGHT TO BRING CLAIMS AS A PLAINTIFF OR CLASS MEMBER IN ANY
            CLASS ACTION, COLLECTIVE ACTION, OR REPRESENTATIVE PROCEEDING.
          </p>

          <h3>18.7 Opt-Out</h3>

          <p>
            You may opt out of arbitration by sending written notice to{" "}
            <a href="mailto:legal@proagentme.com">legal@proagentme.com</a>{" "}
            within 30 days of first accepting these Terms.
          </p>

          <h3>18.8 Survival</h3>

          <p>
            This arbitration agreement survives termination of your Account or
            these Terms.
          </p>

          <hr />

          <h2 id="termination">20. Termination</h2>

          <h3>19.1 Termination by You</h3>

          <p>You may terminate your Account at any time by:</p>
          <ul>
            <li>Using the Account deletion feature in Settings</li>
            <li>
              Contacting{" "}
              <a href="mailto:support@proagentme.com">support@proagentme.com</a>
            </li>
          </ul>

          <h3>19.2 Termination by Us</h3>

          <p>We may suspend or terminate your Account if:</p>
          <ul>
            <li>You violate these Terms</li>
            <li>You engage in fraudulent or illegal activity</li>
            <li>You pose a risk to other Users or the Platform</li>
            <li>Required by law</li>
            <li>We discontinue the Platform</li>
          </ul>

          <h3>19.3 Effect of Termination</h3>

          <p>Upon termination:</p>
          <ul>
            <li>Your right to use the Platform ceases immediately</li>
            <li>
              Your Training Materials will be deleted per our retention policy
            </li>
            <li>Pending payouts will be processed (minus any amounts owed)</li>
            <li>Provisions that should survive will remain in effect</li>
          </ul>

          <h3>19.4 Survival</h3>

          <p>The following sections survive termination:</p>
          <ul>
            <li>Section 8 (Intellectual Property)</li>
            <li>Section 9 (Creator Data Protection)</li>
            <li>Section 16 (Disclaimers)</li>
            <li>Section 17 (Limitation of Liability)</li>
            <li>Section 18 (Indemnification)</li>
            <li>Section 19 (Dispute Resolution)</li>
            <li>Section 22 (General Provisions)</li>
          </ul>

          <hr />

          <h2 id="modifications">21. Modifications to Terms</h2>

          <h3>20.1 Right to Modify</h3>

          <p>We reserve the right to modify these Terms at any time.</p>

          <h3>20.2 Notice</h3>

          <p>We will provide notice of material changes by:</p>
          <ul>
            <li>Posting updated Terms on the Platform</li>
            <li>Sending email to registered Users</li>
            <li>Displaying a notice upon login</li>
          </ul>

          <h3>20.3 Effective Date</h3>

          <p>Changes become effective:</p>
          <ul>
            <li>30 days after posting for material changes</li>
            <li>
              Immediately for non-material changes or changes required by law
            </li>
          </ul>

          <h3>20.4 Continued Use</h3>

          <p>
            Your continued use of the Platform after changes become effective
            constitutes acceptance of the revised Terms.
          </p>

          <h3>20.5 Objection</h3>

          <p>
            If you do not agree to modified Terms, you must stop using the
            Platform and terminate your Account.
          </p>

          <hr />

          <h2 id="general-provisions">22. General Provisions</h2>

          <h3>21.1 Governing Law</h3>

          <p>
            These Terms are governed by the laws of the Commonwealth of
            Virginia, USA, without regard to conflict of law principles.
          </p>

          <h3>21.2 Jurisdiction</h3>

          <p>
            For matters not subject to arbitration, you consent to the exclusive
            jurisdiction of state and federal courts located in Virginia.
          </p>

          <h3>21.3 Entire Agreement</h3>

          <p>
            These Terms, together with our Privacy Policy and any additional
            agreements, constitute the entire agreement between you and Telos
            Technologies LLC.
          </p>

          <h3>21.4 Severability</h3>

          <p>
            If any provision is found unenforceable, the remaining provisions
            continue in full force and effect.
          </p>

          <h3>21.5 Waiver</h3>

          <p>
            Our failure to enforce any right or provision does not constitute a
            waiver of that right or provision.
          </p>

          <h3>21.6 Assignment</h3>

          <p>
            You may not assign these Terms without our written consent. We may
            assign our rights and obligations without restriction.
          </p>

          <h3>21.7 Force Majeure</h3>

          <p>
            We are not liable for failures or delays caused by events beyond our
            reasonable control, including natural disasters, war, terrorism,
            labor disputes, government actions, or internet/telecommunications
            failures.
          </p>

          <h3>21.8 Notices</h3>

          <p>Notices to us must be sent to:</p>
          <ul>
            <li>
              Email:{" "}
              <a href="mailto:legal@proagentme.com">legal@proagentme.com</a>
            </li>
            <li>Mail: Telos Technologies LLC, Berryville, Virginia, USA</li>
          </ul>

          <p>Notices to you will be sent to your registered email address.</p>

          <h3>21.9 Relationship</h3>

          <p>
            Nothing in these Terms creates an employment, agency, partnership,
            or joint venture relationship between you and Telos Technologies
            LLC.
          </p>

          <h3>21.10 Third-Party Beneficiaries</h3>

          <p>
            These Terms do not create any third-party beneficiary rights, except
            as expressly provided.
          </p>

          <h3>21.11 Headings</h3>

          <p>
            Section headings are for convenience only and do not affect
            interpretation.
          </p>

          <h3>21.12 Language</h3>

          <p>
            These Terms are written in English. Translations are for convenience
            only; the English version controls.
          </p>

          <hr />

          <h2 id="contact-information">23. Contact Information</h2>

          <p>For questions about these Terms, please contact:</p>

          <p>
            <strong>Telos Technologies LLC</strong>
            <br />
            (d/b/a ProAgentMe)
          </p>

          <ul>
            <li>
              <strong>General Inquiries:</strong>{" "}
              <a href="mailto:support@proagentme.com">support@proagentme.com</a>
            </li>
            <li>
              <strong>Legal:</strong>{" "}
              <a href="mailto:legal@proagentme.com">legal@proagentme.com</a>
            </li>
            <li>
              <strong>Privacy:</strong>{" "}
              <a href="mailto:privacy@proagentme.com">privacy@proagentme.com</a>
            </li>
            <li>
              <strong>Abuse Reports:</strong>{" "}
              <a href="mailto:abuse@proagentme.com">abuse@proagentme.com</a>
            </li>
            <li>
              <strong>DMCA:</strong>{" "}
              <a href="mailto:dmca@proagentme.com">dmca@proagentme.com</a>
            </li>
          </ul>

          <p>
            <strong>Mailing Address:</strong>
            <br />
            Telos Technologies LLC
            <br />
            Berryville, Virginia, USA
          </p>

          <hr />

          <h2>Acknowledgment</h2>

          <p className="uppercase font-semibold">
            BY USING PROAGENTME, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS
            OF SERVICE, UNDERSTAND THEM, AND AGREE TO BE BOUND BY THEM.
          </p>

          <p className="uppercase font-semibold">
            IF YOU ARE ENTERING INTO THESE TERMS ON BEHALF OF A COMPANY OR OTHER
            LEGAL ENTITY, YOU REPRESENT THAT YOU HAVE THE AUTHORITY TO BIND SUCH
            ENTITY TO THESE TERMS.
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
