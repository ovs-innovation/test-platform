import fs from 'fs';
import { loadImage } from '@napi-rs/canvas';

async function scanHeights() {
  const tall = [];
  for (let q = 1; q <= 104; q++) {
    const img = await loadImage(`backend/scripts/moving_charges_q_slices/q_${q}.png`);
    if (img.height > 400) {
      tall.push({ q, height: img.height });
    }
  }
  console.log('Tall slices (>400px):', tall);
}

scanHeights().catch(console.error);

