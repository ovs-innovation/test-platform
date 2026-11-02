import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { createWorker } from 'tesseract.js';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, 'thermo_pages');
const ocrDir = path.resolve(__dirname, 'thermo_ocr');
if (!fs.existsSync(ocrDir)) fs.mkdirSync(ocrDir, { recursive: true });

const pages = [
  'page_55', 'page_56', 'page_57', 'page_58', 'page_59',
  'page_60', 'page_61', 'page_62', 'page_63', 'page_64',
  'page_65', 'page_72', 'page_73'
];

async function main() {
  const langPath = 'c:/Users/rs004/OneDrive/Desktop/test-platform';
  const worker = await createWorker('eng', 1, { langPath, cachePath: langPath });

  for (const page of pages) {
    const inputPath = path.join(pagesDir, `${page}.png`);
    const enhancedPath = path.join(pagesDir, `${page}_enhanced.png`);
    const meta = await sharp(inputPath).metadata();

    // 3x Lanczos3 upscale with grayscale, normalize, sharpen
    await sharp(inputPath)
      .resize(meta.width * 3, meta.height * 3, { kernel: 'lanczos3' })
      .grayscale()
      .normalize()
      .sharpen({ sigma: 1.5 })
      .toFile(enhancedPath);

    console.log(`Running OCR on ${page}...`);
    const res = await worker.recognize(enhancedPath);
    const outTxt = path.join(ocrDir, `${page}.txt`);
    fs.writeFileSync(outTxt, res.data.text);
    console.log(`Saved ${outTxt} (${res.data.text.length} chars)`);
  }

  await worker.terminate();
  console.log('All pages enhanced and OCR completed!');
}

main().catch(console.error);
