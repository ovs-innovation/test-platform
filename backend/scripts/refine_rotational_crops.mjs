import { createCanvas, loadImage } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.resolve(__dirname, 'rotational_diagrams');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function findTightBoundingBox(pageImgPath, minYRatio, maxYRatio, minXRatio = 0.05, maxXRatio = 0.65) {
  const buf = fs.readFileSync(pageImgPath);
  const img = await loadImage(buf);
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
      // Dark/content pixel (ignoring light watermarks which have r,g,b > 190)
      if (r < 175 || g < 175 || b < 175) {
        const absX = startX + x;
        const absY = startY + y;
        if (absX < minX) minX = absX;
        if (absX > maxX) maxX = absX;
        if (absY < minY) minY = absY;
        if (absY > maxY) maxY = absY;
        count++;
      }
    }
  }

  if (count < 20) return null;
  return { minX, maxX, minY, maxY, count, w: maxX - minX, h: maxY - minY };
}

async function cropDiagram(pageImgPath, bbox, outPath) {
  const buf = fs.readFileSync(pageImgPath);
  const img = await loadImage(buf);
  const pad = 15;
  const cropX = Math.max(0, bbox.minX - pad);
  const cropY = Math.max(0, bbox.minY - pad);
  const cropW = Math.min(img.width - cropX, bbox.w + pad * 2);
  const cropH = Math.min(img.height - cropY, bbox.h + pad * 2);

  const canvas = createCanvas(cropW, cropH);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
}

async function run() {
  const targets = [
    { id: 'rot_q1_diagram', page: 2, minY: 0.22, maxY: 0.44, maxX: 0.60 },
    { id: 'rot_q2_diagram', page: 2, minY: 0.58, maxY: 0.79, maxX: 0.62 },
    { id: 'rot_q4_diagram', page: 3, minY: 0.25, maxY: 0.48, maxX: 0.55 },
    { id: 'rot_q7_diagram', page: 4, minY: 0.16, maxY: 0.39, maxX: 0.50 },
    { id: 'rot_q8_diagram', page: 4, minY: 0.50, maxY: 0.72, maxX: 0.35 },
    { id: 'rot_q10_diagram', page: 5, minY: 0.17, maxY: 0.39, maxX: 0.58 },
    { id: 'rot_q18_diagram', page: 6, minY: 0.66, maxY: 0.89, maxX: 0.65 },
    { id: 'rot_q37_diagram', page: 10, minY: 0.21, maxY: 0.42, maxX: 0.60 },
    { id: 'rot_q41_diagram', page: 11, minY: 0.23, maxY: 0.40, maxX: 0.55 },
    { id: 'rot_q42_diagram', page: 11, minY: 0.53, maxY: 0.76, maxX: 0.35 },
    { id: 'rot_q47_diagram', page: 12, minY: 0.69, maxY: 0.85, maxX: 0.62 },
    { id: 'rot_q50_diagram', page: 13, minY: 0.43, maxY: 0.65, maxX: 0.48 },
    { id: 'rot_q53_diagram', page: 14, minY: 0.34, maxY: 0.54, maxX: 0.50 },
    { id: 'rot_q54_diagram', page: 15, minY: 0.18, maxY: 0.38, maxX: 0.60 },
    { id: 'rot_q66_diagram', page: 18, minY: 0.18, maxY: 0.33, maxX: 0.48 },
    { id: 'rot_q67_diagram', page: 18, minY: 0.56, maxY: 0.73, maxX: 0.58 },
    { id: 'rot_q75_diagram', page: 20, minY: 0.19, maxY: 0.37, maxX: 0.48 },
    { id: 'rot_q88_diagram', page: 22, minY: 0.61, maxY: 0.83, maxX: 0.48 },
    { id: 'rot_q90_diagram', page: 23, minY: 0.27, maxY: 0.49, maxX: 0.55 },
    { id: 'rot_q95_diagram', page: 24, minY: 0.30, maxY: 0.50, maxX: 0.52 },
    { id: 'rot_q98_diagram', page: 25, minY: 0.14, maxY: 0.35, maxX: 0.60 }
  ];

  const results = [];
  for (const t of targets) {
    const pagePath = path.resolve(__dirname, `rotational_pages/page_${t.page}.png`);
    const bbox = await findTightBoundingBox(pagePath, t.minY, t.maxY, 0.05, t.maxX || 0.65);
    if (bbox) {
      const outPath = path.join(outDir, `${t.id}.png`);
      await cropDiagram(pagePath, bbox, outPath);
      results.push({ ...t, bbox, outPath });
      console.log(`Refined crop for ${t.id} (P${t.page}): ${bbox.w}x${bbox.h} -> ${outPath}`);
    } else {
      console.error(`FAILED to find tight diagram for ${t.id} on page ${t.page}`);
    }
  }

  console.log(`\nSuccessfully refined ${results.length} / ${targets.length} diagrams.`);
  fs.writeFileSync(path.resolve(__dirname, 'rotational_diagram_bboxes.json'), JSON.stringify(results, null, 2));
}

run().catch(console.error);

