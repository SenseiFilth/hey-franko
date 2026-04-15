import LegalPage from '@/components/LegalPage';

export const metadata = { title: 'Shipping & Delivery Policy | Hey Frank-O' };

const H2 = ({ children }) => (
  <h2 className="text-white text-xl font-bold mt-8 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
    {children}
  </h2>
);

export default function ShippingPolicyPage() {
  return (
    <LegalPage title="Shipping & Delivery Policy">
      <p>
        Hey Frank-O provides audio/visual production, DJ services, live sound, lighting, installations, and event support. This policy outlines how our services and deliverables are fulfilled.
      </p>

      <H2>1. Service Delivery</H2>
      <p>Most services are delivered in one of the following ways:</p>
      <p>
        <span className="text-white/80 font-semibold">In Person</span> — Event production, DJ services, live sound, and equipment installations are performed on-site at your event venue or client location.
      </p>
      <p>
        <span className="text-white/80 font-semibold">On-Site at Client Locations</span> — Lighting setups, AV installations, and related technical services are carried out at the location agreed upon in your service agreement.
      </p>
      <p>
        <span className="text-white/80 font-semibold">Virtual or Digital</span> — Consultations, technical planning sessions, and project reviews may be conducted remotely via video call or digital communication.
      </p>
      <p>
        Delivery timelines and specific service execution details are defined within each client's individual service agreement or contract.
      </p>

      <H2>2. Physical Goods</H2>
      <p>
        Hey Frank-O does not sell or ship physical products through this website. Any equipment, materials, or physical deliverables associated with our services are handled as follows:
      </p>
      <p>Equipment and gear are brought to and set up at the client's venue or event location during scheduled services. Installed materials (such as permanent lighting or AV systems) are delivered and installed at the client's site. Electronically deliverable items are provided digitally when applicable.</p>
      <p>
        We do not operate a retail storefront or ship consumer goods. All equipment provided during rentals must be returned in the condition received at the conclusion of the agreed rental period.
      </p>

      <H2>3. Scheduling & Fulfillment</H2>
      <p>All services are fulfilled based on the following conditions being met:</p>
      <p>A confirmed booking date agreed upon by both parties, a signed service agreement or contract where required, and receipt of any required deposit or full payment as specified at the time of booking.</p>
      <p>
        Failure to meet scheduling requirements, provide necessary access to the service location, or fulfill payment obligations may result in delays, rescheduling, or cancellation of services at Hey Frank-O's discretion.
      </p>

      <H2>4. Digital Deliverables</H2>
      <p>
        Where applicable, digital files associated with a service — including audio recordings, project files, or other digital materials — will be delivered electronically (via email, file transfer, or an agreed platform) within the timeframe specified in the service agreement.
      </p>
      <p>
        If no delivery timeline is specified in the agreement, Hey Frank-O will communicate a reasonable estimated delivery date upon completion of the service.
      </p>

      <H2>5. Contact</H2>
      <p>
        For questions about service delivery or scheduling:{' '}
        <a href="mailto:contact@HeyFranko.com" className="text-[#39d353] hover:text-white transition-colors">
          contact@HeyFranko.com
        </a>
        {' '}· 980-225-1992
      </p>
    </LegalPage>
  );
}
