import { createCanvas, loadImage } from '../node_modules/@napi-rs/canvas/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, 'motion1d_pages');
const baseOutDir = path.resolve(__dirname, '../uploads/motion1d_pyq');
if (!fs.existsSync(baseOutDir)) {
  fs.mkdirSync(baseOutDir, { recursive: true });
}

function autoTrimCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { data, width, height } = imgData;

  let minX = width, minY = height, maxX = 0, maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      // Dark enough to be part of the drawing/figure
      if (a > 30 && (r < 235 || g < 235 || b < 235)) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const pad = 12;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(width, maxX + pad);
  maxY = Math.min(height, maxY + pad);

  const cropW = Math.max(10, maxX - minX);
  const cropH = Math.max(10, maxY - minY);

  const trimmedCanvas = createCanvas(cropW, cropH);
  const trimmedCtx = trimmedCanvas.getContext('2d');
  trimmedCtx.fillStyle = '#FFFFFF';
  trimmedCtx.fillRect(0, 0, cropW, cropH);
  trimmedCtx.drawImage(canvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);

  return trimmedCanvas;
}

// Bounding box definitions for the 37 diagram questions
// Page bounds are normalized { p, box: { x, y, w, h } }
const DIAGRAM_CONFIGS = {
  18: { p: 9, box: { x: 0.05, y: 0.12, w: 0.9, h: 0.28 } }, // Q18 option graphs
  22: { p: 12, box: { x: 0.2, y: 0.08, w: 0.6, h: 0.22 } }, // Q22 x-t graph
  23: { p: 13, box: { x: 0.05, y: 0.08, w: 0.9, h: 0.26 } }, // Q23 a-t option graphs
  25: { p: 15, box: { x: 0.05, y: 0.10, w: 0.9, h: 0.26 } }, // Q25 v-h option graphs
  29: { p: 19, box: { x: 0.05, y: 0.12, w: 0.9, h: 0.30 } }, // Q29 option graphs
  31: { p: 21, box: { x: 0.05, y: 0.06, w: 0.9, h: 0.28 } }, // Q31 v-t option graphs
  32: { p: 22, box: { x: 0.05, y: 0.06, w: 0.9, h: 0.28 } }, // Q32 v-s option graphs
  34: { p: 24, box: { x: 0.05, y: 0.06, w: 0.9, h: 0.28 } }, // Q34 option graphs
  36: { p: 26, box: { x: 0.15, y: 0.05, w: 0.7, h: 0.28 } }, // Q36 v-t car & scooter
  38: { p: 28, box: { x: 0.15, y: 0.05, w: 0.7, h: 0.28 } }, // Q38 v-t car & scooter
  39: { p: 29, box: { x: 0.15, y: 0.05, w: 0.7, h: 0.32 } }, // Q39 graph
  40: { p: 30, box: { x: 0.05, y: 0.08, w: 0.9, h: 0.28 } }, // Q40 option graphs
  41: { p: 31, box: { x: 0.05, y: 0.08, w: 0.9, h: 0.28 } }, // Q41 p-h option graphs
  51: { p: 37, box: { x: 0.05, y: 0.06, w: 0.9, h: 0.26 } }, // Q51 v-h option graphs
  52: { p: 37, box: { x: 0.2, y: 0.45, w: 0.6, h: 0.25 } },  // Q52 speed-time graph
  54: { p: 39, box: { x: 0.15, y: 0.08, w: 0.7, h: 0.26 } }, // Q54 balloon angle diagram
  56: { p: 41, box: { x: 0.15, y: 0.06, w: 0.7, h: 0.26 } }, // Q56 v-t graph
  58: { p: 43, box: { x: 0.05, y: 0.05, w: 0.9, h: 0.32 } }, // Q58 v-t shape and options
  63: { p: 48, box: { x: 0.15, y: 0.05, w: 0.7, h: 0.26 } }, // Q63 v-x graph
  67: { p: 51, box: { x: 0.05, y: 0.06, w: 0.9, h: 0.34 } }, // Q67 option graphs
  68: { p: 52, box: { x: 0.05, y: 0.06, w: 0.9, h: 0.30 } }, // Q68 option graphs
  77: { p: 59, box: { x: 0.15, y: 0.06, w: 0.7, h: 0.30 } }, // Q77 v^2 - x plot
  85: { p: 64, box: { x: 0.15, y: 0.08, w: 0.7, h: 0.20 } }, // Q85 distance diagram
  90: { p: 67, box: { x: 0.05, y: 0.06, w: 0.9, h: 0.30 } }, // Q90 v-t option curves
  98: { p: 74, box: { x: 0.15, y: 0.05, w: 0.7, h: 0.26 } }, // Q98 v-t graph
  103: { p: 77, box: { x: 0.05, y: 0.05, w: 0.9, h: 0.32 } }, // Q103 match list graphs
  105: { p: 79, box: { x: 0.15, y: 0.05, w: 0.7, h: 0.22 } }, // Q105 AB, BC, CD line diagram
  107: { p: 81, box: { x: 0.15, y: 0.05, w: 0.7, h: 0.24 } }, // Q107 motion from A to B
  110: { p: 84, box: { x: 0.2, y: 0.06, w: 0.6, h: 0.22 } }, // Q110 x-t for students A and B
  112: { p: 86, box: { x: 0.15, y: 0.05, w: 0.7, h: 0.28 } }, // Q112 v-t graph
  140: { p: 106, box: { x: 0.15, y: 0.05, w: 0.7, h: 0.26 } }, // Q140 airplane v-t graph
  141: { p: 107, box: { x: 0.15, y: 0.05, w: 0.7, h: 0.26 } }, // Q141 v-t graph
  144: { p: 109, box: { x: 0.2, y: 0.08, w: 0.6, h: 0.22 } }, // Q144 circular track diagram
  145: { p: 110, box: { x: 0.05, y: 0.08, w: 0.9, h: 0.40 } }, // Q145 motion curves A, B, C, D
  147: { p: 112, box: { x: 0.15, y: 0.05, w: 0.7, h: 0.28 } }, // Q147 x vs t graph
  149: { p: 114, box: { x: 0.05, y: 0.05, w: 0.9, h: 0.35 } }, // Q149 v-x graph and a-x option graphs
  155: { p: 119, box: { x: 0.15, y: 0.05, w: 0.7, h: 0.26 } }, // Q155 v-t plot
};

async function cropAll() {
  console.log(`Starting crop for ${Object.keys(DIAGRAM_CONFIGS).length} diagrams...`);
  const croppedMap = {};

  for (const [qStr, conf] of Object.entries(DIAGRAM_CONFIGS)) {
    const qNum = parseInt(qStr);
    const p = conf.p;
    const pagePath = path.join(pagesDir, `page_${p}.png`);
    if (!fs.existsSync(pagePath)) {
      console.warn(`Page ${pagePath} not found!`);
      continue;
    }

    const img = await loadImage(pagePath);
    const W = img.width;
    const H = img.height;

    const bx = Math.round(conf.box.x * W);
    const by = Math.round(conf.box.y * H);
    const bw = Math.round(conf.box.w * W);
    const bh = Math.round(conf.box.h * H);

    const rawCanvas = createCanvas(bw, bh);
    const rawCtx = rawCanvas.getContext('2d');
    rawCtx.drawImage(img, bx, by, bw, bh, 0, 0, bw, bh);

    const trimmed = autoTrimCanvas(rawCanvas);

    const qDir = path.join(baseOutDir, `q${qNum}`);
    if (!fs.existsSync(qDir)) {
      fs.mkdirSync(qDir, { recursive: true });
    }
    const outFilePath = path.join(qDir, 'question-diagram.png');
    fs.writeFileSync(outFilePath, trimmed.toBuffer('image/png'));
    console.log(`  [Q${qNum}] Cropped from Page ${p}: ${trimmed.width}x${trimmed.height} -> ${outFilePath}`);

    croppedMap[qNum] = `/uploads/motion1d_pyq/q${qNum}/question-diagram.png`;
  }

  fs.writeFileSync(path.join(__dirname, 'motion1d_diagrams.json'), JSON.stringify(croppedMap, null, 2));
  console.log('Saved motion1d_diagrams.json');
}

cropAll().catch(err => {
  console.error('Cropping failed:', err);
  process.exit(1);
});
