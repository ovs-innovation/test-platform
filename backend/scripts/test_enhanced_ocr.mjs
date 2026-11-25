import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testOCR() {
  const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795425555444_cecd75d8.pdf';
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(1);
  const viewport = page.getViewport({ scale: 2.5 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext('2d');
  await page.render({ canvasContext: ctx, viewport }).promise;
  
  // Binarize
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    const gray = 0.299 * d[i] + 0.587 * d[i+1] + 0.114 * d[i+2];
    const v = gray > 185 ? 255 : 0;
    d[i] = v; d[i+1] = v; d[i+2] = v;
  }
  ctx.putImageData(imgData, 0, 0);
  
  const worker = await createWorker('eng');
  
  const { data: { text } } = await worker.recognize(canvas.toBuffer('image/png'));
  console.log('--- TEST OCR RESULT (SCALE 2.5 + THRESHOLD) ---');
  console.log(text.slice(0, 1000));
  await worker.terminate();
}

testOCR().catch(console.error);
