import fs from 'fs';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const diagQs = [1, 3, 4, 5, 6, 7, 13, 16, 18, 21, 23, 26, 28, 29, 30, 31, 33, 37, 38, 40, 41, 42, 49, 55, 57, 59, 63, 64, 68, 75, 77, 78, 82];

async function inspectSlices() {
  for (const q of diagQs) {
    const img = await loadImage(`./backend/scripts/hydrocarbons_q_slices/q_${q}.png`);
    console.log(`Q${q} slice: ${img.width}x${img.height}`);
  }
}

inspectSlices().catch(console.error);

