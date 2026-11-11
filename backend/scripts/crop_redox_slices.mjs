import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const positions = JSON.parse(fs.readFileSync('backend/scripts/redox_q_positions.json', 'utf8'));
const slicesDir = path.join(process.cwd(), 'backend/scripts/redox_q_slices');

if (!fs.existsSync(slicesDir)) {
  fs.mkdirSync(slicesDir, { recursive: true });
}

async function cropSlices() {
  // Load all rendered pages (scale 2.0)
  const pageImages = {};
  for (let p = 2; p <= 8; p++) {
    const pPath = path.join(process.cwd(), `backend/scripts/redox_pages/page_${p}.png`);
    pageImages[p] = await loadImage(pPath);
  }

  const scale = 2.0;
  const footerTop = 780 * scale; // roughly before footer
  const leftX = 30 * scale;
  const sliceWidth = (595 - 40) * scale;

  for (let i = 0; i < positions.length; i++) {
    const q = positions[i];
    const nextQ = positions[i + 1];

    let startY = (q.y - 10) * scale;
    let endY;

    if (nextQ && nextQ.pageNum === q.pageNum) {
      endY = (nextQ.y - 10) * scale;
    } else {
      endY = footerTop;
    }

    const height = Math.max(endY - startY, 50);

    const canvas = createCanvas(sliceWidth, height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      pageImages[q.pageNum],
      leftX, startY, sliceWidth, height,
      0, 0, sliceWidth, height
    );

    const outPath = path.join(slicesDir, `q_${q.num}.png`);
    fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    console.log(`Cropped Q${q.num}: page ${q.pageNum}, height=${height} -> ${outPath}`);
  }
}

cropSlices().catch(console.error);
