import sharp from 'sharp';
import Tesseract from 'tesseract.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = path.join(__dirname, 'chemical_pages_part2');
const OUT_FILE = path.join(__dirname, 'chemical_part2_ocr_dump.txt');

async function runOcr() {
  fs.writeFileSync(OUT_FILE, '=== CHEMICAL COORDINATION PART 2 OCR DUMP ===\n\n');

  for (let p = 332; p <= 336; p++) {
    console.log(`Processing Page ${p}...`);
    let pageText = `\n==================== Page ${p} ====================\n\n`;

    for (let c = 1; c <= 2; c++) {
      const colFile = `page_${p}_c${c}.png`;
      const colPath = path.join(PAGES_DIR, colFile);
      if (!fs.existsSync(colPath)) continue;

      // Upscale and enhance: resize to higher DPI, sharpen, high contrast
      const enhancedBuffer = await sharp(colPath)
        .resize(1000, 2500, { kernel: 'lanczos3' })
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

