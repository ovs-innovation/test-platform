import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const P115_PATH = path.resolve(__dirname, 'dual_nature_pages/page_115.png');
const KEY_OUT = path.resolve(__dirname, 'dual_nature_official_keys.json');

async function main() {
  const img = await loadImage(P115_PATH);
  console.log(`Page 115 dimensions: ${img.width}x${img.height}`);

  // The answer key is in a grid. Let's do PSM 6 (single uniform block of text)
  // or crop each of the 6 vertical columns
  const worker = await createWorker('eng');
  await worker.setParameters({
    tessedit_pageseg_mode: '6', // Assume a single uniform block of text
  });

  // Let's recognize the full answer key region (below header "Answer key")
  // Let's crop just the table area: y from ~10% to ~95%
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  // We have 6 columns
  // Let's divide into 6 vertical columns
  const colWidth = img.width / 6;
  const topY = img.height * 0.08;
  const bottomY = img.height * 0.95;
  const colHeight = bottomY - topY;

  const keyMap = {};

  for (let c = 0; c < 6; c++) {
    const colCanvas = createCanvas(colWidth, colHeight);
    const colCtx = colCanvas.getContext('2d');
    colCtx.drawImage(
      img,
      c * colWidth, topY, colWidth, colHeight,
      0, 0, colWidth, colHeight
    );
    const colBuf = colCanvas.toBuffer('image/png');
    const ret = await worker.recognize(colBuf);
    const lines = ret.data.text.split('\n').map(l => l.trim()).filter(Boolean);
    console.log(`Column ${c + 1} lines count: ${lines.length}`);
    for (const line of lines) {
      // Line might be "1. A" or "7. C" or "101. 125" or "103. 910"
      // Match pattern: <q_num>[\.\s\:\)]+<answer>
      const match = line.match(/^([0-9]{1,3})[\.\s\:\)]+([A-D0-9\.\-]+)/i);
      if (match) {
        const qNum = parseInt(match[1], 10);
        let ans = match[2].trim().toUpperCase();
        if (ans === '0' && qNum > 0) ans = 'D'; // common OCR substitution 0 -> D
        if (ans === '8' && qNum > 0 && !line.includes('102')) {
          // Check if it's B or numeric
        }
        keyMap[qNum] = ans;
      }
    }
  }

  console.log(`Extracted keys for ${Object.keys(keyMap).length} questions.`);
  fs.writeFileSync(KEY_OUT, JSON.stringify(keyMap, null, 2));

  await worker.terminate();
}

main().catch(console.error);
