/**
 * POST /api/contact
 *
 * Handles the Contact Widget form submission.
 * Pipeline: rate limit → bot check → sanitize → validate → send email
 *
 * Email provider: Resend (https://resend.com — free tier: 100 emails/day)
 * Install when ready: npm install resend
 */

import { NextResponse } from 'next/server';
import { sanitizeBody, isValidEmail, isBot } from '@/lib/sanitize';
import { checkRateLimit, getIP } from '@/lib/rateLimit';

export const runtime = 'edge'; // runs on Vercel Edge — fastest cold start

export async function POST(request) {
  // ── 1. Rate limit: 3 submissions per IP per 10 minutes ────────────────
  const ip = getIP(request);
  const limit = await checkRateLimit(`contact:${ip}`, { limit: 3, windowMs: 10 * 60_000 });

  if (!limit.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a few minutes.' },
      { status: 429, headers: { 'Retry-After': '600' } }
    );
  }

  // ── 2. Parse body ──────────────────────────────────────────────────────
  let raw;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // ── 3. Honeypot check ─────────────────────────────────────────────────
  //    The form includes a hidden <input name="website"> field.
  //    Bots fill it; real users never see or touch it.
  if (isBot(raw.website)) {
    // Return 200 to not tip off bots that they were caught
    return NextResponse.json({ ok: true });
  }

  // ── 4. Sanitize ────────────────────────────────────────────────────────
  const body = sanitizeBody(raw);

  // ── 5. Validate required fields ────────────────────────────────────────
  const errors = {};
  if (!body.name || body.name.length < 2) errors.name = 'Name is required.';
  if (!isValidEmail(body.email)) errors.email = 'A valid email is required.';
  if (!body.message || body.message.length < 5) errors.message = 'Message is required.';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Validation failed.', fields: errors }, { status: 422 });
  }

  // ── 6. Send email ──────────────────────────────────────────────────────
  const contactEmail = process.env.CONTACT_EMAIL ?? 'contact@HeyFranko.com';

  // ── Resend (production) ───────────────────────────────────────────────
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: 'Hey Frank-O Website <noreply@heyfranko.com>',
        to: contactEmail,
        replyTo: body.email,
        subject: `New message from ${body.name}`,
        text: [
          `Name: ${body.name}`,
          `Email: ${body.email}`,
          `Message:\n${body.message}`,
          `---`,
          `Submitted from: ${request.headers.get('referer') ?? 'unknown'}`,
          `IP: ${ip}`,
        ].join('\n'),
      });
    } catch (err) {
      console.error('[contact] email send failed:', err);
      return NextResponse.json({ error: 'Failed to send message. Try again.' }, { status: 500 });
    }
  } else {
    // Dev: just log (no email sent)
    console.log('[contact] DEV submission — no RESEND_API_KEY set:', body);
  }

  return NextResponse.json({ ok: true });
}
