import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.resolve(__dirname, 'dual_nature_clean_diagrams');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function trimAndSaveDiagram(canvas, yMin, yMax, outPath, xMinCut = 60, xMaxCut = canvas.width - 60) {
  const ctx = canvas.getContext('2d');
  const h = Math.max(1, yMax - yMin);
  if (h < 25) return false;

  const sliceData = ctx.getImageData(0, yMin, canvas.width, h);
  const data = sliceData.data;

  let minX = canvas.width, minY = h, maxX = 0, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = xMinCut; x < xMaxCut; x++) {
      const idx = (y * canvas.width + x) * 4;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      // Exclude white/light background and light grey watermark text
      if (r < 210 || g < 210 || b < 210) {
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
  const cropY = Math.max(0, yMin + minY - pad);
  const finalW = Math.min(canvas.width - cropX, trimW + pad * 2);
  const finalH = Math.min(canvas.height - cropY, trimH + pad * 2);

  const outCanvas = createCanvas(finalW, finalH);
  const outCtx = outCanvas.getContext('2d');
  outCtx.fillStyle = '#ffffff';
  outCtx.fillRect(0, 0, finalW, finalH);
  outCtx.drawImage(canvas, cropX, cropY, finalW, finalH, 0, 0, finalW, finalH);

  fs.writeFileSync(outPath, outCanvas.toBuffer('image/png'));
  console.log(`Saved clean diagram: ${path.basename(outPath)} (${finalW}x${finalH})`);
  return true;
}

// Exact vertical ranges from visual inspection of the rendered pages
const diagramSpecs = [
  { q: 13, p: 4, yMin: 450, yMax: 820 },
  { q: 14, p: 5, yMin: 450, yMax: 820 },
  { q: 15, p: 6, yMin: 450, yMax: 820 },
  { q: 27, p: 12, yMin: 220, yMax: 540 },
  { q: 35, p: 18, yMin: 230, yMax: 480 },
  { q: 62, p: 35, yMin: 230, yMax: 540 },
  { q: 75, p: 42, yMin: 210, yMax: 560 },
  { q: 76, p: 43, yMin: 180, yMax: 520 },
  { q: 153, p: 81, yMin: 190, yMax: 540 },
  { q: 164, p: 86, yMin: 200, yMax: 500 },
  { q: 172, p: 90, yMin: 120, yMax: 420 },
  { q: 195, p: 100, yMin: 250, yMax: 580 },
  { q: 210, p: 108, yMin: 180, yMax: 480 }
];

async function main() {
  for (const s of diagramSpecs) {
    const pPad = String(s.p).padStart(3, '0');
    const pPath = path.resolve(__dirname, `dual_nature_pages/page_${pPad}.png`);
    if (!fs.existsSync(pPath)) {
      console.log(`Page ${s.p} not found!`);
      continue;
    }
    const img = await loadImage(pPath);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const outName = `dual_nature_q${s.q}_diagram.png`;
    const outPath = path.join(OUT_DIR, outName);
    trimAndSaveDiagram(canvas, s.yMin, s.yMax, outPath);
  }
}

main().catch(console.error);
