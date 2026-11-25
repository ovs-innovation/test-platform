import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, 'ray_jee_pages');
const ocrPages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_cache.json'), 'utf8'));

async function scanAllPages() {
  console.log('Scanning all 250 pages for diagrams...');
  const diagramList = [];

  for (let p = 1; p <= 250; p++) {
    const pad = String(p).padStart(3, '0');
    const imgPath = path.join(pagesDir, `page_${pad}.png`);
    if (!fs.existsSync(imgPath)) continue;

    const { data, info } = await sharp(imgPath).raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;

    // Scan horizontal lines for dark pixels
    const rowDarkCounts = new Int32Array(height);
    for (let y = 0; y < height; y++) {
      let count = 0;
      for (let x = 60; x < width - 60; x++) {
        const idx = (y * width + x) * channels;
        if (data[idx] < 210) count++;
      }
      rowDarkCounts[y] = count;
    }

    // Find continuous spans of y where rowDarkCounts > 35
    let inSpan = false;
    let spanStart = 0;
    const spans = [];
    for (let y = 40; y < height - 60; y++) {
      if (rowDarkCounts[y] > 35) {
        if (!inSpan) {
          inSpan = true;
          spanStart = y;
        }
      } else {
        if (inSpan) {
          inSpan = false;
          const spanH = y - spanStart;
          // Diagrams in PYQ pages are typically between 70px and 550px high
          // Note: solutions with multiple equations can sometimes be tall, but diagrams usually appear BEFORE the "ANSWER:" line!
          if (spanH >= 65 && spanH <= 600) {
            let minX = width, maxX = 0;
            for (let sy = spanStart; sy < y; sy++) {
              for (let sx = 60; sx < width - 60; sx++) {
                const idx = (sy * width + sx) * channels;
                if (data[idx] < 210) {
                  if (sx < minX) minX = sx;
                  if (sx > maxX) maxX = sx;
                }
              }
            }
            const spanW = maxX - minX + 1;
            if (spanW >= 80) {
              spans.push({ y: spanStart, h: spanH, x: minX, w: spanW });
            }
          }
        }
      }
    }

    const pageText = ocrPages[String(p)] || '';
    const hasDiagKw = /figure|shown in|diagram|graph|fig|circuit|as shown/i.test(pageText);

    if (spans.length > 0 && (hasDiagKw || spans.some(s => s.h >= 100))) {
      diagramList.push({
        page: p,
        hasDiagKw,
        spans
      });
    }
  }

  console.log(`Detected potential diagrams on ${diagramList.length} pages.`);
  fs.writeFileSync(
    path.resolve(__dirname, 'ray_detected_diagrams.json'),
    JSON.stringify(diagramList, null, 2)
  );
}

scanAllPages().catch(console.error);
