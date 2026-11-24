import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.resolve(__dirname, 'wave_optics_clean_diagrams');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Function to crop diagram from a canvas given vertical limits with automatic trimming
function trimAndSaveDiagram(canvas, yMin, yMax, outPath) {
  const ctx = canvas.getContext('2d');
  const h = Math.max(1, yMax - yMin);
  if (h < 25) return false;

  const sliceData = ctx.getImageData(0, yMin, canvas.width, h);
  const data = sliceData.data;

  let minX = canvas.width, minY = h, maxX = 0, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 60; x < canvas.width - 60; x++) {
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
  console.log(`Saved clean diagram: ${outPath} (${finalW}x${finalH})`);
  return true;
}

// Diagram questions mapping with accurate y-ranges
const diagramQuestions = [
  { q: 19, p: 8, yRange: [240, 480] },
  { q: 21, p: 10, yRange: [250, 600] },
  { q: 22, p: 11, yRange: [240, 560] },
  { q: 29, p: 15, yRange: [240, 620] },
  { q: 31, p: 17, yRange: [250, 560] },
  { q: 48, p: 30, yRange: [1020, 1380] },
  { q: 51, p: 33, yRange: [250, 560] },
  { q: 54, p: 36, yRange: [250, 550] },
  { q: 58, p: 39, yRange: [250, 560] },
  { q: 74, p: 50, yRange: [240, 540] },
  { q: 111, p: 69, yRange: [270, 600] },
  { q: 112, p: 71, yRange: [240, 560] },
  { q: 114, p: 73, yRange: [260, 580] },
  { q: 119, p: 79, yRange: [240, 580] },
  { q: 129, p: 87, yRange: [250, 600] },
  { q: 154, p: 100, yRange: [240, 580] },
  { q: 183, p: 119, yRange: [250, 620] },
  { q: 190, p: 126, yRange: [260, 600] }
];

async function cropAll() {
  console.log(`Cropping ${diagramQuestions.length} diagrams...`);
  for (const item of diagramQuestions) {
    const pPad = String(item.p).padStart(3, '0');
    const imgPath = path.resolve(__dirname, `wave_optics_pages/page_${pPad}.png`);
    const img = await loadImage(imgPath);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const outPath = path.join(OUT_DIR, `q${item.q}_diagram.png`);
    trimAndSaveDiagram(canvas, item.yRange[0], item.yRange[1], outPath);
  }
}

cropAll().catch(console.error);
