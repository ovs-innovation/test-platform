import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, 'mag_jee_pages');
const ocrPages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_ocr_cache.json'), 'utf8'));

// We want to detect all graphics between question header and options
// Let's test on pages 12, 13, 15, 20, 23, 26, 28, 44, 51, 54, 55, 57
const testPages = [12, 13, 15, 20, 23, 26, 28, 44, 51, 54, 55, 57];

async function testScan() {
  for (const p of testPages) {
    const pad = String(p).padStart(3, '0');
    const imgPath = path.join(pagesDir, `page_${pad}.png`);
    const { data, info } = await sharp(imgPath).raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;

    // Projection
    const rowCounts = new Int32Array(height);
    for (let y = 0; y < height; y++) {
      let c = 0;
      for (let x = 60; x < width - 60; x++) {
        const idx = (y * width + x) * channels;
        if (data[idx] < 210) c++;
      }
      rowCounts[y] = c;
    }

    // Let's find spans with rowCounts > 20 and gap <= 10
    const spans = [];
    let start = -1;
    let lastDark = -1;
    for (let y = 40; y < height - 60; y++) {
      if (rowCounts[y] > 20) {
        if (start === -1) start = y;
        lastDark = y;
      } else {
        if (start !== -1 && y - lastDark > 12) {
          const h = lastDark - start + 1;
          if (h >= 45) {
            spans.push({ y: start, h });
          }
          start = -1;
        }
      }
    }
    if (start !== -1) {
      const h = lastDark - start + 1;
      if (h >= 45) spans.push({ y: start, h });
    }

    console.log(`Page ${p} spans:`, spans);
  }
}

testScan().catch(console.error);
