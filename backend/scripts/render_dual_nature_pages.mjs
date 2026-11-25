import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795498332786_e0d22a96.pdf';
const OUT_DIR = path.resolve(__dirname, 'dual_nature_pages');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function renderAll() {
  console.log('Loading Dual Nature PDF from:', PDF_PATH);
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const total = doc.numPages;
  console.log(`Total pages: ${total}`);

  for (let i = 1; i <= total; i++) {
    const pPad = String(i).padStart(3, '0');
    const outPath = path.join(OUT_DIR, `page_${pPad}.png`);
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 5000) {
      continue;
    }
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport }).promise;
    fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    if (i % 20 === 0 || i === total) {
      console.log(`Rendered page ${i}/${total}`);
    }
  }
  console.log('All pages rendered successfully.');
}

renderAll().catch(console.error);
