import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const positions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_mapped_positions.json'), 'utf8'));
const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_official_keys.json'), 'utf8'));

const DIAGRAMS_DIR = path.resolve(__dirname, 'current_electricity_clean_diagrams');
if (!fs.existsSync(DIAGRAMS_DIR)) {
  fs.mkdirSync(DIAGRAMS_DIR, { recursive: true });
}

// Diagram keyword regex
const DIAG_KEYWORD = /(?:as\s+shown\s+in(?:\s+the)?\s+(?:figure|diagram|circuit)|in\s+the\s+(?:figure|diagram|circuit|given\s+figure|adjacent\s+figure)|shown\s+in\s+(?:the\s+)?(?:figure|diagram|circuit)|given\s+in\s+(?:the\s+)?(?:figure|diagram)|shown\s+below|represented\s+by\s+the\s+(?:graph|figure|diagram)|plotted\s+as\s+a\s+function|variation\s+of\s+.*?(?:graph|curve)|circuit\s+diagram|wheatstone\s+bridge|meter\s+bridge|potentiometer\s+circuit)/i;

function trimAndSave(canvas, yStart, yEnd, outPath) {
  const ctx = canvas.getContext('2d');
  const h = Math.max(1, yEnd - yStart);
  if (h < 25) return false;

  const sliceData = ctx.getImageData(0, yStart, canvas.width, h);
  const data = sliceData.data;

  let minX = canvas.width, minY = h, maxX = 0, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 60; x < canvas.width - 60; x++) {
      const idx = (y * canvas.width + x) * 4;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      if (r < 225 || g < 225 || b < 225) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (minX >= maxX || minY >= maxY) return false;
  const trimW = maxX - minX + 1;
  const trimH = maxY - minY + 1;
  if (trimW < 30 || trimH < 30) return false;

  const pad = 12;
  const cropX = Math.max(0, minX - pad);
  const cropY = Math.max(0, yStart + minY - pad);
  const finalW = Math.min(canvas.width - cropX, trimW + pad * 2);
  const finalH = Math.min(canvas.height - cropY, trimH + pad * 2);

  const outCanvas = createCanvas(finalW, finalH);
  const outCtx = outCanvas.getContext('2d');
  outCtx.fillStyle = '#ffffff';
  outCtx.fillRect(0, 0, finalW, finalH);
  outCtx.drawImage(canvas, cropX, cropY, finalW, finalH, 0, 0, finalW, finalH);

  fs.writeFileSync(outPath, outCanvas.toBuffer('image/png'));
  return true;
}

// Flatten lines with metadata
const allLines = [];
for (let p = 1; p <= 211; p++) {
  const lines = (cache[String(p)] || '').split('\n');
  lines.forEach((l, idx) => {
    allLines.push({ p, lIdx: idx, text: l.trim() });
  });
}

async function cropDiagrams() {
  console.log('=== CROPPING CURRENT ELECTRICITY QUESTION DIAGRAMS ===');

  const croppedMap = {};
  let totalCandidates = 0;
  let successCrops = 0;

  for (let i = 0; i < positions.length; i++) {
    const pos = positions[i];
    const qNum = pos.qNum;
    const blockLines = allLines.slice(pos.startIdx, pos.endIdx);
    const fullText = blockLines.map(l => l.text).join(' ');

    const hasKeyword = DIAG_KEYWORD.test(fullText);
    if (!hasKeyword) continue;

    totalCandidates++;
    const pageNum = pos.p;
    const pPad = String(pageNum).padStart(3, '0');
    const pagePath = path.resolve(__dirname, `current_electricity_pages/page_${pPad}.png`);
    if (!fs.existsSync(pagePath)) continue;

    const img = await loadImage(pagePath);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Estimate diagram Y region
    // The page has img.height ~ 1584. Number of lines on this page is linesOnPage
    const pageLines = (cache[String(pageNum)] || '').split('\n');
    const startLIdx = allLines[pos.startIdx]?.lIdx || 0;
    const endLIdx = allLines[Math.min(pos.endIdx, allLines.length - 1)]?.lIdx || pageLines.length;

    // Approximate pixel coordinates
    const approxLineH = img.height / Math.max(20, pageLines.length);
    const yStart = Math.max(0, Math.round((startLIdx + 1) * approxLineH - 10));
    const yEnd = Math.min(img.height, Math.round(endLIdx * approxLineH + 10));

    const outFileName = `q${qNum}_question_diagram.png`;
    const outPath = path.join(DIAGRAMS_DIR, outFileName);

    const saved = trimAndSave(canvas, yStart, yEnd, outPath);
    if (saved) {
      croppedMap[outFileName] = true;
      successCrops++;
    }
  }

  console.log(`Diagram candidates with keyword: ${totalCandidates}`);
  console.log(`Successfully cropped diagrams: ${successCrops}`);
}

cropDiagrams().catch(console.error);
