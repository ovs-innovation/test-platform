import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.resolve(__dirname, '../uploads/goc_diagrams');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const categorized = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_categorized_questions.json'), 'utf8'));
const positions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_q_positions.json'), 'utf8'));
const items = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_pdf_items.json'), 'utf8'));
const gapsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_diagram_gaps.json'), 'utf8'));

// Auto-trim canvas
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

  // Minimum size: at least 25x20 and some real ink
  if (maxX <= minX + 25 || maxY <= minY + 20) {
    return null;
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
  return { trimmed, cropW, cropH };
}

function isValidContentItem(it) {
  if (it.x > 950) return false;
  if (/^Open solution$/i.test(it.str.trim())) return false;
  return true;
}

async function cropAllDiagrams() {
  console.log('=== Starting Master GOC Diagram Crop ===');
  const pageImgCache = {};

  async function getPageImage(pNum) {
    if (!pageImgCache[pNum]) {
      const pad = String(pNum).padStart(3, '0');
      const pageFile = path.resolve(__dirname, `goc_jee_pages/page_${pad}.png`);
      if (!fs.existsSync(pageFile)) {
        console.warn(`Page file not found: ${pageFile}`);
        return null;
      }
      pageImgCache[pNum] = await loadImage(fs.readFileSync(pageFile));
    }
    return pageImgCache[pNum];
  }

  let stemCropsCount = 0;
  let optionCropsCount = 0;
  const cropManifest = {};

  for (const cat of categorized) {
    const qNum = cat.qNum;
    const pNum = cat.pageNum;
    const pos = positions.find(p => p.qNum === qNum);
    const nextPos = positions.find(p => p.pageNum === pNum && p.y > pos.y);
    const yEnd = nextPos ? nextPos.y : 1530;

    const pageImg = await getPageImage(pNum);
    if (!pageImg) continue;

    const qItems = items
      .filter(it => it.pageNum === pNum && it.y >= pos.y - 5 && it.y < yEnd && isValidContentItem(it))
      .sort((a,b) => a.y - b.y);

    const optA = qItems.find(it => /^\(?A\)?$/i.test(it.str.trim()) || it.str.trim().startsWith('(A)'));
    const optB = qItems.find(it => /^\(?B\)?$/i.test(it.str.trim()) || it.str.trim().startsWith('(B)'));
    const optC = qItems.find(it => /^\(?C\)?$/i.test(it.str.trim()) || it.str.trim().startsWith('(C)'));
    const optD = qItems.find(it => /^\(?D\)?$/i.test(it.str.trim()) || it.str.trim().startsWith('(D)'));

    cropManifest[qNum] = {
      stemDiag: null,
      optA: null,
      optB: null,
      optC: null,
      optD: null
    };

    // 1. STEM DIAGRAM CROP
    if (cat.hasStemDiag) {
      // Find the gaps in stem
      const qGapsObj = gapsData.find(g => g.qNum === qNum);
      const stemGaps = qGapsObj
        ? qGapsObj.largeGaps.filter(lg => lg.beforeText !== '[END OF Q]' && !lg.afterText.startsWith('(A)') && !lg.afterText.startsWith('(B)') && !lg.afterText.startsWith('(C)') && !lg.afterText.startsWith('(D)'))
        : [];

      let yTop, yBottom;
      if (stemGaps.length === 1) {
        yTop = Math.max(0, stemGaps[0].yTop - 5);
        yBottom = stemGaps[0].yBottom + 5;
      } else if (stemGaps.length > 1) {
        yTop = Math.max(0, stemGaps[0].yTop - 5);
        yBottom = stemGaps[stemGaps.length - 1].yBottom + 5;
      } else {
        // Fallback: between header and optA (or yEnd)
        yTop = Math.max(0, Math.round(pos.y + 25));
        yBottom = optA ? Math.round(optA.y - 8) : Math.round(yEnd - 15);
      }

      const h = yBottom - yTop;
      if (h > 20) {
        const canvas = createCanvas(880, h);
        canvas.getContext('2d').drawImage(pageImg, 60, yTop, 880, h, 0, 0, 880, h);
        const res = trimCanvas(canvas);
        if (res) {
          const fileName = `q${qNum}_diag.png`;
          const filePath = path.join(OUT_DIR, fileName);
          fs.writeFileSync(filePath, res.trimmed.toBuffer('image/png'));
          cropManifest[qNum].stemDiag = fileName;
          stemCropsCount++;
        }
      }
    }

    // 2. OPTION DIAGRAMS CROP
    if (cat.hasOptionDiags && optA && optB && optC && optD) {
      const optBounds = [
        { letter: 'a', yTop: optA.y - 8, yBottom: optB.y - 8 },
        { letter: 'b', yTop: optB.y - 8, yBottom: optC.y - 8 },
        { letter: 'c', yTop: optC.y - 8, yBottom: optD.y - 8 },
        { letter: 'd', yTop: optD.y - 8, yBottom: yEnd - 10 }
      ];

      for (const b of optBounds) {
        const h = b.yBottom - b.yTop;
        if (h > 20) {
          const canvas = createCanvas(860, h);
          // Crop starting at x = 110 to exclude (A), (B), (C), (D) text
          canvas.getContext('2d').drawImage(pageImg, 110, b.yTop, 840, h, 0, 0, 840, h);
          let res = trimCanvas(canvas);
          if (!res) {
            // Try starting at x = 60 if option structure was aligned left
            const canvasFull = createCanvas(880, h);
            canvasFull.getContext('2d').drawImage(pageImg, 60, b.yTop, 880, h, 0, 0, 880, h);
            res = trimCanvas(canvasFull);
          }
          if (res) {
            const fileName = `q${qNum}_opt_${b.letter}.png`;
            const filePath = path.join(OUT_DIR, fileName);
            fs.writeFileSync(filePath, res.trimmed.toBuffer('image/png'));
            if (b.letter === 'a') cropManifest[qNum].optA = fileName;
            if (b.letter === 'b') cropManifest[qNum].optB = fileName;
            if (b.letter === 'c') cropManifest[qNum].optC = fileName;
            if (b.letter === 'd') cropManifest[qNum].optD = fileName;
            optionCropsCount++;
          }
        }
      }
    }
  }

  console.log(`=== Crop Complete ===`);
  console.log(`Stem diagrams cropped: ${stemCropsCount}`);
  console.log(`Option diagrams cropped: ${optionCropsCount}`);
  fs.writeFileSync(path.resolve(__dirname, 'goc_crop_manifest.json'), JSON.stringify(cropManifest, null, 2));
}

cropAllDiagrams().catch(console.error);
