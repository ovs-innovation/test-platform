import fs from 'fs';
import { createCanvas, loadImage } from '@napi-rs/canvas';

async function checkPixels() {
  const img = await loadImage('./backend/scripts/test_q6_opt_a.png');
  const c = createCanvas(img.width, img.height);
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const imgData = ctx.getImageData(0, 0, img.width, img.height);
  const d = imgData.data;

  // Print first few dark pixels
  const darks = [];
  for (let y = 0; y < img.height; y += 10) {
    for (let x = 0; x < img.width; x += 10) {
      const idx = (y * img.width + x) * 4;
      if (d[idx] < 200) {
        darks.push({ x, y, r: d[idx], g: d[idx+1], b: d[idx+2] });
      }
    }
  }
  console.log(`Found ${darks.length} dark sample points in 450x210. Samples:`, darks.slice(0, 8));
}

checkPixels().catch(console.error);
