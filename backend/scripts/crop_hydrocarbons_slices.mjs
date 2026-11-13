import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const positions = JSON.parse(fs.readFileSync('./backend/scripts/hydrocarbons_q_positions.json', 'utf8'));
const OUT_DIR = './backend/scripts/hydrocarbons_q_slices';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function cropSlices() {
  const pageImages = {};
  for (let p = 2; p <= 47; p++) {
    const pagePath = `./backend/scripts/hydrocarbons_pages/page_${p}.png`;
    pageImages[p] = await loadImage(pagePath);
  }

  console.log('Loaded all page images. Cropping slices...');

  for (let i = 0; i < positions.length; i++) {
    const current = positions[i];
    const qNum = current.qNum;
    const pageNum = current.pageNum;
    const img = pageImages[pageNum];

    const yStart = Math.max(0, current.y - 20);
    const nextOnPage = positions.find((p, idx) => idx > i && p.pageNum === pageNum);
    const yEnd = nextOnPage ? nextOnPage.y - 15 : 1530;

    const sliceHeight = Math.max(50, yEnd - yStart);
    const sliceWidth = img.width;

    const canvas = createCanvas(sliceWidth, sliceHeight);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      img,
      0, yStart, sliceWidth, sliceHeight,
      0, 0, sliceWidth, sliceHeight
    );

    const buf = canvas.toBuffer('image/png');
    const outPath = path.join(OUT_DIR, `q_${qNum}.png`);
    fs.writeFileSync(outPath, buf);
  }

  console.log(`Cropped and saved slices for all ${positions.length} questions into ${OUT_DIR}`);
}

cropSlices().catch(err => {
  console.error(err);
  process.exit(1);
});

