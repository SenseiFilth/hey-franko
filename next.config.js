/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Prevent browsers from MIME-sniffing the content type
  { key: 'X-Content-Type-Options', value: 'nosniff' },

  // Prevent the site from being embedded in iframes (clickjacking)
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },

  // Control how much referrer info is sent
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

  // Disable browser features this site doesn't use
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },

  // DNS prefetch for performance
  { key: 'X-DNS-Prefetch-Control', value: 'on' },

  // Content Security Policy
  // NOTE: 'unsafe-inline' is required by Next.js for its inline scripts/styles.
  // 'unsafe-eval' is NOT needed for Next.js 14 App Router — deliberately excluded.
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "media-src 'self'",
      "connect-src 'self'",
      "frame-src https://bookable.io",
      "frame-ancestors 'none'",
    ].join('; '),
  },
];

const nextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },

  // NOTE: No HTTPS redirect here — Vercel enforces HTTPS automatically.
  // Adding one here with a hardcoded domain breaks preview deployments.

  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
};

module.exports = nextConfig;
