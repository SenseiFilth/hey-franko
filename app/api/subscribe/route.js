/**
 * POST /api/subscribe
 *
 * Newsletter opt-in handler.
 * Pipeline: rate limit → honeypot → validate → log consent
 *
 * When you add a database (Supabase recommended), store the email + consent
 * timestamp here. For now, submissions are confirmed to the user and logged.
 * Explicit consent is validated server-side for GDPR compliance.
 */

import { NextResponse } from 'next/server';
import { sanitizeBody, isValidEmail, isBot } from '@/lib/sanitize';
import { checkRateLimit, getIP } from '@/lib/rateLimit';

export const runtime = 'nodejs';

export async function POST(request) {
  // 1. Rate limit — 1 per IP per 5 minutes
  const ip = getIP(request);
  const { success } = checkRateLimit(`subscribe:${ip}`, { limit: 1, windowMs: 5 * 60_000 });

  if (!success) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
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

  // 4. Validate
  const body = sanitizeBody(raw);

  if (!isValidEmail(body.email)) {
    return NextResponse.json({ error: 'A valid email address is required.' }, { status: 422 });
  }

  // Explicit consent required — GDPR Article 7
  if (raw.consent !== true) {
    return NextResponse.json({ error: 'Consent is required to subscribe.' }, { status: 422 });
  }

  // 5. Log for now — replace this block with your DB write when Supabase is set up
  //
  //    Supabase example (when ready):
  //
  //    import { createClient } from '@supabase/supabase-js';
  //    const supabase = createClient(
  //      process.env.NEXT_PUBLIC_SUPABASE_URL,
  //      process.env.SUPABASE_SERVICE_ROLE_KEY
  //    );
  //    await supabase.from('email_subscribers').upsert({
  //      email: body.email,
  //      consent: true,
  //      consent_timestamp: new Date().toISOString(),
  //      source: 'website_footer',
  //    }, { onConflict: 'email' });
  //
  console.log('[subscribe] new opt-in:', body.email, '| consent=true | ip:', ip);

  return NextResponse.json({ ok: true });
}
