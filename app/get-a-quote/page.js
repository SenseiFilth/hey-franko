'use client';
import { useState } from 'react';
import Link from 'next/link';

const SERVICES_OPTIONS = [
  'Backline Rentals',
  'A/V & Lighting',
  'DJ & DJ Setup Services',
  'Audio Engineering Services',
  'Other',
];

export default function GetAQuotePage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    location: '', services: [], eventType: '', budget: '', message: '',
    date: { month: '', day: '', year: '' },
    startTime: { hours: '', minutes: '', period: 'AM' },
    endTime: { hours: '', minutes: '', period: 'AM' },
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleService = (svc) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(svc)
        ? f.services.filter((s) => s !== svc)
        : [...f.services, svc],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-brand-black pt-28 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <Link href="/" className="text-brand-green text-sm uppercase tracking-widest hover:text-white transition-colors mb-6 inline-flex items-center gap-2"
            style={{ fontFamily: 'var(--font-display)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-white font-black uppercase mt-4"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            Get a <span className="gradient-text">Quote</span>
          </h1>
          <p className="text-white/50 mt-3">
            Fill out the form below and we'll get back to you with a custom quote tailored to your event.
          </p>
        </div>

        {submitted ? (
          <div className="bg-brand-card border border-brand-green/30 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-4 glow-green">
              <svg className="w-8 h-8 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-white font-bold text-2xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Quote Submitted!
            </h2>
            <p className="text-white/50 mb-6">We've received your request and will be in touch shortly.</p>
            <Link href="/" className="btn-primary">Back to Home</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-brand-card border border-white/5 rounded-2xl p-8 flex flex-col gap-6">
            {/* Name Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">First Name *</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} required placeholder="First name" className="form-input" />
              </div>
              <div>
                <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Last Name *</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Last name" className="form-input" />
              </div>
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="form-input" />
              </div>
              <div>
                <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Phone *</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="(XXX) XXX-XXXX" className="form-input" />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Event / Service Location *</label>
              <input name="location" value={form.location} onChange={handleChange} required placeholder="Venue address or city" className="form-input" />
            </div>

            {/* Services */}
            <div>
              <label className="text-white/60 text-xs uppercase tracking-wider mb-3 block">Services Interested In (check all that apply)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SERVICES_OPTIONS.map((svc) => (
                  <label key={svc} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150 ${
                        form.services.includes(svc)
                          ? 'bg-brand-green border-brand-green'
                          : 'border-white/20 group-hover:border-brand-green/50'
                      }`}
                      onClick={() => toggleService(svc)}
                    >
                      {form.services.includes(svc) && (
                        <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-white/70 text-sm group-hover:text-white transition-colors" onClick={() => toggleService(svc)}>
                      {svc}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Event Type */}
            <div>
              <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Type of Event</label>
              <input name="eventType" value={form.eventType} onChange={handleChange} placeholder="e.g. Wedding, Concert, Corporate event..." className="form-input" />
            </div>

            {/* Event Date & Times */}
            <div>
              <label className="text-white/60 text-xs uppercase tracking-wider mb-3 block">Event Date & Time</label>
              <div className="grid grid-cols-3 gap-3 mb-3">
                <input placeholder="Month" className="form-input" onChange={(e) => setForm(f => ({ ...f, date: { ...f.date, month: e.target.value } }))} />
                <input placeholder="Day" className="form-input" onChange={(e) => setForm(f => ({ ...f, date: { ...f.date, day: e.target.value } }))} />
                <input placeholder="Year" className="form-input" onChange={(e) => setForm(f => ({ ...f, date: { ...f.date, year: e.target.value } }))} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/40 text-xs mb-1.5 block">Start Time</label>
                  <div className="flex gap-2">
                    <input placeholder="HH" maxLength={2} className="form-input w-16 text-center" />
                    <span className="text-white/40 self-center">:</span>
                    <input placeholder="MM" maxLength={2} className="form-input w-16 text-center" />
                    <select className="form-input w-16">
                      <option>AM</option><option>PM</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-white/40 text-xs mb-1.5 block">End Time</label>
                  <div className="flex gap-2">
                    <input placeholder="HH" maxLength={2} className="form-input w-16 text-center" />
                    <span className="text-white/40 self-center">:</span>
                    <input placeholder="MM" maxLength={2} className="form-input w-16 text-center" />
                    <select className="form-input w-16">
                      <option>AM</option><option>PM</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">What is your budget?</label>
              <select name="budget" value={form.budget} onChange={handleChange} className="form-input">
                <option value="">Select a range</option>
                <option>Under $500</option>
                <option>$500 – $1,000</option>
                <option>$1,000 – $2,500</option>
                <option>$2,500 – $5,000</option>
                <option>$5,000+</option>
                <option>Not sure yet</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Tell us about your event</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Share any additional details about your event or what you need..." className="form-input resize-none" />
            </div>

            <button type="submit" className="btn-primary w-full glow-green mt-2">
              Submit Quote Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
