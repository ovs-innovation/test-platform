import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '../node_modules/@napi-rs/canvas/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.resolve(__dirname, 'electrostatics_clean_diagrams');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Function to crop a region with whitespace trimming
function trimAndSave(canvas, yStart, yEnd, outPath) {
  const ctx = canvas.getContext('2d');
  const h = yEnd - yStart;
  if (h < 20) return false;

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

export { trimAndSave, OUT_DIR };
