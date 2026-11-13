import fs from 'fs';
import { createCanvas, loadImage } from '@napi-rs/canvas';

async function checkEdge() {
  const img = await loadImage('./backend/scripts/test_q6_opt_a.png');
  const c = createCanvas(img.width, img.height);
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const d = ctx.getImageData(0, 0, img.width, img.height).data;

  // Check borders: top row, bottom row, left col, right col
  let topDark = 0, bottomDark = 0, leftDark = 0, rightDark = 0;
  for (let x = 0; x < img.width; x++) {
    const topIdx = (0 * img.width + x) * 4;
    const botIdx = ((img.height - 1) * img.width + x) * 4;
    if (d[topIdx] < 120) topDark++;
    if (d[botIdx] < 120) bottomDark++;
  }
  for (let y = 0; y < img.height; y++) {
    const leftIdx = (y * img.width + 0) * 4;
    const rightIdx = (y * img.width + (img.width - 1)) * 4;
    if (d[leftIdx] < 120) leftDark++;
    if (d[rightIdx] < 120) rightDark++;
  }
  console.log(`Top darks: ${topDark}, Bottom darks: ${bottomDark}, Left darks: ${leftDark}, Right darks: ${rightDark}`);
}

checkEdge().catch(console.error);

