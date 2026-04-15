/**
 * middleware.js — Hey Frank-O Route Guard
 *
 * Runs on the Vercel Edge before every request.
 * Today: only protects /admin routes (none exist yet — pattern is in place).
 * When NextAuth is wired: uncomment the auth block below.
 *
 * Stack: NextAuth v5 (Auth.js) when ready
 */

import { NextResponse } from 'next/server';

// ── Protected route prefixes ────────────────────────────────────────────────
const PROTECTED = ['/admin', '/dashboard', '/account'];
const AUTH_ROUTES = ['/login']; // redirect to / if already authed

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // ── 1. Block direct access to API internals ─────────────────────────────
  //    (Vercel already blocks /_next, but belt-and-suspenders)
  if (pathname.startsWith('/api/_internal')) {
    return new NextResponse(null, { status: 404 });
  }

  // ── 2. Auth guard (uncomment when NextAuth is wired) ────────────────────
  //
  // import { getToken } from 'next-auth/jwt';
  // const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  //
  // const isProtected = PROTECTED.some(p => pathname.startsWith(p));
  // if (isProtected && !token) {
  //   const loginUrl = new URL('/login', request.url);
  //   loginUrl.searchParams.set('callbackUrl', pathname);
  //   return NextResponse.redirect(loginUrl);
  // }
  //
  // const isAuthRoute = AUTH_ROUTES.some(p => pathname.startsWith(p));
  // if (isAuthRoute && token) {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  // ── 3. Security headers on every response ──────────────────────────────
  //    next.config.js handles most headers, but middleware can add request-
  //    specific ones (e.g. CSP nonces in future).
  const response = NextResponse.next();

  // Prevent the server from leaking which framework this is
  response.headers.delete('x-powered-by');

  return response;
}

export const config = {
  // Run on all routes except static assets and Next.js internals
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|ico|txt|xml)$).*)',
  ],
};
