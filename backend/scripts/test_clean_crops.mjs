import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '../node_modules/@napi-rs/canvas/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testCrop(pageNum, yStartRatio, yEndRatio, outName) {
  const pPad = String(pageNum).padStart(3, '0');
  const imgPath = path.resolve(__dirname, `electrostatics_pages/page_${pPad}.png`);
  const img = await loadImage(imgPath);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const yMin = Math.floor(img.height * yStartRatio);
  const yMax = Math.floor(img.height * yEndRatio);

  const imgData = ctx.getImageData(0, yMin, img.width, yMax - yMin);
  const data = imgData.data;

  let minX = img.width, minY = yMax - yMin, maxX = 0, maxY = 0;
  for (let y = 0; y < yMax - yMin; y++) {
    for (let x = 60; x < img.width - 60; x++) {
      const idx = (y * img.width + x) * 4;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      // non-white
      if (r < 230 || g < 230 || b < 230) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (minX >= maxX || minY >= maxY) {
    console.log(`No graphic found for ${outName}`);
    return;
  }

  const pad = 12;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(img.width - 1, maxX + pad);
  maxY = Math.min(yMax - yMin - 1, maxY + pad);

  const trimW = maxX - minX + 1;
  const trimH = maxY - minY + 1;

  const outCanvas = createCanvas(trimW, trimH);
  const outCtx = outCanvas.getContext('2d');
  outCtx.fillStyle = '#ffffff';
  outCtx.fillRect(0, 0, trimW, trimH);
  outCtx.drawImage(canvas, minX, yMin + minY, trimW, trimH, 0, 0, trimW, trimH);

  const outPath = path.resolve(__dirname, `test_crops_${outName}.png`);
  fs.writeFileSync(outPath, outCanvas.toBuffer('image/png'));
  console.log(`Saved ${outName}: ${trimW}x${trimH}`);
}

async function run() {
  // Page 2: Q4 diagram (top third of page)
  await testCrop(2, 0.04, 0.22, 'q4_diagram');
  // Page 4: Q13 diagram (bottom half, before options)
  await testCrop(4, 0.65, 0.85, 'q13_diagram');
  // Page 5: Q16 diagram (middle of page, plates)
  await testCrop(5, 0.55, 0.75, 'q16_diagram');
  // Page 30: Q65 diagram (top third of page)
  await testCrop(30, 0.03, 0.22, 'q65_diagram');
}

run().catch(console.error);
