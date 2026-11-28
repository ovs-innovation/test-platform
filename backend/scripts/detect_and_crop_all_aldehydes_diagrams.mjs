import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '../node_modules/@napi-rs/canvas/index.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linesCache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'aldehydes_lines_cache.json'), 'utf8'));

const outDir = path.resolve(__dirname, 'aldehydes_diagrams');
fs.mkdirSync(outDir, { recursive: true });

async function detectAllDiagrams() {
  console.log('Starting comprehensive diagram detection across all 159 pages...');
  const detected = [];

  for (let p = 1; p <= 159; p++) {
    const pageFile = path.resolve(__dirname, `aldehydes_pages/page_${String(p).padStart(3, '0')}.png`);
    if (!fs.existsSync(pageFile)) continue;

    const lines = linesCache[p]?.lines || [];
    const img = await loadImage(pageFile);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Mask margins and page borders
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 70, img.height); // left margin
    ctx.fillRect(1180, 0, img.width - 1180, img.height); // right margin
    ctx.fillRect(0, 0, img.width, 35); // top header
    ctx.fillRect(0, 1540, img.width, img.height - 1540); // bottom footer

    // Mask OCR text boxes (expand slightly by 4px)
    for (const l of lines) {
      ctx.fillRect(l.left - 4, l.top - 3, l.width + 8, l.height + 6);
    }

    // Now scan vertical bands for clusters of dark pixels
    const sw = 1180 - 70;
    const imgData = ctx.getImageData(70, 35, sw, 1505);
    const data = imgData.data;

    // Projection along Y axis
    const rowCounts = new Array(1505).fill(0);
    for (let y = 0; y < 1505; y++) {
      for (let x = 0; x < sw; x++) {
        const idx = (y * sw + x) * 4;
        const r = data[idx], g = data[idx + 1], b = data[idx + 2];
        if (r < 180 && g < 180 && b < 180) {
          rowCounts[y]++;
        }
      }
    }

    // Identify continuous vertical spans with dark pixels
    const spans = [];
    let inSpan = false;
    let spanStart = 0;
    let emptyRows = 0;

    for (let y = 0; y < 1505; y++) {
      if (rowCounts[y] > 15) {
        if (!inSpan) {
          inSpan = true;
          spanStart = y;
        }
        emptyRows = 0;
      } else {
        if (inSpan) {
          emptyRows++;
          if (emptyRows > 18 || y === 1504) {
            const spanEnd = y - emptyRows;
            if (spanEnd - spanStart > 25) {
              spans.push({ startY: spanStart + 35, endY: spanEnd + 35 });
            }
            inSpan = false;
            emptyRows = 0;
          }
        }
      }
    }

    // For each span, find exact minX and maxX
    let diagIdx = 1;
    for (const span of spans) {
      const sh = span.endY - span.startY;
      const spanImgData = ctx.getImageData(70, span.startY, sw, sh);
      const spanData = spanImgData.data;

      let minX = 1180, maxX = 70;
      let totalDark = 0;

      for (let y = 0; y < sh; y++) {
        for (let x = 0; x < sw; x++) {
          const idx = (y * sw + x) * 4;
          const r = spanData[idx], g = spanData[idx + 1], b = spanData[idx + 2];
          if (r < 180 && g < 180 && b < 180) {
            totalDark++;
            const absX = 70 + x;
            if (absX < minX) minX = absX;
            if (absX > maxX) maxX = absX;
          }
        }
      }

      if (totalDark > 350 && (maxX - minX) > 40 && sh > 25) {
        // Crop from original unmasked page image
        const pad = 12;
        const cropX = Math.max(0, minX - pad);
        const cropY = Math.max(0, span.startY - pad);
        const cropW = Math.min(img.width - cropX, (maxX - minX) + pad * 2);
        const cropH = Math.min(img.height - cropY, sh + pad * 2);

        const cropCanvas = createCanvas(cropW, cropH);
        const cropCtx = cropCanvas.getContext('2d');
        cropCtx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

        const fileName = `aldehydes_p${String(p).padStart(3, '0')}_diag_${diagIdx}.png`;
        fs.writeFileSync(path.join(outDir, fileName), cropCanvas.toBuffer('image/png'));

        detected.push({
          page: p,
          diagIdx,
          fileName,
          cropX,
          cropY,
          cropW,
          cropH,
          totalDark
        });
        diagIdx++;
      }
    }

    if (p % 30 === 0 || p === 159) {
      console.log(`Processed page ${p}/159. Detected ${detected.length} diagrams so far.`);
    }
  }

  fs.writeFileSync(path.resolve(__dirname, 'aldehydes_detected_diagrams.json'), JSON.stringify(detected, null, 2));
  console.log(`Total diagrams detected and cropped: ${detected.length}`);
}

detectAllDiagrams().catch(console.error);
