import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795425555444_cecd75d8.pdf';

async function testHighDpi() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(70);
  const viewport = page.getViewport({ scale: 3.5 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext('2d');
  await page.render({ canvasContext: ctx, viewport }).promise;

  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(path.resolve(__dirname, 'test_p70_35x.png'), buf);

  const worker = await createWorker('eng');
  const res = await worker.recognize(buf);
  console.log('--- 3.5x SCALE OCR ON PAGE 70 ---');
  console.log(res.data.text);
  await worker.terminate();
}

testHighDpi().catch(console.error);
