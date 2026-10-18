/**
 * Construct full media asset URL for uploaded diagrams, circuits, and figures.
 * Supports absolute URLs, data URLs, and relative /uploads/... paths without hardcoded localhost.
 */
export function getMediaUrl(url) {
  if (!url || typeof url !== 'string') return '';

  const trimmed = url.trim();
  if (!trimmed) return '';

  // Return data URLs and absolute HTTP(S) URLs directly
  if (trimmed.startsWith('data:') || trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  // Handle relative paths like /uploads/q25/diagram.png
  const apiBase = import.meta.env.VITE_API_URL || '';
  if (apiBase && (apiBase.startsWith('http://') || apiBase.startsWith('https://'))) {
    // If VITE_API_URL is https://api.example.com/api, strip the /api suffix
    const hostBase = apiBase.replace(/\/api\/?$/, '');
    const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
    return `${hostBase}${cleanPath}`;
  }

  // In local Vite dev or same-origin setups, return relative path directly
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

/**
 * Check if a test series has an admin-uploaded brochure.
 */
export function hasBrochure(series) {
  return Boolean(
    series &&
    series.brochure_url &&
    typeof series.brochure_url === 'string' &&
    series.brochure_url.trim().length > 0
  );
}

/**
 * Returns the direct download URL for a test series brochure.
 * Uses the backend proxy download endpoint (/api/public/test-series/:slug/brochure)
 * which guarantees clean PDF attachment download and avoids external CDN 401 blocks.
 * Returns empty string if no brochure was uploaded.
 */
export function getBrochureDownloadUrl(series) {
  if (hasBrochure(series)) {
    const trimmed = series.brochure_url.trim();
    if (series.slug) {
      const apiBase = import.meta.env.VITE_API_URL || '/api';
      const cleanApiBase = apiBase.replace(/\/$/, '');
      return cleanApiBase.endsWith('/api')
        ? `${cleanApiBase}/public/test-series/${encodeURIComponent(series.slug)}/brochure`
        : `${cleanApiBase}/api/public/test-series/${encodeURIComponent(series.slug)}/brochure`;
    }
    return getMediaUrl(trimmed);
  }

  return '';
}

/**
 * Extract all media URLs that belong to options of a question.
 */
export function getOptionMediaUrls(q) {
  const urls = new Set();
  if (!q) return urls;

  const options = Array.isArray(q.options)
    ? q.options
    : (typeof q.options === 'string' ? (() => { try { return JSON.parse(q.options); } catch (_) { return []; } })() : []);

  options.forEach((opt) => {
    if (typeof opt === 'object' && opt !== null) {
      if (opt.image_url && typeof opt.image_url === 'string') {
        const u = opt.image_url.trim();
        if (u) urls.add(u);
      }
      if (opt.image && typeof opt.image === 'string') {
        const u = opt.image.trim();
        if (u) urls.add(u);
      }
      if (Array.isArray(opt.media)) {
        opt.media.forEach((m) => {
          const u = typeof m === 'string' ? m : m?.url;
          if (u && typeof u === 'string') {
            const trimmed = u.trim();
            if (trimmed) urls.add(trimmed);
          }
        });
      }
    }
  });

  return urls;
}

/**
 * Filter and resolve true question-level diagrams.
 * Strictly excludes any diagrams that belong to options or solutions/explanations.
 */
export function getQuestionDiagrams(q) {
  if (!q) return [];
  const optUrls = getOptionMediaUrls(q);
  const solUrl = q.solution_image_url && typeof q.solution_image_url === 'string'
    ? q.solution_image_url.trim()
    : null;

  let rawMedia = [];
  if (Array.isArray(q.media) && q.media.length > 0) {
    rawMedia = q.media;
  } else if (typeof q.media === 'string') {
    try { rawMedia = JSON.parse(q.media); } catch (_) { rawMedia = []; }
  }

  const validMedia = rawMedia.filter((m) => {
    if (!m) return false;
    const url = (typeof m === 'string' ? m : m.url || '').trim();
    if (!url) return false;
    if (solUrl && url === solUrl) return false;
    if (optUrls.has(url)) return false;

    if (typeof m === 'object') {
      const type = String(m.type || '').toLowerCase();
      if (type === 'solution' || type === 'explanation') return false;

      const id = String(m.id || '').toLowerCase();
      if (id.startsWith('opt-') || id.includes('-opt-') || id.startsWith('sol-') || id.startsWith('exp-')) {
        return false;
      }

      const desc = String(m.description || '').toLowerCase();
      if (/diagram\s+for\s+option|option\s+[a-z0-9]\s+diagram/i.test(desc)) {
        return false;
      }
    }
    return true;
  });

  if (validMedia.length > 0) {
    return validMedia;
  }

  // Fallback to q.image_url only if it is NOT an option or solution diagram
  if (q.image_url && typeof q.image_url === 'string') {
    const trimmedImg = q.image_url.trim();
    if (trimmedImg && !optUrls.has(trimmedImg) && trimmedImg !== solUrl) {
      return [{ url: trimmedImg }];
    }
  }

  return [];
}

/**
 * Returns true if question has at least one valid question-level diagram.
 */
export function hasQuestionDiagram(q) {
  return getQuestionDiagrams(q).length > 0;
}

