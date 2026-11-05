import { loadImage, createCanvas } from '@napi-rs/canvas';
import fs from 'fs';

async function inspectTop() {
  const img = await loadImage('backend/scripts/p169_crop_top.png');
  // Crop between y = 100 and y = 180, across width 1530
  const canvas = createCanvas(img.width, 100);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 100, img.width, 100, 0, 0, img.width, 100);
  fs.writeFileSync('backend/scripts/p169_strip.png', canvas.toBuffer('image/png'));
  console.log('Saved p169_strip.png');
}

inspectTop().catch(console.error);

