import LegalPage from '@/components/LegalPage';

export const metadata = { title: 'Privacy Policy | Hey Frank-O' };

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>Hey Frank-O respects your privacy and is committed to protecting your personal data in accordance with applicable privacy laws, including the GDPR and CCPA/CPRA.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>1. Scope</h2>
      <p>This Privacy Policy applies to all users of the Hey Frank-O website and related services, including account creation, authentication, communications, and booking integrations.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>2. Information We Collect</h2>
      <p><span className="text-white/80 font-semibold">a. Information You Provide:</span> Full name, email address, authentication data, communication content, and booking-related information.</p>
      <p><span className="text-white/80 font-semibold">b. Information from Third Parties:</span> When signing in via Google or Facebook, we may receive your name, email, and profile identifier.</p>
      <p><span className="text-white/80 font-semibold">c. Automatically Collected:</span> IP address, device/browser info, usage data, and cookies.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>3. Legal Basis for Processing (GDPR)</h2>
      <p>Consent, contractual necessity, legitimate interests, and legal obligation.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>4. How We Use Your Information</h2>
      <p>To provide and maintain user accounts, authenticate users, facilitate booking services, send promotional communications (only where opted in), respond to inquiries, improve website performance, and prevent fraud.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>5. Third-Party Services</h2>
      <p>We rely on Google (authentication), Meta/Facebook (authentication), and Bookable (scheduling). These providers process data under their own privacy policies.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>6. Data Retention</h2>
      <p>We retain personal information only as long as necessary to fulfill outlined purposes, comply with legal obligations, or resolve disputes.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>7. Data Sharing and Disclosure</h2>
      <p>We do not sell, rent, or trade personal data. We may share only with service providers acting on our behalf, to comply with legal obligations, or to protect rights and safety.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>8. Your Rights</h2>
      <p><span className="text-white/80 font-semibold">GDPR (EEA/UK):</span> Access, correction, deletion, restriction, portability, and withdrawal of consent.</p>
      <p><span className="text-white/80 font-semibold">CCPA/CPRA (California):</span> Know, delete, correct, opt out of sharing, and non-discrimination rights.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>9. Cookies & Tracking</h2>
      <p>We use cookies to enable core functionality, analyze traffic, and improve user experience. Non-essential cookies require consent where required by law.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>10. Contact</h2>
      <p>For privacy inquiries: <a href="mailto:contact@HeyFranko.com" className="text-brand-green hover:text-white transition-colors">contact@HeyFranko.com</a></p>
    </LegalPage>
  );
}
