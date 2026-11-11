import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const outDir = 'backend/scripts/ro_diagrams';
const frontendDir = 'frontend/public/uploads/ray_optics';

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(frontendDir)) fs.mkdirSync(frontendDir, { recursive: true });

const DIAGRAM_SPECS = [
  { q: 1, id: 'ro_q1_diagram', page: 2, yMin: 425, yMax: 810, xMin: 60, xMax: 980 },
  { q: 2, id: 'ro_q2_diagram', page: 2, yMin: 965, yMax: 1350, xMin: 60, xMax: 980 },
  { q: 4, id: 'ro_q4_diagram', page: 3, yMin: 540, yMax: 925, xMin: 60, xMax: 980 },
  { q: 9, id: 'ro_q9_diagram', page: 4, yMin: 925, yMax: 1310, xMin: 60, xMax: 980 },
  { q: 11, id: 'ro_q11_diagram', page: 5, yMin: 430, yMax: 815, xMin: 60, xMax: 980 },
  { q: 12, id: 'ro_q12_diagram', page: 5, yMin: 1005, yMax: 1390, xMin: 60, xMax: 980 },
  { q: 13, id: 'ro_q13_diagram', page: 6, yMin: 215, yMax: 565, xMin: 60, xMax: 980 },
  { q: 16, id: 'ro_q16_diagram', page: 7, yMin: 255, yMax: 540, xMin: 60, xMax: 980 },
  { q: 22, id: 'ro_q22_diagram', page: 8, yMin: 615, yMax: 1025, xMin: 60, xMax: 980 },
  { q: 25, id: 'ro_q25_diagram', page: 9, yMin: 575, yMax: 985, xMin: 60, xMax: 980 },
  { q: 47, id: 'ro_q47_diagram', page: 14, yMin: 275, yMax: 725, xMin: 60, xMax: 980 },
  { q: 73, id: 'ro_q73_diagram', page: 19, yMin: 280, yMax: 695, xMin: 60, xMax: 980 },
  { q: 79, id: 'ro_q79_diagram', page: 20, yMin: 915, yMax: 1325, xMin: 60, xMax: 980 },
  { q: 83, id: 'ro_q83_diagram', page: 21, yMin: 895, yMax: 1305, xMin: 60, xMax: 980 },
  { q: 99, id: 'ro_q99_diagram', page: 24, yMin: 630, yMax: 1010, xMin: 60, xMax: 980 }
];

async function cropDiagrams() {
  console.log(`Cropping ${DIAGRAM_SPECS.length} diagrams...`);

  for (const spec of DIAGRAM_SPECS) {
    const pageImg = await loadImage(`backend/scripts/ro_pages/page_${spec.page}.png`);
    const winW = spec.xMax - spec.xMin;
    const winH = spec.yMax - spec.yMin;
    const winCanvas = createCanvas(winW, winH);
    const winCtx = winCanvas.getContext('2d');
    winCtx.drawImage(pageImg, spec.xMin, spec.yMin, winW, winH, 0, 0, winW, winH);

    const imgData = winCtx.getImageData(0, 0, winW, winH);
    const data = imgData.data;

    let minX = winW, maxX = 0, minY = winH, maxY = 0;
    let found = false;

    for (let y = 0; y < winH; y++) {
      for (let x = 0; x < winW; x++) {
        const idx = (y * winW + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];

        if (a > 50 && (r < 235 || g < 235 || b < 235)) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          found = true;
        }
      }
    }

    if (!found) {
      console.warn(`No non-white pixels found for Q${spec.q}!`);
      continue;
    }

    const pad = 12;
    const cropX = Math.max(0, minX - pad);
    const cropY = Math.max(0, minY - pad);
    const cropW = Math.min(winW - cropX, (maxX - minX) + 2 * pad);
    const cropH = Math.min(winH - cropY, (maxY - minY) + 2 * pad);

    const cropCanvas = createCanvas(cropW, cropH);
    const cropCtx = cropCanvas.getContext('2d');
    cropCtx.drawImage(winCanvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    const buf = cropCanvas.toBuffer('image/png');
    const outPath = path.join(outDir, `${spec.id}.png`);
    fs.writeFileSync(outPath, buf);
    fs.writeFileSync(path.join(frontendDir, `${spec.id}.png`), buf);

    console.log(`Cropped Q${spec.q} -> ${spec.id}.png (${cropW}x${cropH})`);
  }

  console.log('All diagrams successfully cropped and mirrored!');
}

cropDiagrams().catch(console.error);

