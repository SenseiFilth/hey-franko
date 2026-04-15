/**
 * lib/sanitize.js
 *
 * Lightweight input sanitization for form submissions.
 * No external dependency — runs in Vercel Edge / Node runtimes.
 *
 * What it does:
 *  - Strips HTML tags (prevents stored XSS)
 *  - Removes CRLF sequences (prevents email header injection)
 *  - Trims whitespace
 *  - Enforces max length per field
 */

const FIELD_LIMITS = {
  name: 100,
  firstName: 60,
  lastName: 60,
  email: 254,       // RFC 5321 max
  phone: 20,
  message: 2000,
  description: 3000,
  location: 200,
  eventType: 150,
  org: 150,
  budget: 50,
  subject: 200,
  default: 500,
};

/**
 * Sanitize a single string value.
 * @param {string} value
 * @param {string} fieldName - used to look up max length
 * @returns {string}
 */
export function sanitizeString(value, fieldName = 'default') {
  if (typeof value !== 'string') return '';

  const maxLen = FIELD_LIMITS[fieldName] ?? FIELD_LIMITS.default;

  return value
    .replace(/<[^>]*>/g, '')          // strip HTML tags
    .replace(/[\r\n]+/g, ' ')         // collapse CRLF (email header injection)
    .replace(/[^\S ]+/g, ' ')         // normalize whitespace
    .trim()
    .slice(0, maxLen);
}

/**
 * Sanitize an entire form body object.
 * @param {Record<string, unknown>} body
 * @returns {Record<string, string>}
 */
export function sanitizeBody(body) {
  if (!body || typeof body !== 'object') return {};

  return Object.fromEntries(
    Object.entries(body).map(([key, val]) => [
      key,
      sanitizeString(String(val ?? ''), key),
    ])
  );
}

/**
 * Validate email format (RFC 5322 simplified).
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

/**
 * Validate phone — digits, spaces, +, -, (, ) only.
 * @param {string} phone
 * @returns {boolean}
 */
export function isValidPhone(phone) {
  return /^[\d\s\+\-\(\)\.]{7,20}$/.test(phone);
}

/**
 * Check honeypot field — bots fill it, humans leave it blank.
 * @param {string|undefined} honeypot
 * @returns {boolean} true = bot detected
 */
export function isBot(honeypot) {
  return typeof honeypot === 'string' && honeypot.length > 0;
}
