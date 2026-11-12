import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const OUTPUT_DIR = './backend/scripts/halo_diagrams';
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

function autoCrop(canvas) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
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

      // If non-white and non-watermark
      if (a > 50 && (r < 235 || g < 235 || b < 235)) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (minX >= maxX || minY >= maxY) return canvas;

  const pad = 10;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(w, maxX + pad);
  maxY = Math.min(h, maxY + pad);

  const cropW = maxX - minX;
  const cropH = maxY - minY;

  const cropped = createCanvas(cropW, cropH);
  const cCtx = cropped.getContext('2d');
  cCtx.drawImage(canvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);
  return cropped;
}

async function crop(pageNum, x, y, w, h, outName) {
  const pagePath = `./backend/scripts/halo_pages/page_${pageNum}.png`;
  const img = await loadImage(pagePath);
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, x, y, w, h, 0, 0, w, h);

  const trimmed = autoCrop(canvas);
  const buf = trimmed.toBuffer('image/png');
  fs.writeFileSync(path.join(OUTPUT_DIR, outName), buf);
  console.log(`Saved ${outName} (${trimmed.width}x${trimmed.height})`);
}

async function main() {
  // Page 2
  await crop(2, 60, 310, 850, 240, 'q1_rxn.png');
  await crop(2, 60, 540, 950, 150, 'q1_opt_a.png');
  await crop(2, 60, 720, 950, 150, 'q1_opt_c.png');
  await crop(2, 60, 1080, 500, 110, 'q2_rxn.png');

  // Page 3
  await crop(3, 60, 210, 680, 110, 'q3_rxn.png');
  await crop(3, 80, 580, 500, 200, 'q4_opt_a.png');
  await crop(3, 80, 810, 500, 200, 'q4_opt_b.png');
  await crop(3, 80, 1030, 400, 200, 'q4_opt_c.png');
  await crop(3, 80, 1270, 400, 200, 'q4_opt_d.png');

  // Page 4
  await crop(4, 60, 580, 650, 280, 'q6_diag.png');

  // Page 5
  await crop(5, 60, 210, 650, 130, 'q7_rxn.png');
  await crop(5, 80, 390, 550, 200, 'q7_opt_a.png');
  await crop(5, 80, 620, 550, 200, 'q7_opt_b.png');
  await crop(5, 80, 860, 550, 200, 'q7_opt_c.png');
  await crop(5, 80, 1080, 550, 200, 'q7_opt_d.png');

  // Page 6
  await crop(6, 60, 220, 650, 320, 'q8_diag.png');

  // Page 7
  await crop(7, 60, 230, 600, 120, 'q10_rxn.png');
  await crop(7, 80, 360, 800, 180, 'q10_opt_a.png');
  await crop(7, 80, 570, 850, 170, 'q10_opt_b.png');
  await crop(7, 80, 770, 800, 180, 'q10_opt_c.png');
  await crop(7, 80, 990, 800, 180, 'q10_opt_d.png');

  // Page 8
  await crop(8, 80, 220, 300, 190, 'q12_opt_a.png');
  await crop(8, 80, 510, 350, 200, 'q12_opt_d.png');

  // Page 9
  await crop(9, 80, 220, 850, 130, 'q15_opt_a.png');
  await crop(9, 80, 370, 850, 160, 'q15_opt_b.png');
  await crop(9, 80, 560, 550, 80, 'q15_opt_c.png');
  await crop(9, 80, 640, 550, 80, 'q15_opt_d.png');
  await crop(9, 60, 810, 620, 110, 'q16_rxn.png');

  // Page 10
  await crop(10, 60, 210, 650, 280, 'q17_rxn.png');
  await crop(10, 80, 530, 500, 190, 'q17_opt_a.png');
  await crop(10, 80, 760, 500, 190, 'q17_opt_b.png');
  await crop(10, 80, 990, 500, 190, 'q17_opt_c.png');
  await crop(10, 80, 1230, 500, 190, 'q17_opt_d.png');

  // Page 12
  await crop(12, 80, 240, 650, 90, 'q20_opt_a.png');
  await crop(12, 80, 380, 400, 200, 'q20_opt_b.png');
  await crop(12, 80, 600, 500, 150, 'q20_opt_c.png');
  await crop(12, 80, 800, 500, 150, 'q20_opt_d.png');

  // Page 13
  await crop(13, 60, 210, 650, 270, 'q21_diag.png');
  await crop(13, 60, 670, 600, 110, 'q22_rxn.png');

  // Page 14
  await crop(14, 80, 220, 400, 180, 'q23_opt_a.png');
  await crop(14, 80, 440, 400, 180, 'q23_opt_b.png');
  await crop(14, 80, 660, 400, 180, 'q23_opt_c.png');
  await crop(14, 80, 890, 400, 180, 'q23_opt_d.png');
  await crop(14, 60, 1220, 650, 120, 'q24_rxn.png');

  // Page 15
  await crop(15, 60, 210, 600, 110, 'q25_rxn.png');
  await crop(15, 60, 820, 650, 230, 'q27_diag.png');

  // Page 16
  await crop(16, 80, 300, 400, 180, 'q29_opt_a.png');
  await crop(16, 80, 560, 400, 180, 'q29_opt_d.png');

  // Page 17
  await crop(17, 80, 240, 300, 180, 'q30_opt_a.png');
  await crop(17, 80, 470, 300, 180, 'q30_opt_b.png');
  await crop(17, 80, 710, 300, 180, 'q30_opt_c.png');
  await crop(17, 80, 950, 300, 180, 'q30_opt_d.png');

  // Page 18
  await crop(18, 60, 740, 650, 80, 'q35_rxn.png');

  // Page 19
  await crop(19, 60, 210, 650, 180, 'q37_diag.png');
  await crop(19, 60, 830, 650, 150, 'q39_rxn.png');

  // Page 21
  await crop(21, 80, 230, 400, 180, 'q47_opt_a.png');
  await crop(21, 80, 460, 600, 180, 'q47_opt_b.png');
  await crop(21, 80, 680, 600, 180, 'q47_opt_c.png');

  // Page 22
  await crop(22, 60, 320, 650, 280, 'q49_diag.png');

  console.log('All crops completed!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
