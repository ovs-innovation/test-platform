/**
 * PDF Diagram Extractor Service
 * Extracts and optimizes diagram assets from uploaded exam PDFs and PYQ papers.
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const DIAGRAMS_UPLOAD_DIR = path.resolve('uploads/diagrams');

if (!fs.existsSync(DIAGRAMS_UPLOAD_DIR)) {
  fs.mkdirSync(DIAGRAMS_UPLOAD_DIR, { recursive: true });
}

/**
 * Extract a diagram region from a raster image or PDF page render
 * @param {Object} options
 * @param {string|Buffer} options.sourceImagePath - File path or buffer of page image
 * @param {Object} options.rect - { left, top, width, height }
 * @param {string} options.outputFileName - Name of output file
 * @param {string} options.format - 'png' | 'webp' | 'jpg'
 * @returns {Promise<Object>} { filePath, url, width, height, sizeBytes }
 */
export async function extractDiagramFromImage({
  sourceImagePath,
  rect,
  outputFileName = `extracted_${Date.now()}.png`,
  format = 'png',
} = {}) {
  const safeName = outputFileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const targetPath = path.join(DIAGRAMS_UPLOAD_DIR, safeName);

  let pipeline = sharp(sourceImagePath);

  if (rect && rect.width > 0 && rect.height > 0) {
    pipeline = pipeline.extract({
      left: Math.max(0, Math.round(rect.left)),
      top: Math.max(0, Math.round(rect.top)),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    });
  }

  // Auto-trim surrounding white/blank margins
  pipeline = pipeline.trim();

  if (format === 'webp') {
    await pipeline.webp({ quality: 90 }).toFile(targetPath);
  } else if (format === 'jpg' || format === 'jpeg') {
    await pipeline.jpeg({ quality: 90 }).toFile(targetPath);
  } else {
    await pipeline.png({ compressionLevel: 8 }).toFile(targetPath);
  }

  const fileStats = fs.statSync(targetPath);
  const metadata = await sharp(targetPath).metadata();

  const url = `/uploads/diagrams/${safeName}`;

  return {
    filePath: targetPath,
    url,
    width: metadata.width,
    height: metadata.height,
    format: metadata.format,
    sizeBytes: fileStats.size,
  };
}
