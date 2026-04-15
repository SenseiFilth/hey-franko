/**
 * POST /api/quote
 *
 * Get a Quote form handler.
 * Pipeline: rate limit → honeypot → sanitize → validate → send email
 */

import { NextResponse } from 'next/server';
import { sanitizeBody, isValidEmail, isValidPhone, isBot } from '@/lib/sanitize';
import { checkRateLimit, getIP } from '@/lib/rateLimit';

export const runtime = 'nodejs';

// Allowlist prevents arbitrary strings being injected into the email body
const ALLOWED_SERVICES = new Set([
  'Backline Rentals',
  'A/V & Lighting',
  'DJ & DJ Setup Services',
  'Audio Engineering Services',
  'Other',
]);

export async function POST(request) {
  // 1. Rate limit — 2 quotes per IP per 15 minutes
  const ip = getIP(request);
  const { success } = checkRateLimit(`quote:${ip}`, { limit: 2, windowMs: 15 * 60_000 });

  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before submitting again.' },
      { status: 429, headers: { 'Retry-After': '900' } }
    );
  }

  // 2. Parse
  let raw;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // 3. Honeypot
  if (isBot(raw.website)) {
    return NextResponse.json({ ok: true });
  }

  // 4. Sanitize
  const body = sanitizeBody(raw);

  // Validate services array independently — must be from the allowlist
  const services = (Array.isArray(raw.services) ? raw.services : [])
    .filter((s) => typeof s === 'string' && ALLOWED_SERVICES.has(s))
    .slice(0, 5);

  // 5. Validate required fields
  const errors = {};
  if (!body.firstName) errors.firstName = 'First name required.';
  if (!body.lastName) errors.lastName = 'Last name required.';
  if (!isValidPhone(body.phone)) errors.phone = 'A valid phone number is required.';
  if (!body.location) errors.location = 'Event location required.';
  if (body.email && !isValidEmail(body.email)) errors.email = 'Invalid email format.';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Validation failed.', fields: errors }, { status: 422 });
  }

  // 6. Build and send email
  const to = process.env.CONTACT_EMAIL ?? 'contact@HeyFranko.com';

  const emailBody = [
    '=== QUOTE REQUEST ===',
    `Name:     ${body.firstName} ${body.lastName}`,
    `Email:    ${body.email || 'not provided'}`,
    `Phone:    ${body.phone}`,
    `Location: ${body.location}`,
    `Event:    ${body.eventType || 'not specified'}`,
    `Budget:   ${body.budget || 'not specified'}`,
    `Services: ${services.join(', ') || 'none selected'}`,
    `Message:  ${body.message || 'none'}`,
  ].join('\n');

  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: 'Hey Frank-O Website <noreply@heyfranko.com>',
        to,
        replyTo: body.email || undefined,
        subject: `Quote Request — ${body.firstName} ${body.lastName}`,
        text: emailBody,
      });
    } catch (err) {
      console.error('[quote] send failed:', err?.message);
      return NextResponse.json({ error: 'Failed to send. Please try again.' }, { status: 500 });
    }
  } else {
    console.log('[quote] no RESEND_API_KEY —\n', emailBody);
  }

  return NextResponse.json({ ok: true });
}
