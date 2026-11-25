import { createCanvas, loadImage } from '../node_modules/@napi-rs/canvas/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function inspectPageRows(pageNum) {
  const pPad = String(pageNum).padStart(3, '0');
  const imgPath = path.resolve(__dirname, `capacitance_pages/page_${pPad}.png`);
  const img = await loadImage(imgPath);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;

  // Compute dark pixel count for each row (excluding margins: x between 80 and width - 80)
  const rowDarkness = [];
  for (let y = 0; y < canvas.height; y++) {
    let darkCount = 0;
    for (let x = 80; x < canvas.width - 80; x++) {
      const idx = (y * canvas.width + x) * 4;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      if (r < 220 || g < 220 || b < 220) {
        darkCount++;
      }
    }
    rowDarkness.push(darkCount);
  }

  // Print non-empty row spans
  console.log(`\n=== PAGE ${pageNum} (${canvas.width}x${canvas.height}) ===`);
  let inSpan = false;
  let spanStart = 0;
  for (let y = 0; y < rowDarkness.length; y++) {
    if (rowDarkness[y] > 5) {
      if (!inSpan) {
        inSpan = true;
        spanStart = y;
      }
    } else {
      if (inSpan) {
        inSpan = false;
        const height = y - spanStart;
        if (height > 5) {
          console.log(`  Row span: y = ${spanStart} to ${y} (h = ${height}px), max darkness = ${Math.max(...rowDarkness.slice(spanStart, y))}`);
        }
      }
    }
  }
}

async function run() {
  await inspectPageRows(5); // Q12
  await inspectPageRows(6); // Q13
  await inspectPageRows(21); // Q29
}
run().catch(console.error);
