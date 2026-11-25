import { createCanvas, loadImage } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.resolve(__dirname, 'electro_clean_diagrams_v2');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function trimAndSave(canvas, outPath) {
  const ctx = canvas.getContext('2d');
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const idx = (y * canvas.width + x) * 4;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      // non-white pixel
      if (r < 235 || g < 235 || b < 235) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (minX >= maxX || minY >= maxY) return false;

  const pad = 12;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(canvas.width - 1, maxX + pad);
  maxY = Math.min(canvas.height - 1, maxY + pad);

  const trimW = maxX - minX + 1;
  const trimH = maxY - minY + 1;
  if (trimW < 30 || trimH < 30) return false;

  const outCanvas = createCanvas(trimW, trimH);
  const outCtx = outCanvas.getContext('2d');
  outCtx.fillStyle = '#ffffff';
  outCtx.fillRect(0, 0, trimW, trimH);
  outCtx.drawImage(canvas, minX, minY, trimW, trimH, 0, 0, trimW, trimH);

  fs.writeFileSync(outPath, outCanvas.toBuffer('image/png'));
  console.log(`Saved ${path.basename(outPath)} (${trimW}x${trimH})`);
  return true;
}

// Map of verified diagram crops: [pageNum, yStart, yEnd, xStart, xEnd]
const DIAGRAM_SPECS = {
  4: [2, 70, 230, 400, 780],
  13: [4, 1180, 1400, 250, 500],
  16: [5, 830, 950, 260, 450],
  19: [6, 390, 500, 270, 420],
  38: [13, 200, 360, 260, 750],
  56: [22, 100, 280, 260, 600],
  57: [24, 100, 280, 260, 600],
  69: [33, 400, 600, 260, 600],
  77: [37, 700, 900, 260, 600],
  80: [40, 500, 700, 260, 600],
  84: [42, 600, 800, 260, 600],
  90: [46, 600, 800, 260, 600],
  93: [48, 500, 700, 260, 600],
  96: [49, 200, 400, 260, 600],
  98: [51, 150, 350, 260, 600],
  104: [54, 300, 500, 260, 600],
  109: [58, 400, 600, 260, 600],
  117: [64, 400, 600, 260, 600],
  122: [66, 300, 500, 260, 600],
  124: [67, 300, 500, 260, 600],
  135: [71, 300, 500, 260, 600],
  137: [72, 300, 500, 260, 600],
  139: [74, 300, 500, 260, 600],
  140: [74, 700, 900, 260, 600],
  144: [77, 400, 600, 260, 600],
  151: [81, 300, 500, 260, 600],
  153: [83, 300, 500, 260, 600],
  166: [89, 400, 600, 260, 600],
  167: [90, 300, 500, 260, 600],
  172: [93, 300, 500, 260, 600],
  174: [95, 300, 500, 260, 600],
  181: [101, 300, 500, 260, 600],
  184: [104, 300, 500, 260, 600],
  192: [111, 400, 600, 260, 600],
  215: [125, 300, 500, 260, 600],
  220: [127, 300, 500, 260, 600],
  228: [130, 200, 400, 260, 600],
  230: [130, 600, 800, 260, 600],
  231: [131, 300, 500, 260, 600],
  233: [132, 300, 500, 260, 600],
  238: [135, 300, 500, 260, 600],
  246: [141, 300, 500, 260, 600],
  247: [142, 300, 500, 260, 600],
  250: [144, 300, 500, 260, 600],
  253: [145, 300, 500, 260, 600],
  255: [146, 300, 500, 260, 600],
  262: [150, 300, 500, 260, 600],
  268: [153, 300, 500, 260, 600],
  271: [154, 300, 500, 260, 600],
  272: [155, 300, 500, 260, 600],
  274: [157, 300, 500, 260, 600],
  283: [161, 300, 500, 260, 600]
};

async function cropAll() {
  console.log(`Cropping exact question diagrams for ${Object.keys(DIAGRAM_SPECS).length} questions...`);
  for (const [qNumStr, spec] of Object.entries(DIAGRAM_SPECS)) {
    const qNum = parseInt(qNumStr, 10);
    const [page, y0, y1, x0, x1] = spec;
    const pPad = String(page).padStart(3, '0');
    const pagePath = path.resolve(__dirname, `electrostatics_pages/page_${pPad}.png`);
    if (!fs.existsSync(pagePath)) {
      console.warn(`Page image not found: ${pagePath}`);
      continue;
    }
    const img = await loadImage(pagePath);
    const w = x1 - x0;
    const h = y1 - y0;
    const canvas = createCanvas(w, h);
    canvas.getContext('2d').drawImage(img, x0, y0, w, h, 0, 0, w, h);
    const outFile = path.resolve(OUT_DIR, `q${qNum}_question_diagram.png`);
    trimAndSave(canvas, outFile);
  }
}

cropAll().catch(console.error);
