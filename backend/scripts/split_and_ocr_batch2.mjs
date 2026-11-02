import sharp from 'sharp';
import Tesseract from 'tesseract.js';
import fs from 'fs';
import path from 'path';

const PAGES_DIR = 'scripts/organic_pages_batch2';
const COLS_DIR = 'scripts/organic_pages_batch2/cols';
const OUT_DIR = 'scripts/organic_pages_batch2/ocr_output';

if (!fs.existsSync(COLS_DIR)) fs.mkdirSync(COLS_DIR, { recursive: true });
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function splitAndOCR() {
  const pages = [
    'page_132', 'page_133',
    'page_134', 'page_135',
    'page_136', 'page_137',
    'page_138', 'page_139',
    'page_144', 'page_145',
    'page_148'
  ];

  for (const p of pages) {
    const pagePath = path.join(PAGES_DIR, `${p}.png`);
    const img = sharp(pagePath);
    const meta = await img.metadata();
    const w = meta.width;
    const h = meta.height;
    const midX = Math.round(w / 2);

    // Left col
    const leftPath = path.join(COLS_DIR, `${p}_left.png`);
    await sharp(pagePath)
      .extract({ left: 0, top: 0, width: Math.min(midX + 15, w), height: h })
      .resize({ width: Math.round((midX + 15) * 3) })
      .grayscale()
      .linear(1.4, -20)
      .png()
      .toFile(leftPath);

    // Right col
    const rightPath = path.join(COLS_DIR, `${p}_right.png`);
    await sharp(pagePath)
      .extract({ left: Math.max(0, midX - 15), top: 0, width: w - Math.max(0, midX - 15), height: h })
      .resize({ width: Math.round((w - Math.max(0, midX - 15)) * 3) })
      .grayscale()
      .linear(1.4, -20)
      .png()
      .toFile(rightPath);

    console.log(`Generated columns for ${p}`);

    // OCR Left
    const leftTxtPath = path.join(OUT_DIR, `${p}_left.txt`);
    const leftRes = await Tesseract.recognize(leftPath, 'eng');
    fs.writeFileSync(leftTxtPath, leftRes.data.text, 'utf8');

    // OCR Right
    const rightTxtPath = path.join(OUT_DIR, `${p}_right.txt`);
    const rightRes = await Tesseract.recognize(rightPath, 'eng');
    fs.writeFileSync(rightTxtPath, rightRes.data.text, 'utf8');

    console.log(`OCR done for ${p}`);
  }

  console.log('All Batch 2 columns and OCR complete!');
}

splitAndOCR().catch(console.error);

