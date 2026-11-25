import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '../node_modules/@napi-rs/canvas/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.resolve(__dirname, 'ionic_diagrams');

async function checkAndAutoTrim(filename) {
  const filePath = path.join(OUT_DIR, filename);
  const img = await loadImage(filePath);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const imgData = ctx.getImageData(0, 0, img.width, img.height);
  const { data, width, height } = imgData;

  let minX = width, minY = height, maxX = 0, maxY = 0;
  let nonWhiteCount = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      // Check if pixel is dark/colored (non-white, non-near-white)
      if (r < 235 || g < 235 || b < 235) {
        nonWhiteCount++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log(`${filename}: dims=${width}x${height}, nonWhitePixels=${nonWhiteCount}, bbox=[x:${minX}..${maxX}, y:${minY}..${maxY}]`);

  // If there's valid content and some margin, let's auto-trim with 15px padding
  if (nonWhiteCount > 100 && minX < maxX && minY < maxY) {
    const pad = 15;
    const cropX = Math.max(0, minX - pad);
    const cropY = Math.max(0, minY - pad);
    const cropW = Math.min(width - cropX, (maxX - minX) + 2 * pad);
    const cropH = Math.min(height - cropY, (maxY - minY) + 2 * pad);

    const trimmedCanvas = createCanvas(cropW, cropH);
    const tCtx = trimmedCanvas.getContext('2d');
    tCtx.fillStyle = '#FFFFFF';
    tCtx.fillRect(0, 0, cropW, cropH);
    tCtx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    fs.writeFileSync(filePath, trimmedCanvas.toBuffer('image/png'));
    console.log(`  -> Trimmed ${filename} to ${cropW}x${cropH}`);
  }
}

async function main() {
  const files = fs.readdirSync(OUT_DIR).filter(f => f.endsWith('.png'));
  for (const f of files) {
    await checkAndAutoTrim(f);
  }
}

main().catch(console.error);
