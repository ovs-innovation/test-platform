import sharp from 'sharp';
import Tesseract from 'tesseract.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = path.join(__dirname, 'chemical_pages');

async function sliceAndOcr(colFile, numSlices = 4) {
  const colPath = path.join(PAGES_DIR, colFile);
  const meta = await sharp(colPath).metadata();
  const sliceH = Math.floor(meta.height / numSlices);

  console.log(`\n=================== ${colFile} ===================`);
  for (let i = 0; i < numSlices; i++) {
    const top = i * sliceH;
    const height = (i === numSlices - 1) ? (meta.height - top) : sliceH;

    // Enhance: binarize or threshold
    const buf = await sharp(colPath)
      .extract({ left: 0, top, width: meta.width, height })
      .greyscale()
      .linear(1.5, -25)
      .sharpen()
      .toBuffer();

    const res = await Tesseract.recognize(buf, 'eng');
    console.log(`--- Slice ${i + 1}/${numSlices} ---`);
    console.log(res.data.text.trim());
  }
}

async function run() {
  const col = process.argv[2] || 'page_329_c1.png';
  const slices = parseInt(process.argv[3] || '4', 10);
  await sliceAndOcr(col, slices);
}

run().catch(console.error);

