import LegalPage from '@/components/LegalPage';

export const metadata = { title: 'Terms & Conditions | Hey Frank-O' };

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions">
      <p>By accessing or using our website, booking services, or engaging with Hey Frank-O in any capacity, you agree to be bound by these Terms & Conditions.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>1. Services Provided</h2>
      <p>Hey Frank-O provides DJ services, DJ equipment setup, A/V consultation and lighting, equipment rentals, audio engineering, makeup and beauty services, lawn care, and additional services as listed on our website or booking platform.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>2. Bookings & Third-Party Scheduling</h2>
      <p>Some bookings are processed through third-party platforms (e.g., Bookable). By booking through these systems, you also agree to the terms and privacy policies of those providers. We are not responsible for technical issues caused by third-party platforms.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>3. Payments and Pricing</h2>
      <p>All prices are in USD and subject to change. Payment is required at the time of booking or service delivery unless otherwise agreed in writing.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>4. Cancellations and Rescheduling</h2>
      <p>Cancellations or rescheduling must be made within the timeframe specified during booking. Late cancellations or no-shows may result in partial or full charges. Repeated cancellations may result in refusal of future services.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>5. Rentals and Equipment Use</h2>
      <p>You are responsible for any loss, theft, or damage during the rental period. Equipment must be returned in the same condition provided. Late returns may incur additional fees. Deposits may be required.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>6. Health, Safety & Beauty Services</h2>
      <p>By booking cosmetic or beauty services, you acknowledge you are voluntarily participating, have disclosed relevant allergies or conditions, and understand results may vary.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>7. Limitation of Liability</h2>
      <p>Hey Frank-O is not liable for indirect, incidental, or consequential damages. Our total liability for any claim shall not exceed the amount paid for the specific service in question.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>8. Intellectual Property</h2>
      <p>All branding, content, and designs on our website are property of Hey Frank-O unless otherwise stated. You may not copy or distribute our materials without written permission.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>9. Contact</h2>
      <p><a href="mailto:contact@HeyFranko.com" className="text-brand-green hover:text-white transition-colors">contact@HeyFranko.com</a></p>
    </LegalPage>
  );
}
