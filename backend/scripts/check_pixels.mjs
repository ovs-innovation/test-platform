import { loadImage } from '@napi-rs/canvas';
import { createCanvas } from '@napi-rs/canvas';
import fs from 'fs';

async function checkPixels() {
  const img = await loadImage('backend/scripts/p128_y100_220.png');
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, img.width, img.height).data;
  
  let darkPixels = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i+1], b = data[i+2];
    const brightness = (r + g + b) / 3;
    if (brightness < 128) {
      darkPixels++;
    }
  }
  console.log(`Image size: ${img.width}x${img.height}, dark pixels: ${darkPixels}`);
}

checkPixels().catch(console.error);

