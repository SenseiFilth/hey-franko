import LegalPage from '@/components/LegalPage';

export const metadata = { title: 'Accessibility Statement | Hey Frank-O' };

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility Statement">
      <p>Hey Frank-O is committed to ensuring digital accessibility for all users, including individuals with disabilities. We are continually improving the user experience for everyone and applying relevant accessibility standards.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>Our Commitment</h2>
      <p>We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA, which provides guidance on making web content more accessible for people with a wide range of disabilities.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>Accessibility Features</h2>
      <p>Our website includes keyboard navigability, screen reader compatibility, proper heading structure and semantic HTML, sufficient color contrast, alternative text for meaningful images, responsive design, and clear labels for all form elements.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>Ongoing Improvements</h2>
      <p>We regularly review our website for accessibility issues, test with assistive technologies, update components to improve usability, and incorporate user feedback into design improvements.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>Third-Party Content</h2>
      <p>Some features may be provided by third parties (such as booking tools or authentication providers). We do not control their accessibility but encourage all providers to maintain accessible services.</p>

      <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>Feedback & Assistance</h2>
      <p>We welcome feedback on accessibility. If you experience any barriers, please contact us — include the page or feature accessed, the issue encountered, and the device or assistive technology you were using.</p>
      <p>Contact: <a href="mailto:contact@HeyFranko.com" className="text-brand-green hover:text-white transition-colors">contact@HeyFranko.com</a></p>
    </LegalPage>
  );
}
