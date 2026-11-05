import { loadImage, createCanvas } from '@napi-rs/canvas';
import fs from 'fs';

async function cropTop() {
  const img = await loadImage('backend/scripts/binomial_theorem_pages/page_169.png');
  console.log(`Image size: ${img.width} x ${img.height}`);
  
  // Crop y from 0 to 600
  const canvas = createCanvas(img.width, 600);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, img.width, 600, 0, 0, img.width, 600);
  fs.writeFileSync('backend/scripts/p169_crop_top.png', canvas.toBuffer('image/png'));
  console.log('Saved backend/scripts/p169_crop_top.png');
}

cropTop().catch(console.error);

