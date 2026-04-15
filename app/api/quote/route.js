/**
 * POST /api/quote
 *
 * Handles the Get a Quote form submission.
 * Pipeline: rate limit → bot check → sanitize → validate → email + optional DB log
 */

import { NextResponse } from 'next/server';
import { sanitizeBody, isValidEmail, isValidPhone, isBot } from '@/lib/sanitize';
import { checkRateLimit, getIP } from '@/lib/rateLimit';

export const runtime = 'edge';

// Allowed service values — prevents arbitrary strings being injected into emails
const VALID_SERVICES = new Set([
  'Backline Rentals',
  'A/V & Lighting',
  'DJ & DJ Setup Services',
  'Audio Engineering Services',
  'Other',
]);

export async function POST(request) {
  // ── 1. Rate limit: 2 quote requests per IP per 15 minutes ─────────────
  const ip = getIP(request);
  const limit = await checkRateLimit(`quote:${ip}`, { limit: 2, windowMs: 15 * 60_000 });

  if (!limit.success) {
    return NextResponse.json(
      { error: 'Too many quote requests. Please wait before submitting again.' },
      { status: 429, headers: { 'Retry-After': '900' } }
    );
  }

  // ── 2. Parse ───────────────────────────────────────────────────────────
  let raw;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // ── 3. Honeypot ────────────────────────────────────────────────────────
  if (isBot(raw.website)) {
    return NextResponse.json({ ok: true });
  }

  // ── 4. Sanitize ────────────────────────────────────────────────────────
  const body = sanitizeBody(raw);

  // ── 5. Validate services array independently (not run through sanitizeBody) ──
  const rawServices = Array.isArray(raw.services) ? raw.services : [];
  const services = rawServices
    .filter((s) => typeof s === 'string' && VALID_SERVICES.has(s))
    .slice(0, 5); // max 5 selections

  // ── 6. Validate required fields ────────────────────────────────────────
  const errors = {};
  if (!body.firstName || body.firstName.length < 1) errors.firstName = 'First name required.';
  if (!body.lastName || body.lastName.length < 1) errors.lastName = 'Last name required.';
  if (!isValidPhone(body.phone)) errors.phone = 'A valid phone number is required.';
  if (!body.location || body.location.length < 3) errors.location = 'Event location required.';

  // Email optional on quote form but validate format if provided
  if (body.email && !isValidEmail(body.email)) errors.email = 'Invalid email format.';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Validation failed.', fields: errors }, { status: 422 });
  }

  // ── 7. Build email content ─────────────────────────────────────────────
  const contactEmail = process.env.CONTACT_EMAIL ?? 'contact@HeyFranko.com';

  const emailText = [
    '=== NEW QUOTE REQUEST ===',
    '',
    `Name:      ${body.firstName} ${body.lastName}`,
    `Email:     ${body.email || 'not provided'}`,
    `Phone:     ${body.phone}`,
    `Location:  ${body.location}`,
    `Event:     ${body.eventType || 'not specified'}`,
    `Budget:    ${body.budget || 'not specified'}`,
    `Services:  ${services.length ? services.join(', ') : 'none selected'}`,
    '',
    `Message:\n${body.message || 'none'}`,
    '',
    '---',
    `Submitted: ${new Date().toUTCString()}`,
    `IP: ${ip}`,
  ].join('\n');

  // ── 8. Send email ──────────────────────────────────────────────────────
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: 'Hey Frank-O Website <noreply@heyfranko.com>',
        to: contactEmail,
        replyTo: body.email || undefined,
        subject: `Quote Request — ${body.firstName} ${body.lastName}`,
        text: emailText,
      });
    } catch (err) {
      console.error('[quote] email send failed:', err);
      return NextResponse.json({ error: 'Failed to send. Please try again.' }, { status: 500 });
    }
  } else {
    console.log('[quote] DEV submission:\n', emailText);
  }

  return NextResponse.json({ ok: true });
}
