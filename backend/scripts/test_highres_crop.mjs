import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testHighResCrop() {
  const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795425555444_cecd75d8.pdf';
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  
  // Test Page 16 (Questions 53, 54, 55)
  const page = await doc.getPage(16);
  const viewport = page.getViewport({ scale: 3.5 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext('2d');
  await page.render({ canvasContext: ctx, viewport }).promise;
  
  // Binarize
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    const gray = 0.299 * d[i] + 0.587 * d[i+1] + 0.114 * d[i+2];
    const v = gray > 175 ? 255 : 0;
    d[i] = v; d[i+1] = v; d[i+2] = v;
  }
  ctx.putImageData(imgData, 0, 0);
  
  const worker = await createWorker('eng');
  await worker.setParameters({
    tessedit_pageseg_mode: '6'
  });
  
  // Crop top half (Questions 53 and 54)
  const topH = Math.floor(canvas.height * 0.45);
  const cropCanvas = createCanvas(canvas.width, topH);
  const cropCtx = cropCanvas.getContext('2d');
  cropCtx.drawImage(canvas, 0, 0, canvas.width, topH, 0, 0, canvas.width, topH);
  
  const { data: { text } } = await worker.recognize(cropCanvas.toBuffer('image/png'));
  console.log('--- HIGH-RES CROPPED OCR ON PAGE 16 (TOP 45%) ---');
  console.log(text);
  
  await worker.terminate();
}

testHighResCrop().catch(console.error);
