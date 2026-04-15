import LegalPage from '@/components/LegalPage';

export const metadata = { title: 'Refund Policy | Hey Frank-O' };

const H2 = ({ children }) => (
  <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
    {children}
  </h2>
);

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund Policy">
      <p>
        All sales and bookings made with Hey Frank-O are <span className="text-white/90 font-semibold">final and non-refundable</span>. By booking or purchasing any service, you acknowledge and agree to this policy in full.
      </p>

      <H2>1. No Refund Policy</H2>
      <p>
        Hey Frank-O does not issue refunds for any services rendered, deposits paid, or bookings confirmed. This applies to all service categories including but not limited to DJ services, audio/visual production, equipment rentals, lighting, live sound, beauty services, consultations, and workshops.
      </p>
      <p>
        Once a booking is confirmed and a deposit or payment is received, those funds are non-refundable regardless of the reason for cancellation, rescheduling, or non-attendance.
      </p>

      <H2>2. Cancellations by Client</H2>
      <p>
        Cancellations initiated by the client — for any reason, including personal emergencies, scheduling conflicts, or change of plans — are not eligible for a refund. No-shows and late cancellations are also non-refundable. Repeated cancellations may result in refusal of future services.
      </p>

      <H2>3. Service-Specific Terms</H2>
      <p><span className="text-white/80 font-semibold">Event, DJ, and A/V Services:</span> Non-refundable once booked. On-site cancellations forfeit all payments made.</p>
      <p><span className="text-white/80 font-semibold">Equipment Rentals:</span> Non-refundable once equipment has been delivered, picked up, or reserved. Loss, theft, or damage during the rental period will result in additional charges.</p>
      <p><span className="text-white/80 font-semibold">Beauty &amp; Personal Care:</span> Non-refundable once an appointment is booked or a service is delivered. Missed appointments are non-refundable.</p>
      <p><span className="text-white/80 font-semibold">Consultations &amp; Workshops:</span> Non-refundable once scheduled or delivered, whether in person or virtually.</p>

      <H2>4. Exceptions</H2>
      <p>
        Hey Frank-O reserves the sole discretion to issue a credit or partial refund only in the following limited circumstances:
      </p>
      <p>Service cancelled directly by Hey Frank-O due to provider unavailability, a verified billing or duplicate charge error caused by our systems, or a documented failure to deliver the agreed service with no reasonable alternative offered.</p>
      <p>Any exception is issued as a service credit toward a future booking, not as a cash refund, unless required by applicable law.</p>

      <H2>5. Chargebacks</H2>
      <p>
        Initiating a chargeback or payment dispute without first contacting Hey Frank-O to attempt resolution may result in suspension of future services, additional administrative fees, and legal recovery of outstanding costs where applicable. We strongly encourage direct communication before escalating to your payment provider.
      </p>

      <H2>6. Third-Party Platforms</H2>
      <p>
        If services are booked or paid through a third-party platform (such as Bookable or a payment processor), the refund policies of those platforms may also apply. Hey Frank-O is not responsible for refund decisions made by third-party systems.
      </p>

      <H2>7. Contact</H2>
      <p>
        For billing questions or to report a verified error:{' '}
        <a href="mailto:contact@HeyFranko.com" className="text-[#39d353] hover:text-white transition-colors">
          contact@HeyFranko.com
        </a>
      </p>
    </LegalPage>
  );
}
