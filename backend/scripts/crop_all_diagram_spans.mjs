import { createCanvas, loadImage } from '../node_modules/@napi-rs/canvas/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.resolve(__dirname, 'capacitance_diagrams');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function trimAndSave(canvas, outPath) {
  const ctx = canvas.getContext('2d');
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const idx = (y * canvas.width + x) * 4;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      // non-white pixel
      if (r < 235 || g < 235 || b < 235) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (minX >= maxX || minY >= maxY) return false;

  const pad = 10;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(canvas.width - 1, maxX + pad);
  maxY = Math.min(canvas.height - 1, maxY + pad);

  const trimW = maxX - minX + 1;
  const trimH = maxY - minY + 1;
  if (trimW < 30 || trimH < 30) return false;

  const outCanvas = createCanvas(trimW, trimH);
  const outCtx = outCanvas.getContext('2d');
  outCtx.fillStyle = '#ffffff';
  outCtx.fillRect(0, 0, trimW, trimH);
  outCtx.drawImage(canvas, minX, minY, trimW, trimH, 0, 0, trimW, trimH);

  fs.writeFileSync(outPath, outCanvas.toBuffer('image/png'));
  return true;
}

// Function to find non-text graphical spans on a page
async function processPage(pageNum) {
  const pPad = String(pageNum).padStart(3, '0');
  const imgPath = path.resolve(__dirname, `capacitance_pages/page_${pPad}.png`);
  if (!fs.existsSync(imgPath)) return [];

  const img = await loadImage(imgPath);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;

  // Compute row darkness
  const rowDarkness = [];
  for (let y = 0; y < canvas.height; y++) {
    let darkCount = 0;
    for (let x = 80; x < canvas.width - 80; x++) {
      const idx = (y * canvas.width + x) * 4;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      if (r < 225 || g < 225 || b < 225) {
        darkCount++;
      }
    }
    rowDarkness.push(darkCount);
  }

  // Find spans with height between 45px and 450px that represent diagrams
  // Text lines in AcadXL are typically 14px - 28px tall. Diagrams are > 45px.
  const spans = [];
  let inSpan = false;
  let spanStart = 0;

  for (let y = 0; y < rowDarkness.length; y++) {
    // A threshold of 8 dark pixels
    if (rowDarkness[y] > 8) {
      if (!inSpan) {
        inSpan = true;
        spanStart = y;
      }
    } else {
      if (inSpan) {
        inSpan = false;
        const h = y - spanStart;
        // If height > 45px, it's very likely a circuit, graph, or diagram
        if (h >= 45 && h <= 500) {
          spans.push({ yStart: spanStart, yEnd: y, h });
        }
      }
    }
  }

  return { pageNum, img, spans };
}

async function run() {
  console.log('Scanning all 144 pages for diagram spans...');
  let totalDiagrams = 0;

  for (let p = 1; p <= 144; p++) {
    const { spans, img } = await processPage(p);
    if (spans && spans.length > 0) {
      for (let sIdx = 0; sIdx < spans.length; sIdx++) {
        const { yStart, yEnd, h } = spans[sIdx];
        const cropH = yEnd - yStart;
        const cropCanvas = createCanvas(img.width, cropH);
        const cropCtx = cropCanvas.getContext('2d');
        cropCtx.fillStyle = '#ffffff';
        cropCtx.fillRect(0, 0, img.width, cropH);
        cropCtx.drawImage(img, 0, yStart, img.width, cropH, 0, 0, img.width, cropH);

        const outName = `p${p}_span${sIdx + 1}_y${yStart}_h${h}.png`;
        const outPath = path.join(OUT_DIR, outName);
        if (trimAndSave(cropCanvas, outPath)) {
          totalDiagrams++;
        }
      }
    }
  }

  console.log(`Finished cropping! Found and saved ${totalDiagrams} potential diagram spans in ${OUT_DIR}`);
}

run().catch(console.error);
