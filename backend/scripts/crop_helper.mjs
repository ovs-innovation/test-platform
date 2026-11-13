import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const outDir = './backend/scripts/alcohols_diagrams';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Bounding box in PDF coords (scale = 2.0)
// pageNum, x, y, width, height
export async function cropBox(pageNum, x, y, w, h, outName) {
  const pagePath = `./backend/scripts/alcohols_pages/page_${pageNum}.png`;
  const img = await loadImage(pagePath);
  
  const scale = 2.0;
  const sx = Math.round(x * scale);
  const sy = Math.round(y * scale);
  const sw = Math.round(w * scale);
  const sh = Math.round(h * scale);

  const canvas = createCanvas(sw, sh);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

  const buf = canvas.toBuffer('image/png');
  const outFile = path.join(outDir, outName);
  fs.writeFileSync(outFile, buf);
  console.log(`Cropped: ${outFile} (${sw}x${sh})`);
}

