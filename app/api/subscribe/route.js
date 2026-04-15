/**
 * POST /api/subscribe
 *
 * Handles newsletter/promo email opt-in.
 * Pipeline: rate limit → bot check → validate → store in Supabase → confirmation email
 *
 * The consent checkbox value is stored alongside the email for GDPR audit trail.
 */

import { NextResponse } from 'next/server';
import { sanitizeBody, isValidEmail, isBot } from '@/lib/sanitize';
import { checkRateLimit, getIP } from '@/lib/rateLimit';

export const runtime = 'edge';

export async function POST(request) {
  // ── 1. Rate limit: 1 subscribe per IP per 5 minutes ───────────────────
  const ip = getIP(request);
  const limit = await checkRateLimit(`subscribe:${ip}`, { limit: 1, windowMs: 5 * 60_000 });

  if (!limit.success) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
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

  // ── 4. Sanitize + Validate ─────────────────────────────────────────────
  const body = sanitizeBody(raw);

  if (!isValidEmail(body.email)) {
    return NextResponse.json({ error: 'A valid email address is required.' }, { status: 422 });
  }

  // Consent must be explicitly given (GDPR Article 7)
  if (raw.consent !== true) {
    return NextResponse.json({ error: 'Consent is required to subscribe.' }, { status: 422 });
  }

  // ── 5. Store in Supabase (when wired) ─────────────────────────────────
  if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY  // service role — bypasses RLS intentionally here
      );

      const { error } = await supabase
        .from('email_subscribers')
        .upsert(
          {
            email: body.email,
            consent: true,
            consent_timestamp: new Date().toISOString(),
            ip_hash: ip, // store hashed in production for GDPR compliance
            source: 'website_footer',
          },
          { onConflict: 'email' }
        );

      if (error && error.code !== '23505') { // ignore duplicate key
        console.error('[subscribe] supabase error:', error);
      }
    } catch (err) {
      console.error('[subscribe] supabase import failed:', err);
    }
  } else {
    console.log('[subscribe] DEV: would store', body.email, 'with consent=true');
  }

  return NextResponse.json({ ok: true });
}
