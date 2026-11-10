import { createCanvas, loadImage } from '@napi-rs/canvas';
import fs from 'fs';

async function findBoundingBox(pageImgPath, minYRatio, maxYRatio, minXRatio = 0.05, maxXRatio = 0.95) {
  const img = await loadImage(pageImgPath);
  const w = img.width;
  const h = img.height;

  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const startY = Math.round(minYRatio * h);
  const endY = Math.round(maxYRatio * h);
  const startX = Math.round(minXRatio * w);
  const endX = Math.round(maxXRatio * w);

  const imgData = ctx.getImageData(startX, startY, endX - startX, endY - startY);
  const data = imgData.data;

  let minX = w, maxX = 0, minY = h, maxY = 0;
  let count = 0;

  for (let y = 0; y < endY - startY; y++) {
    for (let x = 0; x < endX - startX; x++) {
      const idx = (y * (endX - startX) + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      // Check if pixel is not near-white and not QR code (QR codes are on the right: x > 0.8 * w)
      if (r < 240 || g < 240 || b < 240) {
        const absX = startX + x;
        const absY = startY + y;
        if (absX < 0.82 * w) { // exclude QR codes on the right
          if (absX < minX) minX = absX;
          if (absX > maxX) maxX = absX;
          if (absY < minY) minY = absY;
          if (absY > maxY) maxY = absY;
          count++;
        }
      }
    }
  }

  if (count === 0) return null;
  return { minX, maxX, minY, maxY, count, w: maxX - minX, h: maxY - minY };
}

async function run() {
  const targets = [
    { id: 'thermo_q5_diagram', page: 3, minY: 0.15, maxY: 0.38, minX: 0.05, maxX: 0.55 },
    { id: 'thermo_q8_diagram', page: 4, minY: 0.18, maxY: 0.34, minX: 0.05, maxX: 0.65 },
    { id: 'thermo_q15_diagram', page: 6, minY: 0.14, maxY: 0.38, minX: 0.05, maxX: 0.55 },
    { id: 'thermo_q16_diagram', page: 6, minY: 0.49, maxY: 0.74, minX: 0.05, maxX: 0.55 },
    { id: 'thermo_q17_diagram', page: 7, minY: 0.14, maxY: 0.36, minX: 0.05, maxX: 0.55 },
    { id: 'thermo_q23_diagram', page: 8, minY: 0.34, maxY: 0.58, minX: 0.05, maxX: 0.55 },
    { id: 'thermo_q28_diagram', page: 10, minY: 0.15, maxY: 0.37, minX: 0.05, maxX: 0.65 },
    { id: 'thermo_q44_diagram', page: 13, minY: 0.17, maxY: 0.39, minX: 0.05, maxX: 0.55 },
    { id: 'thermo_q46_diagram', page: 13, minY: 0.68, maxY: 0.85, minX: 0.05, maxX: 0.55 },
    { id: 'thermo_q48_diagram', page: 14, minY: 0.25, maxY: 0.48, minX: 0.05, maxX: 0.55 },
    { id: 'thermo_q65_diagram', page: 17, minY: 0.58, maxY: 0.80, minX: 0.05, maxX: 0.60 },
    { id: 'thermo_q66_diagram', page: 18, minY: 0.14, maxY: 0.38, minX: 0.05, maxX: 0.55 },
    { id: 'thermo_q68_diagram', page: 19, minY: 0.16, maxY: 0.39, minX: 0.05, maxX: 0.55 },
    { id: 'thermo_q71_diagram', page: 20, minY: 0.20, maxY: 0.43, minX: 0.05, maxX: 0.55 },
    { id: 'thermo_q76_diagram', page: 21, minY: 0.28, maxY: 0.52, minX: 0.05, maxX: 0.55 },
    { id: 'thermo_q77_diagram', page: 21, minY: 0.66, maxY: 0.88, minX: 0.05, maxX: 0.55 },
    { id: 'thermo_q81_diagram', page: 23, minY: 0.16, maxY: 0.38, minX: 0.05, maxX: 0.55 },
    { id: 'thermo_q82_opt_a', page: 24, minY: 0.17, maxY: 0.31, minX: 0.07, maxX: 0.35 },
    { id: 'thermo_q82_opt_b', page: 24, minY: 0.32, maxY: 0.45, minX: 0.07, maxX: 0.35 },
    { id: 'thermo_q82_opt_c', page: 24, minY: 0.46, maxY: 0.59, minX: 0.07, maxX: 0.35 },
    { id: 'thermo_q82_opt_d', page: 24, minY: 0.60, maxY: 0.73, minX: 0.07, maxX: 0.35 },
    { id: 'thermo_q83_diagram', page: 25, minY: 0.19, maxY: 0.39, minX: 0.05, maxX: 0.55 },
    { id: 'thermo_q129_diagram', page: 32, minY: 0.61, maxY: 0.82, minX: 0.05, maxX: 0.55 },
    { id: 'thermo_q133_diagram', page: 33, minY: 0.65, maxY: 0.86, minX: 0.05, maxX: 0.55 }
  ];

  for (const t of targets) {
    const pPath = `backend/scripts/thermo_pages/page_${t.page}.png`;
    const box = await findBoundingBox(pPath, t.minY, t.maxY, t.minX, t.maxX);
    console.log(`${t.id} on page ${t.page}:`, box);
  }
}

run().catch(console.error);

