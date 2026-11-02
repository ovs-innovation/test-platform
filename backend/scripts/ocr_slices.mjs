import sharp from 'sharp';
import Tesseract from 'tesseract.js';
import fs from 'fs';

async function ocrSlice(slicePath) {
  // Preprocess: grayscale, threshold or linear contrast stretch
  const buf = await sharp(slicePath)
    .grayscale()
    .linear(1.5, -30) // boost contrast
    .toBuffer();
    
  const res = await Tesseract.recognize(buf, 'eng');
  console.log(`\n=================== ${slicePath} ===================`);
  console.log(res.data.text.trim());
}

async function run() {
  const slices = fs.readdirSync('backend/uploads/bio/slices').filter(f => f.endsWith('.png'));
  for (const s of slices) {
    await ocrSlice(`backend/uploads/bio/slices/${s}`);
  }
}

run().catch(console.error);

