import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795498332786_e0d22a96.pdf';
const OUT_DIR = path.resolve(__dirname, 'dual_nature_pages');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function renderPage(doc, pageNum) {
  const pPad = String(pageNum).padStart(3, '0');
  const outPath = path.join(OUT_DIR, `page_${pPad}.png`);
  const page = await doc.getPage(pageNum);
  const viewport = page.getViewport({ scale: 2.0 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext('2d');
  await page.render({ canvasContext: ctx, viewport }).promise;
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
  return outPath;
}

async function main() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Total Pages: ${doc.numPages}`);

  const p1Path = await renderPage(doc, 1);
  const plastPath = await renderPage(doc, doc.numPages);
  console.log('Rendered page 1 and page', doc.numPages);

  const worker = await createWorker('eng');
  const ocr1 = await worker.recognize(p1Path);
  console.log('--- Page 1 OCR Snippet ---');
  console.log(ocr1.data.text.slice(0, 400));

  const ocrlast = await worker.recognize(plastPath);
  console.log('--- Last Page OCR Text ---');
  console.log(ocrlast.data.text);

  await worker.terminate();
}

main().catch(console.error);
