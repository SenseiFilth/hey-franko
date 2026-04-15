'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ── Scroll reveal hook ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Service Card Data ── */
const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
      </svg>
    ),
    title: 'Backline Rentals',
    subtitle: 'We bring the gear, you bring the vibe.',
    body: 'Full backline solutions that hit every time — amps, drums, keyboards, and more. Whatever the stage demands, we deliver.',
    color: 'brand-green',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    title: 'A/V & Lighting',
    subtitle: "If it ain't bright, it ain't right.",
    body: 'Professional A/V systems and lighting rigs designed to transform any venue. From subtle ambiance to full-on spectacle.',
    color: 'brand-yellow',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
      </svg>
    ),
    title: 'DJ & Setup Services',
    subtitle: 'The DJ or just the rig — we run it.',
    body: "Need a DJ for your next event or just the setup? We bring the energy and the equipment. Let's run it.",
    color: 'brand-green',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
    title: 'Audio Engineering',
    subtitle: "We don't guess — we mix.",
    body: 'Precision audio engineering that hits every time. Expert mixing, tuning, and mastering so your event sounds exactly right.',
    color: 'brand-yellow',
  },
];

export default function HomePage() {
  useReveal();

  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex flex-col">
        {/* Video BG */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/hero/hero-banner.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

        {/* Hero Content — upper portion */}
        <div className="relative z-10 flex flex-col items-center justify-start text-center pt-36 px-6">
          <p
            className="text-brand-green uppercase tracking-[0.3em] text-sm font-semibold mb-4 animate-fade-in"
            style={{ fontFamily: 'var(--font-display)', animationDelay: '0.2s' }}
          >
            Charlotte, NC · Events & Services
          </p>

          <h1
            className="text-white font-black uppercase leading-none mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 10vw, 8rem)',
              letterSpacing: '-0.01em',
              textShadow: '0 4px 40px rgba(0,0,0,0.6)',
              animationDelay: '0.4s',
            }}
          >
            Need a{' '}
            <span className="gradient-text">Hand?</span>
          </h1>

          <p
            className="text-white/70 text-lg max-w-xl mt-2 mb-8 animate-fade-in"
            style={{ fontFamily: 'var(--font-body)', animationDelay: '0.6s' }}
          >
            We handle the gear, the sound, and the light — so you can focus on the moment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Link href="/get-a-quote" className="btn-primary glow-green">
              Get a Quote
            </Link>
            <Link href="/book-consultation" className="btn-outline">
              Book a Consultation
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 animate-bounce">
          <span className="text-white/40 text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-display)' }}>
            Scroll
          </span>
          <svg className="w-4 h-4 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ═══════════════ CALL TO ACTION ═══════════════ */}
      <section className="relative bg-brand-black overflow-hidden py-28 px-6">
        {/* Watermark logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <Image
            src="/graphics/unanimated.png"
            alt=""
            fill
            className="object-contain opacity-[0.04]"
            aria-hidden="true"
          />
        </div>

        {/* Accent lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-green to-transparent opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-yellow to-transparent opacity-30" />

        <div className="relative max-w-4xl mx-auto text-center">
          <p className="reveal text-brand-green uppercase tracking-[0.25em] text-sm font-semibold mb-4"
            style={{ fontFamily: 'var(--font-display)' }}>
            Elevate Your Events
          </p>
          <h2 className="reveal text-white font-black uppercase leading-tight mb-6"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            Expert Equipment.
            <br />
            <span className="gradient-text">Professional Results.</span>
          </h2>
          <p className="reveal text-white/60 text-lg max-w-2xl mx-auto mb-10">
            From intimate gatherings to large-scale productions, Hey Frank-O provides a comprehensive range of equipment and services tailored to every event need.
          </p>
          <div className="reveal flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-a-quote" className="btn-primary glow-green">Get a Quote</Link>
            <Link href="/book-consultation" className="btn-outline">Book a Site Visit</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section id="services" className="bg-[#0d0d0d] py-28 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <p className="reveal text-brand-green uppercase tracking-[0.25em] text-sm font-semibold mb-3"
              style={{ fontFamily: 'var(--font-display)' }}>
              Rentals & Services
            </p>
            <h2 className="reveal text-white font-black uppercase leading-tight mb-4"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              Dedication. Expertise.{' '}
              <span className="gradient-text">Passion.</span>
            </h2>
            <p className="reveal text-white/50 max-w-2xl mx-auto text-base leading-relaxed">
              At Hey Frank-O we provide a comprehensive range of equipment tailored to meet all your event needs — from backline rentals to full DJ setups.
            </p>
          </div>

          {/* Browse Rentals CTA */}
          <div className="reveal flex justify-center mb-16">
            <a
              href="https://bookable.io"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-yellow glow-yellow"
            >
              Browse All Rentals
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((svc, i) => (
              <div
                key={svc.title}
                className={`reveal reveal-delay-${i + 1} group relative bg-brand-card border border-white/5 rounded-2xl p-7 flex flex-col gap-4 hover:border-brand-green/40 transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Top accent */}
                <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent ${svc.color === 'brand-green' ? 'via-brand-green' : 'via-brand-yellow'} to-transparent opacity-60 group-hover:opacity-100 transition-opacity`} />

                {/* Icon */}
                <div className={`${svc.color === 'brand-green' ? 'text-brand-green' : 'text-brand-yellow'} mb-1`}>
                  {svc.icon}
                </div>

                <div>
                  <h3 className="text-white font-bold text-xl mb-1 uppercase"
                    style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}>
                    {svc.title}
                  </h3>
                  <p className={`text-sm font-semibold mb-3 ${svc.color === 'brand-green' ? 'text-brand-green' : 'text-brand-yellow'}`}>
                    {svc.subtitle}
                  </p>
                  <p className="text-white/50 text-sm leading-relaxed">{svc.body}</p>
                </div>

                <Link
                  href="/get-a-quote"
                  className={`mt-auto inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
                    svc.color === 'brand-green'
                      ? 'text-brand-green hover:text-white'
                      : 'text-brand-yellow hover:text-white'
                  }`}
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Get Started
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ BANNER STRIP ═══════════════ */}
      <section className="relative overflow-hidden">
        <Image
          src="/graphics/banner-1.jpg"
          alt="Hey Frank-O Banner"
          width={1920}
          height={600}
          className="w-full object-cover"
          style={{ maxHeight: '380px' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-white font-black uppercase mb-4 drop-shadow-lg"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
            Ready to{' '}
            <span className="gradient-text">Rock Your Event?</span>
          </h2>
          <Link href="/get-a-quote" className="btn-primary glow-green">
            Start Your Quote
          </Link>
        </div>
      </section>

      {/* ═══════════════ CONNECT / EMAIL ═══════════════ */}
      <section className="bg-brand-black py-24 px-6">
        <div className="max-w-xl mx-auto text-center">
          <p className="reveal text-brand-green uppercase tracking-[0.25em] text-sm font-semibold mb-3"
            style={{ fontFamily: 'var(--font-display)' }}>
            Stay in the Loop
          </p>
          <h2 className="reveal text-white font-black uppercase mb-4"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Connect With Us
          </h2>
          <p className="reveal text-white/50 mb-8 text-sm">
            Subscribe for exclusive discounts, event tips, and new service announcements.
          </p>
          <form
            className="reveal flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              required
              className="form-input flex-1"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
          <label className="reveal flex items-start gap-3 mt-4 text-left cursor-pointer group">
            <input
              type="checkbox"
              className="mt-1 w-4 h-4 accent-brand-green flex-shrink-0 cursor-pointer"
            />
            <span className="text-white/40 text-xs leading-relaxed group-hover:text-white/60 transition-colors">
              Yes, I want to subscribe to receive discounts and coupons from Hey Frank-O.
            </span>
          </label>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="bg-[#060606] border-t border-white/5 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Brand */}
            <div>
              <Image
                src="/logo/hey-franko-logo.png"
                alt="Hey Frank-O"
                width={150}
                height={65}
                className="object-contain mb-5"
              />
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Expert equipment rentals and professional services for events of all sizes. Charlotte, NC.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6"
                style={{ fontFamily: 'var(--font-display)' }}>
                Contact
              </h4>
              <ul className="space-y-3 text-sm text-white/50">
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-brand-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:9802251992" className="hover:text-brand-green transition-colors">980-225-1992</a>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-brand-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:contact@HeyFranko.com" className="hover:text-brand-green transition-colors">contact@HeyFranko.com</a>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>5500 Executive Center Dr. Ste. 228<br />Charlotte, NC 28212</span>
                </li>
              </ul>
            </div>

            {/* Social & Links */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6"
                style={{ fontFamily: 'var(--font-display)' }}>
                Follow Us
              </h4>
              <div className="flex gap-4 mb-8">
                {[
                  { href: 'https://www.facebook.com/heyfranko1', label: 'Facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                  { href: 'https://www.instagram.com/heyfranko1', label: 'Instagram', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:border-brand-green hover:text-brand-green transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                    </svg>
                  </a>
                ))}
                <a
                  href="https://www.tiktok.com/@heyfranko"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:border-brand-green hover:text-brand-green transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
                  </svg>
                </a>
              </div>

              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4"
                style={{ fontFamily: 'var(--font-display)' }}>
                Quick Links
              </h4>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Get a Quote', href: '/get-a-quote' },
                  { label: 'Book a Consultation', href: '/book-consultation' },
                ].map((l) => (
                  <Link key={l.href} href={l.href}
                    className="text-sm text-white/40 hover:text-brand-green transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
            <span>All Rights Reserved &copy; {new Date().getFullYear()} Hey Frank-O</span>
            <div className="flex gap-6 flex-wrap justify-center">
              {[
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Terms & Conditions', href: '/terms' },
                { label: 'Refund Policy', href: '/refund-policy' },
                { label: 'Accessibility', href: '/accessibility' },
              ].map((l) => (
                <Link key={l.href} href={l.href}
                  className="hover:text-brand-green transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
