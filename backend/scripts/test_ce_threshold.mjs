import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testThreshold() {
  const imgPath = path.resolve(__dirname, 'current_electricity_pages/page_070.png');
  const img = await loadImage(imgPath);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  // Take the top half of page 70 (where question is)
  const sliceH = 600;
  const sliceCanvas = createCanvas(img.width, sliceH);
  const sliceCtx = sliceCanvas.getContext('2d');
  sliceCtx.drawImage(canvas, 0, 0, img.width, sliceH, 0, 0, img.width, sliceH);

  const imgData = sliceCtx.getImageData(0, 0, img.width, sliceH);
  const data = imgData.data;

  // Let's create two pre-processed versions:
  // 1. Threshold at 170
  const threshCanvas = createCanvas(img.width, sliceH);
  const threshCtx = threshCanvas.getContext('2d');
  const threshData = threshCtx.createImageData(img.width, sliceH);
  for (let i = 0; i < data.length; i += 4) {
    const gray = (data[i] * 0.299 + data[i+1] * 0.587 + data[i+2] * 0.114);
    const val = gray < 170 ? 0 : 255;
    threshData.data[i] = val;
    threshData.data[i+1] = val;
    threshData.data[i+2] = val;
    threshData.data[i+3] = 255;
  }
  threshCtx.putImageData(threshData, 0, 0);
  fs.writeFileSync(path.resolve(__dirname, 'test_thresh.png'), threshCanvas.toBuffer('image/png'));

  // Run Tesseract on raw vs thresholded
  const worker = await createWorker('eng');
  
  const rawRes = await worker.recognize(sliceCanvas.toBuffer('image/png'));
  console.log('--- RAW OCR ---');
  console.log(rawRes.data.text);

  const threshRes = await worker.recognize(threshCanvas.toBuffer('image/png'));
  console.log('--- THRESHOLDED OCR ---');
  console.log(threshRes.data.text);

  await worker.terminate();
}

testThreshold().catch(console.error);
