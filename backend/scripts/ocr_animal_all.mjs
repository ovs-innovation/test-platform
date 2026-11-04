import sharp from 'sharp';
import Tesseract from 'tesseract.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = path.join(__dirname, 'animal_pages');
const OUT_FILE = path.join(__dirname, 'animal_ocr_dump.txt');

async function runOcr() {
  fs.writeFileSync(OUT_FILE, '=== ANIMAL KINGDOM & NON-CHORDATES OCR DUMP ===\n\n');

  for (let p = 337; p <= 353; p++) {
    console.log(`Processing Page ${p}...`);
    let pageText = `\n==================== Page ${p} ====================\n\n`;

    for (let c = 1; c <= 2; c++) {
      const colFile = `page_${p}_c${c}.png`;
      const colPath = path.join(PAGES_DIR, colFile);
      if (!fs.existsSync(colPath)) continue;

      const enhancedBuffer = await sharp(colPath)
        .resize(1000, 2400, { kernel: 'lanczos3' })
        .greyscale()
        .linear(1.8, -35)
        .sharpen()
        .toBuffer();

      const res = await Tesseract.recognize(enhancedBuffer, 'eng');
      pageText += `--- ${colFile} ---\n` + res.data.text.trim() + '\n\n';
    }

    fs.appendFileSync(OUT_FILE, pageText);
  }

  console.log(`OCR complete! Saved to ${OUT_FILE}`);
}

runOcr().catch(console.error);

