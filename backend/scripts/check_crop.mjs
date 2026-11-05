import { createCanvas, loadImage } from '@napi-rs/canvas';
import fs from 'fs';

async function analyzeRegion() {
  const img = await loadImage('backend/scripts/statistics_pages/page_128.png');
  // Crop y from 100 to 220, across all x
  const h = 120;
  const canvas = createCanvas(img.width, h);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 100, img.width, h, 0, 0, img.width, h);
  fs.writeFileSync('backend/scripts/p128_y100_220.png', canvas.toBuffer('image/png'));
  console.log('Saved p128_y100_220.png');
}

analyzeRegion().catch(console.error);

