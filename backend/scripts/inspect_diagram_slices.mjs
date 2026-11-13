import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

async function inspectSlices() {
  const qs = [22, 27, 52, 62];
  for (const q of qs) {
    const imgPath = `./backend/scripts/biomolecules_q_slices/q_${q}.png`;
    const img = await loadImage(imgPath);
    console.log(`Q${q} slice size: ${img.width} x ${img.height}`);
  }
}

inspectSlices().catch(console.error);
