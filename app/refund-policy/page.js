import LegalPage from '@/components/LegalPage';

export const metadata = { title: 'Refund Policy | Hey Frank-O' };

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund Policy">
      <p>This Refund Policy outlines the terms under which refunds may be issued for services provided by Hey Frank-O. By booking any service, you agree to this policy.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>1. General Policy</h2>
      <p>All sales are considered final unless otherwise stated. Refunds are not guaranteed and are issued at the sole discretion of Hey Frank-O.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>2. Eligible Refund Situations</h2>
      <p>Refunds may be granted when: a service is cancelled by Hey Frank-O, there is a failure to deliver due to provider unavailability, a verified technical or scheduling error occurs on our end, or there is a duplicate charge or billing error.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>3. Client Cancellations</h2>
      <p>Cancellations within the allowed booking window may be eligible for a partial or full refund. Late cancellations and no-shows are generally non-refundable. Deposits may be non-refundable unless stated otherwise at booking.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>4. Service-Specific Terms</h2>
      <p><span className="text-white/80 font-semibold">Event, DJ, and A/V Services:</span> Cancellations close to the service date may incur partial or full charges. On-site cancellations are non-refundable.</p>
      <p><span className="text-white/80 font-semibold">Equipment Rentals:</span> No refunds once equipment has been delivered or picked up. Damage or late returns result in additional charges.</p>
      <p><span className="text-white/80 font-semibold">Beauty & Personal Care:</span> Services are non-refundable once completed. Missed appointments are non-refundable.</p>
      <p><span className="text-white/80 font-semibold">Consultations & Workshops:</span> Non-refundable once the session has started or been delivered.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>5. Refund Process</h2>
      <p>Approved refunds are issued to the original payment method only. Processing typically takes 5–10 business days. You will be notified once the refund has been initiated.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>6. Chargebacks</h2>
      <p>Initiating a chargeback without first contacting us may result in suspension of future services and legal recovery of unpaid costs. We encourage direct contact to resolve disputes first.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>7. Contact</h2>
      <p>For refund requests: <a href="mailto:contact@HeyFranko.com" className="text-brand-green hover:text-white transition-colors">contact@HeyFranko.com</a></p>
    </LegalPage>
  );
}
