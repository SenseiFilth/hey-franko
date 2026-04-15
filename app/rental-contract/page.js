import LegalPage from '@/components/LegalPage';

export const metadata = { title: 'Rental Contract | Hey Frank-O' };

const H2 = ({ children }) => (
  <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
    {children}
  </h2>
);

export default function RentalContractPage() {
  return (
    <LegalPage title="Rental Contract">
      <p className="text-white/80 font-semibold">
        By booking services, renting equipment, submitting payment, or signing electronically, the Client ("Client," "You") agrees to these Terms &amp; Conditions. These terms apply to all services and rentals provided by Hey Frank-O ("Company," "We," "Us").
      </p>

      <H2>1. Agreement Overview</H2>
      <p>
        This Rental Contract governs all equipment rentals, production services, DJ services, and related engagements between the Client and Hey Frank-O. Acceptance of these terms occurs at the point of booking, payment, electronic signature, or any combination thereof.
      </p>

      <H2>2. Booking &amp; Reservations</H2>
      <p>All services and rentals require a confirmed booking. A booking is not secured until the required deposit or payment is received. Dates and equipment availability are on a first-come, first-served basis. Hey Frank-O reserves the right to refuse service at its discretion.</p>

      <H2>3. Payments, Deposits &amp; Fees</H2>
      <p>
        <span className="text-white/80 font-semibold">Security Deposit:</span> A $200 refundable security deposit is required to secure services or equipment. Security deposits for rentals are refundable only if equipment is returned on time and in undamaged condition.
      </p>
      <p>
        <span className="text-white/80 font-semibold">Booking Payment:</span> 50% of the total rental fee or service cost is charged at the time of booking. Remaining balances must be paid before delivery, pickup, or event start time unless otherwise agreed in writing.
      </p>
      <p>
        Late payments may result in cancellation without refund.
      </p>

      <H2>4. Cancellations &amp; Rescheduling</H2>
      <p>
        <span className="text-white/80 font-semibold">DJ / Event Services:</span> Cancellations within 14 days of the event result in forfeiture of the deposit. Same-day cancellations may result in full payment being due. Rescheduling is subject to availability and may incur additional fees.
      </p>
      <p>
        <span className="text-white/80 font-semibold">Equipment / Backline Rentals:</span> Cancellations within 48 hours of pickup or delivery forfeit the deposit. No refunds are issued for unused rental time.
      </p>

      <H2>5. Equipment Rental &amp; Backline Use</H2>
      <p>
        Rented equipment remains the property of Hey Frank-O at all times. The Client assumes full responsibility for all equipment during the rental period. Equipment must be returned on time and in the same condition as received.
      </p>
      <p>
        The Client is responsible for any loss, theft, damage, misuse, water damage, power surges, or improper handling during the rental period. Repair or replacement costs will be charged at full market value if necessary.
      </p>

      <H2>6. Damage, Loss &amp; Liability</H2>
      <p>
        The Client agrees to cover repair or replacement costs for damaged or lost equipment. Normal wear and tear is excepted. Hey Frank-O is not responsible for damage caused by weather, venue power issues, other vendors, guests, or attendees.
      </p>

      <H2>7. Setup, Venue &amp; Power Requirements</H2>
      <p>
        The Client must ensure safe and adequate power sources are available, sufficient setup space is provided, and venue access is granted at the agreed times. Delays caused by venue restrictions or lack of access may reduce available service time without refund.
      </p>

      <H2>8. Performance Conditions</H2>
      <p>
        Hey Frank-O reserves the right to pause or stop services if conditions become unsafe, abusive, or illegal. No refunds will be issued in such cases. The Client agrees to provide a safe working environment for all Hey Frank-O staff and contractors.
      </p>

      <H2>9. Music &amp; Content</H2>
      <p>
        The Client is responsible for securing any required music licenses unless otherwise stated in writing. Explicit or inappropriate content requests may be declined at our discretion. Final music and performance decisions remain with the DJ or Engineer to maintain professional standards.
      </p>

      <H2>10. Force Majeure</H2>
      <p>
        Hey Frank-O is not liable for failure to perform due to circumstances beyond our control, including but not limited to acts of God, severe weather, power outages, government restrictions, illness, or emergencies. In such cases, Hey Frank-O will make reasonable efforts to reschedule or provide a suitable alternative.
      </p>

      <H2>11. Limitation of Liability</H2>
      <p>
        Hey Frank-O's liability is limited to the amount paid by the Client for the specific service or rental in question. We are not liable for indirect, incidental, or consequential damages. The Client releases Hey Frank-O from claims related to venue conditions, guest behavior, or third-party vendor actions.
      </p>

      <H2>12. Indemnification</H2>
      <p>
        The Client agrees to indemnify and hold harmless Hey Frank-O from any claims, damages, losses, or legal fees arising from Client misuse of equipment, guest actions, venue issues, or breach of these Terms &amp; Conditions.
      </p>

      <H2>13. Photo, Video &amp; Marketing Use</H2>
      <p>
        Unless otherwise stated in writing, Hey Frank-O may capture photos or videos during events or service delivery for promotional use. The Client may opt out by written request submitted prior to the event.
      </p>

      <H2>14. Electronic Signatures &amp; Agreements</H2>
      <p>
        Electronic acceptance, checkboxes, typed signatures, or online payments constitute full agreement to these Terms &amp; Conditions and are legally binding to the same extent as a handwritten signature.
      </p>

      <H2>15. Governing Law</H2>
      <p>
        This agreement shall be governed by the laws of the state in which services are rendered, unless otherwise specified in writing between the parties.
      </p>

      <H2>16. Entire Agreement</H2>
      <p>
        These Terms &amp; Conditions represent the entire agreement between the Client and Hey Frank-O and supersede all prior discussions, representations, or agreements, whether written or verbal.
      </p>

      <div className="mt-10 p-5 rounded-xl border border-white/10 bg-white/[0.03]">
        <p className="text-white/80 text-sm leading-relaxed">
          <span className="text-white font-semibold">Agreement Confirmation:</span> By booking, paying for services or rentals, or signing, the Client confirms they have read, understood, and agreed to these Terms &amp; Conditions in full.
        </p>
      </div>

      <H2>Contact</H2>
      <p>
        For questions regarding this contract:{' '}
        <a href="mailto:contact@HeyFranko.com" className="text-[#39d353] hover:text-white transition-colors">
          contact@HeyFranko.com
        </a>
        {' '}· 980-225-1992
      </p>
    </LegalPage>
  );
}
