import { createCanvas, loadImage } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';

const SLICES_DIR = path.resolve('backend/scripts/bond_q_slices');

async function findBounds(img, startY, endY, startX, endX) {
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, img.width, img.height).data;

  let minX = endX, maxX = startX, minY = endY, maxY = startY;
  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      const idx = (y * img.width + x) * 4;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      if (r < 230 || g < 230 || b < 230) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY };
}

async function main() {
  const q15 = await loadImage(path.join(SLICES_DIR, 'q_15.png'));
  console.log('Q15 (A) (y: 80 to 450, x: 50 to 550):', await findBounds(q15, 80, 450, 50, 550));
  console.log('Q15 (B) (y: 450 to 700, x: 50 to 550):', await findBounds(q15, 450, 700, 50, 550));
  console.log('Q15 (C) (y: 650 to 880, x: 50 to 550):', await findBounds(q15, 650, 880, 50, 550));

  const q42 = await loadImage(path.join(SLICES_DIR, 'q_42.png'));
  console.log('Q42 (A) (y: 80 to 300, x: 50 to 550):', await findBounds(q42, 80, 300, 50, 550));
  console.log('Q42 (B) (y: 280 to 480, x: 50 to 550):', await findBounds(q42, 280, 480, 50, 550));
  console.log('Q42 (C) (y: 470 to 670, x: 50 to 550):', await findBounds(q42, 470, 670, 50, 550));
  console.log('Q42 (D) (y: 650 to 880, x: 50 to 550):', await findBounds(q42, 650, 880, 50, 550));

  const q79 = await loadImage(path.join(SLICES_DIR, 'q_79.png'));
  console.log('Q79 (A) (y: 80 to 380, x: 50 to 450):', await findBounds(q79, 80, 380, 50, 450));
  console.log('Q79 (B) (y: 350 to 550, x: 50 to 450):', await findBounds(q79, 350, 550, 50, 450));
  console.log('Q79 (C) (y: 500 to 700, x: 50 to 450):', await findBounds(q79, 500, 700, 50, 450));
  console.log('Q79 (D) (y: 650 to 850, x: 50 to 450):', await findBounds(q79, 650, 850, 50, 450));

  const q157 = await loadImage(path.join(SLICES_DIR, 'q_157.png'));
  console.log('Q157 (A) (y: 80 to 450, x: 50 to 500):', await findBounds(q157, 80, 450, 50, 500));
  console.log('Q157 (B) (y: 400 to 650, x: 50 to 500):', await findBounds(q157, 400, 650, 50, 500));
  console.log('Q157 (C) (y: 550 to 800, x: 50 to 600):', await findBounds(q157, 550, 800, 50, 600));
  console.log('Q157 (D) (y: 750 to 1100, x: 50 to 600):', await findBounds(q157, 750, 1100, 50, 600));
}

main().catch(console.error);
