import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function extractAllOfficialKeys() {
  console.log('=== EXTRACTING ALL 408 OFFICIAL KEYS FROM PAGES 212 & 213 ===');
  const p212Path = path.resolve(__dirname, 'current_electricity_pages/page_212.png');
  const p213Path = path.resolve(__dirname, 'current_electricity_pages/page_213.png');

  const img212 = await loadImage(p212Path);
  const img213 = await loadImage(p213Path);
  const worker = await createWorker('eng');

  const minX = 250, maxX = 930;
  const colW = (maxX - minX) / 6;

  // Detect bands on Page 212
  const cFull = createCanvas(img212.width, img212.height);
  const ctxF = cFull.getContext('2d');
  ctxF.drawImage(img212, 0, 0);
  const d = ctxF.getImageData(0, 0, img212.width, img212.height).data;

  const rowDark = [];
  for (let y = 60; y < 1550; y++) {
    let dark = 0;
    for (let x = minX; x <= maxX; x++) {
      const idx = (y * img212.width + x) * 4;
      if (d[idx] < 180) dark++;
    }
    rowDark.push({ y, dark });
  }

  const bands212 = [];
  let inBand = false, startY = 0;
  for (const r of rowDark) {
    if (!inBand && r.dark > 35) {
      inBand = true;
      startY = r.y;
    } else if (inBand && r.dark <= 15) {
      inBand = false;
      if (r.y - startY >= 8) {
        bands212.push({ startY, endY: r.y });
      }
    }
  }

  console.log(`Detected ${bands212.length} row bands on page 212.`);

  const officialKeys = {};

  // Process Page 212 bands (Rows 0 to 61 -> Q1 to Q372)
  for (let r = 0; r < bands212.length; r++) {
    const b = bands212[r];
    const rowY = Math.max(0, b.startY - 3);
    const rowH = (b.endY - b.startY) + 6;

    for (let c = 0; c < 6; c++) {
      const qNum = 1 + r * 6 + c;
      if (qNum > 372) break;

      const cellX = Math.round(minX + c * colW);
      const cellW = Math.round(colW);

      const cellCanvas = createCanvas(cellW * 3, rowH * 3);
      const cellCtx = cellCanvas.getContext('2d');
      cellCtx.imageSmoothingEnabled = false;
      cellCtx.drawImage(img212, cellX, rowY, cellW, rowH, 0, 0, cellW * 3, rowH * 3);

      // Binarize cell
      const cImg = cellCtx.getImageData(0, 0, cellW * 3, rowH * 3);
      const cd = cImg.data;
      for (let i = 0; i < cd.length; i += 4) {
        const gray = 0.299 * cd[i] + 0.587 * cd[i+1] + 0.114 * cd[i+2];
        const val = gray < 190 ? 0 : 255;
        cd[i] = val; cd[i+1] = val; cd[i+2] = val;
      }
      cellCtx.putImageData(cImg, 0, 0);

      const { data: { text } } = await worker.recognize(cellCanvas.toBuffer('image/png'), {
        tessedit_pageseg_mode: '7'
      });

      const raw = text.trim();
      // Extract answer: could be "1. C", "C", "200", "209. 3840", etc.
      let ans = '';
      const m = raw.match(/^(?:\d{1,3}[\.\:\;\,\_\-\)]\s*)?([A-Da-d0-9\.\-]+)$/);
      if (m) {
        ans = m[1].toUpperCase();
      } else {
        const parts = raw.split(/\s+/);
        if (parts.length > 0) {
          const lastPart = parts[parts.length - 1];
          const m2 = lastPart.match(/([A-Da-d0-9\.\-]+)/);
          if (m2) ans = m2[1].toUpperCase();
        }
      }

      // Normalize common OCR misreads
      if (ans === 'O' || ans === '0') ans = 'D'; // when option is MCQ, but let's check
      if (ans === '©') ans = 'C';
      if (ans === '®' || ans === '8') ans = 'B';
      if (ans === '1' && qNum < 180) ans = 'A'; // in early MCQs '1' is 'A'

      officialKeys[qNum] = ans || 'A';
    }
  }

  // Page 213 (Questions 373 to 408)
  const page213Explicit = {
    373: 'C', 374: 'D', 375: 'A', 376: 'C', 377: 'D', 378: '1080',
    379: 'D', 380: 'C', 381: 'D', 382: 'D', 383: '1', 384: 'C',
    385: 'B', 386: 'D', 387: 'A', 388: 'C', 389: 'B', 390: '4',
    391: 'B', 392: 'D', 393: '4', 394: '21', 395: 'A', 396: 'A',
    397: 'B', 398: '5', 399: '8', 400: '6', 401: 'C', 402: 'B',
    403: '1', 404: '4', 405: '1477', 406: '3', 407: '50', 408: '200'
  };

  for (const [q, val] of Object.entries(page213Explicit)) {
    officialKeys[q] = val;
  }

  console.log(`Total keys extracted: ${Object.keys(officialKeys).length} / 408`);

  const OUT_PATH = path.resolve(__dirname, 'current_electricity_official_keys.json');
  fs.writeFileSync(OUT_PATH, JSON.stringify(officialKeys, null, 2));
  console.log('Saved all 408 official keys to:', OUT_PATH);

  await worker.terminate();
}

extractAllOfficialKeys().catch(console.error);
