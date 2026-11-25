import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.resolve(__dirname, 'chemeq_pages');
const OUT_DIR = path.resolve(__dirname, 'chemeq_diagrams');

async function findBBoxes() {
  const configs = [
    { q: 12, page: 'page_003.png', search: { xMin: 250, xMax: 1100, yMin: 650, yMax: 1000 } },
    { q: 37, page: 'page_013.png', search: { xMin: 400, xMax: 800, yMin: 40, yMax: 440 } },
    { q: 52, page: 'page_020.png', search: { xMin: 650, xMax: 1000, yMin: 60, yMax: 350 } },
    { q: 110, page: 'page_042.png', search: { xMin: 250, xMax: 950, yMin: 60, yMax: 480 } },
    { q: 118, page: 'page_045.png', search: { xMin: 250, xMax: 700, yMin: 1100, yMax: 1450 } }
  ];

  for (const cfg of configs) {
    const img = await loadImage(path.resolve(PAGES_DIR, cfg.page));
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const idata = ctx.getImageData(0, 0, img.width, img.height);
    const data = idata.data;

    let minX = cfg.search.xMax, maxX = cfg.search.xMin;
    let minY = cfg.search.yMax, maxY = cfg.search.yMin;

    for (let y = cfg.search.yMin; y <= cfg.search.yMax; y++) {
      for (let x = cfg.search.xMin; x <= cfg.search.xMax; x++) {
        const idx = (y * img.width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        // Dark pixel (not background/watermark)
        // Background is white (~255), AcadXL watermark is faint grey (> 230)
        if (r < 200 && g < 200 && b < 200) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    console.log(`Q${cfg.q} (${cfg.page}) BBox: x: [${minX}, ${maxX}] (w: ${maxX - minX}), y: [${minY}, ${maxY}] (h: ${maxY - minY})`);

    // Add 15px padding
    const pad = 15;
    const cropX = Math.max(0, minX - pad);
    const cropY = Math.max(0, minY - pad);
    const cropW = Math.min(img.width - cropX, maxX - minX + 2 * pad);
    const cropH = Math.min(img.height - cropY, maxY - minY + 2 * pad);

    const outCanvas = createCanvas(cropW, cropH);
    const outCtx = outCanvas.getContext('2d');
    // fill white background first
    outCtx.fillStyle = '#ffffff';
    outCtx.fillRect(0, 0, cropW, cropH);
    outCtx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
    fs.writeFileSync(path.resolve(OUT_DIR, `q${cfg.q}_diagram.png`), outCanvas.toBuffer('image/png'));
    console.log(`Saved refined q${cfg.q}_diagram.png (${cropW}x${cropH})`);
  }
}

findBBoxes().catch(console.error);
