import Link from 'next/link';

export default function LegalPage({ title, children }) {
  return (
    <div className="min-h-screen bg-[#090909] pt-24 sm:pt-28 pb-20 px-5 sm:px-8">
      <div className="max-w-3xl mx-auto">
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

        <div className="mt-2 mb-10">
          <h1
            className="text-white font-black uppercase"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            {title}
          </h1>
          <div
            className="mt-3 h-1 w-16 rounded-full"
            style={{ background: 'linear-gradient(90deg, #39d353, #f5e114)' }}
          />
        </div>

        {/* Legal content — custom typography, no @tailwindcss/typography needed */}
        <div
          className="text-white/60 leading-relaxed space-y-5 text-sm sm:text-base"
          style={{ lineHeight: '1.75' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
