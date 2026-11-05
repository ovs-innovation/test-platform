import { createCanvas, loadImage } from '@napi-rs/canvas';
import fs from 'fs';

async function checkTop() {
  const img = await loadImage('backend/scripts/statistics_pages/page_128.png');
  console.log(`Image size: ${img.width}x${img.height}`);
  const canvas = createCanvas(img.width, 300);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, img.width, 300, 0, 0, img.width, 300);
  fs.writeFileSync('backend/scripts/p128_top.png', canvas.toBuffer('image/png'));
  console.log('Saved p128_top.png');
}

checkTop().catch(console.error);

