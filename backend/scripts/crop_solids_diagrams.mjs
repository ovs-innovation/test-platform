import { createCanvas, loadImage } from '../node_modules/@napi-rs/canvas/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.resolve(__dirname, '../uploads/solids_pyq');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Function to auto-trim white borders from a cropped canvas
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

      // If pixel is not white / transparent (dark enough to be drawing/text)
      if (a > 30 && (r < 235 || g < 235 || b < 235)) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Padding
  const pad = 15;
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

// Crop diagram given approximate normalized coordinates (0..1) on the 2.0x page
async function cropDiagram(pageNum, qNum, normBox, filename = 'question-diagram.png') {
  const pagePath = path.join(__dirname, 'solids_pages', `page_${pageNum}.png`);
  if (!fs.existsSync(pagePath)) {
    console.warn(`Page ${pagePath} not found!`);
    return null;
  }

  const img = await loadImage(pagePath);
  const W = img.width;
  const H = img.height;

  const bx = Math.round(normBox.x * W);
  const by = Math.round(normBox.y * H);
  const bw = Math.round(normBox.w * W);
  const bh = Math.round(normBox.h * H);

  const rawCanvas = createCanvas(bw, bh);
  const rawCtx = rawCanvas.getContext('2d');
  rawCtx.drawImage(img, bx, by, bw, bh, 0, 0, bw, bh);

  const trimmed = autoTrimCanvas(rawCanvas);

  const qDir = path.join(outDir, `q${qNum}`);
  if (!fs.existsSync(qDir)) {
    fs.mkdirSync(qDir, { recursive: true });
  }

  const destPath = path.join(qDir, filename);
  fs.writeFileSync(destPath, trimmed.toBuffer('image/png'));
  console.log(`Saved diagram for Q${qNum} -> ${destPath} (${trimmed.width}x${trimmed.height})`);

  return `/uploads/solids_pyq/q${qNum}/${filename}`;
}

export { cropDiagram };
