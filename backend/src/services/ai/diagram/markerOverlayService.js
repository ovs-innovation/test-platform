/**
 * Marker Overlay Service
 * Programmatically overlays examination reference markers (e.g. X, Y, A, B, 1, 2)
 * onto SVG diagrams and raster images (PNG, WebP, JPG) without revealing answers.
 */

import sharp from 'sharp';
import { escapeXml } from './svgDiagramGenerator.js';

/**
 * Overlay reference markers onto an SVG string
 * @param {string} svgString - Base SVG
 * @param {Array<Object>} markers - [{ id, label, x, y, pointerX, pointerY }]
 * @returns {string} - Modified SVG with overlaid markers
 */
export function overlayMarkersOnSvg(svgString = '', markers = []) {
  if (!svgString || !markers.length) return svgString;

  const markerElements = markers.map((m, idx) => {
    const label = m.label || m.id || String(idx + 1);
    const x = Number(m.x ?? 50 + idx * 60);
    const y = Number(m.y ?? 50);
    const pointerX = m.pointerX !== undefined ? Number(m.pointerX) : null;
    const pointerY = m.pointerY !== undefined ? Number(m.pointerY) : null;

    let pointerLine = '';
    if (pointerX !== null && pointerY !== null) {
      pointerLine = `
        <line x1="${x + 14}" y1="${y + 14}" x2="${pointerX}" y2="${pointerY}" 
              stroke="#0f172a" stroke-width="2" stroke-dasharray="3,2" />
        <circle cx="${pointerX}" cy="${pointerY}" r="4" fill="#0f172a" />
      `;
    }

    return `
      <!-- Marker ${escapeXml(label)} -->
      ${pointerLine}
      <g transform="translate(${x}, ${y})">
        <rect x="0" y="0" width="28" height="26" rx="4" fill="#2563eb" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))" />
        <text x="14" y="18" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#ffffff">${escapeXml(label)}</text>
      </g>
    `;
  }).join('\n');

  const closingSvgIdx = svgString.lastIndexOf('</svg>');
  if (closingSvgIdx === -1) {
    return svgString;
  }

  const injectedGroup = `
    <!-- Programmatically Overlaid Examination Reference Markers -->
    <g id="exam-reference-markers">
      ${markerElements}
    </g>
  `;

  return (
    svgString.slice(0, closingSvgIdx) +
    injectedGroup +
    svgString.slice(closingSvgIdx)
  );
}

/**
 * Overlay reference markers onto a raster image Buffer (PNG / JPG / WebP) using sharp compositing
 * @param {Buffer|string} imageBufferOrPath - Image buffer or path
 * @param {Array<Object>} markers - [{ id, label, x, y, pointerX, pointerY }]
 * @returns {Promise<Buffer>} - Composited PNG buffer
 */
export async function overlayMarkersOnRaster(imageBufferOrPath, markers = []) {
  if (!markers.length) {
    return sharp(imageBufferOrPath).png().toBuffer();
  }

  const metadata = await sharp(imageBufferOrPath).metadata();
  const width = metadata.width || 600;
  const height = metadata.height || 400;

  const markerSvgElements = markers.map((m, idx) => {
    const label = m.label || m.id || String(idx + 1);
    const x = Number(m.x ?? 40 + idx * 50);
    const y = Number(m.y ?? 40);
    const pointerX = m.pointerX !== undefined ? Number(m.pointerX) : null;
    const pointerY = m.pointerY !== undefined ? Number(m.pointerY) : null;

    let pointerLine = '';
    if (pointerX !== null && pointerY !== null) {
      pointerLine = `
        <line x1="${x + 16}" y1="${y + 16}" x2="${pointerX}" y2="${pointerY}" 
              stroke="#0f172a" stroke-width="2.5" />
        <circle cx="${pointerX}" cy="${pointerY}" r="5" fill="#2563eb" />
      `;
    }

    return `
      ${pointerLine}
      <g transform="translate(${x}, ${y})">
        <rect x="0" y="0" width="32" height="30" rx="5" fill="#2563eb" stroke="#ffffff" stroke-width="2" />
        <text x="16" y="21" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#ffffff">${escapeXml(label)}</text>
      </g>
    `;
  }).join('\n');

  const overlaySvg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      ${markerSvgElements}
    </svg>
  `;

  return sharp(imageBufferOrPath)
    .composite([
      {
        input: Buffer.from(overlaySvg),
        top: 0,
        left: 0,
      },
    ])
    .png()
    .toBuffer();
}
