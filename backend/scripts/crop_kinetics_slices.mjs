import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const qPositions = JSON.parse(fs.readFileSync('./backend/scripts/kinetics_q_positions.json', 'utf8'));
const pagesDir = './backend/scripts/kinetics_pages';
const slicesDir = './backend/scripts/kinetics_q_slices';

if (!fs.existsSync(slicesDir)) {
  fs.mkdirSync(slicesDir, { recursive: true });
}

async function cropSlices() {
  // Group questions by page
  const pageMap = {};
  for (const q of qPositions) {
    if (!pageMap[q.pageNum]) pageMap[q.pageNum] = [];
    pageMap[q.pageNum].push(q);
  }

  for (let pageNum = 2; pageNum <= 23; pageNum++) {
    const pageQs = pageMap[pageNum] || [];
    if (pageQs.length === 0) continue;

    const pageImgPath = path.join(pagesDir, `page_${pageNum}.png`);
    const img = await loadImage(pageImgPath);

    for (let i = 0; i < pageQs.length; i++) {
      const curQ = pageQs[i];
      const nextQ = pageQs[i + 1];

      const startY = Math.max(0, curQ.y - 15);
      // If there's a next question on same page, end before it; otherwise end above footer (approx y=1560)
      const endY = nextQ ? Math.max(startY + 50, nextQ.y - 15) : Math.min(img.height - 120, 1560);
      const height = Math.max(40, endY - startY);

      const canvas = createCanvas(img.width, height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, startY, img.width, height, 0, 0, img.width, height);

      const outPath = path.join(slicesDir, `q_${curQ.qNum}.png`);
      fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    }
    console.log(`Cropped page ${pageNum} questions.`);
  }
  console.log('All question slices cropped successfully.');
}

cropSlices().catch(err => {
  console.error(err);
  process.exit(1);
});
