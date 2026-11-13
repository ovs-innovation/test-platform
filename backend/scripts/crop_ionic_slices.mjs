import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const qPos = JSON.parse(fs.readFileSync('backend/scripts/ionic_q_positions.json', 'utf8'));
const SLICES_DIR = path.join('backend/scripts/ionic_q_slices');

if (!fs.existsSync(SLICES_DIR)) {
  fs.mkdirSync(SLICES_DIR, { recursive: true });
}

async function main() {
  // Group by page
  const pageQuestions = {};
  for (let q = 1; q <= 89; q++) {
    const p = qPos[q];
    if (!pageQuestions[p.page]) pageQuestions[p.page] = [];
    pageQuestions[p.page].push({ qNum: q, y: p.y });
  }

  // Load and crop each page
  for (const pageNumStr of Object.keys(pageQuestions)) {
    const pageNum = parseInt(pageNumStr, 10);
    const qs = pageQuestions[pageNum].sort((a, b) => a.y - b.y);

    const pageImgPath = path.join('backend/scripts/ionic_pages', `page_${pageNum}.png`);
    const img = await loadImage(pageImgPath);

    for (let i = 0; i < qs.length; i++) {
      const current = qs[i];
      const startY = Math.max(0, current.y - 35);
      let endY;

      if (i + 1 < qs.length) {
        endY = Math.min(img.height, qs[i + 1].y - 15);
      } else {
        endY = Math.min(img.height - 120, 1580);
      }

      const cropHeight = Math.max(50, endY - startY);
      const cropWidth = 1100; // exclude QR code on far right or keep wide
      const cropX = 50;

      const canvas = createCanvas(cropWidth, cropHeight);
      const ctx = canvas.getContext('2d');

      ctx.drawImage(
        img,
        cropX,
        startY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      const slicePath = path.join(SLICES_DIR, `q_${current.qNum}.png`);
      fs.writeFileSync(slicePath, canvas.toBuffer('image/png'));
    }
    console.log(`Page ${pageNum} cropped: ${qs.map(q => 'Q' + q.qNum).join(', ')}`);
  }

  console.log('All 89 question slices cropped successfully.');
}

main().catch(console.error);

