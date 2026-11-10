import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, 'waves_pages');
const outDir = path.resolve(__dirname, '../../frontend/public/uploads/waves');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function crop(pageImg, rect, outName) {
  const img = await loadImage(pageImg);
  const canvas = createCanvas(rect.w, rect.h);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, rect.x, rect.y, rect.w, rect.h, 0, 0, rect.w, rect.h);
  const buf = canvas.toBuffer('image/png');
  const outPath = path.join(outDir, outName);
  fs.writeFileSync(outPath, buf);
  console.log(`Saved ${outName} (${rect.w}x${rect.h})`);
}

async function main() {
  // Q82 diagram on page 15
  // Let's crop roughly x: 80, y: 600, w: 500, h: 300
  await crop(path.join(pagesDir, 'page_15.png'), { x: 80, y: 600, w: 500, h: 300 }, 'q82_diagram.png');
}

main().catch(console.error);

