import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diagram questions list to examine
const candidateList = [
  { q: 19, p: 8 },
  { q: 21, p: 10 },
  { q: 22, p: 11 },
  { q: 29, p: 15 },
  { q: 31, p: 17 },
  { q: 36, p: 21 },
  { q: 38, p: 22 },
  { q: 44, p: 28 },
  { q: 48, p: 30 },
  { q: 51, p: 33 },
  { q: 54, p: 36 },
  { q: 58, p: 39 },
  { q: 74, p: 50 },
  { q: 111, p: 69 },
  { q: 112, p: 71 },
  { q: 114, p: 73 },
  { q: 119, p: 79 },
  { q: 129, p: 87 },
  { q: 135, p: 91 },
  { q: 141, p: 94 },
  { q: 143, p: 94 },
  { q: 154, p: 100 },
  { q: 166, p: 106 },
  { q: 183, p: 119 },
  { q: 190, p: 126 }
];

const OUT_DIR = path.resolve(__dirname, 'wave_optics_clean_diagrams');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

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
      // Dark/colored pixel (not white background and not faint watermark)
      if ((r < 220 || g < 220 || b < 220) && !(r > 200 && g > 200 && b > 200)) {
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
  return true;
}

// Let's print out what is on each of these candidate pages in the image
async function run() {
  for (const item of candidateList) {
    const pPad = String(item.p).padStart(3, '0');
    const imgPath = path.resolve(__dirname, `wave_optics_pages/page_${pPad}.png`);
    const img = await loadImage(imgPath);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Let's check horizontal bands of non-white pixels
    const rowCounts = [];
    for (let y = 150; y < img.height - 100; y += 5) {
      const rowData = ctx.getImageData(60, y, img.width - 120, 5).data;
      let dark = 0;
      for (let i = 0; i < rowData.length; i += 4) {
        if (rowData[i] < 220) dark++;
      }
      rowCounts.push({ y, dark });
    }
    console.log(`Page ${item.p} (Q${item.q}): total height=${img.height}`);
  }
}

run().catch(console.error);
