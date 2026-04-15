'use client';
import { useState } from 'react';
import Link from 'next/link';

const SERVICE_TYPES = [
  'Sound system tuning',
  'Lighting calibration',
  'Livestream optimization',
  'Troubleshooting / Diagnostics',
  'Training (volunteers / staff)',
  'Other',
];

function TimePicker({ label }) {
  return (
    <div>
      <label className="text-white/40 text-xs mb-1.5 block">{label}</label>
      {/* Stack HH : MM | AM/PM on a single row using a grid so nothing overflows */}
      <div className="grid grid-cols-[1fr_auto_1fr_1fr] gap-1.5 items-center">
        <input
          placeholder="HH"
          maxLength={2}
          className="form-input text-center text-sm min-w-0"
          style={{ fontSize: '16px' }}
        />
        <span className="text-white/40 text-sm font-bold">:</span>
        <input
          placeholder="MM"
          maxLength={2}
          className="form-input text-center text-sm min-w-0"
          style={{ fontSize: '16px' }}
        />
        <select
          className="form-input text-sm min-w-0"
          style={{ fontSize: '16px' }}
        >
          <option>AM</option>
          <option>PM</option>
        </select>
      </div>
    </div>
  );
}

function TimeSlot({ label }) {
  return (
    <div className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5">
      <p className="text-[#39d353] text-xs uppercase tracking-widest mb-3 font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
        {label}
      </p>
      {/* Date row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <input placeholder="Month" className="form-input text-sm" style={{ fontSize: '16px' }} />
        <input placeholder="Day" className="form-input text-sm" style={{ fontSize: '16px' }} />
        <input placeholder="Year" className="form-input text-sm" style={{ fontSize: '16px' }} />
      </div>
      {/* Time pickers — stacked on mobile, side-by-side on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <TimePicker label="Start" />
        <TimePicker label="End" />
      </div>
    </div>
  );
}

export default function BookConsultationPage() {
  const [form, setForm] = useState({
    fullName: '', org: '', email: '', phone: '', location: '',
    services: [], ownsSystem: '', budget: '', description: '',
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
        <div className="mb-12 text-center">
          <Link href="/" className="text-brand-green text-sm uppercase tracking-widest hover:text-white transition-colors mb-6 inline-flex items-center gap-2"
            style={{ fontFamily: 'var(--font-display)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-white font-black uppercase mt-4"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 6vw, 4rem)' }}>
            Book a <span className="gradient-text">Consultation</span>
          </h1>
          <p className="text-white/50 mt-3">
            Request a site visit or consultation and we'll assess your space and technical needs firsthand.
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
              Request Submitted!
            </h2>
            <p className="text-white/50 mb-6">We'll confirm your preferred time slot and be in touch shortly.</p>
            <Link href="/" className="btn-primary">Back to Home</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-brand-card border border-white/5 rounded-2xl p-8 flex flex-col gap-6">
            {/* Name & Org */}
            <div>
              <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Full Name *</label>
              <input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Your full name" className="form-input" />
            </div>
            <div>
              <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Organization / Venue Name *</label>
              <input name="org" value={form.org} onChange={handleChange} required placeholder="Company or venue name" className="form-input" />
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
              <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Service Location *</label>
              <input name="location" value={form.location} onChange={handleChange} required placeholder="Address or venue location" className="form-input" />
            </div>

            {/* Service Types */}
            <div>
              <label className="text-white/60 text-xs uppercase tracking-wider mb-3 block">Type of Service Needed (check all that apply)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SERVICE_TYPES.map((svc) => (
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

            {/* Own System? */}
            <div>
              <label className="text-white/60 text-xs uppercase tracking-wider mb-3 block">Do you currently own your system?</label>
              <div className="flex gap-4">
                {['Yes', 'No', 'N/A'].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        form.ownsSystem === opt ? 'border-brand-green' : 'border-white/20 group-hover:border-brand-green/50'
                      }`}
                      onClick={() => setForm({ ...form, ownsSystem: opt })}
                    >
                      {form.ownsSystem === opt && <div className="w-2.5 h-2.5 rounded-full bg-brand-green" />}
                    </div>
                    <span className="text-white/70 text-sm" onClick={() => setForm({ ...form, ownsSystem: opt })}>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Preferred Time Slots */}
            <div>
              <label className="text-white/60 text-xs uppercase tracking-wider mb-3 block">Preferred Appointment Times</label>
              <div className="flex flex-col gap-3">
                <TimeSlot label="Option 1" />
                <TimeSlot label="Option 2" />
                <TimeSlot label="Option 3" />
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Budget Range for Consultation</label>
              <select name="budget" value={form.budget} onChange={handleChange} className="form-input">
                <option value="">Select a range</option>
                <option>Under $200</option>
                <option>$200 – $500</option>
                <option>$500 – $1,000</option>
                <option>$1,000+</option>
                <option>Not sure yet</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="text-white/60 text-xs uppercase tracking-wider mb-2 block">Describe the issue or what you need</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Tell us about your setup, any issues you're experiencing, or what you're looking to achieve..." className="form-input resize-none" />
            </div>

            <button type="submit" className="btn-primary w-full glow-green mt-2">
              Submit Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
