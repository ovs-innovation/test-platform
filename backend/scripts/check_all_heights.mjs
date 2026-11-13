import fs from 'fs';
import { loadImage } from '@napi-rs/canvas';

async function checkAllHeights() {
  const heights = [];
  for (let q = 1; q <= 81; q++) {
    const imgPath = `./backend/scripts/biomolecules_q_slices/q_${q}.png`;
    const img = await loadImage(imgPath);
    heights.push({ q, height: img.height });
  }
  heights.sort((a,b) => b.height - a.height);
  console.log('Top 15 tallest slices:');
  for (const h of heights.slice(0, 15)) {
    console.log(`Q${h.q}: height=${h.height}`);
  }
}

checkAllHeights().catch(console.error);

