'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Shop', href: '/shop' },
  { label: 'Get a Quote', href: '/get-a-quote' },
  { label: 'Book a Consultation', href: '/book-consultation' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/92 backdrop-blur-md border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between">

          {/* Logo — hidden on mobile, visible on sm+ */}
          <Link href="/" className="hidden sm:block flex-shrink-0 z-10">
            <Image
              src="/logo/hey-franko-logo.png"
              alt="Hey Frank-O"
              width={120}
              height={50}
              className="object-contain drop-shadow-lg w-[120px]"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-[#39d353] transition-colors duration-200 uppercase"
                style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', letterSpacing: '0.08em', fontWeight: 600 }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions — Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative flex items-center">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-white/60 hover:text-[#39d353] transition-colors p-2 rounded-lg"
                aria-label="Toggle search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </button>
              <div
                className={`absolute right-0 top-full mt-2 transition-all duration-300 origin-top-right ${
                  searchOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                <input
                  ref={searchRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search services..."
                  className="w-60 bg-[#1a1a1a] border border-[#39d353]/40 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#39d353]"
                  onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
                  style={{ fontSize: '16px' }}
                />
              </div>
            </div>
            <Link
              href="/login"
              className="border border-[#39d353]/50 text-[#39d353] px-4 py-2 rounded-lg hover:bg-[#39d353] hover:text-black transition-all duration-200 font-semibold"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.06em', fontSize: '0.95rem' }}
            >
              Log In
            </Link>
          </div>

          {/* Mobile: Log In + Hamburger */}
          <div className="flex md:hidden items-center gap-2 ml-auto">
            <Link
              href="/login"
              className="border border-[#39d353]/50 text-[#39d353] px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.06em', touchAction: 'manipulation' }}
            >
              Log In
            </Link>
            <button
              className="text-white p-2 rounded-lg"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              style={{ touchAction: 'manipulation' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ─────────────────────────────────────────────────────
          z-[60] places it ABOVE the header (z-50) so no tap interception.
          visibility + opacity instead of opacity-only fixes iOS touch timing.
      ────────────────────────────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 md:hidden flex flex-col"
        style={{
          zIndex: 60,
          background: 'rgba(9,9,9,0.98)',
          backdropFilter: 'blur(12px)',
          // visibility + opacity: visibility:hidden removes element from tap order
          // while opacity:0 fades; visibility:visible restores it instantly on open
          visibility: menuOpen ? 'visible' : 'hidden',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.25s ease, visibility 0.25s ease',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col items-center justify-center flex-1 gap-7 px-6">
          {/* Logo inside menu */}
          <Link href="/" onClick={close} className="mb-2">
            <Image src="/logo/hey-franko-logo.png" alt="Hey Frank-O" width={140} height={60} className="object-contain" />
          </Link>

          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="text-3xl text-white/80 hover:text-[#39d353] font-black uppercase tracking-widest text-center block w-full"
              style={{
                fontFamily: 'var(--font-display)',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                cursor: 'pointer',
              }}
            >
              {link.label}
            </Link>
          ))}

          <div className="flex flex-col gap-3 w-full max-w-xs mt-2">
            <Link
              href="/get-a-quote"
              onClick={close}
              className="btn-primary w-full text-center glow-green"
              style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
            >
              Get a Quote
            </Link>
            <Link
              href="/login"
              onClick={close}
              className="btn-outline w-full text-center"
              style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
