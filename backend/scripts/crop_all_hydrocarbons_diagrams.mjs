import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const OUT_DIR = './backend/uploads/hydrocarbons';
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const items = JSON.parse(fs.readFileSync('./backend/scripts/hydrocarbons_pdf_items.json', 'utf8'));
const positions = JSON.parse(fs.readFileSync('./backend/scripts/hydrocarbons_q_positions.json', 'utf8'));

// Helper to auto-trim canvas
function trimCanvas(sourceCanvas, minContentPad = 8) {
  const ctx = sourceCanvas.getContext('2d');
  const w = sourceCanvas.width;
  const h = sourceCanvas.height;
  const imgData = ctx.getImageData(0, 0, w, h);
  const data = imgData.data;

  let minX = w, minY = h, maxX = 0, maxY = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      // Exclude white background and the blue "Open solution" button (r: 54, g: 118, b: 242)
      const isBlue = (r > 40 && r < 70 && g > 100 && g < 135 && b > 225);
      const isWhite = (r > 240 && g > 240 && b > 240);
      if (a > 30 && !isWhite && !isBlue) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX <= minX || maxY <= minY) {
    return null; // Empty or only background
  }

  const pad = minContentPad;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(w - 1, maxX + pad);
  maxY = Math.min(h - 1, maxY + pad);

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;

  const trimmed = createCanvas(cropW, cropH);
  const tCtx = trimmed.getContext('2d');
  tCtx.drawImage(sourceCanvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);
  return trimmed;
}

async function cropAll() {
  const pageImages = {};

  const diagStemQs = [1, 3, 4, 7, 13, 26, 29, 31, 33, 37, 40, 41, 42, 49, 55, 57, 63, 68, 82];
  const diagOptQs = [5, 6, 7, 13, 16, 18, 21, 23, 26, 28, 30, 31, 37, 38, 40, 42, 49, 55, 57, 59, 64, 75, 77, 78];

  const allRelevantQs = Array.from(new Set([...diagStemQs, ...diagOptQs])).sort((a,b) => a-b);
  console.log(`Processing diagrams for ${allRelevantQs.length} questions...`);

  for (const qNum of allRelevantQs) {
    const pos = positions.find(p => p.qNum === qNum);
    const pNum = pos.pageNum;
    if (!pageImages[pNum]) {
      pageImages[pNum] = await loadImage(`./backend/scripts/hydrocarbons_pages/page_${pNum}.png`);
    }
    const pageImg = pageImages[pNum];

    const currentIdx = positions.findIndex(p => p.qNum === qNum);
    const nextOnPage = positions.find((p, idx) => idx > currentIdx && p.pageNum === pNum);
    const yEnd = nextOnPage ? nextOnPage.y - 15 : 1530;

    const qItems = items.filter(it => it.pageNum === pNum && it.y >= pos.y - 15 && it.y < yEnd && it.y <= 1530);

    const optA = qItems.find(it => /^\(A\)$/i.test(it.str.trim()));
    const optB = qItems.find(it => /^\(B\)$/i.test(it.str.trim()));
    const optC = qItems.find(it => /^\(C\)$/i.test(it.str.trim()));
    const optD = qItems.find(it => /^\(D\)$/i.test(it.str.trim()));

    // Crop stem diagram if needed
    if (diagStemQs.includes(qNum)) {
      let yTop = pos.y + 30;
      let yBottom = optA ? optA.y - 10 : pos.y + 250;

      // Question 1 special handling: Statement I diagram and Statement II diagram
      if (qNum === 1) {
        // Crop statement I and statement II together or separate
        yTop = pos.y + 25;
        yBottom = optA.y - 10;
      }

      const stemW = 900;
      const stemH = Math.max(40, yBottom - yTop);
      const canvas = createCanvas(stemW, stemH);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(pageImg, 60, yTop, stemW, stemH, 0, 0, stemW, stemH);
      const trimmed = trimCanvas(canvas);
      if (trimmed) {
        const outPath = path.join(OUT_DIR, `q${qNum}_diag.png`);
        fs.writeFileSync(outPath, trimmed.toBuffer('image/png'));
        console.log(`Saved q${qNum}_diag.png (${trimmed.width}x${trimmed.height})`);
      }
    }

    // Crop option diagrams if needed
    if (diagOptQs.includes(qNum) && optA && optB && optC && optD) {
      const optCoords = [
        { letter: 'a', yStart: optA.y - 5, yEnd: optB.y - 10 },
        { letter: 'b', yStart: optB.y - 5, yEnd: optC.y - 10 },
        { letter: 'c', yStart: optC.y - 5, yEnd: optD.y - 10 },
        { letter: 'd', yStart: optD.y - 5, yEnd: yEnd - 5 }
      ];

      for (const opt of optCoords) {
        const optW = 850;
        const optH = Math.max(30, opt.yEnd - opt.yStart);
        const canvas = createCanvas(optW, optH);
        const ctx = canvas.getContext('2d');
        // Start from x = 110 to capture just the option content (or x = 60 to capture label too)
        ctx.drawImage(pageImg, 110, opt.yStart, optW, optH, 0, 0, optW, optH);
        const trimmed = trimCanvas(canvas);
        if (trimmed) {
          const outPath = path.join(OUT_DIR, `q${qNum}_opt_${opt.letter}.png`);
          fs.writeFileSync(outPath, trimmed.toBuffer('image/png'));
          console.log(`Saved q${qNum}_opt_${opt.letter}.png (${trimmed.width}x${trimmed.height})`);
        }
      }
    }
  }

  console.log('All diagram crops completed.');
}

cropAll().catch(console.error);
