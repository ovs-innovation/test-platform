import { createCanvas, loadImage } from '../node_modules/@napi-rs/canvas/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function trimAndSave(canvas, outPath) {
  const ctx = canvas.getContext('2d');
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const idx = (y * canvas.width + x) * 4;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      if (r < 230 || g < 230 || b < 230) {
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

  const outCanvas = createCanvas(trimW, trimH);
  const outCtx = outCanvas.getContext('2d');
  outCtx.fillStyle = '#ffffff';
  outCtx.fillRect(0, 0, trimW, trimH);
  outCtx.drawImage(canvas, minX, minY, trimW, trimH, 0, 0, trimW, trimH);

  fs.writeFileSync(outPath, outCanvas.toBuffer('image/png'));
  return true;
}

async function testCrop(pageNum, yStart, yEnd, outName) {
  const pPad = String(pageNum).padStart(3, '0');
  const imgPath = path.resolve(__dirname, `capacitance_pages/page_${pPad}.png`);
  const img = await loadImage(imgPath);

  const cropCanvas = createCanvas(img.width, yEnd - yStart);
  const cropCtx = cropCanvas.getContext('2d');
  cropCtx.fillStyle = '#ffffff';
  cropCtx.fillRect(0, 0, cropCanvas.width, cropCanvas.height);
  cropCtx.drawImage(img, 0, yStart, img.width, yEnd - yStart, 0, 0, img.width, yEnd - yStart);

  const outPath = path.resolve(__dirname, outName);
  const saved = trimAndSave(cropCanvas, outPath);
  console.log(`Cropped Page ${pageNum} y=[${yStart}, ${yEnd}] -> ${outName}: saved=${saved}`);
}

async function main() {
  await testCrop(5, 75, 335, 'test_q12_diagram.png');
  await testCrop(6, 90, 360, 'test_q13_diagram.png');
  await testCrop(21, 70, 370, 'test_q29_diagram.png');
}

main().catch(console.error);
