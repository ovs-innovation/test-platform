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
