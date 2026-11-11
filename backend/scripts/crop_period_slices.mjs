import { createCanvas, loadImage } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';

const POSITIONS = JSON.parse(fs.readFileSync('backend/scripts/period_q_positions.json', 'utf8'));
const PAGES_DIR = path.resolve('backend/scripts/period_pages');
const OUTPUT_DIR = path.resolve('backend/scripts/period_q_slices');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function cropSlices() {
  const pageCache = {};

  for (const pos of POSITIONS) {
    const pageFile = path.join(PAGES_DIR, `page_${pos.pageNum}.png`);
    if (!pageCache[pos.pageNum]) {
      pageCache[pos.pageNum] = await loadImage(pageFile);
    }
    const img = pageCache[pos.pageNum];

    const width = img.width;
    const height = Math.max(10, pos.height);

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      img,
      0, pos.top, width, height,
      0, 0, width, height
    );

    const outPath = path.join(OUTPUT_DIR, `q_${pos.qNum}.png`);
    fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
  }
  console.log(`Cropped all ${POSITIONS.length} question slices.`);
}

cropSlices().catch(console.error);
