import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { createWorker } from 'tesseract.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, 'thermo_pages');
const ocrDir = path.resolve(__dirname, 'thermo_ocr_cols');
if (!fs.existsSync(ocrDir)) fs.mkdirSync(ocrDir, { recursive: true });

const pages = [
  'page_55', 'page_56', 'page_57', 'page_58', 'page_59',
  'page_60', 'page_61', 'page_62', 'page_63',
  'page_64', 'page_65', 'page_72', 'page_73'
];

async function processAll() {
  const langPath = 'c:/Users/rs004/OneDrive/Desktop/test-platform';
  const worker = await createWorker('eng', 1, { langPath, cachePath: langPath });

  for (const p of pages) {
    const imgPath = path.join(pagesDir, `${p}.png`);
    if (!fs.existsSync(imgPath)) continue;
    
    const meta = await sharp(imgPath).metadata();
    const w = meta.width;
    const h = meta.height;
    
    // Split into 2 columns: left column ~0-50%, right column ~50-100%
    const splitX = Math.floor(w * 0.49);
    
    const c1Img = path.join(ocrDir, `${p}_c1.png`);
    const c2Img = path.join(ocrDir, `${p}_c2.png`);
    
    await sharp(imgPath)
      .extract({ left: 0, top: 0, width: splitX, height: h })
      .resize(splitX * 3, h * 3, { kernel: 'lanczos3' })
      .grayscale()
      .normalize()
      .sharpen({ sigma: 1.5 })
      .toFile(c1Img);

    await sharp(imgPath)
      .extract({ left: splitX, top: 0, width: w - splitX, height: h })
      .resize((w - splitX) * 3, h * 3, { kernel: 'lanczos3' })
      .grayscale()
      .normalize()
      .sharpen({ sigma: 1.5 })
      .toFile(c2Img);

    console.log(`Running OCR on ${p} columns 1 and 2...`);
    const res1 = await worker.recognize(c1Img);
    const res2 = await worker.recognize(c2Img);
    
    fs.writeFileSync(path.join(ocrDir, `${p}_c1.txt`), res1.data.text);
    fs.writeFileSync(path.join(ocrDir, `${p}_c2.txt`), res2.data.text);
    console.log(`Saved ${p} cols (c1: ${res1.data.text.length} chars, c2: ${res2.data.text.length} chars)`);
  }

  await worker.terminate();
  console.log('Done splitting and OCRing all columns!');
}

processAll().catch(console.error);
