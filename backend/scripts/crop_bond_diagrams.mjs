import { createCanvas, loadImage } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';

const SLICES_DIR = path.resolve('backend/scripts/bond_q_slices');
const OUT_DIR = path.resolve('backend/scripts/bond_diagrams');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function crop(sliceName, outName, sx, sy, sw, sh) {
  const img = await loadImage(path.join(SLICES_DIR, sliceName));
  const canvas = createCanvas(sw, sh);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
  fs.writeFileSync(path.join(OUT_DIR, outName), canvas.toBuffer('image/png'));
  console.log(`Cropped ${outName} (${sw}x${sh}) from ${sliceName}`);
}

async function main() {
  // Let's inspect slice image dimensions
  for (const qNum of [5, 15, 33, 36, 42, 79, 157]) {
    const img = await loadImage(path.join(SLICES_DIR, `q_${qNum}.png`));
    console.log(`Q${qNum} slice: ${img.width}x${img.height}`);
  }
}

main().catch(console.error);

