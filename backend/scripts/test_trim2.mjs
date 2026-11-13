import fs from 'fs';
import { createCanvas, loadImage } from '@napi-rs/canvas';

function trimCanvas(sourceCanvas) {
  const ctx = sourceCanvas.getContext('2d');
  const w = sourceCanvas.width;
  const h = sourceCanvas.height;
  const imgData = ctx.getImageData(0, 0, w, h);
  const data = imgData.data;

  let minX = w, minY = h, maxX = 0, maxY = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      // Pure drawing/text (black or dark grey)
      if (a > 30 && r < 120 && g < 120 && b < 120) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < minX || maxY < minY) {
    return sourceCanvas; // empty
  }

  const pad = 8;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(w - 1, maxX + pad);
  maxY = Math.min(h - 1, maxY + pad);

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;

  const trimmed = createCanvas(cropW, cropH);
  const tCtx = trimmed.getContext('2d');
  tCtx.drawImage(sourceCanvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);
  return trimmed;
}

async function runTrim() {
  for (const letter of ['a', 'b', 'c', 'd']) {
    const img = await loadImage(`./backend/scripts/test_q6_opt_${letter}.png`);
    const c = createCanvas(img.width, img.height);
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const trimmed = trimCanvas(c);
    console.log(`Q6 opt_${letter} trimmed size: ${trimmed.width}x${trimmed.height}`);
    fs.writeFileSync(`./backend/scripts/test_q6_opt_${letter}_trimmed.png`, trimmed.toBuffer('image/png'));
  }
}

runTrim().catch(console.error);

