import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const outDir = 'backend/scripts/dn_diagrams';
const frontendDir = 'frontend/public/uploads/dual_nature';

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(frontendDir)) fs.mkdirSync(frontendDir, { recursive: true });

const DIAGRAM_SPECS = [
  { q: 2, id: 'dn_q2_diagram', page: 3, yMin: 230, yMax: 1140, xMin: 60, xMax: 650 },
  { q: 7, id: 'dn_q7_diagram', page: 5, yMin: 200, yMax: 1350, xMin: 60, xMax: 700 },
  { q: 11, id: 'dn_q11_diagram', page: 7, yMin: 200, yMax: 1350, xMin: 60, xMax: 450 },
  { q: 38, id: 'dn_q38_diagram', page: 13, yMin: 200, yMax: 1120, xMin: 60, xMax: 400 },
  { q: 63, id: 'dn_q63_diagram', page: 18, yMin: 220, yMax: 680, xMin: 60, xMax: 650 },
  { q: 77, id: 'dn_q77_diagram', page: 21, yMin: 200, yMax: 1120, xMin: 60, xMax: 400 },
  { q: 96, id: 'dn_q96_diagram', page: 25, yMin: 200, yMax: 1120, xMin: 60, xMax: 400 },
  { q: 118, id: 'dn_q118_diagram', page: 29, yMin: 200, yMax: 1120, xMin: 60, xMax: 400 }
];

async function cropDiagrams() {
  for (const spec of DIAGRAM_SPECS) {
    const pageImage = await loadImage(`backend/scripts/dn_pages/page_${spec.page}.png`);
    const cropW = spec.xMax - spec.xMin;
    const cropH = spec.yMax - spec.yMin;

    const canvas = createCanvas(cropW, cropH);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(pageImage, spec.xMin, spec.yMin, cropW, cropH, 0, 0, cropW, cropH);

    // Auto trim white border
    const imgData = ctx.getImageData(0, 0, cropW, cropH);
    const data = imgData.data;

    let minX = cropW, minY = cropH, maxX = 0, maxY = 0;
    for (let y = 0; y < cropH; y++) {
      for (let x = 0; x < cropW; x++) {
        const idx = (y * cropW + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        // non-white threshold
        if (r < 240 || g < 240 || b < 240) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    const pad = 15;
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(cropW, maxX + pad);
    maxY = Math.min(cropH, maxY + pad);

    const trimmedW = Math.max(10, maxX - minX);
    const trimmedH = Math.max(10, maxY - minY);

    const finalCanvas = createCanvas(trimmedW, trimmedH);
    const finalCtx = finalCanvas.getContext('2d');
    finalCtx.fillStyle = '#FFFFFF';
    finalCtx.fillRect(0, 0, trimmedW, trimmedH);
    finalCtx.drawImage(canvas, minX, minY, trimmedW, trimmedH, 0, 0, trimmedW, trimmedH);

    const buf = finalCanvas.toBuffer('image/png');
    fs.writeFileSync(path.join(outDir, `${spec.id}.png`), buf);
    fs.writeFileSync(path.join(frontendDir, `${spec.id}.png`), buf);

    console.log(`Cropped & saved ${spec.id} (${trimmedW}x${trimmedH})`);
  }
}

cropDiagrams().catch(console.error);
