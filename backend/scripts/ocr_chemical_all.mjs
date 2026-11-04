import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Tesseract from 'tesseract.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = path.join(__dirname, 'chemical_pages');
const OUT_FILE = path.join(__dirname, 'chemical_ocr_dump.txt');

async function runOcr() {
  fs.writeFileSync(OUT_FILE, '=== CHEMICAL COORDINATION AND INTEGRATION OCR DUMP ===\n\n');

  for (let p = 314; p <= 331; p++) {
    console.log(`Processing Page ${p}...`);
    let pageText = `\n==================== Page ${p} ====================\n\n`;

    for (let c = 1; c <= 2; c++) {
      const colFile = `page_${p}_c${c}.png`;
      const colPath = path.join(PAGES_DIR, colFile);
      if (!fs.existsSync(colPath)) continue;

      // Enhance column image: greyscale, contrast, sharpen
      const enhancedBuffer = await sharp(colPath)
        .greyscale()
        .linear(1.4, -20)
        .sharpen()
        .toBuffer();

      const res = await Tesseract.recognize(enhancedBuffer, 'eng');
      pageText += `--- ${colFile} ---\n` + res.data.text + '\n\n';
    }

    fs.appendFileSync(OUT_FILE, pageText);
  }

  console.log(`OCR complete! Saved to ${OUT_FILE}`);
}

runOcr().catch(console.error);

