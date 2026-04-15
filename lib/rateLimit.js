/**
 * lib/rateLimit.js
 *
 * Serverless-safe rate limiter.
 *
 * Strategy:
 *  - In development / if Upstash env vars are absent: in-memory Map (resets per
 *    cold start — acceptable for local dev, NOT for production).
 *  - In production: Upstash Redis via @upstash/ratelimit (persists across
 *    serverless instances, free tier handles ~500k requests/day).
 *
 * Setup (add to Vercel env vars):
 *   UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
 *   UPSTASH_REDIS_REST_TOKEN=AXxx...
 *
 * Install when ready:
 *   npm install @upstash/ratelimit @upstash/redis
 */

// ── In-memory fallback (dev only) ─────────────────────────────────────────
const memoryStore = new Map();

function inMemoryLimit(key, limit, windowMs) {
  const now = Date.now();
  const entry = memoryStore.get(key) ?? { count: 0, resetAt: now + windowMs };

  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + windowMs;
  }

  entry.count += 1;
  memoryStore.set(key, entry);

  return {
    success: entry.count <= limit,
    remaining: Math.max(0, limit - entry.count),
    resetAt: entry.resetAt,
  };
}

/**
 * Check rate limit for a given identifier (usually IP address).
 *
 * @param {string} identifier  - e.g. request IP or user ID
 * @param {object} options
 * @param {number} options.limit     - max requests allowed
 * @param {number} options.windowMs  - window in milliseconds
 * @returns {Promise<{ success: boolean, remaining: number, resetAt: number }>}
 */
export async function checkRateLimit(identifier, { limit = 5, windowMs = 60_000 } = {}) {
  // ── Production: Upstash Redis ──────────────────────────────────────────
  if (
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    // Dynamic import keeps this out of the bundle when Upstash isn't installed
    try {
      const { Ratelimit } = await import('@upstash/ratelimit');
      const { Redis } = await import('@upstash/redis');

      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });

      const ratelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(limit, `${windowMs / 1000} s`),
        analytics: false,
      });

      const result = await ratelimit.limit(identifier);
      return {
        success: result.success,
        remaining: result.remaining,
        resetAt: result.reset,
      };
    } catch {
      // If Upstash package isn't installed yet, fall through to memory
    }
  }

  // ── Dev / fallback: in-memory ──────────────────────────────────────────
  return inMemoryLimit(identifier, limit, windowMs);
}

/**
 * Get the real IP from a Next.js request, respecting Vercel's forwarding headers.
 * @param {Request} request
 * @returns {string}
 */
export function getIP(request) {
  return (
    request.headers.get('x-real-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    '127.0.0.1'
  );
}
