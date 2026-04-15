import LegalPage from '@/components/LegalPage';

export const metadata = { title: 'Service & Booking Policies | Hey Frank-O' };

const H2 = ({ children }) => (
  <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
    {children}
  </h2>
);

export default function BookingPolicyPage() {
  return (
    <LegalPage title="Service & Booking Policies">
      <p>
        Hey Frank-O operates through event service agreements, production contracts, installation agreements, and project-based engagements. The following policies govern how services are booked, confirmed, and fulfilled.
      </p>

      <H2>1. Contract-Based Services</H2>
      <p>
        Most services require a signed agreement, service contract, or project disclosure prior to the start of work. These documents outline the scope of services, deliverables, payment schedules, timelines, and any applicable cancellation terms specific to the engagement.
      </p>
      <p>
        <span className="text-white/80 font-semibold">Payments do not replace agreements.</span> Payments made through invoices, digital payment links, or website checkout systems do not replace, modify, or override the terms outlined in any previously executed signed agreement.
      </p>

      <H2>2. Deposits &amp; Booking Reservations</H2>
      <p>
        A deposit or advance payment is required to secure event dates, production services, or installation scheduling. The required deposit amount will be specified at the time of engagement or within the service agreement.
      </p>
      <p>
        <span className="text-white/80 font-semibold">Services are not considered booked or confirmed until the required deposit has been received.</span> Holding a date or discussing a project in advance does not constitute a confirmed booking. Deposits are applied toward the total project or service balance.
      </p>

      <H2>3. Cancellation Policy</H2>
      <p>
        Cancellation terms vary based on the specific service agreement. Clients should refer to their signed contract for cancellation timelines, refund eligibility, and any applicable cancellation fees.
      </p>
      <p>
        As a general policy, all payments including deposits are non-refundable. Deposits may be forfeited depending on the nature of the service, resources already allocated, and the timing of the cancellation. Please review our{' '}
        <a href="/refund-policy" className="text-[#39d353] hover:text-white transition-colors">
          Refund Policy
        </a>{' '}
        for full details.
      </p>

      <H2>4. Rescheduling Policy</H2>
      <p>
        Hey Frank-O will make every reasonable effort to accommodate rescheduling requests based on current availability and project logistics. Rescheduling is not guaranteed and is subject to the following conditions:
      </p>
      <p>
        <span className="text-white/80 font-semibold">Availability:</span> Rescheduled services depend on the availability of equipment, personnel, and scheduling capacity at the time of the request.
      </p>
      <p>
        <span className="text-white/80 font-semibold">Additional fees:</span> Rescheduling may be subject to additional fees depending on the proximity to the original service date and resources already committed.
      </p>
      <p>
        <span className="text-white/80 font-semibold">Scope adjustments:</span> Changes to the service date or timing may require adjustments to the agreed scope, deliverables, or pricing. Any changes will be communicated and confirmed in writing.
      </p>

      <H2>5. Contact</H2>
      <p>
        To discuss bookings, rescheduling, or service agreements:{' '}
        <a href="mailto:contact@HeyFranko.com" className="text-[#39d353] hover:text-white transition-colors">
          contact@HeyFranko.com
        </a>
        {' '}· 980-225-1992
      </p>
    </LegalPage>
  );
}
