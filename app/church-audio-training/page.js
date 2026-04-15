import Image from 'next/image';
import Link from 'next/link';

export const metadata = { title: 'Church Audio Engineering Training | Hey Frank-O' };

const BOOKABLE_URL = 'https://bookable.io';

const TRAINING_PACKAGES = [
  {
    tier: 'Value Package',
    name: 'Basic Audio Team Training',
    price: '$1,500',
    billing: 'flat rate',
    description: 'Four (4) weekly on-site training sessions at your church, venue, or preferred space. Hands-on instruction to build confidence and consistency.',
    features: [
      'Includes syllabus and training materials',
      'Up to 3 participants',
      '4 weekly training sessions',
      'Client preferred scheduling',
      'Hands-on instruction',
      'Does not include Sunday Tech Visit',
      '10% off any Hey Frank-O service or rental',
    ],
    highlight: false,
    cta: 'Select Package',
  },
  {
    tier: 'Premium Package',
    name: 'Premium Audio Team Training',
    price: '$2,500',
    billing: 'flat rate',
    description: 'Eight (8) weekly on-site training sessions at your church, venue, or preferred space. Includes a live Sunday Tech Visit.',
    features: [
      'Includes syllabus and training materials',
      'Up to 5 participants',
      '8 weekly training sessions',
      'Client preferred scheduling',
      'Hands-on instruction',
      'Includes 1 Sunday Tech Visit',
      '10% off any Hey Frank-O service or rental',
    ],
    highlight: true,
    cta: 'Select Package',
  },
];

const SUBSCRIPTIONS = [
  {
    name: 'Phone & Video Troubleshooting Support',
    price: '$99',
    billing: '/month',
    description: 'Unlimited phone and video troubleshooting support with Frank-O. Call anytime for up to 15 minutes of live help to resolve audio issues fast.',
    features: [
      'Unlimited 15-min scheduled phone support',
      'Optional video support',
      'Troubleshooting techniques',
      'Cancel anytime',
    ],
  },
  {
    name: 'Monthly Livestream Maintenance',
    price: '$199',
    billing: '/month',
    description: 'Reliable monthly livestream support for services and events. Frank-O manages audio, setup, and stream quality for a smooth, professional broadcast.',
    features: [
      '1 two-hour maintenance session',
      'Monthly livestream tune-up',
      'Audio & stream quality management',
      'Cancel anytime',
    ],
  },
  {
    name: 'Monthly Audio Training Membership',
    price: '$800',
    billing: '/month',
    description: 'Two 2.5-hour sessions per month for up to three participants. Hands-on training with real-time troubleshooting techniques.',
    features: [
      'Two 2.5-hour sessions per month',
      'Up to 3 participants',
      'Hands-on training with Frank-O',
      'Real-time troubleshooting techniques',
      'Cancel anytime',
    ],
  },
];

const AUDIENCE = [
  'Church sound volunteers',
  'Worship & tech team members',
  'New audio engineers',
  'Churches tired of "winging it" every Sunday',
];

const CheckIcon = () => (
  <svg className="w-4 h-4 text-[#39d353] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function ChurchAudioTrainingPage() {
  return (
    <div className="min-h-screen bg-[#090909] pt-24 sm:pt-28 pb-20">
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

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p className="text-[#39d353] uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Audio Engineering Training
            </p>
            <h1 className="text-white font-black uppercase leading-tight mb-5" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 6vw, 4.5rem)' }}>
              Sound That Serves<br />the Room —{' '}
              <span className="gradient-text">Not Distracts</span> From It
            </h1>
            <p className="text-white/55 leading-relaxed mb-8">
              Hands-on audio engineering training designed for churches using the Behringer X32. We train volunteers fast, reduce Sunday stress, and build confident sound teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={BOOKABLE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary glow-green">
                Schedule a Consultation
              </a>
              <Link href="/get-a-quote" className="btn-outline">
                Get a Quote
              </Link>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/10">
            <Image
              src="/graphics/church-audio-training.jpg"
              alt="Hey Frank-O Church Audio Engineering Training"
              width={845}
              height={734}
              className="w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        </div>

        {/* Who It's For */}
        <div className="mb-20 bg-[#161616] border border-white/5 rounded-2xl p-8 sm:p-10">
          <h2 className="text-white font-black uppercase mb-6" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
            Who This Training Is For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {AUDIENCE.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckIcon />
                <span className="text-white/70 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-6">
            <p className="text-[#39d353] font-semibold text-sm" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}>
              If your team panics when something goes wrong — this training is for you.
            </p>
          </div>
        </div>

        {/* Training Packages */}
        <div className="mb-20">
          <p className="text-[#39d353] uppercase tracking-[0.25em] text-xs font-semibold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Training Packages
          </p>
          <h2 className="text-white font-black uppercase mb-10" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Review <span className="gradient-text">Packages</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TRAINING_PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative bg-[#161616] rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300 ${
                  pkg.highlight
                    ? 'border-2 border-[#39d353] shadow-[0_0_40px_rgba(57,211,83,0.12)]'
                    : 'border border-white/5'
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#39d353] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>
                      Most Popular
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-[#39d353] text-xs uppercase tracking-widest mb-1 font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                    {pkg.tier}
                  </p>
                  <h3 className="text-white font-bold text-xl uppercase mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-white font-black text-4xl" style={{ fontFamily: 'var(--font-display)' }}>{pkg.price}</span>
                    <span className="text-white/40 text-sm">{pkg.billing}</span>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">{pkg.description}</p>
                </div>
                <ul className="flex flex-col gap-2.5 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/65">
                      <CheckIcon />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={BOOKABLE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={pkg.highlight ? 'btn-primary w-full text-center glow-green' : 'btn-outline w-full text-center'}
                >
                  {pkg.cta}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Subscriptions */}
        <div className="mb-16">
          <p className="text-[#39d353] uppercase tracking-[0.25em] text-xs font-semibold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Subscriptions &amp; Memberships
          </p>
          <h2 className="text-white font-black uppercase mb-10" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Flexible Plans —{' '}
            <span className="gradient-text">Cancel Anytime</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {SUBSCRIPTIONS.map((sub) => (
              <div
                key={sub.name}
                className="bg-[#161616] border border-white/5 rounded-2xl p-6 flex flex-col gap-4 hover:border-[#39d353]/40 transition-all duration-300"
              >
                <div>
                  <h3 className="text-white font-bold text-lg uppercase mb-3" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.03em' }}>
                    {sub.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-[#39d353] font-black text-3xl" style={{ fontFamily: 'var(--font-display)' }}>{sub.price}</span>
                    <span className="text-white/40 text-sm">{sub.billing}</span>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">{sub.description}</p>
                </div>
                <ul className="flex flex-col gap-2 flex-1">
                  {sub.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                      <CheckIcon />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={BOOKABLE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full text-center mt-auto"
                >
                  Select Plan
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* CTA strip */}
        <div className="bg-[#39d353]/5 border border-[#39d353]/20 rounded-2xl p-8 text-center">
          <h3 className="text-white font-black uppercase mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            Not sure which package fits?
          </h3>
          <p className="text-white/50 text-sm mb-6">Book a free consultation and we'll find the right training plan for your team and budget.</p>
          <a href={BOOKABLE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary glow-green">
            Schedule a Consultation
          </a>
        </div>
      </div>
    </div>
  );
}
