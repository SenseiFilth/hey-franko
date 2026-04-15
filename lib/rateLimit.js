/**
 * lib/rateLimit.js
 *
 * In-memory rate limiter for Vercel serverless (Node.js runtime).
 *
 * How it works:
 *   State lives in a module-level Map. On Vercel, a Node.js function instance
 *   stays warm for several minutes and handles multiple sequential requests —
 *   so rate limiting DOES work within a warm instance. A cold start resets the
 *   counter, which is acceptable for a low-traffic business site.
 *
 * When to upgrade to Redis:
 *   If the site scales to high concurrency where multiple instances run
 *   simultaneously (typically thousands of requests/minute), switch to
 *   Upstash Redis: https://upstash.com — drop-in replacement, same interface.
 *
 * No external dependencies. Works in any Node.js environment.
 */

const store = new Map();

/**
 * Check whether a given key has exceeded its rate limit.
 *
 * @param {string} key        - unique identifier (e.g. `contact:1.2.3.4`)
 * @param {object} options
 * @param {number} options.limit     - max allowed requests in the window
 * @param {number} options.windowMs  - window duration in milliseconds
 * @returns {{ success: boolean, remaining: number }}
 */
export function checkRateLimit(key, { limit = 5, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const entry = store.get(key) ?? { count: 0, resetAt: now + windowMs };

  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + windowMs;
  }

  entry.count += 1;
  store.set(key, entry);

  return {
    success: entry.count <= limit,
    remaining: Math.max(0, limit - entry.count),
  };
}

/**
 * Extract the real client IP from a Next.js request.
 * Vercel sets x-forwarded-for reliably on all incoming requests.
 *
 * @param {Request} request
 * @returns {string}
 */
export function getIP(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    '127.0.0.1'
  );
}
