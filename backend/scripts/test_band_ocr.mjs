import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadImage, createCanvas } from '@napi-rs/canvas';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testBandOCR() {
  const imgPath = path.resolve(__dirname, 'current_electricity_pages/page_001.png');
  const img = await loadImage(imgPath);
  
  const worker = await createWorker('eng');
  
  const bands = [
    { q: 1, y1: 190, y2: 440 },
    { q: 2, y1: 480, y2: 650 },
    { q: 3, y1: 690, y2: 940 },
    { q: 4, y1: 980, y2: 1140 },
    { q: 5, y1: 1180, y2: 1350 }
  ];
  
  for (const b of bands) {
    const canvas = createCanvas(img.width, b.y2 - b.y1);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, b.y1, img.width, b.y2 - b.y1, 0, 0, img.width, b.y2 - b.y1);
    
    const { data: { text } } = await worker.recognize(canvas.toBuffer('image/png'));
    console.log(`\n--- BAND Q${b.q} ---`);
    console.log(text.trim());
  }
  
  await worker.terminate();
}

testBandOCR().catch(console.error);
