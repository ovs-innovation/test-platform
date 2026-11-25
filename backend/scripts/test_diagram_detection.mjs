import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_sliced_questions.json'), 'utf8'));
const positions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_q_positions.json'), 'utf8'));
const items = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_pdf_items.json'), 'utf8'));

// Helper to count non-white non-blue pixels in a bounding box
function inspectRegion(ctx, x, y, w, h) {
  if (w <= 0 || h <= 0) return { nonWhiteCount: 0, density: 0 };
  const imgData = ctx.getImageData(x, y, w, h);
  const data = imgData.data;
  let nonWhiteCount = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
    const isWhite = (r > 240 && g > 240 && b > 240);
    const isBlue = (r > 40 && r < 70 && g > 100 && g < 135 && b > 225); // "Open solution" button
    if (a > 30 && !isWhite && !isBlue) {
      nonWhiteCount++;
    }
  }
  return { nonWhiteCount, density: nonWhiteCount / (w * h) };
}

async function run() {
  const pageImgCache = {};

  for (let q = 1; q <= 20; q++) {
    const qObj = questions.find(item => item.qNum === q);
    const pos = positions.find(p => p.qNum === q);
    const pNum = pos.pageNum;

    if (!pageImgCache[pNum]) {
      const pad = String(pNum).padStart(3, '0');
      const pageFile = path.resolve(__dirname, `goc_jee_pages/page_${pad}.png`);
      const img = await loadImage(fs.readFileSync(pageFile));
      const canvas = createCanvas(img.width, img.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      pageImgCache[pNum] = { img, canvas, ctx };
    }

    const { ctx } = pageImgCache[pNum];
    const nextPos = positions.find(p => p.pageNum === pNum && p.y > pos.y);
    const yEnd = nextPos ? nextPos.y : 1530;

    const qItems = items.filter(it => it.pageNum === pNum && it.y >= pos.y - 10 && it.y < yEnd);
    const optA = qItems.find(it => /^\(?A\)?$/i.test(it.str.trim()) || it.str.trim().startsWith('(A)'));
    const optB = qItems.find(it => /^\(?B\)?$/i.test(it.str.trim()) || it.str.trim().startsWith('(B)'));

    // Question stem items (before option A, or all if numerical)
    const stemItems = optA ? qItems.filter(it => it.y < optA.y - 5) : qItems;
    const lastStemItem = stemItems.sort((a,b) => b.y - a.y)[0];
    const stemTextEndY = lastStemItem ? (lastStemItem.y + (lastStemItem.height || 15)) : (pos.y + 30);

    const stemGap = optA ? (optA.y - stemTextEndY) : (yEnd - stemTextEndY);
    let stemHasDiag = false;
    let stemDensity = 0;
    if (stemGap > 35) {
      // Check region between stem text end and option A
      const res = inspectRegion(ctx, 60, Math.round(stemTextEndY + 5), 880, Math.round(stemGap - 10));
      stemDensity = res.density;
      if (res.nonWhiteCount > 200) {
        stemHasDiag = true;
      }
    }

    // Check options
    let optHasDiag = false;
    if (optA && optB) {
      const optGap = optB.y - optA.y;
      if (optGap > 60) {
        optHasDiag = true;
      }
    }

    console.log(`Q${q} (P${pNum}): stemGap=${Math.round(stemGap)} diag=${stemHasDiag} (density=${stemDensity.toFixed(4)}), optDiag=${optHasDiag}`);
  }
}

run().catch(console.error);
