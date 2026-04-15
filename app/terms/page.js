import LegalPage from '@/components/LegalPage';

export const metadata = { title: 'Terms of Service | Hey Frank-O' };

const H2 = ({ children }) => (
  <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
    {children}
  </h2>
);

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <p>
        Hey Frank-O provides audio/visual production, DJ services, live sound, lighting, event production, installations, consulting, and creative support for corporate, nonprofit, and private clients.
      </p>
      <p>
        By using this website or engaging Hey Frank-O for services, you agree to the following terms in full.
      </p>

      <H2>1. Service Engagement</H2>
      <p>
        Services provided by Hey Frank-O are delivered through event service agreements, production contracts, installation agreements, or project-based engagement letters. Each agreement outlines the scope of services, event or project timelines, deliverables, payment terms, and client responsibilities.
      </p>

      <H2>2. Contracts &amp; Disclosures</H2>
      <p>
        Prior to the start of services, clients may receive formal agreements or disclosures detailing project scope, payment obligations, cancellation policies, and operational requirements.
      </p>
      <p>
        <span className="text-white/80 font-semibold">Signed agreements govern all services provided.</span> Payments made via invoice, payment link, or website checkout do not override or replace any previously executed agreement or contract.
      </p>

      <H2>3. Payments</H2>
      <p>
        Payments are processed through secure invoicing systems and approved payment platforms. Depending on the service, payment structures may include deposits to secure event or service dates, installment or milestone payments, or full payment prior to service delivery.
      </p>
      <p>
        Failure to meet agreed payment terms may result in delays in service, suspension of active services, or cancellation of the booking or project at Hey Frank-O's discretion.
      </p>

      <H2>4. Client Responsibilities</H2>
      <p>Clients agree to:</p>
      <p>
        <span className="text-white/80 font-semibold">Provide accurate and timely information</span> — all event or project details, technical requirements, and expectations must be communicated in advance and kept up to date throughout the engagement.
      </p>
      <p>
        <span className="text-white/80 font-semibold">Ensure site access and infrastructure</span> — clients are responsible for providing access to venues, spaces, adequate power supply, WiFi where required, and any other necessary physical infrastructure needed for service delivery.
      </p>
      <p>
        <span className="text-white/80 font-semibold">Adhere to agreed timelines</span> — delays caused by incomplete information, late approvals, or denied access may impact service quality and delivery. Hey Frank-O is not liable for service impacts resulting from client-caused delays.
      </p>

      <H2>5. Intellectual Property</H2>
      <p>
        All systems, processes, sound designs, configurations, creative direction, and production materials developed by Hey Frank-O remain the intellectual property of the company unless otherwise explicitly stated in writing within a signed agreement. Clients may not reproduce, distribute, or repurpose Hey Frank-O's proprietary work without written authorization.
      </p>

      <H2>6. Limitation of Liability</H2>
      <p>
        Hey Frank-O is not liable for indirect, incidental, or consequential damages arising from service engagements, including but not limited to:
      </p>
      <p>
        Venue limitations such as insufficient power, inadequate space, restricted access, or WiFi instability. Third-party vendor delays, equipment failures, or service interruptions outside of Hey Frank-O's control. Environmental or technical conditions beyond reasonable foresight or preparation.
      </p>
      <p>
        Our total liability for any claim shall not exceed the amount paid by the client for the specific service in question.
      </p>

      <H2>7. Cancellations &amp; Refunds</H2>
      <p>
        All bookings and payments are final and non-refundable. Please review our{' '}
        <a href="/refund-policy" className="text-[#39d353] hover:text-white transition-colors">
          Refund Policy
        </a>{' '}
        for full details on cancellations, no-shows, and any limited exceptions.
      </p>

      <H2>8. Policy Updates</H2>
      <p>
        These terms may be updated periodically to reflect operational or service changes. Continued use of our website or engagement of our services following any update constitutes acceptance of the revised terms. The current version of these terms is always available at this URL.
      </p>

      <H2>9. Contact</H2>
      <p>
        For questions regarding these terms:{' '}
        <a href="mailto:contact@HeyFranko.com" className="text-[#39d353] hover:text-white transition-colors">
          contact@HeyFranko.com
        </a>
      </p>
    </LegalPage>
  );
}
