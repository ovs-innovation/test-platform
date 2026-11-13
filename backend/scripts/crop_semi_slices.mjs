import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const positions = JSON.parse(fs.readFileSync('backend/scripts/semi_q_positions.json', 'utf8'));
const outDir = 'backend/scripts/semi_q_slices';

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
    const pageImage = await loadImage(`backend/scripts/semi_pages/page_${pageNum}.png`);
    const qs = byPage[pageNum];
    const width = pageImage.width;
    const height = pageImage.height;

    for (let i = 0; i < qs.length; i++) {
      const q = qs[i];
      const startY = Math.max(0, Math.floor(q.rawY - 45));
      let endY;
      if (i + 1 < qs.length) {
        endY = Math.min(height, Math.floor(qs[i + 1].rawY - 50));
      } else {
        endY = height - 120; // Bottom margin above footer
      }

      const sliceHeight = Math.max(80, endY - startY);
      const canvas = createCanvas(width, sliceHeight);
      const ctx = canvas.getContext('2d');

      ctx.drawImage(pageImage, 0, startY, width, sliceHeight, 0, 0, width, sliceHeight);

      const outPath = path.join(outDir, `q_${q.qNum}.png`);
      fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    }
  }
  console.log(`All ${positions.length} question slices created!`);
}

cropSlices().catch(console.error);

