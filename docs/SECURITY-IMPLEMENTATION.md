# Hey Frank-O — Security Implementation Plan

> Ordered by urgency. "Do Today" items require no new accounts or installs.
> Everything targets Vercel + Next.js 14 App Router.

---

## DO TODAY (zero external dependencies)

These are already committed to the repo:

| File | What it does |
|------|-------------|
| `next.config.js` | CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, HTTPS redirect |
| `middleware.js` | Edge route guard skeleton — protects `/admin`, `/dashboard`, `/account` |
| `public/robots.txt` | Blocks `/login`, `/admin`, `/api/` from search indexing |
| `lib/sanitize.js` | HTML strip, CRLF removal, max-length enforcement, email/phone validation |
| `lib/rateLimit.js` | In-memory limiter (dev) + Upstash Redis drop-in (prod) |
| `app/api/contact/route.js` | Contact form: rate limit + honeypot + sanitize + validate |
| `app/api/quote/route.js` | Quote form: same pipeline + services allowlist |
| `app/api/subscribe/route.js` | Subscribe: rate limit + consent check + Supabase upsert |
| `.env.example` | All required env vars documented |
| `docs/supabase-schema.sql` | Full DB schema + RLS policies |
| `docs/auth-setup.js` | NextAuth v5 config ready to activate |

---

## DO THIS WEEK (requires free account signups)

### Step 1 — Wire up Resend (email delivery)

```bash
npm install resend
```

1. Sign up at resend.com (free — 100 emails/day)
2. Add your domain `heyfranko.com` → verify DNS records
3. Create an API key → add to Vercel env vars as `RESEND_API_KEY`
4. The API routes at `/api/contact`, `/api/quote` will auto-detect and use it

**That's it.** Forms will now actually send emails. No code changes needed.

---

### Step 2 — Set up Supabase (database + auth)

```bash
npm install @supabase/supabase-js
```

1. Create project at supabase.com (free tier: 500MB DB, 50,000 MAU)
2. Go to **SQL Editor** → paste entire `docs/supabase-schema.sql` → Run
3. Go to **Settings → API** → copy your keys into `.env.local` and Vercel env vars:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

**Test RLS is on:** In Supabase Table Editor, try reading `quote_requests` as anon — it should return 0 rows.

---

### Step 3 — Wire up Upstash Redis (production rate limiting)

```bash
npm install @upstash/ratelimit @upstash/redis
```

1. Create account at upstash.com → **Create Database** → choose region closest to your Vercel region (US East is default)
2. Go to **REST API** → copy URL and token into Vercel env vars:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

Rate limiting is already implemented in `lib/rateLimit.js` — it detects these env vars and switches from in-memory to Redis automatically.

---

### Step 4 — Add honeypot fields to all forms

Add this hidden input to `ContactWidget.js`, `get-a-quote/page.js`, and `book-consultation/page.js`:

```jsx
{/* Honeypot — hidden from real users, bots fill it */}
<input
  type="text"
  name="website"
  autoComplete="off"
  tabIndex={-1}
  aria-hidden="true"
  style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
/>
```

When the form submits, include `website: formData.website` in the POST body.
The API routes already check `isBot(raw.website)` and silently discard bot submissions.

---

### Step 5 — Wire forms to their API routes

Update `ContactWidget.js` `handleSubmit`:

```js
const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...form, website: '' }), // honeypot always empty for real users
  });
  if (res.ok) setSubmitted(true);
  else setError('Something went wrong. Please try again.');
};
```

Same pattern for `get-a-quote` → `/api/quote` and subscribe form → `/api/subscribe`.

---

## DO BEFORE LAUNCH (2–3 weeks out)

### Step 6 — Activate NextAuth (auth)

```bash
npm install next-auth@beta @auth/supabase-adapter
```

1. Copy `docs/auth-setup.js` to `auth.js` in the project root
2. Create `app/api/auth/[...nextauth]/route.js`:
   ```js
   import { handlers } from '@/auth';
   export const { GET, POST } = handlers;
   ```
3. Register OAuth apps:
   - **Google:** console.cloud.google.com → Credentials → OAuth 2.0 → add redirect URI: `https://heyfranko.com/api/auth/callback/google`
   - **Facebook:** developers.facebook.com → App → Facebook Login → Valid OAuth redirect: `https://heyfranko.com/api/auth/callback/facebook`
4. Add all auth env vars to Vercel (see `.env.example`)
5. Uncomment the auth block in `middleware.js`

---

### Step 7 — Update login page to use NextAuth

Replace the stub form in `app/login/page.js` with real NextAuth calls:

```js
'use client';
import { signIn } from 'next-auth/react';

// Google button:
<button onClick={() => signIn('google', { callbackUrl: '/' })}>
  Sign in with Google
</button>

// Facebook:
<button onClick={() => signIn('facebook', { callbackUrl: '/' })}>
  Sign in with Facebook
</button>

// Email form submit:
const handleEmailSubmit = async (e) => {
  e.preventDefault();
  const result = await signIn('credentials', {
    email, password,
    redirect: false,
  });
  if (result?.error) setError('Invalid credentials.');
  else router.push('/');
};
```

---

### Step 8 — Protect admin routes (when you build them)

The middleware already protects `/admin`. When you add an admin panel:

```js
// In middleware.js — add admin-only check:
if (pathname.startsWith('/admin') && token?.role !== 'admin') {
  return Response.redirect(new URL('/', request.url));
}
```

Promote a user to admin via Supabase SQL Editor:
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'your@email.com';
```

---

## MINIMUM VIABLE PRODUCTION CHECKLIST

### Must-have before accepting real users

- [x] Security headers (CSP, X-Frame-Options, etc.) — **done**
- [x] robots.txt — **done**
- [x] Input sanitization on all API routes — **done**
- [x] Rate limiting on all form endpoints — **done**
- [x] Honeypot anti-bot on all forms — **add this week**
- [ ] Resend wired — email actually sends
- [ ] Supabase schema deployed with RLS verified
- [ ] All env vars set in Vercel (not just .env.local)
- [ ] Legal docs reviewed by an actual lawyer (Privacy Policy, T&C)
- [ ] Privacy Policy contact email filled: `contact@HeyFranko.com`
- [ ] NEXTAUTH_SECRET generated and set in Vercel
- [ ] Google/Facebook OAuth redirect URIs registered for production domain
- [ ] Test form submissions end-to-end on production URL
- [ ] Verify RLS: confirm anon users cannot read quote_requests in Supabase

### Nice-to-have (post-launch)

- [ ] Upstash Redis for persistent rate limiting
- [ ] Automated GDPR deletion endpoint
- [ ] Email confirmation sent to quote/consultation submitters
- [ ] Booking sync from Bookable → Supabase
- [ ] Admin dashboard to manage leads
- [ ] Sentry error tracking (`npm install @sentry/nextjs`)

---

## ARCHITECTURE DIAGRAM (text)

```
Browser
  │
  ├─ GET  /*              → Next.js Static/SSR pages (Vercel Edge)
  │                            └─ middleware.js (auth guard, security headers)
  │
  ├─ POST /api/contact    → Edge Function
  ├─ POST /api/quote      │    └─ rateLimit.js (Upstash Redis)
  ├─ POST /api/subscribe  │    └─ sanitize.js
  │                       │    └─ Resend (email to Frank-O)
  │                       │    └─ Supabase (log submission)
  │
  ├─ GET/POST /api/auth/* → NextAuth v5 handlers
  │                            └─ Google OAuth
  │                            └─ Facebook OAuth
  │                            └─ Supabase Credentials
  │
  └─ Bookable.io          → External iframe/redirect (no API integration yet)

Database: Supabase (PostgreSQL)
  ├─ auth.users           (managed by Supabase — never touch directly)
  ├─ profiles             (RLS: users see own, admins see all)
  ├─ quote_requests       (RLS: anon insert only, staff read/update)
  ├─ consultations        (same)
  ├─ email_subscribers    (RLS: admin only)
  └─ bookings             (RLS: users see own, staff manage)
```

---

## BOOKABLE INTEGRATION SECURITY NOTES

Until Bookable exposes a proper API:
- Link out to Bookable with `target="_blank" rel="noopener noreferrer"` (already done)
- Do NOT embed Bookable in an iframe unless you verify their CSP allows it
- Do NOT pass user tokens or PII in URL params to Bookable
- When they provide an API key: store it in `BOOKABLE_API_KEY` (server-side only, never `NEXT_PUBLIC_`)
- Validate all webhook payloads from Bookable with an HMAC signature before updating your DB
