import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const outDir = 'backend/scripts/ac_diagrams';
const frontendDir = 'frontend/public/uploads/alternating_current';

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(frontendDir)) fs.mkdirSync(frontendDir, { recursive: true });

// Define the region containing each diagram on its rendered page (scale = 2.0, width 1189)
// xMin: 60, xMax: 1000 (excluding the "Open solution" button at x=1031)
const DIAGRAM_SPECS = [
  { q: 5, id: 'ac_q5_diagram', page: 3, yMin: 260, yMax: 635, xMin: 60, xMax: 980 },
  { q: 9, id: 'ac_q9_diagram', page: 4, yMin: 260, yMax: 635, xMin: 60, xMax: 980 },
  { q: 10, id: 'ac_q10_diagram', page: 4, yMin: 775, yMax: 1140, xMin: 60, xMax: 980 },
  { q: 11, id: 'ac_q11_diagram', page: 5, yMin: 260, yMax: 520, xMin: 60, xMax: 980 },
  { q: 13, id: 'ac_q13_diagram', page: 5, yMin: 840, yMax: 1210, xMin: 60, xMax: 980 },
  { q: 18, id: 'ac_q18_diagram', page: 6, yMin: 795, yMax: 1165, xMin: 60, xMax: 980 },
  { q: 24, id: 'ac_q24_diagram', page: 8, yMin: 325, yMax: 675, xMin: 60, xMax: 980 },
  { q: 28, id: 'ac_q28_diagram', page: 9, yMin: 290, yMax: 665, xMin: 60, xMax: 980 },
  { q: 31, id: 'ac_q31_diagram', page: 10, yMin: 260, yMax: 635, xMin: 60, xMax: 980 },
  { q: 34, id: 'ac_q34_diagram', page: 11, yMin: 295, yMax: 565, xMin: 60, xMax: 980 },
  { q: 46, id: 'ac_q46_diagram', page: 13, yMin: 815, yMax: 1215, xMin: 60, xMax: 980 },
  { q: 51, id: 'ac_q51_diagram', page: 14, yMin: 1025, yMax: 1395, xMin: 60, xMax: 980 },
  { q: 65, id: 'ac_q65_diagram', page: 17, yMin: 660, yMax: 1025, xMin: 60, xMax: 980 }
];

async function cropDiagrams() {
  console.log(`Cropping ${DIAGRAM_SPECS.length} diagrams...`);

  for (const spec of DIAGRAM_SPECS) {
    const pageImg = await loadImage(`backend/scripts/ac_pages/page_${spec.page}.png`);
    const width = pageImg.width;
    const height = pageImg.height;

    // First create a canvas of the search window
    const winW = spec.xMax - spec.xMin;
    const winH = spec.yMax - spec.yMin;
    const winCanvas = createCanvas(winW, winH);
    const winCtx = winCanvas.getContext('2d');
    winCtx.drawImage(pageImg, spec.xMin, spec.yMin, winW, winH, 0, 0, winW, winH);

    const imgData = winCtx.getImageData(0, 0, winW, winH);
    const data = imgData.data;

    // Find non-white pixel bounding box (threshold: < 240 in r, g, or b)
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

    // Add small padding (10px)
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

    // Also mirror locally
    fs.writeFileSync(path.join(frontendDir, `${spec.id}.png`), buf);
    console.log(`Cropped Q${spec.q} -> ${spec.id}.png (${cropW}x${cropH})`);
  }

  console.log('All diagrams successfully cropped and mirrored!');
}

cropDiagrams().catch(console.error);
