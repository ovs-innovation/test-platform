/**
 * Middleware to set optimized HTTP Cache-Control headers for API responses.
 */

/**
 * Public Cache Middleware: For unauthenticated public GET endpoints (stats, catalogs, public metadata).
 * Allows client browsers and CDN proxies (Vercel, Nginx, Cloudflare) to cache responses.
 */
export const publicCache = (maxAgeSeconds = 60, sMaxAgeSeconds = 300) => (req, res, next) => {
  if (req.method === 'GET') {
    res.setHeader(
      'Cache-Control',
      `public, max-age=${maxAgeSeconds}, s-maxage=${sMaxAgeSeconds}, stale-while-revalidate=600`
    );
  }
  next();
};

/**
 * Private Cache Middleware: For authenticated user GET endpoints (dashboard, profile, notifications).
 * Allows browser-only caching for a short window without CDN edge sharing.
 */
export const privateCache = (maxAgeSeconds = 15) => (req, res, next) => {
  if (req.method === 'GET') {
    res.setHeader(
      'Cache-Control',
      `private, max-age=${maxAgeSeconds}, stale-while-revalidate=60`
    );
  }
  next();
};

/**
 * No-Cache Middleware: For real-time critical endpoints (live exam attempt state, payment webhooks, SSE).
 */
export const noCache = (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
};
