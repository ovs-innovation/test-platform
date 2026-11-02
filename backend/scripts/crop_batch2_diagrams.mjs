import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PAGES_DIR = 'scripts/organic_pages_batch2';
const OUT_DIR = 'frontend/public/uploads/organic';

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function safeExtract(pageFile, { left, top, width, height }, outFileName) {
  const pagePath = path.join(PAGES_DIR, pageFile);
  const img = sharp(pagePath);
  const meta = await img.metadata();
  const clampedLeft = Math.max(0, Math.min(left, meta.width - 2));
  const clampedTop = Math.max(0, Math.min(top, meta.height - 2));
  const clampedWidth = Math.max(1, Math.min(width, meta.width - clampedLeft));
  const clampedHeight = Math.max(1, Math.min(height, meta.height - clampedTop));
  await img.clone().extract({ left: clampedLeft, top: clampedTop, width: clampedWidth, height: clampedHeight })
    .png().toFile(path.join(OUT_DIR, outFileName));
}

async function cropAll() {
  console.log('Cropping Batch 2 diagrams...');

  // Page 132 (w: 305, h: 421)
  await safeExtract('page_132.png', { left: 10, top: 125, width: 140, height: 60 }, 'q98_structures.png');
  await safeExtract('page_132.png', { left: 10, top: 220, width: 140, height: 60 }, 'q99_structures.png');
  await safeExtract('page_132.png', { left: 10, top: 310, width: 140, height: 60 }, 'q100_structures.png');
  await safeExtract('page_132.png', { left: 155, top: 100, width: 140, height: 45 }, 'q102_structures.png');
  await safeExtract('page_132.png', { left: 155, top: 300, width: 140, height: 45 }, 'q104_structures.png');

  // Page 133 (w: 305, h: 421)
  await safeExtract('page_133.png', { left: 20, top: 10, width: 120, height: 35 }, 'q105_structure.png');
  await safeExtract('page_133.png', { left: 10, top: 75, width: 140, height: 85 }, 'q106_structures.png');
  await safeExtract('page_133.png', { left: 10, top: 175, width: 140, height: 110 }, 'q107_structures.png');
  await safeExtract('page_133.png', { left: 155, top: 80, width: 140, height: 45 }, 'q109_structures.png');
  await safeExtract('page_133.png', { left: 170, top: 275, width: 120, height: 45 }, 'q112_structure.png');

  // Page 134 (w: 238, h: 336)
  await safeExtract('page_134.png', { left: 10, top: 25, width: 105, height: 45 }, 'q114_structures.png');
  await safeExtract('page_134.png', { left: 10, top: 155, width: 105, height: 65 }, 'q117_structures.png');
  await safeExtract('page_134.png', { left: 125, top: 45, width: 105, height: 45 }, 'q120_structures.png');
  await safeExtract('page_134.png', { left: 125, top: 105, width: 105, height: 45 }, 'q121_structures.png');

  // Page 135 (w: 239, h: 336)
  await safeExtract('page_135.png', { left: 10, top: 15, width: 105, height: 45 }, 'q124_structures.png');
  await safeExtract('page_135.png', { left: 10, top: 65, width: 105, height: 50 }, 'q125_structures.png');
  await safeExtract('page_135.png', { left: 10, top: 120, width: 105, height: 75 }, 'q126_structures.png');
  await safeExtract('page_135.png', { left: 10, top: 235, width: 105, height: 50 }, 'q127_structure.png');
  await safeExtract('page_135.png', { left: 125, top: 245, width: 105, height: 35 }, 'q133_structures.png');

  // Page 136 (w: 238, h: 336)
  await safeExtract('page_136.png', { left: 10, top: 20, width: 105, height: 55 }, 'q135_structures.png');
  await safeExtract('page_136.png', { left: 10, top: 260, width: 105, height: 65 }, 'q139_structures.png');
  await safeExtract('page_136.png', { left: 125, top: 15, width: 70, height: 30 }, 'q140_structure.png');
  await safeExtract('page_136.png', { left: 125, top: 50, width: 60, height: 25 }, 'q141_structure.png');

  // Page 137 (w: 239, h: 336)
  await safeExtract('page_137.png', { left: 10, top: 20, width: 105, height: 35 }, 'q146_structures.png');
  await safeExtract('page_137.png', { left: 10, top: 75, width: 105, height: 110 }, 'q147_structures.png');
  await safeExtract('page_137.png', { left: 125, top: 20, width: 105, height: 30 }, 'q149_structure.png');
  await safeExtract('page_137.png', { left: 125, top: 75, width: 105, height: 25 }, 'q150_structures.png');
  await safeExtract('page_137.png', { left: 125, top: 120, width: 105, height: 65 }, 'q151_structures.png');

  // Page 138 (w: 235, h: 322)
  await safeExtract('page_138.png', { left: 10, top: 15, width: 105, height: 35 }, 'q154_structures.png');
  await safeExtract('page_138.png', { left: 10, top: 60, width: 105, height: 105 }, 'q155_structures.png');
  await safeExtract('page_138.png', { left: 10, top: 205, width: 105, height: 35 }, 'q156_structures.png');
  await safeExtract('page_138.png', { left: 10, top: 265, width: 105, height: 60 }, 'q157_structures.png');
  await safeExtract('page_138.png', { left: 125, top: 130, width: 80, height: 50 }, 'q160_structure.png');
  await safeExtract('page_138.png', { left: 125, top: 215, width: 105, height: 50 }, 'q161_structures.png');

  // Page 139 (w: 235, h: 322)
  await safeExtract('page_139.png', { left: 10, top: 85, width: 105, height: 35 }, 'q165_structure.png');
  await safeExtract('page_139.png', { left: 10, top: 135, width: 105, height: 40 }, 'q166_structures.png');
  await safeExtract('page_139.png', { left: 10, top: 245, width: 105, height: 55 }, 'q168_structures.png');
  await safeExtract('page_139.png', { left: 125, top: 155, width: 105, height: 40 }, 'q171_structures.png');

  // Page 144 (w: 235, h: 333)
  await safeExtract('page_144.png', { left: 10, top: 65, width: 105, height: 45 }, 'q213_structures.png');
  await safeExtract('page_144.png', { left: 10, top: 155, width: 105, height: 45 }, 'q214_structures.png');
  await safeExtract('page_144.png', { left: 125, top: 65, width: 105, height: 30 }, 'q218_structures.png');

  // Page 145 (w: 235, h: 333)
  await safeExtract('page_145.png', { left: 10, top: 145, width: 105, height: 40 }, 'q227_structures.png');
  await safeExtract('page_145.png', { left: 10, top: 250, width: 105, height: 45 }, 'q229_structures.png');
  await safeExtract('page_145.png', { left: 125, top: 165, width: 65, height: 30 }, 'q235_structure.png');

  console.log('Batch 2 diagrams cropped successfully!');
}

cropAll().catch(console.error);
