import Link from 'next/link';
import Image from 'next/image';

export const metadata = { title: 'Services | Hey Frank-O' };

const CATEGORIES = [
  {
    label: 'Audio / Visual & DJ',
    eyebrow: 'Events & Production',
    description: 'Full-service event production — DJ, live sound, A/V systems, lighting, and audio engineering for events of any size.',
    href: '/get-a-quote',
    cta: 'Get a Quote',
    color: 'green',
    services: ['DJ & Setup Services', 'Backline Rentals', 'A/V & Lighting', 'Audio Engineering', 'Equipment Rentals'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    label: 'Church Audio Training',
    eyebrow: 'Training & Education',
    description: 'Hands-on Behringer X32 training for church sound volunteers and tech teams. Build a confident sound team — fast.',
    href: '/church-audio-training',
    cta: 'View Packages',
    color: 'yellow',
    services: ['Basic Training Package', 'Premium Training Package', 'Phone Support Subscription', 'Monthly Livestream Maintenance', 'Training Membership'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    label: 'Lawn Care',
    eyebrow: 'Property Care',
    description: 'Professional lawn maintenance at your location. Consultations, weekly mowing, leaf removal, and property upkeep.',
    href: '/lawn-care',
    cta: 'View Services',
    color: 'green',
    services: ['Lawn Care Consultation — $49', 'Weekly Mowing (Medium) — $75', 'Weekly Mowing (Large) — $100', 'Leaf Removal — Quoted on-site'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    label: 'Shop & Rentals',
    eyebrow: 'Products & Equipment',
    description: 'Equipment available for purchase and rental. Browse our current inventory or get in touch about specific gear.',
    href: '/shop',
    cta: 'Visit Shop',
    color: 'yellow',
    services: ['Bass Guitar', 'Lighting Equipment (via Bookable)', 'Audio Boards (via Bookable)', 'More coming soon'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#090909] pt-24 sm:pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#39d353] text-sm uppercase tracking-widest hover:text-white transition-colors mb-8"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-16">
          <p className="text-[#39d353] uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Hey Frank-O
          </p>
          <h1 className="text-white font-black uppercase mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}>
            All <span className="gradient-text">Services</span>
          </h1>
          <p className="text-white/50 max-w-2xl leading-relaxed">
            From event production and DJ services to church audio training, lawn care, and equipment rentals — Hey Frank-O delivers professional results across every category.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className={`group bg-[#161616] border rounded-2xl p-8 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 ${
                cat.color === 'green'
                  ? 'border-white/5 hover:border-[#39d353]/40 hover:shadow-[0_8px_32px_rgba(57,211,83,0.07)]'
                  : 'border-white/5 hover:border-[#f5e114]/40 hover:shadow-[0_8px_32px_rgba(245,225,20,0.07)]'
              }`}
            >
              {/* Top accent */}
              <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent ${cat.color === 'green' ? 'via-[#39d353]' : 'via-[#f5e114]'} to-transparent opacity-0 group-hover:opacity-60 transition-opacity`} />

              <div className="flex items-start gap-5">
                <div className={cat.color === 'green' ? 'text-[#39d353]' : 'text-[#f5e114]'}>
                  {cat.icon}
                </div>
                <div className="flex-1">
                  <p className={`text-xs uppercase tracking-widest font-semibold mb-1 ${cat.color === 'green' ? 'text-[#39d353]' : 'text-[#f5e114]'}`} style={{ fontFamily: 'var(--font-display)' }}>
                    {cat.eyebrow}
                  </p>
                  <h2 className="text-white font-bold text-2xl uppercase" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.03em' }}>
                    {cat.label}
                  </h2>
                </div>
              </div>

              <p className="text-white/55 text-sm leading-relaxed">{cat.description}</p>

              <ul className="flex flex-col gap-2">
                {cat.services.map((s) => (
                  <li key={s} className="flex items-center gap-2.5 text-sm text-white/50">
                    <div className={`w-1 h-1 rounded-full flex-shrink-0 ${cat.color === 'green' ? 'bg-[#39d353]' : 'bg-[#f5e114]'}`} />
                    {s}
                  </li>
                ))}
              </ul>

              <Link
                href={cat.href}
                className={`mt-auto inline-flex items-center gap-2 font-semibold uppercase tracking-wider text-sm transition-colors duration-200 ${
                  cat.color === 'green' ? 'text-[#39d353] hover:text-white' : 'text-[#f5e114] hover:text-white'
                }`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {cat.cta}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-white/40 text-sm mb-4">Not sure which service is right for you?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-a-quote" className="btn-primary glow-green">Get a Quote</Link>
            <Link href="/book-consultation" className="btn-outline">Book a Consultation</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
