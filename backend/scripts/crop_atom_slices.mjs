import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const positions = JSON.parse(fs.readFileSync('backend/scripts/atom_q_positions.json', 'utf8'));
const outDir = 'backend/scripts/atom_q_slices';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function cropSlices() {
  const byPage = {};
  for (const q of positions) {
    if (!byPage[q.page]) byPage[q.page] = [];
    byPage[q.page].push(q);
  }

  for (const pageNum of Object.keys(byPage)) {
    const pageImage = await loadImage(`backend/scripts/atom_pages/page_${pageNum}.png`);
    const qs = byPage[pageNum];
    const width = pageImage.width;
    const height = pageImage.height;

    for (let i = 0; i < qs.length; i++) {
      const q = qs[i];
      const yStart = Math.max(0, q.yTop - 35);
      
      let yEnd;
      if (i + 1 < qs.length) {
        yEnd = qs[i + 1].yTop - 25;
      } else {
        yEnd = height - 120;
      }

      const sliceHeight = Math.max(80, yEnd - yStart);
      const canvas = createCanvas(width, sliceHeight);
      const ctx = canvas.getContext('2d');

      ctx.drawImage(pageImage, 0, yStart, width, sliceHeight, 0, 0, width, sliceHeight);

      const buffer = canvas.toBuffer('image/png');
      const outFile = path.join(outDir, `q_${q.qNum}.png`);
      fs.writeFileSync(outFile, buffer);
    }
    console.log(`Cropped page ${pageNum} (${qs.length} questions)`);
  }
  console.log('All 90 question slices cropped successfully!');
}

cropSlices().catch(console.error);
