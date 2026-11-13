import fs from 'fs';
import { loadImage } from '@napi-rs/canvas';
import Tesseract from 'tesseract.js';

async function main() {
  const res = await Tesseract.recognize('./backend/scripts/organic_q_slices/q_38.png', 'eng');
  console.log('Full OCR:');
  console.log(res.data.text);
  for (const line of res.data.lines) {
    console.log(line.text.trim());
  }
}

main().catch(console.error);

