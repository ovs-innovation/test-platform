import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function parseGrid() {
  const p79 = path.resolve(__dirname, 'basic_chem_pages/page_079.png');
  const worker = await createWorker('eng');

  // Let's determine where the grid is located vertically.
  // The title "Answer key" is at the top.
  // The rows start around y = 80-120 and end around y = 1480-1520.
  // Let's measure the text box area by scanning black pixels.
  const { data, info } = await sharp(p79).raw().toBuffer({ resolveWithObject: true });
  
  // Find y range of the answer key table
  // Let's sample rows from y=60 to 1550
  const rowHist = new Array(info.height).fill(0);
  for (let y = 60; y < info.height; y++) {
    for (let x = 60; x < info.width - 60; x++) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      if (r < 150 && g < 150 && b < 150) {
        rowHist[y]++;
      }
    }
  }

  // Find where table rows exist
  let tableTop = 0;
  for (let y = 80; y < 200; y++) {
    if (rowHist[y] > 50 && rowHist[y-1] <= 10) {
      // Could be "Answer key" or first row
    }
  }

  console.log('Inspecting row histogram around top and bottom...');
  const nonZeroY = [];
  for (let y = 100; y < info.height; y++) {
    if (rowHist[y] > 30) nonZeroY.push(y);
  }
  const minY = nonZeroY[0];
  const maxY = nonZeroY[nonZeroY.length - 1];
  console.log(`Content Y range: ${minY} to ${maxY}, total height = ${maxY - minY}`);

  // Let's see: 37 rows between minY and maxY
  const rowHeight = (maxY - minY) / 37;
  console.log(`Estimated row height: ${rowHeight}`);

  await worker.terminate();
}

parseGrid().catch(console.error);
