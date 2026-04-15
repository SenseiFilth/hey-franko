# Auth Decision — Hey Frank-O

## Chosen approach: Supabase Auth (directly)

When the site needs user login, use **Supabase Auth** directly.
Do NOT add NextAuth — it adds a session layer on top of an auth layer unnecessarily.

Supabase Auth handles:
- Google OAuth
- Facebook OAuth
- Email + password
- Session management (JWTs via cookies, server-side)
- User table in your existing Supabase project

## Setup (when you're ready)

```bash
npm install @supabase/supabase-js @supabase/ssr
```

### 1. Create a Supabase client for server components

```js
// lib/supabase/server.js
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) =>
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          ),
      },
    }
  );
}
```

### 2. Create a Supabase client for browser components

```js
// lib/supabase/client.js
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
```

### 3. Protect routes in middleware.js

```js
// Uncomment this block in middleware.js when auth is ready:
import { createServerClient } from '@supabase/ssr';

export async function middleware(request) {
  const supabase = createServerClient(/* ... */);
  const { data: { session } } = await supabase.auth.getSession();

  const PROTECTED = ['/admin', '/dashboard', '/account'];
  const isProtected = PROTECTED.some(p => request.nextUrl.pathname.startsWith(p));

  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

### 4. Add OAuth providers in Supabase dashboard

Supabase Dashboard → Authentication → Providers → Enable Google + Facebook
Add redirect URL: `https://heyfranko.com/auth/callback`

### 5. Add auth callback route

```js
// app/auth/callback/route.js
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(origin);
}
```

## Env vars needed

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # server-side only, never NEXT_PUBLIC_
```

## Why not NextAuth?

- NextAuth + Supabase adapter = two auth systems. NextAuth manages the session,
  Supabase stores it. You'd need to configure both and keep them in sync.
- Supabase Auth alone handles everything NextAuth would and integrates directly
  with your Supabase DB, RLS policies, and storage in one service.
