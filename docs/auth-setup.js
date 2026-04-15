/**
 * ============================================================
 * AUTH SETUP — Hey Frank-O
 * ============================================================
 * Stack: NextAuth v5 (Auth.js) + Supabase adapter
 *
 * Install:
 *   npm install next-auth@beta @auth/supabase-adapter @supabase/supabase-js
 *
 * Then rename this file to: auth.js (project root)
 * And create: app/api/auth/[...nextauth]/route.js (see bottom of file)
 * ============================================================
 */

import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import Credentials from 'next-auth/providers/credentials';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import { createClient } from '@supabase/supabase-js';

// Service-role client for NextAuth adapter (bypasses RLS — only used server-side)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  // ── Supabase adapter stores sessions/accounts in your DB ──────────────
  adapter: SupabaseAdapter(supabase),

  // ── Providers ─────────────────────────────────────────────────────────
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Request minimum scopes — do NOT add 'profile' or 'openid' extras
      authorization: {
        params: { scope: 'openid email' },
      },
    }),

    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),

    // Email + password via Credentials (uses Supabase auth under the hood)
    Credentials({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Use Supabase auth to verify — do NOT store passwords yourself
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (error || !data.user) return null;

        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.full_name ?? null,
        };
      },
    }),
  ],

  // ── Session strategy ───────────────────────────────────────────────────
  // JWT is stateless and works on Vercel Edge. Database sessions require
  // an extra DB lookup per request — fine for low traffic, but JWT is faster.
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 }, // 30 days

  // ── Callbacks ──────────────────────────────────────────────────────────
  callbacks: {
    // Attach role from DB to the JWT so middleware can read it
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // Fetch role from profiles table
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        token.role = data?.role ?? 'customer';
      }
      return token;
    },

    // Expose role + id on the session object (client-readable)
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },

  // ── Pages ──────────────────────────────────────────────────────────────
  pages: {
    signIn: '/login',
    error: '/login',        // auth errors redirect here with ?error=
  },

  // ── Security ───────────────────────────────────────────────────────────
  // NEXTAUTH_SECRET is automatically used for JWT signing + CSRF tokens.
  // Generate one: openssl rand -base64 32
  secret: process.env.NEXTAUTH_SECRET,

  // Disable debug in production
  debug: process.env.NODE_ENV === 'development',
});


// ============================================================
// app/api/auth/[...nextauth]/route.js
// Create this file with exactly these contents:
// ============================================================
//
// import { handlers } from '@/auth';
// export const { GET, POST } = handlers;
//
// ============================================================


// ============================================================
// Updated middleware.js — wire auth into route guard
// Replace the commented block in middleware.js with:
// ============================================================
//
// import { auth } from '@/auth';
//
// export default auth((request) => {
//   const { pathname } = request.nextUrl;
//   const isAuthed = !!request.auth;
//   const PROTECTED = ['/admin', '/dashboard', '/account'];
//
//   if (PROTECTED.some(p => pathname.startsWith(p)) && !isAuthed) {
//     const loginUrl = new URL('/login', request.url);
//     loginUrl.searchParams.set('callbackUrl', pathname);
//     return Response.redirect(loginUrl);
//   }
//
//   if (pathname.startsWith('/login') && isAuthed) {
//     return Response.redirect(new URL('/', request.url));
//   }
// });
//
// export const config = {
//   matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|mp4|ico|txt|xml|webp)$).*)'],
// };
// ============================================================
