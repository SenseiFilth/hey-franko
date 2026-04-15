/**
 * POST /api/contact
 *
 * Contact widget form handler.
 * Pipeline: rate limit → honeypot → sanitize → validate → send email
 *
 * Email: when you're ready, run `npm install resend` and add RESEND_API_KEY
 * to your Vercel environment variables. Until then, submissions are logged.
 */

import { NextResponse } from 'next/server';
import { sanitizeBody, isValidEmail, isBot } from '@/lib/sanitize';
import { checkRateLimit, getIP } from '@/lib/rateLimit';

// Node.js runtime — required for module-level state (rate limiter Map)
// and for reliable package compatibility.
export const runtime = 'nodejs';

export async function POST(request) {
  // 1. Rate limit — 3 per IP per 10 minutes
  const ip = getIP(request);
  const { success } = checkRateLimit(`contact:${ip}`, { limit: 3, windowMs: 10 * 60_000 });

  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a few minutes.' },
      { status: 429, headers: { 'Retry-After': '600' } }
    );
  }

  // 2. Parse body
  let raw;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // 3. Honeypot — bots fill hidden fields, humans don't
  if (isBot(raw.website)) {
    return NextResponse.json({ ok: true }); // silent discard
  }

  // 4. Sanitize all string fields
  const body = sanitizeBody(raw);

  // 5. Validate required fields
  const errors = {};
  if (!body.name || body.name.length < 2) errors.name = 'Name is required.';
  if (!isValidEmail(body.email)) errors.email = 'A valid email is required.';
  if (!body.message || body.message.length < 5) errors.message = 'Message is required.';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Validation failed.', fields: errors }, { status: 422 });
  }

  // 6. Send email
  const to = process.env.CONTACT_EMAIL ?? 'contact@HeyFranko.com';

  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: 'Hey Frank-O Website <noreply@heyfranko.com>',
        to,
        replyTo: body.email,
        subject: `New message from ${body.name}`,
        text: [
          `Name:    ${body.name}`,
          `Email:   ${body.email}`,
          `Message: ${body.message}`,
        ].join('\n'),
      });
    } catch (err) {
      console.error('[contact] send failed:', err?.message);
      return NextResponse.json({ error: 'Failed to send. Please try again.' }, { status: 500 });
    }
  } else {
    // No API key set — log locally so the form still "works" during dev
    console.log('[contact] no RESEND_API_KEY — would send to', to, body);
  }

  return NextResponse.json({ ok: true });
}
