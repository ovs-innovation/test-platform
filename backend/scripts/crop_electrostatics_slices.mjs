import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const positions = JSON.parse(fs.readFileSync('scripts/electrostatics_q_positions.json', 'utf8'));
const outDir = 'scripts/electrostatics_q_slices';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Group by page
const pages = {};
for (const [qKey, val] of Object.entries(positions)) {
  const qNum = parseInt(qKey.replace('Q', ''));
  if (!pages[val.page]) pages[val.page] = [];
  pages[val.page].push({ qNum, qKey, y: val.y });
}

async function crop() {
  for (const [pageNumStr, qList] of Object.entries(pages)) {
    const pageNum = parseInt(pageNumStr);
    const imgBuf = fs.readFileSync(`scripts/electrostatics_pages/page_${pageNum}.png`);
    const pageImg = await loadImage(imgBuf);

    qList.sort((a, b) => a.y - b.y);

    for (let i = 0; i < qList.length; i++) {
      const q = qList[i];
      const startY = Math.max(0, q.y - 40);
      let endY;
      if (i < qList.length - 1) {
        endY = qList[i + 1].y - 30;
      } else {
        endY = Math.min(pageImg.height - 150, q.y + 400);
      }

      const h = endY - startY;
      if (h <= 0) continue;

      const canvas = createCanvas(pageImg.width - 100, h);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(pageImg, 50, startY, pageImg.width - 100, h, 0, 0, pageImg.width - 100, h);

      const outPath = path.join(outDir, `q${q.qNum}.png`);
      fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    }
  }
  console.log('Finished cropping all 95 question slices.');
}

crop().catch(console.error);

