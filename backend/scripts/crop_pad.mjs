import { loadImage, createCanvas } from '@napi-rs/canvas';
import fs from 'fs';

async function cropPad() {
  const img = await loadImage('backend/scripts/statistics_pages/page_128.png');
  // Crop Y=140 to 220
  const w = img.width;
  const h = 80;
  const canvas = createCanvas(w, h + 100);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 140, w, h, 0, 50, w, h);
  fs.writeFileSync('backend/scripts/p128_row1.png', canvas.toBuffer('image/png'));
  console.log('Saved p128_row1.png');
}

cropPad().catch(console.error);

