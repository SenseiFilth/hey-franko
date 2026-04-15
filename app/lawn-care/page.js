import Link from 'next/link';

export const metadata = { title: 'Lawn Care Services | Hey Frank-O' };

const BOOKABLE_URL = 'https://bookable.io';

const SERVICES = [
  {
    name: 'Lawn Care Consultation',
    duration: '1 hr',
    price: '$49',
    priceNote: null,
    description:
      'On-site evaluation of your lawn care needs including mowing, trimming, yard maintenance, and general property upkeep. We review the condition of the lawn, discuss your goals, and recommend the best services. Pricing for ongoing or one-time services will be provided after the consultation.',
    location: "Customer's Place",
  },
  {
    name: 'Weekly Mowing — Medium Yard',
    duration: '2 hrs',
    price: '$75',
    priceNote: 'per visit',
    description:
      'Professional weekly mowing service for medium-sized residential properties. Includes mowing, edging, and basic cleanup as outlined in your selected package.',
    location: "Customer's Place",
  },
  {
    name: 'Weekly Mowing — Large Yard',
    duration: '2 hrs',
    price: '$100',
    priceNote: 'per visit',
    description:
      'Professional weekly mowing service for large residential properties. Includes mowing, edging, and basic cleanup. Excessively overgrown lawns may require an additional fee or separate service.',
    location: "Customer's Place",
  },
  {
    name: 'Leaf Removal',
    duration: '1 hr+',
    price: 'Quoted On-Site',
    priceNote: null,
    description:
      'Our technician will arrive, evaluate the property, and provide the cost of service. Payment is made upon completion. Pricing depends on property size and volume of leaves.',
    location: "Customer's Place",
  },
];

const POLICY_ITEMS = [
  {
    title: 'Property Preparation',
    body: 'Clients are responsible for removing all toys, lawn furniture, decorations, hoses, cords, and debris from the lawn before service. Pet waste must be cleared from the grass. Failure to prepare the yard may result in skipped areas or rescheduling without refund.',
  },
  {
    title: 'Pets & Access',
    body: 'All dogs and pets must be secured indoors or away from service areas. Gates must be unlocked and clear access provided. We are not responsible for missed service due to locked gates, blocked access, or loose animals.',
  },
  {
    title: 'Service Scope',
    body: 'Lawn care services include mowing and basic cleanup as outlined in your package. We do not move heavy objects or service overgrown or unsafe areas without prior approval. Excessively overgrown lawns may incur an additional fee.',
  },
  {
    title: 'Damage & Liability',
    body: 'We are not responsible for damage caused by hidden or unmarked items (rocks, wires, sprinkler heads, toys, pet waste, or debris). We are not liable for damage to landscaping features, irrigation systems, or underground utilities not clearly disclosed. Normal wear to grass, edging, or soil is not considered damage.',
  },
  {
    title: 'Weather & Conditions',
    body: 'Services may be delayed or rescheduled due to unsafe weather or saturated ground conditions. Wet lawns may be rescheduled to prevent turf damage.',
  },
  {
    title: 'Payments & Balances',
    body: 'Payment must be made before the next scheduled service. Subscription clients must have their next monthly payment received before service is provided. Properties with outstanding balances will not be serviced — no exceptions.',
  },
  {
    title: 'Refunds',
    body: 'No refunds are provided for lawn care services. See our Refund Policy for full details.',
  },
];

export default function LawnCarePage() {
  return (
    <div className="min-h-screen bg-[#090909] pt-24 sm:pt-28 pb-20">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-[#39d353] text-sm uppercase tracking-widest hover:text-white transition-colors mb-8"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          All Services
        </Link>

        <div className="mb-12">
          <p className="text-[#39d353] uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Property Care
          </p>
          <h1 className="text-white font-black uppercase mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}>
            Lawn Care<br /><span className="gradient-text">Services</span>
          </h1>
          <p className="text-white/50 max-w-xl leading-relaxed">
            Professional lawn care at your doorstep. From routine weekly mowing to on-site consultations — we keep your property clean, maintained, and looking sharp.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-20">
          {SERVICES.map((svc) => (
            <div
              key={svc.name}
              className="group bg-[#161616] border border-white/5 rounded-2xl p-7 flex flex-col gap-4 hover:border-[#39d353]/40 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#39d353] to-transparent opacity-0 group-hover:opacity-60 transition-opacity" />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-white font-bold text-xl uppercase mb-1" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.03em' }}>
                    {svc.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-white/40">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {svc.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {svc.location}
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[#39d353] font-black text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                    {svc.price}
                  </p>
                  {svc.priceNote && <p className="text-white/30 text-xs">{svc.priceNote}</p>}
                </div>
              </div>

              <p className="text-white/50 text-sm leading-relaxed flex-1">{svc.description}</p>

              <a
                href={BOOKABLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center mt-2"
              >
                Book Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Policy Section */}
        <div className="border-t border-white/5 pt-16">
          <p className="text-[#39d353] uppercase tracking-[0.25em] text-xs font-semibold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Before You Book
          </p>
          <h2 className="text-white font-black uppercase mb-10" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Lawn Mowing &amp; Property Care Policy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {POLICY_ITEMS.map((item) => (
              <div key={item.title} className="bg-[#161616] border border-white/5 rounded-xl p-6">
                <h3 className="text-white font-bold text-base mb-2" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}>
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="text-white/30 text-xs mt-6">
            Scheduling or receiving service indicates agreement with these terms. See also our{' '}
            <Link href="/refund-policy" className="text-[#39d353] hover:text-white transition-colors">Refund Policy</Link>.
          </p>
        </div>

        {/* Contact */}
        <div className="mt-16 flex flex-col sm:flex-row gap-4 text-sm text-white/40">
          <a href="tel:9802251992" className="hover:text-[#39d353] transition-colors">980-225-1992</a>
          <a href="mailto:contact@HeyFranko.com" className="hover:text-[#39d353] transition-colors">contact@HeyFranko.com</a>
          <span>5500 Executive Center Dr. Charlotte, NC 28212</span>
        </div>
      </div>
    </div>
  );
}
