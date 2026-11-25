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

const positions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_q_positions.json'), 'utf8'));
const items = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_pdf_items.json'), 'utf8'));
const questions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_sliced_questions.json'), 'utf8'));

function isValid(it) {
  if (it.x > 950) return false;
  if (/^Open solution$/i.test(it.str.trim())) return false;
  return true;
}

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
      const r = data[idx], g = data[idx + 1], b = data[idx + 2], a = data[idx + 3];
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
  trimmed.getContext('2d').drawImage(sourceCanvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);
  return { trimmed, cropW, cropH };
}

async function cropNumericalDiagrams() {
  const pageImgCache = {};

  async function getPageImage(pNum) {
    if (!pageImgCache[pNum]) {
      const pad = String(pNum).padStart(3, '0');
      const pageFile = path.resolve(__dirname, `goc_jee_pages/page_${pad}.png`);
      pageImgCache[pNum] = await loadImage(fs.readFileSync(pageFile));
    }
    return pageImgCache[pNum];
  }

  let croppedCount = 0;

  for (let qNum = 293; qNum <= 337; qNum++) {
    const q = questions.find(x => x.qNum === qNum);
    if (!q || q.type !== 'numerical') continue;

    const pos = positions.find(p => p.qNum === qNum);
    const pNum = pos.pageNum;
    const nextPos = positions.find(p => p.pageNum === pNum && p.y > pos.y);
    const yEnd = nextPos ? nextPos.y : 1530;

    const qItems = items
      .filter(it => it.pageNum === pNum && it.y >= pos.y - 5 && it.y < yEnd && isValid(it))
      .sort((a,b) => a.y - b.y);

    const lastItem = qItems[qItems.length - 1];
    if (!lastItem) continue;

    const yTop = Math.max(0, Math.round(lastItem.y + (lastItem.height || 15) + 5));
    const yBottom = Math.round(yEnd - 10);
    const h = yBottom - yTop;

    if (h > 40) {
      const pageImg = await getPageImage(pNum);
      const canvas = createCanvas(880, h);
      canvas.getContext('2d').drawImage(pageImg, 60, yTop, 880, h, 0, 0, 880, h);

      const res = trimCanvas(canvas);
      if (res) {
        const fileName = `q${qNum}_diag.png`;
        const filePath = path.join(OUT_DIR, fileName);
        fs.writeFileSync(filePath, res.trimmed.toBuffer('image/png'));
        console.log(`Saved numerical diagram for Q${qNum}: ${res.cropW}x${res.cropH} (${fileName})`);
        croppedCount++;
      }
    }
  }

  console.log(`Cropped ${croppedCount} numerical diagrams!`);
}

cropNumericalDiagrams().catch(console.error);
