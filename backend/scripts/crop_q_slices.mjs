import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const positions = JSON.parse(fs.readFileSync('scripts/q_positions.json', 'utf8'));
const outDir = 'scripts/rotational_q_slices';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Group by page
const pages = {};
for (const [qKey, val] of Object.entries(positions)) {
  const qNum = parseInt(qKey.replace('Q', ''));
  if (qNum < 61 || qNum > 108) continue;
  if (!pages[val.page]) pages[val.page] = [];
  pages[val.page].push({ qNum, qKey, y: val.y });
}

async function crop() {
  for (const [pageNumStr, qList] of Object.entries(pages)) {
    const pageNum = parseInt(pageNumStr);
    const imgBuf = fs.readFileSync(`scripts/rotational_pages/page_${pageNum}.png`);
    const pageImg = await loadImage(imgBuf);

    qList.sort((a, b) => a.y - b.y);

    for (let i = 0; i < qList.length; i++) {
      const q = qList[i];
      const startY = Math.max(0, q.y - 40);
      let endY;
      if (i < qList.length - 1) {
        endY = qList[i + 1].y - 30;
      } else {
        // Last question on page - stop before footer (around y = 1450)
        endY = Math.min(pageImg.height - 150, q.y + 350);
        if (q.qNum === 67 || q.qNum === 75 || q.qNum === 88 || q.qNum === 90 || q.qNum === 95 || q.qNum === 98) {
          endY = Math.min(pageImg.height - 150, q.y + 600);
        }
      }

      const h = endY - startY;
      if (h <= 0) continue;

      const canvas = createCanvas(pageImg.width - 100, h);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(pageImg, 50, startY, pageImg.width - 100, h, 0, 0, pageImg.width - 100, h);

      const outPath = path.join(outDir, `q${q.qNum}.png`);
      fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
      console.log(`Saved Q${q.qNum} (height ${h}) -> ${outPath}`);
    }
  }
}

crop().catch(console.error);

