import Link from 'next/link';

export default function LegalPage({ title, children }) {
  return (
    <div className="min-h-screen bg-brand-black pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-brand-green text-sm uppercase tracking-widest hover:text-white transition-colors mb-8 inline-flex items-center gap-2"
          style={{ fontFamily: 'var(--font-display)' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        <div className="mt-6 mb-12">
          <h1 className="text-white font-black uppercase"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            {title}
          </h1>
          <div className="mt-2 h-1 w-16 bg-gradient-to-r from-brand-green to-brand-yellow rounded-full" />
        </div>

        <div className="prose prose-invert max-w-none text-white/60 leading-relaxed space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}
