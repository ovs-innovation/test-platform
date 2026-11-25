import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.resolve(__dirname, 'current_electricity_clean_diagrams');
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
  if (trimW < 35 || trimH < 35) return false;

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
  return true;
}

// Diagram questions mapping: qNum -> page
const diagramQuestions = [
  { q: 9, p: 2, yRange: [950, 1450] },
  { q: 18, p: 4, yRange: [1150, 1550] },
  { q: 23, p: 5, yRange: [1100, 1500] },
  { q: 37, p: 9, yRange: [250, 750] },
  { q: 38, p: 9, yRange: [900, 1400] },
  { q: 39, p: 10, yRange: [150, 700] },
  { q: 48, p: 13, yRange: [300, 850] },
  { q: 62, p: 19, yRange: [1150, 1550] },
  { q: 63, p: 20, yRange: [100, 750] },
  { q: 64, p: 21, yRange: [100, 650] },
  { q: 68, p: 23, yRange: [100, 650] },
  { q: 71, p: 25, yRange: [100, 650] },
  { q: 99, p: 31, yRange: [100, 650] },
  { q: 120, p: 38, yRange: [100, 650] },
  { q: 149, p: 47, yRange: [100, 650] },
  { q: 155, p: 49, yRange: [100, 650] },
  { q: 178, p: 58, yRange: [100, 650] },
  { q: 197, p: 63, yRange: [100, 650] },
  { q: 215, p: 71, yRange: [100, 650] },
  { q: 216, p: 72, yRange: [100, 650] },
  { q: 235, p: 76, yRange: [100, 650] },
  { q: 241, p: 78, yRange: [100, 650] },
  { q: 250, p: 80, yRange: [100, 650] },
  { q: 262, p: 84, yRange: [100, 650] },
  { q: 266, p: 85, yRange: [100, 650] },
  { q: 271, p: 87, yRange: [100, 650] },
  { q: 299, p: 102, yRange: [100, 650] },
  { q: 303, p: 104, yRange: [100, 650] },
  { q: 309, p: 107, yRange: [100, 650] },
  { q: 328, p: 114, yRange: [100, 650] },
  { q: 341, p: 122, yRange: [100, 650] },
  { q: 365, p: 140, yRange: [100, 650] },
  { q: 371, p: 148, yRange: [100, 650] },
  { q: 372, p: 149, yRange: [100, 650] },
  { q: 374, p: 151, yRange: [100, 650] },
  { q: 382, p: 158, yRange: [100, 650] },
  { q: 389, p: 172, yRange: [100, 650] },
  { q: 391, p: 175, yRange: [100, 650] },
  { q: 395, p: 181, yRange: [100, 650] },
  { q: 398, p: 189, yRange: [100, 650] },
  { q: 401, p: 192, yRange: [100, 650] },
  { q: 402, p: 193, yRange: [100, 650] },
  { q: 404, p: 195, yRange: [100, 650] },
  { q: 406, p: 202, yRange: [100, 650] },
  { q: 408, p: 208, yRange: [100, 650] }
];

async function cropAll() {
  console.log(`Cropping diagrams for ${diagramQuestions.length} questions...`);
  let count = 0;

  for (const dq of diagramQuestions) {
    const pPad = String(dq.p).padStart(3, '0');
    const imgPath = path.resolve(__dirname, `current_electricity_pages/page_${pPad}.png`);
    if (!fs.existsSync(imgPath)) continue;

    const img = await loadImage(imgPath);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const outPath = path.join(OUT_DIR, `q${dq.q}_question_diagram.png`);
    const ok = trimAndSaveDiagram(canvas, dq.yRange[0], dq.yRange[1], outPath);
    if (ok) {
      count++;
      console.log(`Cropped diagram for Q${dq.q} (Page ${dq.p})`);
    } else {
      console.warn(`No non-white diagram content found for Q${dq.q} (Page ${dq.p})`);
    }
  }

  console.log(`Successfully cropped ${count} / ${diagramQuestions.length} diagrams.`);
}

cropAll().catch(console.error);
