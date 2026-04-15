'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ── Hero headline tags — one picked at random on each page load ── */
const HERO_TAGS = [
  'Need a DJ?',
  'Need Equipment?',
  'Need Lighting?',
  'Throwing an Event?',
  'Want It Done Right?',
  'Need a Hand?',
  'Need Backup?',
  'Want It Handled?',
  'Need a Full Setup?',
  'Need It Cleaned Up?',
  'Need Outdoor Help?',
  'Want It Off Your Plate?',
];

/* ── Scroll reveal ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target); // fire once
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
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
    color: 'green',
    href: '/get-a-quote',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    title: 'A/V & Lighting',
    subtitle: "If it ain't bright, it ain't right.",
    body: 'Professional A/V systems and lighting rigs designed to transform any venue. From subtle ambiance to full spectacle.',
    color: 'yellow',
    href: '/get-a-quote',
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
    color: 'green',
    href: '/get-a-quote',
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
    color: 'yellow',
    href: '/get-a-quote',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: 'Church Audio Training',
    subtitle: 'Sound that serves the room.',
    body: 'Hands-on Behringer X32 training for church sound volunteers. We build confident sound teams — fast.',
    color: 'green',
    href: '/church-audio-training',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: 'Lawn Care',
    subtitle: 'Property care at your doorstep.',
    body: 'Consultations, weekly mowing, and leaf removal for residential properties. Starting at $49.',
    color: 'yellow',
    href: '/lawn-care',
  },
];

export default function HomePage() {
  useReveal();

  // Pick a random tag on each client-side load
  const [headline, setHeadline] = useState(HERO_TAGS[0]);
  useEffect(() => {
    setHeadline(HERO_TAGS[Math.floor(Math.random() * HERO_TAGS.length)]);
  }, []);

  return (
    <>
      {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
      <section className="relative w-full min-h-screen overflow-hidden flex flex-col">
        {/* Video BG */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-contain sm:object-cover"
          aria-hidden="true"
        >
          <source src="/hero/hero-banner.mp4" type="video/mp4" />
        </video>

        {/* Overlay — stronger on mobile for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85" />

        {/* Headline only — lower on mobile (pt-28) to clear the logo-free navbar space */}
        <div className="relative z-10 flex flex-col items-center text-center px-5 sm:px-8 pt-28 sm:pt-24">
          <h1
            className="hero-fade hero-fade-delay-1 text-white font-black uppercase leading-[0.95]"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 12vw, 8.5rem)',
              textShadow: '0 4px 48px rgba(0,0,0,0.7)',
            }}
          >
            {headline.split(' ').slice(0, -1).join(' ')}&nbsp;
            <span className="gradient-text">
              {headline.split(' ').slice(-1)[0]}
            </span>
          </h1>
        </div>

        {/* Middle spacer — lets the animated logo graphic own the center */}
        <div className="flex-1" />

        {/* Eyebrow + CTAs — stacked just above the bottom */}
        <div className="relative z-10 flex flex-col items-center gap-4 px-5 pb-20 sm:pb-24">
          {/* Eyebrow sits just above the buttons */}
          <p
            className="hero-fade hero-fade-delay-2 text-[#39d353] uppercase tracking-[0.3em] text-xs sm:text-sm font-semibold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Charlotte, NC · Events &amp; Services
          </p>

          {/* CTAs */}
          <div className="hero-fade hero-fade-delay-3 flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
          <Link href="/get-a-quote" className="btn-primary glow-green w-full sm:w-auto max-w-xs sm:max-w-none">
            Get a Quote
          </Link>
          <Link href="/book-consultation" className="btn-outline w-full sm:w-auto max-w-xs sm:max-w-none">
            Book a Consultation
          </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 animate-bounce">
          <span
            className="text-white/40 text-[10px] uppercase tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Scroll
          </span>
          <svg className="w-4 h-4 text-[#39d353]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════ CTA BAND ═══════════════════════════ */}
      <section className="relative bg-[#090909] overflow-hidden py-24 sm:py-32 px-5 sm:px-8">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <Image
            src="/graphics/unanimated.png"
            alt=""
            fill
            sizes="100vw"
            className="object-contain opacity-[0.035]"
            aria-hidden="true"
          />
        </div>

        {/* Edge accents */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#39d353]/50 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#f5e114]/30 to-transparent" />

        <div className="relative max-w-4xl mx-auto text-center">
          <p
            className="reveal text-[#39d353] uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Elevate Your Events
          </p>
          <h2
            className="reveal text-white font-black uppercase leading-tight mb-6"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}
          >
            Expert Equipment.
            <br />
            <span className="gradient-text">Professional Results.</span>
          </h2>
          <p className="reveal text-white/55 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            From intimate gatherings to large-scale productions, Hey Frank-O delivers the equipment and expertise to make every event unforgettable.
          </p>
          <div className="reveal flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-a-quote" className="btn-primary glow-green">Get a Quote</Link>
            <Link href="/book-consultation" className="btn-outline">Book a Site Visit</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ SERVICES ══════════════════════════ */}
      <section id="services" className="bg-[#0d0d0d] py-24 sm:py-32 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 sm:mb-20">
            <p
              className="reveal text-[#39d353] uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold mb-3"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Rentals &amp; Services
            </p>
            <h2
              className="reveal text-white font-black uppercase leading-tight mb-4"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              Dedication. Expertise.{' '}
              <span className="gradient-text">Passion.</span>
            </h2>
            <p className="reveal text-white/50 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              At Hey Frank-O we provide a comprehensive range of equipment tailored to meet all your event needs — from backline rentals to full DJ setups.
            </p>
          </div>

          {/* Browse Rentals */}
          <div className="reveal flex justify-center mb-14">
            <a
              href="https://bookable.io"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-yellow glow-yellow"
            >
              Browse All Rentals
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((svc, i) => (
              <div
                key={svc.title}
                className={`reveal reveal-delay-${Math.min(i + 1, 4)} group relative bg-[#161616] border border-white/5 rounded-2xl p-6 sm:p-7 flex flex-col gap-4 transition-all duration-300 hover:border-[#39d353]/40 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(57,211,83,0.08)]`}
              >
                {/* Top shine */}
                <div
                  className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent ${svc.color === 'green' ? 'via-[#39d353]' : 'via-[#f5e114]'} to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Icon */}
                <div className={svc.color === 'green' ? 'text-[#39d353]' : 'text-[#f5e114]'}>
                  {svc.icon}
                </div>

                <div className="flex-1">
                  <h3
                    className="text-white font-bold text-lg sm:text-xl mb-1 uppercase"
                    style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}
                  >
                    {svc.title}
                  </h3>
                  <p className={`text-sm font-semibold mb-3 ${svc.color === 'green' ? 'text-[#39d353]' : 'text-[#f5e114]'}`}>
                    {svc.subtitle}
                  </p>
                  <p className="text-white/50 text-sm leading-relaxed">{svc.body}</p>
                </div>

                <Link
                  href={svc.href}
                  className={`inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
                    svc.color === 'green'
                      ? 'text-[#39d353] hover:text-white'
                      : 'text-[#f5e114] hover:text-white'
                  }`}
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Get Started
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          {/* View All Services link */}
          <div className="reveal flex justify-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39d353] transition-colors text-sm font-semibold uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              View All Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ BANNER STRIP ══════════════════════ */}
      <section className="relative overflow-hidden" style={{ height: 'clamp(240px, 35vw, 420px)' }}>
        <Image
          src="/graphics/banner-2.jpg"
          alt="Hey Frank-O banner"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Headline — sits near the very top of the banner */}
        <div className="absolute top-0 left-0 right-0 flex justify-center pt-4 sm:pt-5 px-5">
          <h2
            className="text-white font-black uppercase drop-shadow-2xl text-center"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 5vw, 4rem)' }}
          >
            Ready to{' '}
            <span className="gradient-text">Rock Your Event?</span>
          </h2>
        </div>

        {/* Button — pinned to the bottom of the banner */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-7 sm:pb-9">
          <Link href="/get-a-quote" className="btn-primary glow-green">
            Start Your Quote
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════ EMAIL SUBSCRIBE ════════════════════ */}
      <section className="bg-[#090909] py-20 sm:py-24 px-5 sm:px-8">
        <div className="max-w-lg mx-auto text-center">
          <p
            className="reveal text-[#39d353] uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Stay in the Loop
          </p>
          <h2
            className="reveal text-white font-black uppercase mb-4"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Connect With Us
          </h2>
          <p className="reveal text-white/50 mb-8 text-sm sm:text-base leading-relaxed">
            Subscribe for exclusive discounts, event tips, and new service announcements.
          </p>
          <form
            className="reveal flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => { e.preventDefault(); }}
          >
            <input
              type="email"
              placeholder="Your email address"
              required
              className="form-input flex-1"
            />
            <button type="submit" className="btn-primary whitespace-nowrap flex-shrink-0">
              Subscribe
            </button>
          </form>
          <label className="reveal flex items-start gap-3 mt-5 text-left cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 flex-shrink-0 w-4 h-4 cursor-pointer rounded"
              style={{ accentColor: '#39d353' }}
            />
            <span className="text-white/40 text-xs sm:text-sm leading-relaxed hover:text-white/60 transition-colors">
              Yes, I want to subscribe to receive discounts and coupons from Hey Frank-O.
            </span>
          </label>
        </div>
      </section>

      {/* ═══════════════════════════════ FOOTER ════════════════════════════ */}
      <footer className="bg-[#060606] border-t border-white/5 pt-14 sm:pt-16 pb-8 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12 mb-14">
            {/* Brand — centered on mobile */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <Image
                src="/logo/hey-franko-logo.png"
                alt="Hey Frank-O"
                width={140}
                height={60}
                className="object-contain mb-5"
              />
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Expert equipment rentals and professional services for events of all sizes. Charlotte, NC.
              </p>
            </div>

            {/* Contact — centered on mobile */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <h4
                className="text-white font-bold uppercase tracking-widest text-xs mb-5"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Contact
              </h4>
              <ul className="space-y-3 text-sm text-white/50 w-full">
                <li className="flex items-center justify-center sm:justify-start gap-3">
                  <svg className="w-4 h-4 text-[#39d353] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:9802251992" className="hover:text-[#39d353] transition-colors">980-225-1992</a>
                </li>
                <li className="flex items-center justify-center sm:justify-start gap-3">
                  <svg className="w-4 h-4 text-[#39d353] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:contact@HeyFranko.com" className="hover:text-[#39d353] transition-colors break-all">contact@HeyFranko.com</a>
                </li>
                <li className="flex items-start justify-center sm:justify-start gap-3">
                  <svg className="w-4 h-4 text-[#39d353] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <address className="not-italic leading-relaxed">
                    5500 Executive Center Dr.&nbsp;Ste.&nbsp;228<br />Charlotte, NC 28212
                  </address>
                </li>
              </ul>
            </div>

            {/* Social + Quick Links — centered on mobile */}
            <div className="sm:col-span-2 md:col-span-1 flex flex-col items-center sm:items-start text-center sm:text-left">
              <h4
                className="text-white font-bold uppercase tracking-widest text-xs mb-5"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Follow Us
              </h4>
              <div className="flex gap-3 mb-8 justify-center sm:justify-start">
                {[
                  {
                    href: 'https://www.facebook.com/heyfranko1',
                    label: 'Facebook',
                    d: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
                  },
                  {
                    href: 'https://www.instagram.com/heyfranko1',
                    label: 'Instagram',
                    d: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z',
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:border-[#39d353] hover:text-[#39d353] transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={s.d} />
                    </svg>
                  </a>
                ))}
                <a
                  href="https://www.tiktok.com/@heyfranko"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:border-[#39d353] hover:text-[#39d353] transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
                  </svg>
                </a>
              </div>

              <h4
                className="text-white font-bold uppercase tracking-widest text-xs mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Quick Links
              </h4>
              <div className="flex flex-col gap-2 items-center sm:items-start">
                {[
                  { label: 'Get a Quote', href: '/get-a-quote' },
                  { label: 'Book a Consultation', href: '/book-consultation' },
                ].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-sm text-white/40 hover:text-[#39d353] transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
            <span>All Rights Reserved &copy; {new Date().getFullYear()} Hey Frank-O</span>
            <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center">
              {[
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Rental Contract', href: '/rental-contract' },
                { label: 'Booking Policies', href: '/booking-policy' },
                { label: 'Refund Policy', href: '/refund-policy' },
                { label: 'Shipping & Delivery', href: '/shipping-policy' },
                { label: 'Accessibility', href: '/accessibility' },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-[#39d353] transition-colors">
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
