import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function parseAllOfficialKeys() {
  const p212Path = path.resolve(__dirname, 'current_electricity_pages/page_212.png');
  const img = await loadImage(p212Path);
  const worker = await createWorker('eng');

  // Let's detect all row bands on Page 212
  const minX = 250, maxX = 930;
  const colW = (maxX - minX) / 6;

  const canvasFull = createCanvas(img.width, img.height);
  const ctxFull = canvasFull.getContext('2d');
  ctxFull.drawImage(img, 0, 0);
  const d = ctxFull.getImageData(0, 0, img.width, img.height).data;

  const rowDark = [];
  for (let y = 60; y < 1550; y++) {
    let dark = 0;
    for (let x = minX; x <= maxX; x++) {
      const idx = (y * img.width + x) * 4;
      if (d[idx] < 180) dark++;
    }
    rowDark.push({ y, dark });
  }

  const bands = [];
  let inBand = false, startY = 0;
  for (const r of rowDark) {
    if (!inBand && r.dark > 35) {
      inBand = true;
      startY = r.y;
    } else if (inBand && r.dark <= 15) {
      inBand = false;
      if (r.y - startY >= 8) {
        bands.push({ startY, endY: r.y, height: r.y - startY, midY: Math.round((startY + r.y)/2) });
      }
    }
  }

  console.log(`Detected ${bands.length} row bands on page 212.`);

  const keys = {};

  // For each band, let's OCR with scale 2
  for (let b = 0; b < bands.length; b++) {
    const rowY = Math.max(0, bands[b].startY - 3);
    const rowH = (bands[b].endY - bands[b].startY) + 6;
    const c = createCanvas((maxX - minX) * 2, rowH * 2);
    const ctx = c.getContext('2d');
    ctx.drawImage(img, minX, rowY, maxX - minX, rowH, 0, 0, (maxX - minX) * 2, rowH * 2);

    const { data: { text } } = await worker.recognize(c.toBuffer('image/png'), {
      tessedit_pageseg_mode: '7'
    });

    const tokens = text.replace(/[\n\r]+/g, ' ').split(/\s+/).map(t => t.trim()).filter(Boolean);
    for (let t = 0; t < tokens.length; t++) {
      const tok = tokens[t];
      const m = tok.match(/^(\d{1,3})[\.\:\;\,\_\-\)]\s*([A-Da-d0-9\.\-]+)$/);
      if (m) {
        const qNum = parseInt(m[1], 10);
        if (qNum >= 1 && qNum <= 408) {
          keys[qNum] = m[2].toUpperCase();
        }
      } else {
        // Match two tokens e.g. "43." "C"
        const mNum = tok.match(/^(\d{1,3})[\.\:\;\,\_\-\)]?$/);
        if (mNum && t + 1 < tokens.length) {
          const nextTok = tokens[t + 1];
          if (/^[A-Da-d0-9\.\-]+$/.test(nextTok) && !/^\d{1,3}\./.test(nextTok)) {
            const qNum = parseInt(mNum[1], 10);
            if (qNum >= 1 && qNum <= 408) {
              keys[qNum] = nextTok.toUpperCase();
            }
          }
        }
      }
    }
  }

  console.log(`Keys found after band OCR on page 212: ${Object.keys(keys).length} / 408`);

  await worker.terminate();
}

parseAllOfficialKeys().catch(console.error);
