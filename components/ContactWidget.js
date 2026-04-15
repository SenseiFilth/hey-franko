'use client';
import { useState } from 'react';

export default function ContactWidget() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, wire to email provider / form service
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); setOpen(false); }, 3000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Card */}
      <div
        className={`transition-all duration-300 origin-bottom-right ${
          open
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-90 pointer-events-none'
        }`}
      >
        <div className="bg-[#141414] border border-white/10 rounded-2xl shadow-2xl w-80 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-green/20 to-brand-yellow/10 px-5 py-4 flex items-center justify-between border-b border-white/5">
            <div>
              <p className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}>
                SEND US A MESSAGE
              </p>
              <p className="text-white/40 text-xs mt-0.5">We'll get back to you quickly.</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="px-5 py-5">
            {submitted ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-sm">Message sent!</p>
                <p className="text-white/40 text-xs mt-1">We'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-brand-green transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-brand-green transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/50 text-xs mb-1 block">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="How can we help?"
                    className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-brand-green transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-green text-black font-bold py-2.5 rounded-lg text-sm uppercase tracking-wider hover:brightness-110 transition-all active:scale-95"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FAB Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 bg-brand-green text-black font-bold px-5 py-3 rounded-full shadow-lg hover:brightness-110 transition-all active:scale-95 glow-green"
        style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.06em' }}
        aria-label="Contact us"
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        <span className="text-sm">{open ? 'Close' : 'Contact Us'}</span>
      </button>
    </div>
  );
}
