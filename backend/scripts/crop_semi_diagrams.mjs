import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const specs = JSON.parse(fs.readFileSync('backend/scripts/semi_diagram_specs.json', 'utf8'));
const outDir = 'backend/scripts/semi_diagrams';
const frontendDir = 'frontend/public/uploads/semiconductor';

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(frontendDir)) fs.mkdirSync(frontendDir, { recursive: true });

async function cropDiagrams() {
  console.log(`Cropping ${specs.length} semiconductor diagrams...`);

  for (const spec of specs) {
    const pageImgPath = `backend/scripts/semi_pages/page_${spec.page}.png`;
    if (!fs.existsSync(pageImgPath)) {
      console.warn(`Page missing: ${pageImgPath}`);
      continue;
    }

    const pageImage = await loadImage(pageImgPath);
    const cropW = Math.max(100, spec.xMax - spec.xMin);
    const cropH = Math.max(60, spec.yMax - spec.yMin);

    const canvas = createCanvas(cropW, cropH);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(pageImage, spec.xMin, spec.yMin, cropW, cropH, 0, 0, cropW, cropH);

    // If QR code or open solution encroaches right side:
    // Page width is 1190 at scale 2.0. QR code is usually at x > 950, y < 250 from top of question
    // Blank out any QR code remnants if spec.xMax reaches right margin
    if (spec.xMax > 950 && spec.yMin < 300) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(cropW - 180, 0, 180, 120);
    }

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
        // Non-white pixel threshold
        if (r < 238 || g < 238 || b < 238) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    let trimmedCanvas;
    if (maxX > minX && maxY > minY) {
      const pad = 12;
      const tX = Math.max(0, minX - pad);
      const tY = Math.max(0, minY - pad);
      const tW = Math.min(cropW - tX, (maxX - minX) + pad * 2);
      const tH = Math.min(cropH - tY, (maxY - minY) + pad * 2);

      trimmedCanvas = createCanvas(tW, tH);
      const tCtx = trimmedCanvas.getContext('2d');
      tCtx.fillStyle = '#FFFFFF';
      tCtx.fillRect(0, 0, tW, tH);
      tCtx.drawImage(canvas, tX, tY, tW, tH, 0, 0, tW, tH);
    } else {
      trimmedCanvas = canvas;
    }

    const outName = `${spec.id}.png`;
    const localPath = path.join(outDir, outName);
    const frontPath = path.join(frontendDir, outName);

    const buf = trimmedCanvas.toBuffer('image/png');
    fs.writeFileSync(localPath, buf);
    fs.writeFileSync(frontPath, buf);
  }

  console.log(`Successfully cropped and saved ${specs.length} diagrams!`);
}

cropDiagrams().catch(console.error);
