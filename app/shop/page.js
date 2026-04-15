import Link from 'next/link';

export const metadata = { title: 'Shop | Hey Frank-O' };

const PRODUCTS = [
  {
    id: 'bass-placeholder',
    name: 'Bass Guitar',
    price: 'Contact for pricing',
    category: 'Instruments',
    description: 'Professional bass guitar available for purchase. Contact us for current availability, specs, and pricing.',
    badge: 'Available',
    comingSoon: false,
  },
];

export default function ShopPage() {
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

        <div className="mb-12 text-center">
          <p className="text-[#39d353] uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Hey Frank-O
          </p>
          <h1 className="text-white font-black uppercase mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}>
            Shop &amp; <span className="gradient-text">Rentals</span>
          </h1>
          <p className="text-white/50 max-w-xl leading-relaxed mx-auto">
            Equipment for purchase and rental. More products being added soon — check back or{' '}
            <Link href="/get-a-quote" className="text-[#39d353] hover:text-white transition-colors">
              get in touch
            </Link>{' '}
            about specific gear.
          </p>
        </div>

        {/* Coming soon notice */}
        <div className="mb-10 bg-[#f5e114]/5 border border-[#f5e114]/20 rounded-xl px-6 py-4 flex items-center gap-3">
          <svg className="w-5 h-5 text-[#f5e114] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-white/60 text-sm">
            Full product catalog coming soon. Contact us directly for inventory and availability on any equipment.
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-[#161616] border border-white/5 rounded-2xl overflow-hidden hover:border-[#39d353]/40 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Placeholder image area */}
              <div className="aspect-square bg-[#1a1a1a] flex flex-col items-center justify-center border-b border-white/5">
                <svg className="w-16 h-16 text-white/10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                </svg>
                <span className="text-white/20 text-xs uppercase tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>
                  Image coming soon
                </span>
              </div>

              <div className="p-6 flex flex-col gap-3 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[#39d353] text-xs uppercase tracking-wider font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                      {product.category}
                    </span>
                    <h3 className="text-white font-bold text-xl uppercase mt-1" style={{ fontFamily: 'var(--font-display)' }}>
                      {product.name}
                    </h3>
                  </div>
                  <span className="bg-[#39d353]/10 text-[#39d353] text-xs px-2 py-1 rounded-full font-semibold flex-shrink-0" style={{ fontFamily: 'var(--font-display)' }}>
                    {product.badge}
                  </span>
                </div>

                <p className="text-white/50 text-sm leading-relaxed flex-1">{product.description}</p>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="text-white/60 text-sm font-semibold">{product.price}</span>
                  <Link href="/get-a-quote" className="btn-primary py-2.5 px-5 text-sm">
                    Inquire
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* "More coming" filler cards */}
          {[1, 2].map((i) => (
            <div key={i} className="bg-[#111] border border-dashed border-white/10 rounded-2xl aspect-auto min-h-[280px] flex flex-col items-center justify-center gap-3 p-6">
              <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-white/20 text-xs uppercase tracking-wider text-center" style={{ fontFamily: 'var(--font-display)' }}>
                More products<br />coming soon
              </p>
            </div>
          ))}
        </div>

        {/* Browse Rentals CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/40 text-sm mb-4">Looking for equipment rentals?</p>
          <a
            href="https://bookable.io"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-yellow glow-yellow"
          >
            Browse Rentals on Bookable
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
